/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BE_API: "mongo-azure-devops.azurewebsites.net"
    },
    output: 'standalone'
}

module.exports = nextConfig
