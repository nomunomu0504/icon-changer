import { css } from "@emotion/react";
import React, { useCallback, useMemo, useState } from "react";
import TwitterLogin from "react-twitter-login";
import FacebookLogin from "react-facebook-login";
import type { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { TwitterAuthResult } from "~/@types/TwitterAuthResult";
import { Header } from "~/components/blocks/Header";
import { ImageCrop } from "~/components/blocks/ImageCrop/ImageCrop";
import { MdDone, MdFacebook } from "react-icons/md";

export const Home: React.VFC = React.memo((): JSX.Element => {
  // クロップ完了フラグ
  const [isFinishedImageCrop, setIsFinishedImageCrop] = useState<boolean>(false);
  // クロップされた画像
  const [croppedImageBase64, setCroppedImageBase64] = useState<string | null>(null);

  // Twitter認証情報
  const [twitterOAuth, setTwitterOAuth] = useState<TwitterAuthResult | null>(null);
  // Facebook認証情報
  const [facebookOAuth, setFacebookOAuth] = useState<ReactFacebookLoginInfo | null>(null);

  // アカウントに反映するボタン活性化フラグ
  const isEnabledApplyProfileIconButton = useMemo((): boolean => {
    return twitterOAuth !== null;
  }, [twitterOAuth]);

  // Twitter認証コールバック
  const handleTwitterAuthCallback = useCallback((error, data: TwitterAuthResult) => {
    console.log(data);
    setTwitterOAuth(data);
  }, []);

  // Facebook認証コールバック
  const handleFacebookAuthCallback = useCallback((response: ReactFacebookLoginInfo) => {
    setFacebookOAuth(response);
    console.log(response);
  }, []);

  // 画像選択時
  const handleSelectFile = useCallback(() => {
    setCroppedImageBase64(null);
  }, []);

  // 画像クロップ完了時
  const handleCompleteCrop = useCallback((base64: string) => {
    setCroppedImageBase64(base64);
    setIsFinishedImageCrop(true);
    console.log(base64);
  }, []);

  // アカウントに反映するボタン押下
  const handleClickApplyProfileIcon = useCallback(() => {}, []);

  return (
    <div css={styles["container"]}>
      <Header />
      <div css={styles["content"]}>
        <div css={styles["imageCropContainer"]}>
          {isFinishedImageCrop && croppedImageBase64 && (
            <img src={croppedImageBase64} alt="cropped" css={styles["previewImage"]} />
          )}
          <ImageCrop
            minWidth={200}
            minHeight={200}
            hasPreview={croppedImageBase64 !== null}
            onSelectFile={handleSelectFile}
            onCropComplete={handleCompleteCrop}
          />
        </div>
        <div css={styles["snsLoginButtonContainer"]}>
          <div css={styles["twitterContainer"]}>
            {twitterOAuth && <p css={styles["snsName"]}>@{twitterOAuth.screen_name}</p>}
            <TwitterLogin
              authCallback={handleTwitterAuthCallback}
              consumerKey={process.env["NEXT_PUBLIC_TWITTER_API_KEY"] ?? ""}
              consumerSecret={process.env["NEXT_PUBLIC_TWITTER_API_SECRET_KEY"] ?? ""}
            />
          </div>
          <div css={styles["facebookContainer"]}>
            {facebookOAuth && <p css={styles["snsName"]}>{facebookOAuth.name}</p>}
            <FacebookLogin
              appId={process.env["NEXT_PUBLIC_FACEBOOK_APP_ID"] ?? ""}
              autoLoad={true}
              fields="name,picture"
              scope="public_profile"
              icon={<MdFacebook fontSize={20} />}
              cssClass="facebook-login-button"
              callback={handleFacebookAuthCallback}
            />
          </div>
        </div>
        {croppedImageBase64 && (
          <div css={styles["submitButtonContainer"]}>
            {!isEnabledApplyProfileIconButton && (
              <p css={styles["validationMessage"]}>1つ以上のアカウントにログインしてください</p>
            )}
            <button
              type="button"
              css={isEnabledApplyProfileIconButton ? styles["submitButton"] : styles["disabled"]}
              onClick={handleClickApplyProfileIcon}
              disabled={!isEnabledApplyProfileIconButton}
            >
              <MdDone fontSize={24} />
              アカウントに反映する
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

const baseButtonStyle = css`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
`;

const styles = {
  container: css``,
  previewContainer: css``,
  content: css`
    text-align: center;
  `,
  imageCropContainer: css`
    width: 350px;
    margin: auto;
    text-align: center;
    margin: 16px auto;
  `,
  previewImage: css`
    border-radius: 50%;
  `,
  snsLoginButtonContainer: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin: 4rem 0;
  `,
  twitterContainer: css`
    text-align: center;
  `,
  snsName: css`
    font-weight: bold;
    margin-bottom: 8px;
  `,
  facebookContainer: css`
    .facebook-login-button {
      display: flex;
      align-items: center;
      height: 46px;
      font-family: Helvetica, sans-serif;
      font-weight: 700;
      -webkit-font-smoothing: antialiased;
      color: #fff;
      cursor: pointer;
      text-decoration: none;
      text-transform: uppercase;
      transition: background-color 0.3s, border-color 0.3s;
      background-color: #4c69ba;
      padding: 0 16px;
      border-radius: 24px;
      svg {
        margin-right: 12px;
      }
    }
  `,
  submitButtonContainer: css`
    width: 350px;
    align-items: center;
    margin: auto;
    margin-top: 32px;
    text-align: center;
  `,
  submitButton: css`
    ${baseButtonStyle}
    color: #ffffff;
    background-color: #57bed3;
  `,
  disabled: css`
    ${baseButtonStyle}
    color: #ffffff;
    background-color: #aaaaaa;
  `,
  validationMessage: css`
    margin-bottom: 8px;
    color: #ff0000;
  `,
};
