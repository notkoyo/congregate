import "./globals.css";
import { Providers } from "./providers";
import { NavigationBar } from "../components/Navigation/NavigationBar";

export const metadata = {
  title: "Congregate",
  description: "--- tbd ---",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light scrollbar-hide">
      <body>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
