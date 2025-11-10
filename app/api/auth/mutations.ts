import { request } from "@/lib/axios-utils";
import { ObjectLiteral } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";


const retrieveJournalistInfo = async (data: ObjectLiteral) => {
  const response = request({
    url: "/retieveJournalistInfo/",
    method: "GET",
    data,
  });
  return response;
};

const inviteOnboard = async (data: ObjectLiteral) => {
  const response = request({
    url: "/invite-onboard/",
    method: "POST",
    data,
  });
  return response;
};

const mediaSignup = async (data: ObjectLiteral) => {
  const response = request({
    url: "/mediaSignup/",
    method: "POST",
    data,
  });
  return response;
};

const login = async (data: ObjectLiteral) => {
  const response = request({
    url: "/login/",
    method: "POST",
    data,
  });
  return response;
};

const createPassword = async (data: ObjectLiteral, uid64: string, token: string) => {
  const response = request({
    url: `/create-password/${uid64}/${token}/`,
    method: "POST",
    data,
  });

  return response;
};

const updateUser = async (data: ObjectLiteral) => {
  const response = request({
    url: `/user-update/`,
    method: "PATCH",
    data,
  });

  return response;
};

const journalistSignup = async (data: ObjectLiteral) => {
  const response = request({
    url: "/journalistSignup/",
    method: "POST",
    data,
  });
  return response;
};

const setToken = async (data: ObjectLiteral) => {
  const response = request({
    url: "/api/auth/set-token",
    method: "POST",
    data,
  });
  return response;
};

export const useCreateIndependentJournalistAccount = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
    mutationFn: journalistSignup,
    mutationKey: ["journalist-signup"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response;

      cb(message, data);
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message;
      errorCb(message || error.message);
    },
  });
};

export const useCreatePassword = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
    mutationFn: ({ data, uid64, token }: { 
      data: ObjectLiteral; 
      uid64: string; 
      token: string;
    }) => createPassword(data, uid64, token),
    mutationKey: ["create-password"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response;
      cb(message, data);
      return data
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        (Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message);
      errorCb(message || error.message);
    },
  });
};

export const useSetToken = (
  errorCb?: (err: string) => void,
  cb?: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
    mutationFn: setToken,
    mutationKey: ["set-token"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response;
      cb?.(message, data);
      return data
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        (Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message);
      errorCb?.(message || error.message);
    },
  });
};

export const useUpdateUser = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
     mutationFn: updateUser,
    mutationKey: ["update-user"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response?.data?.data;

      cb(message, data);
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message;
      errorCb(message || error.message);
    },
  });
};

export const useLogin = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
     mutationFn: login,
    mutationKey: ["login"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response;

      cb(message, data);
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message;
      errorCb(message || error.message);
    },
  });
};


export const useMediaSignup = (
  errorCb: (err: string) => void,
  cb: (message: string, data?: ObjectLiteral) => void
) => {
  return useMutation({
     mutationFn: mediaSignup,
    mutationKey: ["media-signup"],
    onSuccess(response: AxiosResponse) {
      const message = response?.data?.message;
      const data = response;

      cb(message, data);
    },
    onError(error: AxiosError) {
      const message =
        (error.response?.data as { errors: string[] })?.errors?.join(", ") ||
        Array.isArray((error.response?.data as { message: string[] })?.message)
          ? (error.response?.data as { message: string[] })?.message.join(", ")
          : (error.response?.data as { message: string })?.message;
      errorCb(message || error.message);
    },
  });
};

