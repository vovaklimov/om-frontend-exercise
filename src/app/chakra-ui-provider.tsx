'use client';

import { FC, PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export const ChakraUiProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
