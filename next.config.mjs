/** @type {import('next').NextConfig} */
const nextConfig = {
    secret:process.env.NEXTAUTH_SECRET,
    reactStrictMode: false,
    distDir: 'dist',
    
};

export default nextConfig;
