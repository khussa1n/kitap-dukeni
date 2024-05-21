import { philosophicalBooks } from '@/app/lib/data/philosophicalBooks';
import Book from '@/app/ui/book';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center gap-2 my-3 -ml-28 text-zinc-700 text-sm">
        <Link href="/">Бастапқы бет</Link>
        <ChevronRightIcon className="w-4" />
        <span>Философия</span>
      </div>
      <div className="grid grid-cols-5 m-5">
        {philosophicalBooks.map((book, i) => (
          <div key={i} className="w-64 flex justify-center flex-shrink-0">
            <Book book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
