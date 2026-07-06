import "./globals.css";

export const metadata = {
  title: "Stack PG Management",
  description:
    "A secure PG management webapp for owners, managers, rooms, beds, tenants, rent, payments, documents, complaints, staff, reports, and enquiries.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
