import { TextConstants } from "@/app/util/textConstants";

const VersionTrackerComponent = () => {
  return (
    <div className="bg-kuvitus-sub-background flex flex-col gap-4 h-full w-full p-4 overflow-y-auto">
      <p className="text-2xl text-kuvitus-primary-blue">
        Kuvitus {TextConstants.version}
      </p>

      <div className="flex flex-col gap-4 h-full">
      {TextConstants.nextFeatures.map((feature, index) => (
        <div key={index} className="w-full flex h-12 items-center flex-wrap">
            <div
              className={`rounded-full h-6 w-6 ${
                feature.status === "complete"
                  ? "bg-kuvitus-complete"
                  : feature.status === "current"
                  ? "bg-kuvitus-uncomplete"
                  : "bg-kuvitus-pending"
              }`}
            ></div>
          <p className="text-base text-kuvitus-primary-blue px-2">
            {feature.task}
          </p>
        </div>
      ))}

      </div>

    </div>
  );
};

export default VersionTrackerComponent;
