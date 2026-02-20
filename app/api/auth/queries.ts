import { request } from "@/lib/axios-utils"
import { useQuery } from "@tanstack/react-query"

const fetchUserData = async () => {
  const response = await request({
    url: "/api/auth/get-token",
    method: "GET",
    withCredentials: true,
  })
  return response?.data
}

export const useUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

const getAllReports = async (page: number, search?: string) => {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (search && search.trim()) {
    params.append("search", search.trim())
  }
  const response = await request({
    url: `/all_reports/?${params.toString()}`,
    method: `GET`,
    withCredentials: true,
  })
  return response?.data
}

export const useGetAllReports = (page = 1, search: string) => {
  return useQuery({
    queryKey: ["all-reports", page, search], // Include search in queryKey
    queryFn: () => getAllReports(page, search),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

const getPreferenceReports = async (page: number, search?: string) => {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (search && search.trim()) {
    params.append("search", search.trim())
  }
  const response = await request({
    url: `/reports/?${params.toString()}`,
    method: `GET`,
    withCredentials: true,
  })
  return response?.data
}

export const useGetPreferenceReports = (page = 1, search: string) => {
  return useQuery({
    queryKey: ["preference-reports", page, search], // Include search in queryKey
    queryFn: () => getPreferenceReports(page, search),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

const getUserPreferences = async () => {
  try {
    // Fetch journalist info which includes coverages
    const response = await request({
      url: `/retrieveJournalistInfo/`,
      method: `GET`,
      withCredentials: true,
    })
    
    if (response?.data) {
      // Map coverages to topics and languages from the response
      const coverages = response.data.coverages || []
      const languages = response.data.languages || []
      
      return {
        topics: coverages.map((coverage: any) => typeof coverage === 'string' ? coverage : coverage.name),
        languages: languages.map((lang: any) => typeof lang === 'string' ? lang : lang.name),
        coverages: coverages,
      }
    }
    
    return { topics: [], languages: [], coverages: [] }
  } catch (error) {
    return { topics: [], languages: [], coverages: [] }
  }
}

export const useGetUserPreferences = () => {
  return useQuery({
    queryKey: ["user-preferences"],
    queryFn: getUserPreferences,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

const getReportDetails = async (id: number) => {
  const response = await request({
    url: `/report/${id}/`,
    method: `GET`,
    withCredentials: true,
  })
  return response?.data
}

export const useGetReportDetails = (id: number) => {
  return useQuery({
    queryKey: ["report-details", id],
    queryFn: () => getReportDetails(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

const getPendingUsers = async (page: number, search?: string) => {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (search && search.trim()) {
    params.append("search", search.trim())
  }
  const response = await request({
    url: `/pending-users/?${params.toString()}`,
    method: `GET`,
    withCredentials: true,
  })
  return response?.data
}

export const usePendingUsers = (page = 1, search = "") => {
  return useQuery({
    queryKey: ["pending-users", page, search],
    queryFn: () => getPendingUsers(page, search),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
