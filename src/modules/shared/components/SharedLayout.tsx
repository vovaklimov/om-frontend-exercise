'use client';

import { FC, PropsWithChildren } from 'react';
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useAuthenticationStoreActions, useIsLoggedIn } from '@/modules/authentication';
import { useRouter } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';

export const CommonLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();
  const authActions = useAuthenticationStoreActions();
  const router = useRouter();

  const handleLogout = () => {
    authActions.logout();
    router.push('/');
  };

  return (
    <Grid
      gridTemplateRows="auto 1fr auto"
      height="100dvh"
      minW="sm"
      // maxW="container.xl"
      margin="0 auto"
      overflowX="auto"
    >
      <GridItem as="header" p={4} display="flex" justifyContent="center" boxShadow="xs" zIndex={10}>
        <Flex maxW="container.xl" width="100%" justifyContent="space-between">
          <Link
            href="/"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Heading size="lg" color="teal">
              Fiction company
            </Heading>
          </Link>
          {isLoggedIn ? (
            <Button variant="solid" onClick={handleLogout} rightIcon={<ArrowForwardIcon />}>
              Log Out
            </Button>
          ) : (
            <Button variant="solid" onClick={authActions.login} colorScheme="teal">
              Log In
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem as="main" p={4} overflowY="auto" display="flex" justifyContent="center">
        <Flex maxW="container.xl" width="100%">
          {isLoggedIn ? children : <UnauthenticatedMessage />}
        </Flex>
      </GridItem>
      <GridItem display="flex" as="footer" boxShadow="xs" zIndex={10} justifyContent="center">
        <Flex maxW="container.xl" width="100%" px={4} py={6}>
          <Text color="gray.500" fontWeight="bold">
            &copy; 2024 Fiction Company
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

function UnauthenticatedMessage() {
  return (
    <Flex width="100%" height="100%" alignItems="center" justifyContent="center">
      <Heading size="lg" color="gray.500" textAlign="center">
        Please log in to see the content...
      </Heading>
    </Flex>
  );
}
