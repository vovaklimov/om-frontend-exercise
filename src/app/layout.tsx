import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ChakraUiProvider } from './chakra-ui-provider';
import { AuthenticationStoreProvider } from '@/modules/authentication';
import { CommonLayout } from '@/modules/shared/components';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fiction company clients',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraUiProvider>
          <AuthenticationStoreProvider>
            <CommonLayout>{children}</CommonLayout>
          </AuthenticationStoreProvider>
        </ChakraUiProvider>
      </body>
    </html>
  );
}
