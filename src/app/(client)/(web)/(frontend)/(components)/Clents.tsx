"use client";

import { useEffect, useRef, useState } from "react";
import { Circle, Square, Shield, Building2, Star } from "lucide-react";

interface ClientItem {
  name: string;
  icon: React.ElementType;
}

const clientsData: ClientItem[] = [
  { name: "NAKHEEL", icon: Circle },
  { name: "ALDAR", icon: Square },
  { name: "ARABTEC", icon: Shield },
  { name: "EMAAR", icon: Building2 },
  { name: "DAMAC", icon: Star },
];

// Pixels per second the strip scrolls. Lower = slower.
const SPEED = 60;

export default function ClientsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // Keep the ref in sync so the rAF loop (which never re-subscribes) always
  // reads the latest paused state without needing to restart the animation.
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of ONE copy of the list (the track renders the list twice, back to back)
    let singleSetWidth = track.scrollWidth / 2;
    let offset = 0;
    let lastTime: number | null = null;
    let rafId: number;

    const recalc = () => {
      singleSetWidth = track.scrollWidth / 2;
    };

    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(track);

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current && singleSetWidth > 0) {
        offset += SPEED * delta;
        // Wrap seamlessly: once we've scrolled exactly one full set width,
        // snap back to 0 -- since both halves are identical, this is invisible,
        // so the strip scrolls forever with no reset/jump/stop.
        if (offset >= singleSetWidth) {
          offset -= singleSetWidth;
        }
        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  // Duplicate the list so the track can loop seamlessly
  const loopItems = [...clientsData, ...clientsData];

  return (
    <section className="relative bg-[#F5F6F8] py-14 overflow-hidden">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-6">
        {/* Label */}
        <p className="text-center text-[12px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-10">
          Trusted by Leading Contractors &amp; Developers Across the UAE
        </p>
      </div>

      {/* Marquee viewport */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-16 w-max will-change-transform"
        >
          {loopItems.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <Icon className="w-6 h-6 text-[#DC2626]" strokeWidth={1.75} />
                <span className="text-gray-500 font-extrabold text-[20px] tracking-wide whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
