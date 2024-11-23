import {useAnimation} from "framer-motion";
import {useEffect} from "react";
import useProgressStore from "@/lib/store/useRecommendStore";

const useFormTransition = () => {
  const {step} = useProgressStore();
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ x: 200, opacity: 0 })
    controls.start({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }, [step, controls]);

  return {controls};
};

export default useFormTransition;
