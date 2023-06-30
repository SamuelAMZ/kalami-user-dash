import "../styles/index.min.css";
import "../styles/tailwind.css";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Kalami - Dashboard",
  description: "kalami.ai website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={urbanist.className}>
      <body>
        <div className="notif"></div>
        {children}
      </body>
    </html>
  );
}
