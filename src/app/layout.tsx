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
      <body className="bg-black text-white">  
          <Providers session={session}>
            <main className="border-3 border-white min-h-dvh max-w-200 justify-center items-center m-auto sm:w-full px-3 md:px-0">
              {children}
            </main>
          </Providers>
      </body>
    </html>
  );
}
