import NavBar from "@/components/NavBar";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
