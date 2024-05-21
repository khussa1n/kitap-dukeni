// 'use server';

export default async function getBooks(title: string): Promise<Response> {
  const url = `https://9198d328877fcbec.mokky.dev/books?title=*${title}*`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}
