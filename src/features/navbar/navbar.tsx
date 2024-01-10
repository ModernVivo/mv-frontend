import Image from "next/image";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-text-primary px-8 py-4 shadow-lg">
      <Image
        src="/mv_text_logo_white.png"
        alt="logo"
        width={225}
        height={30}
        className="cursor-pointer"
        onClick={() => void router.push("/")}
      />
    </div>
  );
}
