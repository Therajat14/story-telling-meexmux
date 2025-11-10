import React from "react";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
};

type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement> & {
  children?: React.ReactNode;
};

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={
        "relative inline-flex h-8 w-8 md:h-10 md:w-10 aspect-square items-center justify-center rounded-full bg-gray-200 overflow-hidden ring-2 ring-white " +
        (className || "")
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({
  src,
  alt = "avatar",
  ...props
}: AvatarImageProps) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover object-center"
      {...props}
    />
  );
}

export function AvatarFallback({ children, ...props }: AvatarFallbackProps) {
  return (
    <span className="text-xs md:text-sm font-semibold text-gray-600" {...props}>
      {children}
    </span>
  );
}
