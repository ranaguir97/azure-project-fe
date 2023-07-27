/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BE_API:process.env.BE_API
    },
    output: 'standalone'
}

module.exports = nextConfig
