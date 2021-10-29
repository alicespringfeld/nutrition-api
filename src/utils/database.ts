import { MongoClient } from 'mongodb';

// vergibt Typen für die Variable Client
let client: MongoClient;

//Parameter URL darf nur strin sein
export async function connectDatabase(url: string) {
  client = new MongoClient(url);
  await client.connect();
}

export function getFoodCollection() {
  return client.db().collection('food');
}
