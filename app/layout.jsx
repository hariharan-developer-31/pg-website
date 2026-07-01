import "./globals.css";

export const metadata = {
  title: "Stack PG Management",
  description:
    "A secure PG management webapp for owners, managers, rooms, beds, tenants, rent, payments, documents, complaints, staff, reports, and enquiries."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
