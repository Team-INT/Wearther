import {create} from "zustand";

// 상태 타입 지정
interface ProgressStore {
  step: number;
  totalSteps: number;
  totalFields: number;
  progress: number;
  setStep: (newStep: number) => void;
  setTotalFields: (fieldsCount: number) => void;
  setProgress: (progress: number) => void;
}

const useProgressStore = create<ProgressStore>((set) => ({
  step: 1,
  totalSteps: 3,
  totalFields: 0,
  progress: 0, // 반드시 초기 진행 상태를 0으로 설정
  setStep: (newStep) =>
    set((state) => ({
      step: newStep,
      progress: (newStep / state.totalSteps) * 100,
    })),
  setTotalFields: (fieldsCount) => set(() => ({totalFields: fieldsCount})),
  setProgress: (progress) => set(() => ({progress})),
}));
export default useProgressStore;
