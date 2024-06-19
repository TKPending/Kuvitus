"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFoundButtonComponent from "@/app/components/notFound/NotFoundButtonComponent";

const PageExistenceLayout = () => {
  const router = useRouter();
  const [ randomQuote, setRandomQuote ] = useState<string>("");

  const achieveGoalsMessages: string[] = [
    "Focused, hard work is the real key to success. Keep your eyes on the goal, and just keep taking the next step towards completing it. - Unknown",
    "The real value of setting and achieving goals lies not in the rewards you receive but in the person you become as a result of reaching your goals. - Robin Sharma",
    "Discipline is the bridge between goals and accomplishment. - Jim Rohn",
    "Set your goals high, and don't stop till you get there. - Bo Jackson",
    "Setting goals is the first step in turning the invisible into the visible. - Tony Robbins",
    "Success is the progressive realization of a worthy goal or ideal. - Earl Nightingale",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only limit to the height of your achievements is the reach of your dreams and your willingness to work for them. - Michelle Obama",
    "A goal without a plan is just a wish. - Antoine de Saint-Exupéry",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * achieveGoalsMessages.length);
    setRandomQuote(achieveGoalsMessages[randomIndex]);
  };

  const homepageRoute = () => {
    router.push("/");
  };

  useEffect(() => {
    if (randomQuote === "") getRandomQuote();
  }, [randomQuote]);

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-8 flex-col">
      <h1 className="text-5xl">404: Page not found!</h1>

      <p className="font-semibold underline">{randomQuote}</p>

      <div className="flex gap-8">
        <NotFoundButtonComponent text="Return to Homepage" onClick={homepageRoute} />
        <NotFoundButtonComponent text="Contact Support" onClick={() => console.log("")} />
      </div>
    </div>
  );
};

export default PageExistenceLayout;
