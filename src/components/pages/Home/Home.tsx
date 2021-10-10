import { css } from "@emotion/react";
import React, { useCallback, useMemo, useState } from "react";
import TwitterLogin from "react-twitter-login";
import FacebookLogin from "react-facebook-login";
import type { ReactFacebookLoginInfo } from "react-facebook-login";
import { TwitterAuthResult } from "~/@types/TwitterAuthResult";
import { Header } from "~/components/blocks/Header";
import { ImageCrop } from "~/components/blocks/ImageCrop/index";
import { MdDone, MdFacebook } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { useUpdateTwitterProfileMutation } from "~/hooks";

export const Home: React.VFC = React.memo((): JSX.Element => {
  // クロップ完了フラグ
  const [isFinishedImageCrop, setIsFinishedImageCrop] = useState<boolean>(false);
  // クロップされた画像
  const [croppedImageBase64, setCroppedImageBase64] = useState<string | null>(null);

  // Twitter認証情報
  const [twitterOAuth, setTwitterOAuth] = useState<TwitterAuthResult | null>(null);
  // Facebook認証情報
  const [facebookOAuth, setFacebookOAuth] = useState<ReactFacebookLoginInfo | null>(null);

  // Twitter更新をTLに投稿するフラグ
  const [isPostChangeImage, setIsPostChangeImage] = useState<boolean>(false);

  // Facebookログインボタン有効化フラグ
  // TODO: FacebookはAPIが対応していないので要調査
  const isEnabledFacebookLoginButton = useMemo((): boolean => {
    return false;
  }, []);

  // アカウントに反映するボタン活性化フラグ
  const isEnabledApplyProfileIconButton = useMemo((): boolean => {
    return twitterOAuth !== null;
  }, [twitterOAuth]);

  // Twitter更新をTLに登録するフラグ更新時
  const handleChangePostChangeImage = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setIsPostChangeImage(event.currentTarget.checked);
  }, []);

  // Twitter認証コールバック
  const handleTwitterAuthCallback = useCallback((_, data: TwitterAuthResult) => {
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

  // Twitterプロファイル更新Mutation
  const { mutateAsync: updateTwitterProfile } = useUpdateTwitterProfileMutation();

  // アカウントに反映するボタン押下
  const handleClickApplyProfileIcon = useCallback(async () => {
    const result = await updateTwitterProfile({
      image: croppedImageBase64 ?? "",
      skip_status: !isPostChangeImage,
    });
    console.log(result);
  }, [croppedImageBase64, isPostChangeImage, updateTwitterProfile]);

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
            <div css={styles["twitterCheckboxContainer"]}>
              <input type="checkbox" onChange={handleChangePostChangeImage} css={styles["checkbox"]} />
              更新をタイムラインに投稿する
            </div>
          </div>
          <div css={styles["facebookContainer"]}>
            {facebookOAuth && <p css={styles["snsName"]}>{facebookOAuth.name}</p>}
            {isEnabledFacebookLoginButton ? (
              <FacebookLogin
                appId={process.env["NEXT_PUBLIC_FACEBOOK_APP_ID"] ?? ""}
                autoLoad={true}
                fields="name,picture"
                scope="public_profile"
                icon={<MdFacebook fontSize={20} />}
                cssClass="facebook-login-button"
                callback={handleFacebookAuthCallback}
              />
            ) : (
              <div
                className={isEnabledFacebookLoginButton ? "facebook-login-button" : "facebook-login-button-disabled"}
              >
                <MdFacebook fontSize={20} />
                今後対応予定🙇‍♂
              </div>
            )}
          </div>
          <div css={styles["instagramContainer"]}>
            <div className="instagram-login-button-disabled">
              <BsInstagram fontSize={20} />
              今後対応予定🙇‍♂
            </div>
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
  user-select: none;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
`;

const baseFacebookButtonStyle = css`
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
  padding: 0 16px;
  border-radius: 24px;
  svg {
    margin-right: 12px;
  }
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
  twitterCheckboxContainer: css`
    margin-top: 8px;
  `,
  checkbox: css`
    margin-right: 8px;
  `,
  snsName: css`
    font-weight: bold;
    margin-bottom: 8px;
  `,
  facebookContainer: css`
    .facebook-login-button {
      ${baseFacebookButtonStyle}

      cursor: pointer;
      background-color: #4c69ba;
    }
    .facebook-login-button-disabled {
      ${baseFacebookButtonStyle}
      background-color: #aaaaaa;
    }
  `,
  instagramContainer: css`
    text-align: center;
    ${baseFacebookButtonStyle}
    background-color: #aaaaaa;
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
