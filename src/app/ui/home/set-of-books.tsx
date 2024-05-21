import BooksCarousel from '../book-carousel';

export default function SetOfBooks({ name, books }: { name: string; books: Book[] }) {
  return (
    <div className="w-full space-y-12 text-center">
      <h1 className="text-3xl text-zinc-600">{name}</h1>
      <div className="w-full">
        <BooksCarousel books={books} />
      </div>
    </div>
  );
}
