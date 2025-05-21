import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex flex-col">
      <nav className="bg-blue-600 text-white flex flex-wrap items-center justify-between p-4">
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="hover:underline">
            Головна
          </Link>
          <Link href="/" className="hover:underline">Віскі</Link>
          <Link href="/" className="hover:underline">Ром</Link>
          <Link href="/" className="hover:underline">Текіла</Link>
          <Link href="/" className="hover:underline">Джин</Link>
          <Link href="/" className="hover:underline">Вино</Link>
          <Link href="/" className="hover:underline">Інше</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
