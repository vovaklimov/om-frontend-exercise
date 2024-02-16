import { Flex, Heading } from '@chakra-ui/react';
import { AddClientButton, ClientsList } from '@/modules/clients/components';

export default async function Home() {
  return (
    <Flex flexDir="column" gap={6} height="100%">
      <Flex alignItems="center" gap={4}>
        <Heading color="gray.600" as="h1" size="lg">
          Clients
        </Heading>
        <AddClientButton />
      </Flex>
      <ClientsList />
    </Flex>
  );
}
