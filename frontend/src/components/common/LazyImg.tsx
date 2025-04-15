import React, { useState, useEffect, useRef } from "react";
import LoadingCircle from "./LoadingCircle";

export interface LazyImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
  classNameImg?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  lazy = true,
  classNameImg,
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
        rootMargin: "750px",
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
          className={`w-full h-full object-cover ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity rounded-[3px] duration-300 ${classNameImg}`}
          {...props}
        />
      )}
      {isLoading && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingCircle />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
