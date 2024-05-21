import Link from 'next/link';

export default function SideBar() {
  const sections = [
    { id: '/books/programming', label: 'Бағдарламалау' },
    { id: '/books/adventure', label: 'Шытырман оқиға' },
    { id: '/books/romance', label: 'Раман' },
    { id: '/books/fantasy', label: 'Қиял' },
    { id: '/books/historical', label: 'Тарих' },
    { id: '/books/horror', label: 'Сұмдық' },
    { id: '/books/philosophical', label: 'Философиялық' },
    { id: '/books/political', label: 'Саяси' },
    { id: '/books/romance', label: 'Романтика' },
    { id: '/books/autobiography', label: 'Автобиография' },
    { id: '/books/comic', label: 'Комедия' },
  ];

  return (
    <div className="w-64 px-2 mb-4 flex flex-col font-medium text-zinc-600">
      <span className="border-t py-4 px-6 text-zinc-700 font-semibold">Мәзір</span>
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          className="border-t py-4 px-6 hover:bg-zinc-200 hover:text-zinc-700 text-sm"
          href={id}
        >
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
