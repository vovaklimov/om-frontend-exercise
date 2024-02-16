import { FC, PropsWithChildren } from 'react';
import { Box, Card, CardBody, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Client } from '@/types';
import { formatDate } from '@/lib/format-date';

interface ClientCardProps {
  client: Client;
}

const ClientId: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <Text as="span" fontSize="sm" color="gray.500" fontWeight="semibold">
    #{children}
  </Text>
);

export const ClientCard: FC<ClientCardProps> = ({ client }) => {
  return (
    <Card minW="xs" maxW="sm" variant="outline" rounded="xl">
      <CardBody>
        <Stack spacing="3" color="gray.600">
          <Flex alignItems="baseline">
            <Text fontSize="xl" fontWeight="semibold" color="gray.700">
              {client.firstName} {client.lastName}
              <ClientId>{client.id}</ClientId>
            </Text>
          </Flex>
          <Stack spacing="1">
            <Flex flexDir="column">
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Email
              </Text>
              <Text>{client.email}</Text>
            </Flex>
            <Flex flexDir="column">
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Birth Date
              </Text>
              <Text>{formatDate(client.birthDate)}</Text>
            </Flex>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
