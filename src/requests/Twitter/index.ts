import type { TwitterUpdateProfileParam } from "~/@types/TwitterUpdateProfileParam";
import type { TwitterUpdateProfileResponse } from "~/@types/TwitterUpdateProfileResponse";

export const updateProfileImage = async (params: TwitterUpdateProfileParam): Promise<TwitterUpdateProfileResponse> => {
  const { image } = params;
  const result = await fetch("https://api.twitter.com/1.1/account/update_profile_image.json", {
    method: "POST",
    body: JSON.stringify({ image }),
  });

  return await result.json();
};
