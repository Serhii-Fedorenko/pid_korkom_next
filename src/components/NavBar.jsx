import Link from "next/link";
import Modal from "./Modal";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 flex flex-col">
      <nav className=" bg-black text-white px-4 py-3 shadow-md">
        <div className="flex flex-wrap justify-between items-center max-w-screen-xl mx-auto gap-4">
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <Link href="/" className="hover:underline">
              Головна
            </Link>
            <Link href="/categories/whisky" className="hover:underline">
              Віскі
            </Link>
            <Link href="/categories/rum" className="hover:underline">
              Ром
            </Link>
            <Link href="/categories/tequila" className="hover:underline">
              Текіла
            </Link>
            <Link href="/categories/gin" className="hover:underline">
              Джин
            </Link>
            <Link href="/categories/wine" className="hover:underline">
              Вино
            </Link>
            <Link href="/categories/other" className="hover:underline">
              Інше
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <Modal />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
