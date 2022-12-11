import "./globalStyles.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ModalProvider } from "@/context/ModalContext";
import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head />
      <body>
        <SettingsProvider>
          <ModalProvider>
            <Header />
            <div className="layout">
              <Sidebar />
              <main>{children}</main>
            </div>
          </ModalProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
