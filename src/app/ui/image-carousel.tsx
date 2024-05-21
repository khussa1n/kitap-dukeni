'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({
  data,
}: {
  data: {
    image: string;
  }[];
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAndSetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % data.length);
    }, 10000);
  };

  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
    clearAndSetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data.length]);

  const handleButtonClick = (index: number) => {
    setCurrentImg(index);
    clearAndSetInterval();
  };

  return (
    <div className="w-full h-[20.2rem]">
      <div
        style={{
          width: 'calc(100vw - 16.7rem)',
          maxWidth: 'calc(2000px - 16.7rem)',
        }}
        className="relative h-full w-full overflow-hidden"
      >
        <div
          ref={carouselRef}
          style={{
            width: 'calc(100vw - 16.7rem)',
            maxWidth: 'calc(2000px - 16.7rem)',
            left: -currentImg * carouselSize.width,
          }}
          className="absolute flex h-full transition-all duration-300"
        >
          {data.map((v, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image className="object-cover" alt="random image" fill src={v.image} />
            </div>
          ))}
        </div>
        <div className="absolute w-full h-full px-4 flex justify-between items-center">
          <button
            disabled={currentImg == 0}
            onClick={() => handleButtonClick(currentImg - 1)}
            className={`bg-white opacity-80 border border-gray-300 text-zinc-700 py-2 px-3.5 rounded-full font-bold ${
              currentImg == 0 && 'opacity-20 cursor-not-allowed'
            }`}
          >
            {'<'}
          </button>
          <button
            disabled={currentImg == data.length - 1}
            className={`bg-white opacity-80 border border-gray-300 text-zinc-700 py-2 px-3.5 rounded-full font-bold ${
              currentImg == data.length - 1 && 'opacity-20 cursor-not-allowed'
            }`}
            onClick={() => handleButtonClick(currentImg + 1)}
          >
            {'>'}
          </button>
        </div>
        <div className="absolute w-full bottom-0 py-4 flex gap-2 justify-center items-end">
          {data.map((v, i) => (
            <button
              key={i}
              className="p-[0.32rem] rounded-full bg-white opacity-80 border border-gray-300"
              onClick={() => handleButtonClick(i)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
