import Image from "next/image";

// The real PureTik logo (mark + white wordmark), taken from the previous site.
export function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-full.png"
      alt="PureTik"
      width={900}
      height={301}
      priority
      className={className}
    />
  );
}
