import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="فروشگاه پوشاک لوگو"
        width={70}
        height={30}
        priority
      />
    </Link>
  );
}
