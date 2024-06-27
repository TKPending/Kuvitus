import { TextConstants } from "@/app/util/textConstants";

const FrequentlyAskedContainer = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      {TextConstants.FAQ.map((q, index) => (
        <div key={index} className="flex flex-col gap-2 w-full text-kuvitus-primary-blue">
          <p className="text-2xl">{q.question}</p>
          {q.intro ? (
            <>
              <p className="px-2 text-xl">{q.intro}</p>
              <ul className="px-2 text-lg list-disc list-inside">
                {q.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="px-2 text-xl">{q.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrequentlyAskedContainer;
