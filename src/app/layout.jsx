import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Congregate",
  description: "--- tbd ---",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light scrollbar-hide">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
