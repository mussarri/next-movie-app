/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "https://image.tmdb.org/",
      "https://api.themoviedb.org/",
      "image.tmdb.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/thefulcrum.ca/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
    ],
  },
};

module.exports = nextConfig;
