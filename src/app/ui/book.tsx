'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, Suspense } from 'react';

export default function Book({ book }: { book: Book }) {
  const router = useRouter();

  const handleLinkClick = () => {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    router.push(`/books/${book.isbn}`);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the parent div's onClick event from firing
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    if (basket.some((item: Book) => item.isbn === book.isbn)) {
      alert('Кітап қазірдің өзінде себетте');
      return;
    }
    basket.push({ ...book, quantity: 1 });
    localStorage.setItem('basket', JSON.stringify(basket));
    alert('Кітап себетке қосылды');
  };

  return (
    <div
      onClick={handleLinkClick}
      className="p-2 flex flex-col w-60 truncate gap-2 justify-center items-center cursor-pointer hover:bg-slate-200 transition-colors duration-200 hover:shadow-xl"
    >
      <Suspense
        fallback={
          <Image
            src={'/book2.jpg'}
            blurDataURL="/book2.jpg"
            alt={book.title}
            width={140}
            height={200}
            priority
          />
        }
      >
        <Image
          src={book.thumbnailUrl}
          blurDataURL="/book2.jpg"
          alt={book.title}
          width={140}
          height={200}
          priority
        />
      </Suspense>
      <div className="flex flex-col gap-0.5 justify-center items-center">
        <p className="text-sky-600 line-clamp-1 w-60 text-center truncate">{book.title}</p>
        <div className="text-sky-600 flex gap-1 truncate">{book.authors[0]}</div>
        <span className="text-orange-600">
          {book.value} <span>&#8376;</span>
        </span>
      </div>
      <button
        onClick={handleButtonClick}
        className="py-1 px-12 mt-2 rounded bg-yellow-400 text-white"
      >
        Себетке
      </button>
    </div>
  );
}
