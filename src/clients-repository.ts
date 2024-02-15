import { Client } from './types';

export class ClientsRepository {
  private id = 0;
  private nextId(): number {
    return ++this.id;
  }

  private clients: Client[] = [
    {
      id: this.nextId(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: '1990-01-01T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      birthDate: '1991-02-02T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smith@example.com',
      birthDate: '1992-03-03T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      birthDate: '1993-04-04T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie.brown@example.com',
      birthDate: '1994-05-05T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
      birthDate: '1995-06-06T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Emily',
      lastName: 'Miller',
      email: 'emily.miller@example.com',
      birthDate: '1996-07-07T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Frank',
      lastName: 'Davis',
      email: 'frank.davis@example.com',
      birthDate: '1997-08-08T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Grace',
      lastName: 'Wilson',
      email: 'grace.wilson@example.com',
      birthDate: '1998-09-09T00:00:00.000Z',
    },
    {
      id: this.nextId(),
      firstName: 'Harry',
      lastName: 'Taylor',
      email: 'harry.taylor@example.com',
      birthDate: '1999-10-10T00:00:00.000Z',
    },
  ];

  async all(): Promise<Client[]> {
    return Promise.resolve(this.clients);
  }

  create(client: Omit<Client, 'id'>): Promise<void> {
    this.clients.push({ id: this.nextId(), ...client });

    return Promise.resolve();
  }
}

const clientsRepositorySingleton = () => new ClientsRepository();

declare global {
  var clientsRepository: ClientsRepository;
}

const clientsRepository = global.clientsRepository ?? clientsRepositorySingleton();

export default clientsRepository;

if (process.env.NODE_ENV !== 'production') {
  globalThis.clientsRepository = clientsRepository;
}
