/**
 * Next Configuration
 */
/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
const config = (_phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    reactStrictMode: true,
    eslint: {
      dirs: ["src/pages"],
    },
  };
};

module.exports = config;
