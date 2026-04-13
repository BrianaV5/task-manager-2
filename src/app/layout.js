//Component: RootLayout
//Purpose: Wraps every page in the app and applies the global stylesheet
//Type: Server Component
//Props: children- page content rendered inside body

import "./globals.css";

export const metadata = {
  title: 'Task Manager',
  description: 'A pink task manager built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
