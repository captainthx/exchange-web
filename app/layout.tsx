import NavBar from "@/components/NavBar";
import "./globals.css";
import { Providers } from "./providers";
import SessionProvider from "./SessionProviders";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className="light">
          <Providers>
            <header>
              <NavBar />
            </header>
            <main className="container mx-auto">{children}</main>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
