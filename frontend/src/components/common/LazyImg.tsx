import React, { useState, useEffect, useRef } from "react";
import LoadingCircle from "./LoadingCircle";

export interface LazyImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
  loadWhite?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  lazy = true, // lazy loading enabled by default
  loadWhite = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [shouldLoad, setShouldLoad] = useState<boolean>(!lazy);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px", // Start loading when image is 50px from viewport
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy]);

  useEffect(() => {
    if (!shouldLoad) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
    };
  }, [src, shouldLoad]);

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {shouldLoad && (
        <img
          src={imgSrc || src}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          className={`w-full h-full ${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          {...props}
        />
      )}
      {isLoading && shouldLoad && <LoadingCircle />}
    </div>
  );
};

export default LazyImage;
