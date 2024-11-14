import {useState, useCallback} from "react";

interface UseImageLoadingProps {
  containerHeight?: string;
}

interface UseImageLoadingReturn {
  isLoading: boolean;
  handleLoadingComplete: () => void;
  imageStyles: {
    container: string;
    skeleton: string;
    image: string;
  };
}

export function useImageLoading({
  containerHeight = "h-48",
}: UseImageLoadingProps = {}): UseImageLoadingReturn {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const imageStyles = {
    container: `relative ${containerHeight}`,
    skeleton: `absolute inset-0 bg-gray-200 ${
      isLoading ? "animate-pulse opacity-100" : "opacity-0"
    }`,
    image: `w-full h-full object-cover ${isLoading ? "opacity-0" : "opacity-100"}`,
  };

  return {
    isLoading,
    handleLoadingComplete,
    imageStyles,
  };
}

// // 기본 높이 사용 (h-48)
// const { imageStyles } = useImageLoading();

// // 또는 커스텀 높이 지정
// const { imageStyles } = useImageLoading({ containerHeight: "h-64" });

// // 또는 동적인 클래스 사용
// const { imageStyles } = useImageLoading({ containerHeight: "h-[300px]" });

// // aspect ratio 사용
// const { imageStyles } = useImageLoading({ containerHeight: "aspect-square" });

// // responsive 높이 사용
// const { imageStyles } = useImageLoading({ containerHeight: "h-48 md:h-64 lg:h-72" });
