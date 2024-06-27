import { TextConstants } from "@/app/util/textConstants";

const VersionTrackerComponent = () => {
  return (
    <div className="bg-kuvitus-sub-background flex flex-col gap-4 w-full p-4">
      <p className="text-2xl text-kuvitus-primary-blue">
        Kuvitus {TextConstants.version}
      </p>

      {TextConstants.nextFeatures.map((feature, index) => (
        <div key={index} className="w-full flex h-12 ">
          <div className="h-6 w-10 flex items-center justify-center">
            <div
              className={`rounded-full h-6 w-6 ${
                feature.status === "complete"
                  ? "bg-kuvitus-complete"
                  : feature.status === "current"
                  ? "bg-kuvitus-uncomplete"
                  : "bg-kuvitus-pending"
              }`}
            ></div>
          </div>
          <p className="text-base text-kuvitus-primary-blue px-2">
            {feature.task}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VersionTrackerComponent;
