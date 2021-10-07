import React, { useCallback, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { css } from "@emotion/react";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  baseSrc?: string;
  cropOption?: Crop;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onCropComplete: (base64: string) => void;
};

export const ImageCrop: React.VFC<Props> = React.memo(
  ({
    baseSrc = null,
    cropOption = { unit: "px", x: 0, y: 0, width: 400, height: 400, aspect: 1 } as Crop,
    minWidth = 0,
    minHeight = 0,
    maxWidth = Number.POSITIVE_INFINITY,
    maxHeight = Number.POSITIVE_INFINITY,
    onCropComplete,
  }): JSX.Element => {
    const [src, setSrc] = useState<string | null>(baseSrc);
    const [crop, setCrop] = useState<Crop>(cropOption);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    // 画像選択時
    const handleSelectFile = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
      if (event.currentTarget.files && event.currentTarget.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            setSrc(reader.result);
          }
        });
        reader.readAsDataURL(event.currentTarget.files[0]!);
      }
    }, []);

    // 画像読み込み後
    const handleImageLoaded = useCallback((image: HTMLImageElement): void => {
      setImageRef(image);
    }, []);

    // Crop変更時
    const handleChangeCrop = useCallback((crop: Crop): void => {
      setCrop(crop);
    }, []);

    // Crop完了時
    const handleCompleteCrop = useCallback(
      (crop: Crop): void => {
        if (imageRef) {
          const canvas = document.createElement("canvas");
          const scaleX = imageRef.naturalWidth / imageRef.width;
          const scaleY = imageRef.naturalHeight / imageRef.height;
          canvas.width = crop.width;
          canvas.height = crop.height;
          const ctx = canvas.getContext("2d")!;
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
      },
      [imageRef, onCropComplete]
    );

    return (
      <div css={styles["container"]}>
        <div css={styles["cropContainer"]}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              minWidth={minWidth}
              minHeight={minHeight}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              onImageLoaded={handleImageLoaded}
              onChange={handleChangeCrop}
              onComplete={handleCompleteCrop}
            />
          )}
        </div>
        <div css={styles["inputContainer"]}>
          <input type="file" accept="image/*" onChange={handleSelectFile} />
        </div>
      </div>
    );
  }
);

const styles = {
  container: css``,
};
