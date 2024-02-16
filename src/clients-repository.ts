import { sleep } from './lib/sleep';
import { Client } from './types';

export const clientsSeed = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    birthDate: '1990-01-01T00:00:00.000Z',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    birthDate: '1991-02-02T00:00:00.000Z',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    birthDate: '1992-03-03T00:00:00.000Z',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    birthDate: '1993-04-04T00:00:00.000Z',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    birthDate: '1994-05-05T00:00:00.000Z',
  },
  {
    firstName: 'David',
    lastName: 'Williams',
    email: 'david.williams@example.com',
    birthDate: '1995-06-06T00:00:00.000Z',
  },
  {
    firstName: 'Emily',
    lastName: 'Miller',
    email: 'emily.miller@example.com',
    birthDate: '1996-07-07T00:00:00.000Z',
  },
  {
    firstName: 'Frank',
    lastName: 'Davis',
    email: 'frank.davis@example.com',
    birthDate: '1997-08-08T00:00:00.000Z',
  },
  {
    firstName: 'Grace',
    lastName: 'Wilson',
    email: 'grace.wilson@example.com',
    birthDate: '1998-09-09T00:00:00.000Z',
  },
  {
    firstName: 'Harry',
    lastName: 'Taylor',
    email: 'harry.taylor@example.com',
    birthDate: '1999-10-10T00:00:00.000Z',
  },
] as const satisfies Omit<Client, 'id'>[];

export class ClientsRepository {
  private id = 0;
  private nextId(): number {
    return ++this.id;
  }
  private clients: Client[];

  constructor(initialClients: Omit<Client, 'id'>[] = []) {
    this.clients = initialClients.map((client) => ({ id: this.nextId(), ...client }));
  }

  async all(): Promise<Client[]> {
    // Simulate a network request delay
    await sleep(300);
    return Promise.resolve(this.clients);
  }

  async create(client: Omit<Client, 'id'>): Promise<void> {
    // Simulate a network request delay
    await sleep(300);
    this.clients.push({ id: this.nextId(), ...client });

    return Promise.resolve();
  }
}

const clientsRepositorySingleton = () => new ClientsRepository(clientsSeed);

declare global {
  var clientsRepository: ClientsRepository;
}

const clientsRepository = global.clientsRepository ?? clientsRepositorySingleton();

export default clientsRepository;

if (process.env.NODE_ENV !== 'production') {
  globalThis.clientsRepository = clientsRepository;
}
