// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface StepItem {
//   number: string;
//   title: string;
//   description: string;
// }

// const stepsData: StepItem[] = [
//   {
//     number: "01",
//     title: "Consult & Design",
//     description: "We map your needs and engineer a tailored modular plan.",
//   },
//   {
//     number: "02",
//     title: "In-House Manufacture",
//     description: "Precision fabrication in our controlled production facility.",
//   },
//   {
//     number: "03",
//     title: "Delivery & Install",
//     description: "Transport and on-site assembly by our expert crews.",
//   },
//   {
//     number: "04",
//     title: "Handover & Support",
//     description: "Turnkey handover backed by ongoing after-sales care.",
//   },
// ];

// export default function HowWeWork() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const labelRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const prefersReducedMotion = window.matchMedia(
//         "(prefers-reduced-motion: reduce)",
//       ).matches;

//       const gridChildren = gridRef.current ? gsap.utils.toArray(gridRef.current.children) : [];

//       if (prefersReducedMotion) {
//         gsap.set([labelRef.current, headingRef.current], { opacity: 1, y: 0 });
//         if (gridChildren.length > 0) {
//           gsap.set(gridChildren, { opacity: 1, y: 0 });
//         }
//         return;
//       }

//       gsap.set([labelRef.current, headingRef.current], { opacity: 0, y: 24 });
//       if (gridChildren.length > 0) {
//         gsap.set(gridChildren, { opacity: 0, y: 24 });
//       }

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none",
//         },
//       });

//       tl.to(labelRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         ease: "power2.out",
//       })
//         .to(
//           headingRef.current,
//           { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
//           "-=0.3",
//         )
//         .to(
//           gridChildren,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             stagger: 0.12,
//             ease: "power2.out",
//           },
//           "-=0.35",
//         );
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-black py-20 md:py-28 overflow-hidden"
//     >
//       <div className="max-w-[1280px] w-full mx-auto px-4 md:px-6">
//         {/* Header */}
//         <div className="text-center max-w-[700px] mx-auto mb-16">
//           {/* Accent Label */}
//           <div
//             ref={labelRef}
//             className="flex items-center justify-center gap-3 mb-5"
//           >
//             <span className="w-8 h-[2px] bg-[#EF4444] rounded-full shrink-0" />
//             <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
//               How We Work
//             </span>
//             <span className="w-8 h-[2px] bg-[#EF4444] rounded-full shrink-0" />
//           </div>

//           {/* Heading */}
//           <h2
//             ref={headingRef}
//             className="text-[32px] sm:text-[40px] md:text-[46px] font-black text-white leading-[1.2] tracking-tight"
//           >
//             From Concept to Handover
//           </h2>
//         </div>

//         {/* Steps grid */}
//         <div
//           ref={gridRef}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
//         >
//           {stepsData.map((step) => (
//             <div key={step.number}>
//               {/* Number */}
//               <p className="text-[#DC2626] text-[32px] font-black leading-none mb-4">
//                 {step.number}
//               </p>

//               {/* Progress line: gray base + red accent segment */}
//               <div className="relative w-full h-[2px] bg-gray-600/60 mb-6">
//                 <span className="absolute top-0 left-0 h-full w-10 bg-[#DC2626]" />
//               </div>

//               {/* Title */}
//               <h3 className="text-white font-bold text-[17px] mb-3">
//                 {step.title}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-400 text-[14px] leading-relaxed max-w-[260px]">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const stepsData: StepItem[] = [
  {
    number: "01",
    title: "Consult & Design",
    description: "We map your needs and engineer a tailored modular plan.",
  },
  {
    number: "02",
    title: "In-House Manufacture",
    description: "Precision fabrication in our controlled production facility.",
  },
  {
    number: "03",
    title: "Delivery & Install",
    description: "Transport and on-site assembly by our expert crews.",
  },
  {
    number: "04",
    title: "Handover & Support",
    description: "Turnkey handover backed by ongoing after-sales care.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !labelRef.current ||
        !headingRef.current ||
        !gridRef.current
      ) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const gridChildren = Array.from(gridRef.current.children);

      if (prefersReducedMotion) {
        gsap.set([labelRef.current, headingRef.current, ...gridChildren], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set([labelRef.current, headingRef.current], {
        opacity: 0,
        y: 24,
      });

      gsap.set(gridChildren, {
        opacity: 0,
        y: 24,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          gridChildren,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <div ref={labelRef} className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 shrink-0 rounded-full bg-[#EF4444]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#EF4444]">
              How We Work
            </span>
            <span className="h-0.5 w-8 shrink-0 rounded-full bg-[#EF4444]" />
          </div>

          <h2
            ref={headingRef}
            className="text-[32px] font-black leading-[1.2] tracking-tight text-white sm:text-[40px] md:text-[46px]"
          >
            From Concept to Handover
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {stepsData.map((step) => (
            <div key={step.number}>
              <p className="mb-4 text-[32px] font-black leading-none text-[#DC2626]">
                {step.number}
              </p>

              <div className="relative mb-6 h-[2px] w-full bg-gray-600/60">
                <span className="absolute left-0 top-0 h-full w-10 bg-[#DC2626]" />
              </div>

              <h3 className="mb-3 text-[17px] font-bold text-white">{step.title}</h3>

              <p className="max-w-[260px] text-[14px] leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
