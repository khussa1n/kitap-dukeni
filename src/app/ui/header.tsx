'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasketCount(storedBasket.length);
  }, []);

  return (
    <header className="fixed z-50 w-full flex items-center justify-between gap-5 bg-slate-700 px-4 py-2">
      <Link
        href="/"
        className="flex flex-col justify-center items-center font-medium text-2xl text-orange-400 cursor-pointer"
      >
        <span>Кітап</span>
        <span className="-mt-3">дүкені</span>
      </Link>
      <div className="w-full max-w-xl flex items-center p-0.5 bg-white rounded">
        <input placeholder="Іздеу" className="w-full px-3 py-1 rounded outline-none" />
        <div className="bg-yellow-400 p-1.5 rounded cursor-pointer transition-colors duration-150 active:bg-yellow-500">
          <MagnifyingGlassIcon className="w-5 text-white" />
        </div>
      </div>
      <div className="flex gap-1">
        <div className="bg-slate-800 p-2 text-white text-sm rounded cursor-pointer transition-colors duration-150 active:bg-slate-900">
          <span>neo</span>
        </div>
        <Link
          href="/basket"
          className="flex gap-2 items-center bg-slate-800 p-2 text-white text-sm rounded cursor-pointer transition-colors duration-150 active:bg-slate-900"
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
