import { useState, useCallback, useEffect } from "react";

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
}

const ProgressiveImage = ({ src, alt, className = "", loading = "lazy", decoding = "async", fallbackSrc = "/placeholder.svg", ...props }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setLoaded(false);
    setImgSrc(src);
  }, [src]);

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Skeleton bg skeleton */}
      <div
        className={`absolute inset-0 bg-muted/30 animate-pulse-subtle transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Full image */}
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        decoding={decoding as any}
        onLoad={handleLoad}
        onError={() => { if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc); }}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
