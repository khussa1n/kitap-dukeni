'use client';

import Book from '@/app/ui/book';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import getBooks from '../lib/actions/books';

type props = {
  searchParams: {
    title: string;
  };
};

export default async function BookPage({ searchParams }: props) {
  const books = await getBooks(searchParams.title ?? '');
  const bookList: Book[] = await books.json();

  return (
    <div className="w-full max-w-[2000px] flex flex-col">
      <header className="flex justify-center gap-2 my-3  text-zinc-700 text-sm">
        <Link href="/">Бастапқы бет</Link>
        <ChevronRightIcon className="w-4" />
        <span>Кітаптар саны {bookList.length}</span>
      </header>
      <div className="grid grid-cols-5 gap-4">
        {bookList.map((book, i) => (
          <div key={i} className="w-60 flex justify-center flex-shrink-0">
            <Book book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
