import "./globals.css";
import { getSession } from "@/app/lib/auth";
import Providers from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
      className="bg-gray-200 border-3 border-black min-h-dvh max-w-200 justify-center items-center m-auto sm:w-full"
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
