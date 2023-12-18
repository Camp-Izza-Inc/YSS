import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export const metadata = {
  title: "Youth Spiritual Summit",
  description: "A Next.js application for the Youth Spiritual Summit program",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
