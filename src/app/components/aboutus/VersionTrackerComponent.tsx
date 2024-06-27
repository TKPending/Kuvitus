const VersionTrackerComponent = () => {
  const version: string = "V 2.0";
  const nextFeatures = [
    { status: "pending", task: "" },
    { status: "pending", task: "" },
    { status: "pending", task: "" },
    { status: "pending", task: "" },
  ];

  return (
    <div className="bg-kuvitus-sub-background flex flex-col gap-4 w-full p-4">
      <p className="text-2xl text-kuvitus-primary-blue">Kuvitus {version}</p>

      {nextFeatures.map((feature, index) => (
        <div key={index}>
          <div
            className={`rounded-full h-6 w-6 ${
              feature.status === "complete"
                ? "bg-kuvitus-complete"
                : feature.status === "current"
                ? "bg-kuvitus-uncomplete"
                : "bg-kuvitus-pending"
            }`}
          ></div>
          <p className="">{feature.task}</p>
        </div>
      ))}
    </div>
  );
};

export default VersionTrackerComponent;
