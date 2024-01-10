import Image from "next/image";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between bg-text-primary px-16 pb-4 pt-10 shadow-lg">
        <Image
          src="/mv_text_logo_white.png"
          alt="logo"
          width={139}
          height={30}
          className="cursor-pointer"
          onClick={() => void router.push("/")}
        />
      </div>
      <div className="flex items-center justify-between bg-text-primary px-8 py-4">
        <Image
          src="/contact.png"
          alt="logo"
          width={250}
          height={30}
          className="cursor-pointer"
          onClick={() => void router.push("/")}
        />
        <Image
          src="/copy.png"
          alt="logo"
          width={350}
          height={30}
          className="cursor-pointer"
          onClick={() => void router.push("/")}
        />
      </div>
    </>
  );
}
