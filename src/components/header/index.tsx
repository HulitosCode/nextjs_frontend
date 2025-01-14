import Link from "next/link";

export function Header() {
  return (
    <header className="flex px-2 bg-zinc-900 text-white py-4">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <div>
          NextJs
        </div>

        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link href='/'>
              Home
              </Link>
            </li>
            <li>
              <Link href='/posts'>
              Posts
              </Link>
            </li>
            <li>
              <Link href='/articles'>
              Articles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
