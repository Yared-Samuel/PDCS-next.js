import "./globals.css";
import Navbar from "./components/Navbar";
import { Roboto } from 'next/font/google'


export const metadata = {
  title: "Payment Delivery control system",
  description: "Generated by create next app",
};

const roboto = Roboto({  weight: '400',
  subsets: ['latin'], })

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-theme="nord" >
      <body className={roboto.className}>
        <div className="flex flex-col bg-[#4d8076] font-serif h-screen overflow-x-hidden">
      <Navbar />

      <div className="w-full px-3">
        {children}
      </div>
      </div>
        </body>
    </html>
  );
}
