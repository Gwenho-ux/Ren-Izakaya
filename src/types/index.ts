export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface BlurOverlayProps {
  className?: string;
}

export interface BackgroundImageProps {
  imagePath: string;
} 