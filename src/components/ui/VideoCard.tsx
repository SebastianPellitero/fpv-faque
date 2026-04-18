"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoCardProps {
  videoId: string;
  description: string;
  title?: string;
}

export function VideoCard({ videoId, description, title = "FPV Drone Video" }: VideoCardProps) {
  return (
    <article className="flex flex-col gap-4 min-w-0">
      {/* Aspect ratio wrapper — 16:9 */}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
        <LiteYouTubeEmbed
          id={videoId}
          title={title}
          noCookie
          iframeClass="absolute inset-0 w-full h-full"
          wrapperClass="w-full h-full"
        />
      </div>

      <p className="text-sm text-[var(--color-muted)] leading-relaxed px-1">
        {description}
      </p>
    </article>
  );
}
