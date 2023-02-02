import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-02-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_TOKEN,
});

export default client;
