'use client';
import { useScreenSize } from '@/hooks/useScreenResize';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useScreenSize();
  // 필요시 추가 예정
  return <>{children}</>;
}
