"use client";

import Image from "next/image";

export default function InterviewSessionPreview() {
  return (
    <div className="relative isolate w-full">
      {/* Background Glow */}
      <div
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/25 via-primary/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Accent Glow */}
      <div
        className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]"
        aria-hidden="true"
      />

      {/* Image Container */}
      <div className="relative w-full overflow-visible rounded-[2rem]">
        <Image
          src="/images/interview-preview.png"
          alt="Interview session preview"
          width={500}
          height={500}
          priority
          className="relative z-10 h-auto w-full max-w-none rounded-[2rem] object-contain"
        />
      </div>
    </div>
  );
}