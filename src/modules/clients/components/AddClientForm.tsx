'use client';

import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type CreateClientInput, createClientSchema } from '../schemas/add-client-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/modules/shared/components';

interface AddClientFormProps {
  onSubmit: (data: CreateClientInput) => Promise<void>;
}

export const AddClientForm: FC<AddClientFormProps> = ({ onSubmit }) => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
  });

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Flex flexDir="column" gap={4}>
        <InputField
          label="First Name"
          placeholder="John"
          {...register('firstName')}
          isInvalid={Boolean(errors.firstName)}
          errorMessage={errors.firstName?.message}
        />
        <InputField
          label="Last Name"
          placeholder="Doe"
          {...register('lastName')}
          isInvalid={Boolean(errors.lastName)}
          errorMessage={errors.lastName?.message}
        />

        <InputField
          label="Email"
          placeholder="example@mail.com"
          {...register('email')}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />

        <InputField
          label="Birth Date"
          {...register('birthDate')}
          type="date"
          isInvalid={Boolean(errors.birthDate)}
          errorMessage={errors.birthDate?.message}
        />

        <Flex gap={4} justifyContent="end">
          <Button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button isLoading={isSubmitting} disabled={isSubmitting} colorScheme="teal" type="submit">
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
