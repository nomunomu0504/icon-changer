/**
 * ESLint Configuration
 */
/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  root: true,
  extends: ["next", "next/core-web-vitals", "prettier"],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  rules: {
    // custom
    "react/display-name": "off",
    "@next/next/no-img-element": "off"
  },
};

module.exports = config;
