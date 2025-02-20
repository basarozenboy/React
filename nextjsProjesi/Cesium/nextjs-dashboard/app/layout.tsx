import "@/app/ui/global.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
