import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoContext } from "@/app/layout";
import { staticNav } from "@/utils/navigation";

const Brand: React.FC = () => {
  const logo = useContext(LogoContext);

  return (
    <Link href="/" className="flex flex-shrink-0 items-center">
      <Image src={logo} alt={`${staticNav.title} logo`} width={24} height={24} />
      <span className="sm:block ml-2 lg:text-2xl font-bold text-lg">
        {staticNav.title}
      </span>
    </Link>
  );
};

export default Brand;
