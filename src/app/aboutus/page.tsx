"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AboutNavigationComponent from "@/app/components/aboutus/AboutNavigationComponent";
import FrequentlyAskedContainer from "@/app/containers/aboutus/FrequentlyAskedContainer";
import AboutUsContainer from "@/app/containers/aboutus/AboutUsContainer";
import FuturePlansContainer from "@/app/containers/aboutus/FuturePlansContainer";

const AboutUs = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);

  const handleRedirection = () => {
    router.push("/");
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center px-12">
      <h1
        onClick={handleRedirection}
        className="absolute top-10 left-20 text-kuvitus-primary-blue text-5xl cursor-pointer"
      >
        Kuvitus
      </h1>

      <div className="w-3/4 h-3/5 flex">
        {page === 0 ? (
          <FrequentlyAskedContainer />
        ) : page === 1 ? (
          <AboutUsContainer />
        ) : (
          <FuturePlansContainer />
        )}
      </div>
      <AboutNavigationComponent page={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default AboutUs;
