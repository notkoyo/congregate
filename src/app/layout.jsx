import "./globals.css";
import { Providers } from "./providers";
import { NavigationBar } from "../components/Navigation/NavigationBar";
import LoginContextProvider from "@/components/loginContext";
import Footer from "@/components/footer";

export const metadata = {
  title: "Congregate",
  description: "--- tbd ---",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light scrollbar-hide">
      <body>
        <LoginContextProvider>
          <Providers>
            <NavigationBar />
            {children}
            <Footer />
          </Providers>
        </LoginContextProvider>
      </body>
    </html>
  );
}
