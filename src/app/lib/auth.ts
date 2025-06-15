import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.comfig";

export const getSession = () => getServerSession(authOptions)
