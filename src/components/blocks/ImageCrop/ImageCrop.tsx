import React, { useCallback, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { css } from "@emotion/react";
import "react-image-crop/dist/ReactCrop.css";
import ReactLoading from "react-loading";
import { MdClose, MdDone } from "react-icons/md";

type Props = {
  baseSrc?: string;
  cropOption?: Crop;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  hasPreview?: boolean;
  onSelectFile?: () => void;
  onLoadImage?: () => void;
  onCropComplete: (base64: string) => void;
};

export const ImageCrop: React.VFC<Props> = React.memo(
  ({
    baseSrc = null,
    cropOption = { unit: "px", x: 0, y: 0, width: 200, height: 200, aspect: 1 } as Crop,
    minWidth = 0,
    minHeight = 0,
    maxWidth = Number.POSITIVE_INFINITY,
    maxHeight = Number.POSITIVE_INFINITY,
    hasPreview = true,
    onSelectFile,
    onLoadImage,
    onCropComplete,
  }): JSX.Element => {
    const [src, setSrc] = useState<string | null>(baseSrc);
    const [crop, setCrop] = useState<Crop>(cropOption);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    // 画像読み込みフラグ
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

    // 画像選択時
    const handleSelectFile = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (typeof reader.result === "string") {
              setSrc(reader.result);
              setIsImageLoading(false);
            }
          });
          reader.readAsDataURL(event.currentTarget.files[0]!);
          onSelectFile && onSelectFile();
          setIsImageLoading(true);
        }
      },
      [onSelectFile]
    );

    // 画像読み込み後
    const handleImageLoaded = useCallback(
      (image: HTMLImageElement): void => {
        setImageRef(image);
        onLoadImage && onLoadImage();
      },
      [onLoadImage]
    );

    // Crop変更時
    const handleChangeCrop = useCallback((crop: Crop): void => {
      setCrop(crop);
    }, []);

    // キャンセルボタン押下時
    const handleClickCancelButton = useCallback(() => {
      setSrc(null);
      setCrop(cropOption);
      setImageRef(null);
    }, [cropOption]);

    // 確定ボタン押下時
    const handleClickDoneButton = useCallback(() => {
      if (imageRef) {
        const canvas = document.createElement("canvas");
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d")!;

        console.log(imageRef,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height)
        ctx.drawImage(
          imageRef,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        const base64 = canvas.toDataURL("image/png");
        onCropComplete(base64);
      }
      setSrc(null);
      setCrop(cropOption);
      setImageRef(null);
    }, [crop, cropOption, imageRef, onCropComplete]);

    return (
      <div css={styles["container"]}>
        <div css={styles["cropContainer"]}>
          {isImageLoading ? (
            <ReactLoading type="spin" color="#57BED3" width={100} height={100} />
          ) : (
            <>
              {src ? (
                <>
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    circularCrop={true}
                    keepSelection={true}
                    minWidth={minWidth}
                    minHeight={minHeight}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    onImageLoaded={handleImageLoaded}
                    onChange={handleChangeCrop}
                  />
                  <div css={styles["submitButtonContainer"]}>
                    <button type="button" css={styles["cancelButton"]} onClick={handleClickCancelButton}>
                      <MdClose fontSize={24} />
                      キャンセル
                    </button>
                    <button type="button" css={styles["submitButton"]} onClick={handleClickDoneButton}>
                      <MdDone fontSize={24} />
                      確定
                    </button>
                  </div>
                </>
              ) : (
                <>
                <div css={hasPreview ? styles["inputContainer"] : styles["emptyPreviewInputContainer"]}>
                  <label css={styles["inputLabel"]}>
                    写真を選択する
                    <input type="file" accept="image/*" onChange={handleSelectFile} css={styles["fileInput"]} />
                  </label>
                </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

const baseButtonStyle = css`
  width: 160px;
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

const baseInputContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const styles = {
  container: css``,
  cropContainer: css``,
  submitButtonContainer: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
  `,
  cancelButton: css`
    ${baseButtonStyle}
    color: #ffffff;
    background-color: #888888;
  `,
  submitButton: css`
    ${baseButtonStyle}
    color: #ffffff;
    background-color: #57bed3;
  `,
  emptyPreviewInputContainer: css`
    height: 300px;
    ${baseInputContainer}
  `,
  inputContainer: css`
    ${baseInputContainer}
    margin: 16px 0;
  `,
  inputLabel: css`
    display: inline-block;
    position: relative;
    background: #666;
    color: #fff;
    font-size: 16px;
    padding: 10px 18px;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
      background: #888;
      transition: all 0.4s;
    }
  `,
  fileInput: css`
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  `,
};
