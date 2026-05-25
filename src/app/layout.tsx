import "./globals.css";
import "@/styles/theme/colors.css";
import "@/styles/theme/typography.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}