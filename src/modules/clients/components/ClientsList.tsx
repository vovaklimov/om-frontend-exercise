import clientsRepository from '@/clients-repository';
import { Box, Flex } from '@chakra-ui/react';
import { ClientCard } from './ClientCard';

export const ClientsList = async () => {
  const clients = await clientsRepository.all();

  return (
    <Flex
      gap={4}
      wrap="wrap"
      alignItems="center"
      pb={4}
      justifyContent={{
        base: 'center',
        md: 'flex-start',
      }}
    >
      {clients.map((client) => (
        <Box flexShrink="none" key={client.id}>
          <ClientCard client={client} />
        </Box>
      ))}
    </Flex>
  );
};
