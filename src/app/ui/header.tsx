'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Header() {
  const [basketCount, setBasketCount] = useState(0);
  const [title, setTitle] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasketCount(storedBasket.length);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const linkHref = title !== '' ? `/books?title=${title}` : '/books';
      router.push(linkHref);
    }, 300);
  };

  return (
    <header className="fixed z-50 w-full max-w-[2000px] flex items-center justify-between gap-5 bg-slate-700 px-7 py-2">
      <div className="flex items-center gap-5 md:gap-10">
        <Link
          href="/"
          className="flex flex-col justify-center items-center font-medium text-2xl text-orange-400 hover:text-orange-500 transition-colors duration-150 active:text-orange-600 cursor-pointer"
        >
          <span>Кітап</span>
          <span className="-mt-3">дүкені</span>
        </Link>
        <div className="flex-1 md:w-[450px] flex items-center p-0.5 bg-white rounded">
          <input
            placeholder="Іздеу"
            type="search"
            value={title}
            onChange={handleInputChange}
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const linkHref = title !== '' ? `/books?title=${title}` : '/books';
                router.push(linkHref);
              }
            }}
            className="w-full px-3 py-1 rounded outline-none"
          />
          <Link
            href={title !== '' ? `/books?title=${title}` : '/books'}
            className="bg-yellow-400 hover:bg-yellow-500 p-1.5 rounded cursor-pointer transition-colors duration-150 active:bg-yellow-600"
          >
            <MagnifyingGlassIcon className="w-5 text-white" />
          </Link>
        </div>
      </div>
      <div className="flex gap-1">
        <Link
          href="/about"
          className="bg-slate-800 hover:bg-slate-900 p-2 text-white text-sm rounded cursor-pointer transition-colors duration-150 active:bg-slate-700"
        >
          <span>Біз туралы</span>
        </Link>
        <Link
          href="/contact"
          className="bg-slate-800 hover:bg-slate-900 p-2 text-white text-sm rounded cursor-pointer transition-colors duration-150 active:bg-slate-700"
        >
          <span>Мекен жай</span>
        </Link>
        <Link
          href="/basket"
          className="flex ml-1 gap-2 items-center bg-yellow-500 hover:bg-yellow-600 p-2 text-white text-sm rounded cursor-pointer transition-colors duration-150 active:bg-yellow-700"
        >
          <span>Себет</span>
          {basketCount > 0 && (
            <span className="top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {basketCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
