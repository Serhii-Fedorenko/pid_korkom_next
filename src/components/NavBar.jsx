import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex flex-col">
      <nav className="bg-blue-600 text-white flex flex-wrap items-center justify-between p-4">
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="hover:underline">
            Головна
          </Link>
          <Link href="/categories/whisky" className="hover:underline">Віскі</Link>
          <Link href="/categories/rum" className="hover:underline">Ром</Link>
          <Link href="/categories/tequila" className="hover:underline">Текіла</Link>
          <Link href="/categories/gin" className="hover:underline">Джин</Link>
          <Link href="/categories/wine" className="hover:underline">Вино</Link>
          <Link href="/categories/other" className="hover:underline">Інше</Link>
        </div>
        <div>
          <button className="hover:underline cursor-pointer">Увійти</button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
