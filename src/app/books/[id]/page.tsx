'use client';

import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';

type props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: props) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
      const parsedBook: Book = JSON.parse(storedBook);
      if (parsedBook.isbn === params.id) {
        setBook(parsedBook);
      } else {
        // Handle the case where the book ID in params doesn't match the stored book
        console.warn('Book ID does not match the stored book');
      }
    }
  }, [params.id]);

  if (!book) {
    return <div className="w-full mt-40 flex items-center justify-center text-2xl">Loading...</div>;
  }

  const moreInfoUrl = `https://www.google.com/search?q=${encodeURIComponent(book.title)}+book`;

  const handleAddToBasket = () => {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');

    if (basket.some((item: Book) => item.isbn === book.isbn)) {
      alert('Кітап қазірдің өзінде себетте');
      return;
    }

    basket.push(book);
    localStorage.setItem('basket', JSON.stringify(basket));
    alert('Кітап себетке қосылды');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center gap-20 px-4 py-10">
      <div className="flex gap-20">
        <Suspense
          fallback={
            <Image
              src={book.thumbnailUrl}
              alt={book.title}
              width={240}
              height={400}
              className="w-40 h-56 object-cover"
            />
          }
        >
          <Image
            src={book.thumbnailUrl}
            alt={book.title}
            width={240}
            height={400}
            className="w-40 h-56 object-cover"
          />
        </Suspense>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <div className="text-lg flex gap-5 items-center">
            <span className="text-base text-zinc-800">Авторы:</span>
            <div>
              {book.authors.map((author, index) => (
                <span key={index} className="text-blue-600">
                  {author}
                  {index < book.authors.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl text-orange-600 font-semibold">{book.value} &#8376;</span>
            <button
              onClick={handleAddToBasket}
              className="ml-[1.70rem] py-1 px-4 rounded bg-yellow-400 text-white"
            >
              Себетке
            </button>
          </div>
          <p className="mt-4 text-justify text-zinc-600">{book.shortDescription}</p>
          <p className="mt-4 text-justify text-zinc-600">{book.longDescription}</p>
          <a
            href={moreInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 mt-2 inline-block"
          >
            Read More
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.277 2.599 9.723 2.599 9.951 2.927l2.141 3.328 3.804.61c.38.061.531.522.257.789l-2.729 2.724.646 3.982c.068.42-.361.741-.743.54L10 14.414l-3.327 1.736c-.382.2-.811-.12-.743-.54l.646-3.982-2.729-2.724c-.274-.267-.123-.728.257-.789l3.804-.61 2.141-3.328z" />
              </svg>
            ))}
          </div>
          <textarea
            className="border border-gray-300 rounded p-2 w-full h-28 outline-none"
            placeholder="Пікіріңізді жазыңыз"
          ></textarea>
        </div>
        <button className="mt-2 py-1 px-4 rounded bg-yellow-400 text-white">Жіберу</button>
      </div>
    </div>
  );
}
