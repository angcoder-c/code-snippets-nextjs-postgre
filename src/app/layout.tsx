import "./globals.css";
import { getSession } from "@/app/lib/auth";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="overflow-y-scroll bg-gray-900">  
          <Providers session={session}>
            {/* border-3 border-white */}
            <main className="min-h-dvh pt-5 max-w-200 justify-center items-center m-auto sm:w-full px-3 md:px-2">
              {children}
              <Toaster position="bottom-center"/>
            </main>
          </Providers>
      </body>
    </html>
  );
}
