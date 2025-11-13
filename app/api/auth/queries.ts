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

const getAllReports = async (page: number) => {
  const response = await request({
    url: `/all_reports/?page=${page}`,
    method: `GET`,
    withCredentials: true,
  });
  return response?.data
};

export const useGetAllReports = (page: number = 1) => {
  return useQuery({
    queryKey: ["all-reports", page],
    queryFn: () => getAllReports(page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};