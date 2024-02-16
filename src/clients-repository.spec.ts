import { ClientsRepository, clientsSeed } from './clients-repository';

describe('ClientsRepository', () => {
  let repository: ClientsRepository;

  beforeEach(() => {
    repository = new ClientsRepository();
  });

  it('should return correct number of clients', async () => {
    const initialClients = [clientsSeed[0], clientsSeed[1]];
    repository = new ClientsRepository(initialClients);

    const clients = await repository.all();

    expect(clients).toHaveLength(initialClients.length);
  });

  it('should add new client', async () => {
    const newClient = clientsSeed[0];

    await repository.create(newClient);

    const clients = await repository.all();

    expect(clients).toHaveLength(1);
    expect(clients[0]).toHaveProperty('id');
    expect(clients[0]).toMatchObject(newClient);
  });

  it('should assign sequential unique ids to clients', async () => {
    await repository.create(clientsSeed[0]);
    await repository.create(clientsSeed[1]);

    const [client1, client2] = await repository.all();

    expect(client1).toHaveProperty('id', 1);
    expect(client2).toHaveProperty('id', 2);
  });
});
