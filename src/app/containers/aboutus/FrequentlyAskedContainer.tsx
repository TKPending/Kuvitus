const FrequentlyAskedContainer = () => {
  const FAQ = [
    { question: "How to add a Major Goal", answer: "" },
    { question: "How to view a Goal?", answer: "" },
    { question: "How to update goal details?", answer: "" },
    { question: "How to create and update Sub Goals", answer: "" },
    { question: "How does the drawing canvas work?", answer: "" },
    { question: "What is the Future Plans section for?", answer: "" },
  ];

  return (
    <div className="flex flex-col gap-4 px-4">
      {FAQ.map((q, index) => (
        <div key={index} className="flex flex-col gap-2 w-full text-kuvitus-primary-blue">
          <p className="text-2xl">{q.question}</p>
          <p className="">{q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FrequentlyAskedContainer;
