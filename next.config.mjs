/** @type {import('next').NextConfig} */
const nextConfig = {
    secret:process.env.NEXTAUTH_SECRET,
    reactStrictMode: false,
    distDir: 'dist',
    experimental: {
        turbo: {
          resolveExtensions: [
            '.mdx',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
            '.mjs',
            '.json',
          ],
        }
    }
};

export default nextConfig;
