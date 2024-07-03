import { TextConstants } from "@/app/util/textConstants";

const AboutUsContainer = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      {TextConstants.about.map((q, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 w-full text-kuvitus-primary-blue"
        >
          <p className="text-xl lg:text-2xl text-center md:text-left underline">{q.question}</p>
          <p className="px-2 text-center md:text-left text-base md:text-xl">
            {q.answer.includes("email:") ? (
              <>
                {q.answer.split("email:")[0]}
                <a
                  href={`mailto:${q.answer.split("email:")[1].trim()}`}
                  className="underline cursor-pointer hover:text-black transition duration-400"
                >
                  {q.answer.split("email:")[1]}
                </a>
              </>
            ) : (
              q.answer
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutUsContainer;
