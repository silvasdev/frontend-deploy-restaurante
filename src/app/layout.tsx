import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Toaster } from "sonner"; 


export const metadata: Metadata = {
  title: "Hotel Paraiso Perdido",
  description: "Aconchegante hotel para seu lazer e descanso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >

        <Toaster 

        position="bottom-right"
        toastOptions={{
          style:{
            backgroundColor: "	#FFFF00",
            color: "#000",
            borderColor: "rgba 255, 255, 255, 0.5"
          }
        }}
        
        />

        {children}
      </body>
    </html>
  );
}
