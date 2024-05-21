import {
  AcademicCapIcon,
  BookOpenIcon,
  CommandLineIcon,
  FaceSmileIcon,
  FireIcon,
  FlagIcon,
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  MagnifyingGlassCircleIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';

const sections = [
  { icon: CommandLineIcon, label: 'Бағдарламалау', href: '/books/programming' },
  { icon: MagnifyingGlassCircleIcon, label: 'Шытырман оқиға', href: '/books/adventure' },
  { icon: FaceSmileIcon, label: 'Комедия', href: '/books/comic' },
  { icon: GlobeAsiaAustraliaIcon, label: 'Қиял', href: '/books/fantasy' },
  { icon: BookOpenIcon, label: 'Тарих', href: '/books/historical' },
  { icon: FireIcon, label: 'Сұмдық', href: '/books/horror' },
  { icon: AcademicCapIcon, label: 'Философиялық', href: '/books/philosophical' },
  { icon: FlagIcon, label: 'Саяси', href: '/books/political' },
  { icon: HeartIcon, label: 'Романтика', href: '/books/romance' },
  { icon: UsersIcon, label: 'Автобиография', href: '/books/autobiography' },
];

export default function Sections() {
  return (
    <nav className="mt-16 py-1 lg:py-4 flex flex-wrap justify-center items-center text-zinc-500 text-sm font-medium gap-4 xl:gap-8">
      {sections.map(({ icon: Icon, label, href }) => (
        <Link key={href} className="flex flex-col items-center hover:text-zinc-600" href={href}>
          <Icon className="w-20" />
          <span className="text-sm">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
