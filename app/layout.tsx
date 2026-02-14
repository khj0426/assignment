import type { Metadata, Viewport } from 'next';
import { GlobalHeader } from './components/global-header';
import './globals.css';
import { Providers } from './provider-groups/providers';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Assignment',
  description: 'Assignment App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <Providers>
          <main id="app-wrapper">
            <GlobalHeader />
            <div id="app-content">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
