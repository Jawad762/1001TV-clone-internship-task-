import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import ReactQueryProvider from "@/app/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "1001TV",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full overflow-x-hidden">
        <ReactQueryProvider>
          <main className="h-full w-full">
            <Header/>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
