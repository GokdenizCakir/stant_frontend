import TransitionComponent from "./_components/transition";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kim Milyoner Olmak İster?",
  description: "YTU'lüler için hazırlanmış bir yarışma.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b overflow-hidden from-sky-950 to-slate-950 bg-fixed">
        <TransitionComponent>{children}</TransitionComponent>
      </body>
    </html>
  );
}
