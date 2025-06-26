import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { checkUserExists, createUser } from "./app/lib/actions";

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
        },
        async signIn({ user }){
            try {
                const existingUser = await checkUserExists(user.email)
                
                if (!existingUser) {
                    if (user.name && user.email) {
                        const newUser = {
                            name: user.name,
                            email: user.email,
                            image: user.image || null
                        }
                        await createUser(newUser)
                    }
                }
                return true
            } catch (error) {
                console.error("Login error: ", error.message)
                return false
            }
        },
    },
}