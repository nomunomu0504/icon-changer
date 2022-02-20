import { useMutation, UseMutationResult } from "react-query";
import type { TwitterUpdateProfileParam } from "~/@types/TwitterUpdateProfileParam";
import { TwitterUpdateProfileResponse } from "~/@types/TwitterUpdateProfileResponse";
import { updateProfileImage } from "~/requests";

export type ApiInput = TwitterUpdateProfileParam;
export type ApiOutput = TwitterUpdateProfileResponse;

export const useUpdateTwitterProfileMutation = (): UseMutationResult<ApiOutput, unknown, ApiInput> => {
  return useMutation<ApiOutput, unknown, ApiInput>(async (params: ApiInput): Promise<ApiOutput> => {
    return await updateProfileImage(params);
  }, {});
};
