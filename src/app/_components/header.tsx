import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between border-b border-slate-500 p-2">
      <Image src={logo} alt="logo" width={200} />
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/manage">Manage</Link>
        </li>
      </ul>
    </header>
  );
};
