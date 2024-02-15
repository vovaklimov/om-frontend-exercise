'use server';

import clientsRepository from '@/clients-repository';
import { Client } from '@/types';
import { redirect } from 'next/navigation';

export const addClient = async (client: Omit<Client, 'id'>) => {
  await clientsRepository.create(client);

  redirect('/');
};
