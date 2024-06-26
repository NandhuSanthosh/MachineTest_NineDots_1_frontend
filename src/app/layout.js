import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="h-screen bg-gray-100
      flex
      ">
        <Sidebar />
        <div className='h-screen flex flex-col w-full'>
          <Header />
          {children}
        </div>
      </main>
      </body>
    </html>
  );
}
