import clientsRepository from '@/clients-repository';

export default async function Home() {
  const clients = await clientsRepository.all();

  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          {client.firstName} {client.lastName}
        </li>
      ))}
    </ul>
  );
}
