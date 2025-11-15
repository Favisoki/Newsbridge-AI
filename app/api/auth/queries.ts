import { request } from "@/lib/axios-utils";
import { ObjectLiteral } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const response = await request({
    url: "/api/auth/get-token",
    method: "GET",
    withCredentials: true,
  });
  return response?.data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

const getAllReports = async (page: number, search?: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (search && search.trim()) {
    params.append('search', search.trim());
  }
  const response = await request({
    url: `/all_reports/?${params.toString()}`,
    method: `GET`,
    withCredentials: true,
  });
  return response?.data;
};

export const useGetAllReports = (page: number = 1, search: string) => {
  return useQuery({
    queryKey: ["all-reports", page, search], // Include search in queryKey
    queryFn: () => getAllReports(page, search),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
const getPrefefrenceReports = async (page: number, search?: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (search && search.trim()) {
    params.append('search', search.trim());
  }
  const response = await request({
    url: `/reports/?${params.toString()}`,
    method: `GET`,
    withCredentials: true,
  });
  return response?.data;
};

export const useGetPreferenceReports = (page: number = 1, search: string) => {
  return useQuery({
    queryKey: ["preference-reports", page, search], // Include search in queryKey
    queryFn: () => getPrefefrenceReports(page, search),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

const getReportDetails = async (id: number) => {
  const response = await request({
    url: `/report/${id}/`,
    method: `GET`,
    withCredentials: true,
  });
  return response?.data;
};

export const useGetReportDetails = (id: number) => {
  return useQuery({
    queryKey: ["report-details", id], // Include search in queryKey
    queryFn: () => getReportDetails(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};