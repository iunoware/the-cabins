import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Cabins",
  description: "The Cabins",
  icons: {
    icon: "/images/logo.jpeg", // Points to public/icon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "min-w-xs w-fit select-none flex p-3 gap-3 justify-start items-center rounded-lg shadow-lg",
              title: "line-clamp-3",
            },
          }}
        />
      </body>
    </html>
  );
}
