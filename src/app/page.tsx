import ImageCarousel from './ui/image-carousel';
import SetOfBooks from './ui/home/set-of-books';
import { newBooks } from '@/app/lib/data/newBooks';
import { readersChoice } from './lib/data/readersChoice';

const data = [
  { image: '/slider1.html' },
  { image: '/slider2.html' },
  { image: '/slider3.html' },
  { image: '/slider4.html' },
];

export default function HomePage() {
  return (
    <main className="w-full flex flex-col gap-20 mb-20">
      <ImageCarousel data={data} />
      <div className="-mt-14">
        <SetOfBooks name="Жаңа кітаптар" books={newBooks} />
      </div>
      <SetOfBooks name="Оқырмандардың таңдауы" books={readersChoice} />
    </main>
  );
}
