'use client';

import { FC } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export const AddClientButton: FC = () => {
  return (
    <Tooltip rounded="lg" label="Add new client" hasArrow>
      <IconButton
        size="sm"
        as={Link}
        href="/new-client"
        colorScheme="teal"
        icon={<AddIcon />}
        aria-label="Add client"
      />
    </Tooltip>
  );
};
