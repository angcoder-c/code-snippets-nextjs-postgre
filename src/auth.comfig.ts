import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions : AuthOptions = {
    providers : [
        GithubProvider({
            clientId : process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string
        }) 
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            
            if (url.includes("callbackUrl=")) {
                const originalUrl = decodeURIComponent(url.split("callbackUrl=")[1]);
                return originalUrl;
            }
            
            return baseUrl
        }
    },
}