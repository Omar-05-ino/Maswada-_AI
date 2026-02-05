import type { AutoSaveStatus } from "@/types";
import { CheckIcon, CircleAlertIcon, Loader2Icon } from "lucide-react";

type Props = {
  AutoSaveStatus: AutoSaveStatus;
};

function AutoSaveIndicator({ AutoSaveStatus }: Props) {
  return (
    <div className="pt-1">
      {AutoSaveStatus === "saving" && (
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <span className="text-gray-500 font-bold">saving...</span>
        </div>
      )}
      {AutoSaveStatus === "saved" && (
        <div className="flex items-center gap-2">
          <CheckIcon />
          <span className="text-green-500 font-bold">saved successfully</span>
        </div>
      )}
      {AutoSaveStatus === "unsaved" && (
        <div className="flex items-center gap-2">
          <CircleAlertIcon />
          <span className="text-orange-500 font-bold">unsaved changes</span>
        </div>
      )}
    </div>
  );
}

export default AutoSaveIndicator;
