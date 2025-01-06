/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["sequelize", "pg", "pg-hstore"],
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
    ];
    return config;
  },
};

export default nextConfig;
