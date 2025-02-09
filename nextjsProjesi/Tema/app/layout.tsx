import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} antialiased`}>
          <PrimeReactProvider>{children}</PrimeReactProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
