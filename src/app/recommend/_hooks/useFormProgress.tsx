import {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import useProgressStore from "@/lib/store/useRecommendStore";
import {recommendProgressSchemaType} from "@/service/schema/recommend.schema";

const useFormProgress = () => {
  const {watch} = useFormContext<recommendProgressSchemaType>();
  const {totalFields, progress, setProgress, setTotalFields} = useProgressStore();
  const watchedFields = watch();

  useEffect(() => {
    const filledFieldsCount = (
      Object.keys(watchedFields) as Array<keyof recommendProgressSchemaType>
    ).filter((key) => {
      const value = watchedFields[key];
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        return false;
      }
      return true;
    }).length;

    const totalFieldsCount = 9;
    const calculatedProgress = Math.round((filledFieldsCount / totalFieldsCount) * 100);

    if (calculatedProgress !== progress) {
      setProgress(calculatedProgress);
    }

    if (totalFields !== totalFieldsCount) {
      setTotalFields(totalFieldsCount);
    }
  }, [watchedFields, setProgress, setTotalFields, totalFields, progress]);
};

export default useFormProgress;
