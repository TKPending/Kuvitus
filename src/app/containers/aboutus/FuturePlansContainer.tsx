import SuggestionComponent from "@/app/components/aboutus/SuggestionComponent";
import VersionTrackerComponent from "@/app/components/aboutus/VersionTrackerComponent";

const FuturePlansContainer = () => {
  const status: "On-Pause" | "Working On" | "Stopped Development" = "On-Pause";

  return (
    <div className="flex flex-col h-full w-full px-4 gap-6">
      <div className="w-full flex items-center">
        <p className="text-kuvitus-primary-blue text-2xl">Status: {status}</p>
      </div>

      <div className="flex w-full h-full gap-8">
        <VersionTrackerComponent />
        <SuggestionComponent />
      </div>
    </div>
  );
};

export default FuturePlansContainer;
