import { Box, Flex, Heading } from '@chakra-ui/react';
import { AddClientForm } from '@/modules/clients/components';
import { addClient } from '@/modules/clients/actions';

export default function NewClientPage() {
  return (
    <Flex flexDir="column" gap={6} height="100%" width="100%">
      <Heading as="h1" size="lg" color="gray.700">
        Add new client
      </Heading>
      <Box maxW="md">
        <AddClientForm onSubmit={addClient} />
      </Box>
    </Flex>
  );
}
