"use client";

import { usePendingUsers } from "@/app/api/auth/queries";
import useToast from "@/app/hooks/useToast";
import { debounce } from "@/lib/utils";
import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

interface PendingUser {
  id: string;
  name: string;
  userType: string;
  email: string;
  country: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected";
}

interface UserManagementContextType {
  // Pending users data
  pendingUsers: PendingUser[];
  pendingUsersCount: number;
  pendingUsersLoading: boolean;
  pendingUsersError: boolean;

  // Pagination
  usersPage: number;
  usersTotalPages: number;
  usersHasNext: boolean;
  usersHasPrevious: boolean;
  setUsersPage: (page: number | ((prev: number) => number)) => void;
  goToNextUsersPage: () => void;
  goToPreviousUsersPage: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;

  // Utility
  itemsPerPage: number;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(
  undefined
);

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const { errorToastHandler } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebounceSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const dataFetchedRef = useRef(false);

  const [usersPage, setUsersPage] = useState(1);

  // Debounced search
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebounceSearchQuery(value);
      }, 500),
    []
  );

  useEffect(() => {
    setUsersPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    debouncedSetSearch(searchQuery);
  }, [searchQuery, debouncedSetSearch]);

  // Fetch pending users
  const {
    data: usersData,
    isLoading: pendingUsersLoading,
    isError: pendingUsersError,
  } = usePendingUsers(usersPage, debouncedSearchQuery);

  // Extract pending users data
  const pendingUsers: PendingUser[] = usersData?.results || [];
  const pendingUsersCount = usersData?.count || 0;
  const usersHasNext = !!usersData?.next;
  const usersHasPrevious = !!usersData?.previous;

  // Toast for errors (only once)
  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (pendingUsersError) {
      errorToastHandler("Failed to fetch pending users");
      dataFetchedRef.current = true;
    }
  }, [pendingUsersError, errorToastHandler]);

  // Calculate pagination info
  const itemsPerPage = 10;
  const usersTotalPages = Math.ceil(pendingUsersCount / itemsPerPage);

  // Users pagination handlers
  const goToNextUsersPage = () => {
    if (usersHasNext) {
      setUsersPage((prev) => prev + 1);
    }
  };

  const goToPreviousUsersPage = () => {
    if (usersHasPrevious) {
      setUsersPage((prev) => Math.max(1, prev - 1));
    }
  };

  const value = useMemo(
    () => ({
      // Pending users data
      pendingUsers,
      pendingUsersCount,
      pendingUsersLoading,
      pendingUsersError,

      // Pagination
      usersPage,
      usersTotalPages,
      usersHasNext,
      usersHasPrevious,
      setUsersPage,
      goToNextUsersPage,
      goToPreviousUsersPage,

      // Search & Filter
      searchQuery,
      setSearchQuery,
      selectedFilter,
      setSelectedFilter,

      // Utility
      itemsPerPage,
    }),
    [
      pendingUsers,
      pendingUsersCount,
      pendingUsersLoading,
      pendingUsersError,
      usersPage,
      usersTotalPages,
      usersHasNext,
      usersHasPrevious,
      searchQuery,
      selectedFilter,
      itemsPerPage,
    ]
  );

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error("useUserManagement must be used within UserManagementProvider");
  }
  return context;
}
