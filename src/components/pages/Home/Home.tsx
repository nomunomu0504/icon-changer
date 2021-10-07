import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import TwitterLogin from "react-twitter-login";
import { TwitterAuthResult } from "~/@types/TwitterAuthResult";
import { Header } from "~/components/blocks/Header";
import { ImageCrop } from "~/components/blocks/ImageCrop/ImageCrop";

export const Home: React.VFC = React.memo((): JSX.Element => {

  const [croppedImageBase64, setCroppedImageBase64] = useState<string>();

  const handleTwitterAuthCallback = useCallback((error, data: TwitterAuthResult) => {
    console.log(error, data);
  }, []);

  const handleCompleteCrop = useCallback((base64: string) => {
    console.log(base64);
    setCroppedImageBase64(base64)
  }, []);

  return (
    <div css={styles["container"]}>
      <Header />
      <div css={styles["content"]}>
        <TwitterLogin
          authCallback={handleTwitterAuthCallback}
          consumerKey={process.env["NEXT_PUBLIC_TWITTER_API_KEY"] ?? ""}
          consumerSecret={process.env["NEXT_PUBLIC_TWITTER_API_SECRET_KEY"] ?? ""}
        />
        <ImageCrop minWidth={400} minHeight={400} onCropComplete={handleCompleteCrop} />
        {
          croppedImageBase64 && (
            <img src={croppedImageBase64} alt="cropped" />
          )
        }
      </div>
    </div>
  );
});

const styles = {
  container: css``,
  content: css`
    margin-top: 8px;
    width: 600px;
  `,
};
