'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Book = {
  isbn: string;
  title: string;
  authors: string[];
  thumbnailUrl: string;
  value: number;
  quantity: number;
};

export default function BasketPage() {
  const [basket, setBasket] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasket(storedBasket);
  }, []);

  useEffect(() => {
    const total = basket.reduce((sum, book) => sum + (book.value * book.quantity || 0), 0);
    setTotal(total);
  }, [basket]);

  const updateQuantity = (isbn: string, delta: number) => {
    const updatedBasket = basket.map((book) =>
      book.isbn === isbn ? { ...book, quantity: Math.max(1, book.quantity + delta) } : book,
    );
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const removeBook = (isbn: string) => {
    const updatedBasket = basket.filter((book) => book.isbn !== isbn);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 mt-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Себет</h1>
      <div className="flex flex-col gap-4">
        {basket.map((book, index) => (
          <div key={book.isbn} className="flex items-center gap-4 border-b pb-4">
            <span>{index + 1}</span>
            <Suspense
              fallback={
                <Image
                  src={'/book2.jpg'}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="w-20 h-30 object-cover"
                />
              }
            >
              <Image
                src={book.thumbnailUrl}
                alt={book.title}
                width={80}
                height={120}
                className="w-20 h-30 object-cover"
              />
            </Suspense>
            <div className="flex-grow">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm text-zinc-800">Авторы: {book.authors.join(', ')}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => updateQuantity(book.isbn, -1)} className="px-2 py-1 border">
                -
              </button>
              <span className="px-2">{book.quantity}</span>
              <button onClick={() => updateQuantity(book.isbn, 1)} className="px-2 py-1 border">
                +
              </button>
            </div>
            <span className="text-lg">{book.value} &#8376;</span>
            <button onClick={() => removeBook(book.isbn)} className="text-red-500 ml-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.293 9.707a1 1 0 010-1.414L9.586 5 6.293 1.707a1 1 0 011.414-1.414L11 3.586l3.293-3.293a1 1 0 011.414 1.414L12.414 5l3.293 3.293a1 1 0 01-1.414 1.414L11 6.414 7.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link href="/" className="py-2 px-4 rounded bg-green-500 text-white">
          Сайтта жалғастыру
        </Link>
        <div>
          <p className="text-lg">
            Барлығы: <span className="font-bold ml-2">{total} &#8376;</span>
          </p>
          <p className="text-lg">
            Жеткізу: <span className="font-bold ml-2">1000 &#8376;</span>
          </p>
          <p className="text-lg">
            Төлем сомасы: <span className="font-bold ml-2">{total + 1000} &#8376;</span>
          </p>
        </div>
        <Link href="/basket/booking" className="py-2 px-4 rounded bg-yellow-500 text-white">
          Растау
        </Link>
      </div>
    </div>
  );
}
