"use client";
import { Suspense } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LangContext.tsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body>
          <Suspense>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
}
