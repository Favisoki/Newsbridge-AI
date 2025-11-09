import { request } from "@/app/lib/axios-utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export interface ObjectLiteral {
  [key: string]: any;
}

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

const journalistSignup = async (data: ObjectLiteral) => {
  const response = request({
    url: "/journalistSignup/",
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
