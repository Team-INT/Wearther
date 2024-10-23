import {useAnimation} from "framer-motion";
import {useEffect} from "react";
import useProgressStore from "@/lib/store/useRecommendStore";

const useFormTransition = () => {
  const {step} = useProgressStore();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: step === 1 ? 0 : step === 2 ? -100 : -200,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }, [step, controls]);

  return {controls};
};

export default useFormTransition;
