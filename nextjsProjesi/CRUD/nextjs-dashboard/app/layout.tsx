import "@/app/ui/global.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
