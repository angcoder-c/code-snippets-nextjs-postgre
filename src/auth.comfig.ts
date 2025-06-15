import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions : AuthOptions = {
    pages :{ 
        signIn : '/'
    },
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
    },
}