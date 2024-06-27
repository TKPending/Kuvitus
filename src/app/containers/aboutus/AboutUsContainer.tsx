const AboutUsContainer = () => {
  const aboutOptions = [
    { question: "What inspired Kuvitus?", answer: "" },
    { question: "Technologies Involved?", answer: "" },
    { question: "Contact Tony", answer: "" },
  ];

  return (
    <div className="flex flex-col gap-4 px-4">
      {aboutOptions.map((q, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 w-full text-kuvitus-primary-blue"
        >
          <p className="text-2xl">{q.question}</p>
          <p className="">{q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUsContainer;
