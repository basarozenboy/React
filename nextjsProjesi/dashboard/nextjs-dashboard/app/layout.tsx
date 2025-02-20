import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
