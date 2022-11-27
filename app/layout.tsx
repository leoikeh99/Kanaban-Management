import "./globalStyles.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head />
      <body>
        <Header />
        <div className="layout">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
