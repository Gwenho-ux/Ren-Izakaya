import { BlurOverlayProps } from '@/types';
import { cn } from '@/utils/cn';

export const BlurOverlay = ({ className }: BlurOverlayProps) => {
  return (
    <div className={cn("blur-overlay", className)} />
  );
}; 