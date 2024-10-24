import {useEffect} from "react";
import {useAnimation} from "framer-motion";
import useProgressStore from "@/lib/store/useRecommendStore";

const useAnimateProgress = () => {
  const {progress} = useProgressStore();
  const controls = useAnimation();

  useEffect(() => {
    controls.start((index) => ({
      y: [50, 0],
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
      },
    }));
  }, [progress, controls]);

  return {controls};
};

export default useAnimateProgress;
