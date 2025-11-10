import { request } from "@/lib/axios-utils";
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
