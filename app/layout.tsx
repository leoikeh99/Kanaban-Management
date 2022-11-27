import "./globalStyles.css";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head />
      <body>
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
