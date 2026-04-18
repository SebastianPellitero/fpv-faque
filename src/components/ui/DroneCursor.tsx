"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function DroneCursor() {
  const droneRef = useRef<HTMLDivElement>(null);
  const rotorRefs = useRef<SVGGElement[]>([]);
  const prevX = useRef(0);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!droneRef.current) return;

    const el = droneRef.current;

    // Mark native cursor hidden only after mount
    document.documentElement.classList.add("drone-cursor-active");

    // Fast position setters with spring feel
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    // Continuous rotor spin
    rotorRefs.current.forEach((rotor) => {
      gsap.to(rotor, {
        rotation: 360,
        repeat: -1,
        duration: 0.25,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });

    function onMouseMove(e: MouseEvent) {
      xTo(e.clientX - 20); // center the 40px element
      yTo(e.clientY - 20);

      const dx = e.clientX - prevX.current;
      gsap.to(el, {
        rotation: gsap.utils.clamp(-18, 18, dx * 2.5),
        duration: 0.2,
        ease: "power2.out",
      });
      prevX.current = e.clientX;
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("drone-cursor-active");
      gsap.killTweensOf(el);
      rotorRefs.current.forEach((r) => gsap.killTweensOf(r));
    };
  }, []);

  return (
    <div
      ref={droneRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      <DroneSVG rotorRefs={rotorRefs} />
    </div>
  );
}

function DroneSVG({
  rotorRefs,
}: {
  rotorRefs: React.MutableRefObject<SVGGElement[]>;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
    >
      {/* Arms */}
      <line x1="10" y1="10" x2="20" y2="20" stroke="var(--color-accent)" strokeWidth="1.2" />
      <line x1="30" y1="10" x2="20" y2="20" stroke="var(--color-accent)" strokeWidth="1.2" />
      <line x1="10" y1="30" x2="20" y2="20" stroke="var(--color-accent)" strokeWidth="1.2" />
      <line x1="30" y1="30" x2="20" y2="20" stroke="var(--color-accent)" strokeWidth="1.2" />

      {/* Body */}
      <rect x="17" y="17" width="6" height="6" rx="1" fill="var(--color-accent)" opacity="0.9" />

      {/* Rotors — each in its own <g> for independent rotation */}
      {([
        [10, 10],
        [30, 10],
        [10, 30],
        [30, 30],
      ] as [number, number][]).map(([cx, cy], i) => (
        <g
          key={i}
          ref={(el) => {
            if (el) rotorRefs.current[i] = el;
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r="5" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.6" />
          <line
            x1={cx - 4}
            y1={cy}
            x2={cx + 4}
            y2={cy}
            stroke="var(--color-accent)"
            strokeWidth="1"
            opacity="0.8"
          />
          <line
            x1={cx}
            y1={cy - 4}
            x2={cx}
            y2={cy + 4}
            stroke="var(--color-accent)"
            strokeWidth="1"
            opacity="0.8"
          />
        </g>
      ))}
    </svg>
  );
}
