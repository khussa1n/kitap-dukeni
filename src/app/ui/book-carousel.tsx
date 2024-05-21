'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Book from './book';
import React, { useRef } from 'react';

export default function BooksCarousel({ books }: { books: Book[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 300; // Adjust scroll amount as needed

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollLeft = direction === 'left';
      carouselRef.current.scrollBy({
        left: scrollLeft ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex items-center">
      <button
        onClick={() => handleScroll('left')}
        className="bg-white opacity-80 py-2 px-2 rounded-full font-bold"
      >
        <ChevronLeftIcon className="w-8 text-zinc-700" />
      </button>
      <div
        ref={carouselRef}
        style={{
          width: 'calc(100vw - 20rem)',
          maxWidth: 'calc(2000px - 20rem)',
        }}
        className="flex flex-row transition-transform duration-300 overflow-hidden"
      >
        {books.map((book, i) => (
          <div key={i} className="w-64 flex justify-center flex-shrink-0">
            <Book book={book} />
          </div>
        ))}
      </div>
      <button
        className="bg-white opacity-80 py-2 px-2 rounded-full font-bold"
        onClick={() => handleScroll('right')}
      >
        <ChevronRightIcon className="w-8 text-zinc-700" />
      </button>
    </div>
  );
}
