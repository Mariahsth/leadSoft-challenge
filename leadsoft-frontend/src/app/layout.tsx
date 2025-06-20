import type { Metadata } from "next";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import RecaptchaProviderWrapper from "../components/RecaptchaProviderWrapper";

import { Roboto } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "LeadIA",
  description: "Generated by create next app",
};

const roboto = Roboto({ subsets: ["latin"], weight: "400", variable: "--font-roboto" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400", variable: "--font-roboto-mono" });
const nasalization = localFont({ src: "../fonts/nasalization-rg.otf", variable: "--font-nasalization" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${robotoMono.variable} ${nasalization.variable}`}>
      <body>
        <RecaptchaProviderWrapper>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </RecaptchaProviderWrapper>
      </body>
    </html>
  );
}
