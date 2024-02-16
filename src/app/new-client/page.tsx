import { Box, Flex, Heading } from '@chakra-ui/react';
import { AddClientForm } from '@/modules/clients/components';

export default function NewClientPage() {
  return (
    <Flex flexDir="column" gap={6} height="100%" width="100%">
      <Heading as="h1" size="lg" color="gray.600">
        Add new client
      </Heading>
      <Box maxW="md">
        <AddClientForm />
      </Box>
    </Flex>
  );
}
