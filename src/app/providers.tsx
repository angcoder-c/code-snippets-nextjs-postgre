'use client'

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { getSession } from "@/app/lib/auth";

export default function Providers({
    session,
    children
}:{
    session : Session | null,
    children: React.ReactNode
}) {
    return (
        <SessionProvider session={session}>
            { children }
        </SessionProvider>
    )
}