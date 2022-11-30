import "./globalStyles.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ModalProvider } from "../context/ModalContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head />
      <body>
        <ModalProvider>
          <Header />
          <div className="layout">
            <Sidebar />
            <main>{children}</main>
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
