import Sidebar from "@/components/semantic/Sidebar";
import Statistics from "@/components/Statistitcs";
import Main from "@/components/semantic/Main";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins(
  {
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
  }
);

export const metadata: Metadata = {
  title: "Vacancy Portal",
  description: "Your one-stop solution for job listings and applications.",
  keywords: [
    "jobs",
    "vacancy",
    "careers",
    "job portal",
    "employment",
    "hiring",
    "applications"
  ],
  authors: [{ name: "Vacancy Portal Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <div className="flex">
          <Sidebar />
          <Main>
            {children}
          </Main>
          <Statistics />
        </div>
      </body>
    </html>
  );
}
