import React from "react";
import Link from "next/link";
import { css } from "@emotion/react";

export const Header: React.VFC = React.memo((): JSX.Element => {
  return (
    <header css={styles["container"]}>
      <div css={styles["logoContainer"]}>
        <Link href="/">
          <a css={styles["logoLink"]}>
            <img alt="" src="/img/logo_transparent.png" css={styles["logo"]} />
            <h3 css={styles["logoText"]}>ImageChanger</h3>
          </a>
        </Link>
      </div>
      <nav css={styles["navigation"]}>
        <ul css={styles["linkContainer"]}>
          <li>
            <Link href="">
              <a css={styles["link"]}>トップ</a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a css={styles["link"]}>このサイトについて</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    header: 56px;
    position: sticky;
    top: 0;
    padding: 0 16px;
    background-color: #ffffff;
    box-shadow: 0px 2px 2px gray;
  `,
  logoContainer: css``,
  logoLink: css`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  logo: css`
    height: 56px;
    width: auto;
    margin-right: 8px;
  `,
  logoText: css``,
  navigation: css``,
  linkContainer: css`
    display: flex;
    gap: 16px;
    list-style: none;
    margin: 0;
  `,
  link: css`
    cursor: pointer;
    font-weight: bold;
    color: #33618B;
    &:hover {
      color: #CD648C;
    }
  `,
};
