'use client';

import { addClient } from './actions';

export const AddClient = () => {
  return (
    <button
      onClick={() =>
        addClient({
          firstName: 'Vova',
          lastName: 'Klimov',
          email: 'vklimv@gmail.com',
          birthDate: new Date().toISOString(),
        })
      }
    >
      Add Client
    </button>
  );
};
