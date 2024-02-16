import { FC } from 'react';
import { Box, Card, CardBody, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Client } from '@/types';
import { formatDate } from '@/lib/format-date';

interface ClientCardProps {
  client: Client;
}

export const ClientCard: FC<ClientCardProps> = ({ client }) => {
  return (
    <Card minW="xs" maxW="sm" variant="outline">
      <CardBody>
        <Stack spacing="3">
          <Flex alignItems="baseline">
            <Text fontSize="xl" fontWeight="semibold">
              {client.firstName} {client.lastName}
              <Text as="span" fontSize="sm" color="gray.500" fontWeight="semibold">
                #{client.id}
              </Text>
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
