import { request } from "@/lib/axios-utils"
import type { ObjectLiteral } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError, AxiosResponse } from "axios"

interface ErrorResponse {
  errors?: string[]
  message?: string
  messages?: { message: string | string[] }
  detail?: string
  non_field_errors?: string[]
}

function extractErrorMessage(error: AxiosError<ErrorResponse>): string {
  const errorData = error.response?.data

  // Priority: detail > errors > message
  if (errorData?.messages?.message) {
    const msg = errorData.messages.message
    return Array.isArray(msg) ? msg.join(", ") : msg
  }
  if (errorData?.non_field_errors) {
    return errorData.non_field_errors[0]
  }

  if (errorData?.detail) {
    return errorData.detail
  }

  if (errorData?.errors?.length) {
    return errorData.errors.join(", ")
  }

  if (errorData?.message) {
    return Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message
  }

  return "An unexpected error occurred"
}

const logout = async (data: ObjectLiteral) => {
  const response = request({
    url: "/logout/",
    method: "POST",
    data,
  })
  return response
}

const independentJournalistSignup = async (data: ObjectLiteral) => {
  const response = request({
    url: "/journalistSignup/",
    method: "POST",
    data,
  })
  return response
}

const MediaHouseJournalistSignup = async (data: ObjectLiteral, encrypted_data: string) => {
  const response = request({
    url: `/MediaHouseJournalistSignup/${encrypted_data}`,
    method: "POST",
    data,
  })
  return response
}

const sendResetEmail = async (data: ObjectLiteral) => {
  const response = request({
    url: "/reset/",
    method: "POST",
    data,
  })
  return response
}

const resendResetEmail = async (data: ObjectLiteral) => {
  const response = request({
    url: "/resend_reset/",
    method: "POST",
    data,
  })
  return response
}

const resetEmail = async (data: ObjectLiteral, uid64: string, token: string) => {
  const response = request({
    url: `/reset-password/${uid64}/${token}/`,
    method: "POST",
    data,
  })
  return response
}

const mediaSignup = async (data: ObjectLiteral) => {
  const response = request({
    url: "/mediaSignup/",
    method: "POST",
    data,
  })
  return response
}

const joinWaitlist = async (data: ObjectLiteral) => {
  const response = request({
    url: "/wait/",
    method: "POST",
    data,
  })
  return response
}

const login = async (data: ObjectLiteral) => {
  const response = request({
    url: "/login/",
    method: "POST",
    data,
  })
  return response
}

const createPassword = async (data: ObjectLiteral, uid64: string, token: string) => {
  const response = request({
    url: `/create-password/${uid64}/${token}/`,
    method: "POST",
    data,
  })

  return response
}

const updateUser = async (data: ObjectLiteral, id: number) => {
  const response = request({
    url: `/user-update/${id}/`,
    method: "PATCH",
    data,
  })

  return response
}

const updateUserPreferences = async (data: { languages: string[]; topics: string[] }) => {
  const response = request({
    url: `/user-preferences/`,
    method: "PATCH",
    data,
  })

  return response
}

const inviteJournalist = async (data: ObjectLiteral) => {
  const response = request({
    url: `/inviteJourno/`,
    method: "POST",
    data,
  })

  return response
}

export const useCreateIndependentJournalistAccount = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: independentJournalistSignup,
    mutationKey: ["journalist-signup"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useCreatePassword = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: ({
      data,
      uid64,
      token,
    }: {
      data: ObjectLiteral
      uid64: string
      token: string
    }) => createPassword(data, uid64, token),
    mutationKey: ["create-password"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
      return data
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useSetToken = (onError?: (error: string) => void) => {
  return useMutation({
    mutationFn: async (payload: {
      token: string
      user: any
      refresh?: string
    }) => setToken(payload),
    onError: (error: any) => {
      onError?.(error.message || "Failed to set authentication")
    },
  })
}

export const useUpdateUser = (errorCb: (err: string) => void, cb: (message: string, data?: ObjectLiteral) => void) => {
  return useMutation({
    mutationFn: ({ data, id }: { data: ObjectLiteral; id: number }) => updateUser(data, id),
    mutationKey: ["update-user"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useUpdateUserPreferences = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: updateUserPreferences,
    mutationKey: ["update-user-preferences"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message || "Preferences updated successfully"
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useLogin = (errorCb: (err: string) => void, cb: (message: string, data?: ObjectLiteral) => void) => {
  return useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useLogout = (errorCb?: (err: string) => void, cb?: (message: string, data?: ObjectLiteral) => void) => {
  return useMutation({
    mutationFn: logout,
    mutationKey: ["logout"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb?.(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useInviteJournalist = (
  errorCb?: (err: string) => void,
  cb?: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: inviteJournalist,
    mutationKey: ["invite-journalist"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb?.(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useMediaSignup = (errorCb: (err: string) => void, cb: (message: string, data?: ObjectLiteral) => void) => {
  return useMutation({
    mutationFn: mediaSignup,
    mutationKey: ["media-signup"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useSendResetEmail = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: sendResetEmail,
    mutationKey: ["send-reset-email"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useResendResetEmail = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: resendResetEmail,
    mutationKey: ["resend-reset-email"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useJoinWaitlist = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: joinWaitlist,
    mutationKey: ["join-waitlist"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useMediaJournalistSignup = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void,
) => {
  return useMutation({
    mutationFn: ({
      data,
      encrypted_data,
    }: {
      data: ObjectLiteral
      encrypted_data: string
    }) => MediaHouseJournalistSignup(data, encrypted_data),
    mutationKey: ["media-journalist-invite-signup"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.detail
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

export const useResetEmail = (errorCb: (err: string) => void, cb: (message: string, data?: ObjectLiteral) => void) => {
  return useMutation({
    mutationFn: ({
      data,
      uid64,
      token,
    }: {
      data: ObjectLiteral
      uid64: string
      token: string
    }) => resetEmail(data, uid64, token),
    mutationKey: ["reset-email"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message
      const data = response

      cb(message, data)
    },
    onError(error: AxiosError<ErrorResponse>) {
      const message = extractErrorMessage(error)
      errorCb?.(message)
    },
  })
}

// Helper function for setting token
const setToken = async (payload: {
  token: string
  user: any
  refresh?: string
}) => {
  // Implementation for setting token
}
