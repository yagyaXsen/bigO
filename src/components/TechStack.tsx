"use client";

import type { ReactElement } from "react";
import { useInUp, useSlideDownLine } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface TechItem {
  name: string;
  key: string;
}

// Row-major order across 3 columns:
// [Angular, React, Vue.js] / [PHP, C#, JavaScript] / [Python, C++, Flutter] / [Android, iOS, .NET]
const TECH_ITEMS: TechItem[] = [
  { name: "Angular", key: "angular" },
  { name: "React", key: "react" },
  { name: "Vue.js", key: "vue" },
  { name: "PHP", key: "php" },
  { name: "C#", key: "csharp" },
  { name: "JavaScript", key: "javascript" },
  { name: "Python", key: "python" },
  { name: "C++", key: "cpp" },
  { name: "Flutter", key: "flutter" },
  { name: "Android", key: "android" },
  { name: "iOS", key: "ios" },
  { name: ".NET", key: "dotnet" },
];

const TECH_ICONS: Record<string, ReactElement> = {
  angular: (
    <svg viewBox="0 0 256 272" fill="currentColor" aria-hidden="true">
      <path d="M103,143.6l23.3-55.4,26.5,55.4h-49.8ZM255.1,44.7l-20.9,166.4-108.3,60-106.6-59.2L0,45.5,125.9.7l129.2,44ZM208.2,207.2L126.1,32.3,47.7,206.7l29.3-.5,15.7-39.3h70.3l17.2,39.8,28,.5Z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 225.8 201.2" fill="currentColor" aria-hidden="true">
      <path d="M185.7,65.2c-2.3-.8-4.8-1.6-7.3-2.3.4-1.7.8-3.3,1.1-5,5.5-26.7,1.9-48.3-10.4-55.3-11.8-6.8-31.1.3-50.5,17.2-1.9,1.6-3.7,3.4-5.6,5.2-1.3-1.2-2.5-2.4-3.7-3.5C88.9,3.4,68.4-4.3,56.2,2.9c-11.8,6.8-15.3,27.1-10.3,52.4.5,2.4,1,4.9,1.7,7.5-2.9.8-5.7,1.7-8.4,2.6C15.3,73.7,0,86.8,0,100.4s16.4,28,41.3,36.6c2,.7,4,1.3,6.1,1.9-.7,2.7-1.3,5.4-1.8,8.1-4.7,24.9-1,44.7,10.7,51.4,12.1,7,32.5-.2,52.3-17.5,1.6-1.4,3.1-2.8,4.7-4.3,2,2,4.1,3.8,6.1,5.6,19.2,16.5,38.2,23.2,49.9,16.4,12.1-7,16.1-28.2,10.9-54.1-.4-2-.8-4-1.4-6,1.4-.4,2.8-.9,4.2-1.3,25.9-8.6,42.8-22.5,42.8-36.6s-15.8-26.8-40.2-35.2ZM43,140M113,181a13,13 0 1,0 0.1,0.1Z" />
      <circle cx="112.9" cy="100.6" r="18.5" />
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 512 416.2" fill="currentColor" aria-hidden="true">
      <path d="M256,96.1L200.5,0h-79.4l134.9,233.7L390.9,0h-79.4l-55.5,96.1ZM409.4,0l-153.4,265.7L102.6,0H15.7l240.3,416.2L496.3,0h-86.9Z" />
    </svg>
  ),
  php: (
    <svg viewBox="0 0 2500 1309" fill="currentColor" aria-hidden="true">
      <path d="M839,547.9c-8.6,145.6-77.1,171.2-154.1,179.8h-102.7l42.8-256.9h111.3c59.9,0,102.7,25.7,102.7,77.1ZM1883.6,470.9h-111.3l-42.8,256.9h102.8c77.1-8.6,145.5-34.2,154.1-179.8,0-51.4-42.8-77.1-102.7-77.1ZM2500,650.7c0,359.4-559.6,650.7-1250,650.7S0,1010,0,650.7,559.6,0,1250,0s1250,291.3,1250,650.7ZM1010.3,539.4c0-119.9-68.5-188.4-205.5-196.9h-316.8l-137,693.5h162.7l34.2-179.8h154.1c145.6,8.6,308.2-111.3,308.2-316.8ZM1398,539.4l-59.9,316.8h171.2l59.9-351c17.1-85.6-34.2-154.1-171.2-162.7h-154.1l34.2-179.8h-162.7l-137,693.5h162.7l77.1-385.3h128.4c59.9,0,59.9,25.7,51.4,68.5ZM2157.5,539.4c0-119.9-68.5-188.4-205.5-196.9h-316.8l-137,693.5h162.7l34.2-179.8h154.1c145.5,8.6,308.2-111.3,308.2-316.8Z" />
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 256 288" fill="currentColor" aria-hidden="true">
      <path d="M255.6,84.5c0-4.8-1-9.1-3.1-12.8-2.1-3.6-5.1-6.6-9.2-9-34-19.6-68.1-39.2-102.1-58.8-9.2-5.3-18.1-5.1-27.2.3C100.5,12.2,32.7,51,12.4,62.7c-8.3,4.8-12.4,12.2-12.4,21.7v118.4c0,4.7,1,8.9,3,12.5,2.1,3.7,5.2,6.8,9.4,9.3,20.2,11.7,88,50.5,101.6,58.5,9.1,5.4,18,5.6,27.2.3,34-19.6,68.1-39.2,102.1-58.8,4.2-2.4,7.3-5.5,9.4-9.3,2-3.6,3-7.8,3-12.5v-118.3ZM129.5,238.6h-1.1c-35.3,0-66-19.2-82.4-47.7-8-13.9-12.6-30.1-12.6-47.3,0-52.5,42.5-95,95-95s65.6,19,82.1,47.2l-41.3,23.8c-8.1-13.8-23.1-23.1-40.2-23.3h-.5c-26.1,0-47.3,21.2-47.3,47.3s2.3,16.6,6.2,23.5c8.2,14.2,23.5,23.8,41.1,23.8s33.1-9.7,41.2-24.1l41.3,23.9c-16.3,28.1-46.5,47.2-81.3,47.5ZM235.6,136.5h-13.5v13.5h13.5v6.7h-13.5v13.5h-6.7v-13.5h-13.5v13.5h-6.7v-13.5h-13.5v-6.7h13.5v-13.5h-13.5v-6.7h13.5v-13.5h6.7v13.5h13.5v-13.5h6.7v13.5h13.5v6.7Z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M0,0v256h256V0H0ZM139.3,199.7c0,24.9-14.6,36.3-35.9,36.3s-30.4-10-36.1-22l19.6-11.9c3.8,6.7,7.2,12.4,15.5,12.4s12.9-3.1,12.9-15.1v-81.8h24.1v82.1ZM196.2,235.9c-22.3,0-36.8-10.7-43.8-24.6l19.6-11.3c5.2,8.4,11.9,14.6,23.7,14.6s16.3-5,16.3-11.9-6.5-11.2-17.5-16l-6-2.6c-17.4-7.4-28.9-16.7-28.9-36.3s13.7-31.8,35.2-31.8,26.3,5.3,34.2,19.2l-18.7,12c-4.1-7.4-8.6-10.3-15.5-10.3s-11.5,4.5-11.5,10.3,4.5,10.1,14.8,14.6l6,2.6c20.4,8.8,32,17.7,32,37.8s-17,33.5-39.9,33.5Z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.93,0C4.86,0,5.17,2.21,5.17,2.21v2.29h4.85v.68H3.25S0,4.82,0,9.97,2.83,14.94,2.83,14.94h1.69v-2.39s-.09-2.85,2.78-2.85h4.81s2.7.05,2.7-2.62V2.67S15.23,0,9.93,0ZM7.26,1.54c.49,0,.87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87ZM10.07,20c5.07,0,4.86-2.21,4.86-2.21v-2.29h-4.85v-.68h6.77s3.25.37,3.25-4.78-2.83-4.9-2.83-4.9h-1.69v2.39s.09,2.85-2.78,2.85h-4.81s-2.7-.05-2.7,2.62v4.4S4.77,20,10.07,20ZM12.74,18.46c-.49,0-.87-.39-.87-.87s.39-.87.87-.87.87.39.87.87-.39.87-.87.87Z" />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 18 20" fill="currentColor" aria-hidden="true">
      <path d="M18,5.88c0-.34-.07-.63-.22-.89-.15-.25-.36-.46-.65-.63C14.72,3,12.33,1.63,9.93.27,9.29-.1,8.66-.08,8.02.29,7.07.84,2.3,3.54.87,4.36.29,4.7,0,5.21,0,5.87v8.24c0,.33.07.62.21.87.15.26.36.48.66.64,1.42.81,6.2,3.52,7.15,4.07.64.37,1.27.38,1.91.02,2.39-1.36,4.8-2.73,7.19-4.09.3-.17.51-.39.66-.64l-3.6-2.06c-1.03,1.78-2.97,2.98-5.19,2.98s-4.16-1.19-5.19-2.97c-.5-.87-.79-1.87-.79-2.94,0-3.26,2.67-5.9,5.98-5.9,2.14,0,4.02,1.11,5.09,2.78l3.63-2.07Z" />
      <path d="M14.5,8.4h1.2v1.2h1.2v1.2h-1.2v1.2h-1.2v-1.2h-1.2v-1.2h1.2v-1.2Z" />
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 16 20" fill="currentColor" aria-hidden="true">
      <path d="M16,9.23L10.65,14.64,16,20.05H9.91L7.61,17.72,4.56,14.64,9.91,9.23H16ZM9.91,0L0,10.02,3.04,13.1,16,0H9.91Z" />
    </svg>
  ),
  android: (
    <svg viewBox="0 0 351.8 198.8" fill="currentColor" aria-hidden="true">
      <path d="M256.9,148.5c-8.1,0-14.7-6.6-14.7-14.7s6.6-14.7,14.7-14.7,14.7,6.6,14.7,14.7c0,8.1-6.6,14.7-14.7,14.7M94.9,148.5c-8.1,0-14.7-6.6-14.7-14.7s6.6-14.7,14.7-14.7,14.7,6.6,14.7,14.7c0,8.1-6.6,14.7-14.7,14.7M262.1,60.4l29.3-51c1.2-3.3-.5-7-3.8-8.2-2.1-.8-4.5-.4-6.3,1.1-.2.3-.4.6-.5,1l-29.6,51.6c-47.9-21.5-102.7-21.5-150.7,0L70.9,3.6c-2.3-2.6-6.3-2.9-9-.6-1.6,1.4-2.4,3.6-2.1,5.7,0,.4.3.7.6,1l29.2,51C38.3,88.6,4.6,140.6,0,198.8h351.8c-4.6-58.3-38.3-110.4-89.7-138.4" />
    </svg>
  ),
  ios: (
    <svg viewBox="0 0 257 128" fill="currentColor" aria-hidden="true">
      <path d="M1.9,125h21.2V34.9H1.9v90.1ZM12.4,23c6.6,0,11.8-5.1,11.8-11.5S19,0,12.4,0,.7,5.1.7,11.6s5.2,11.5,11.7,11.5ZM93.5.3C57.7.3,35.3,24.7,35.3,63.7s22.4,63.3,58.2,63.3,58.2-24.3,58.2-63.3S129.2.3,93.5.3ZM93.5,19c21.8,0,35.8,17.3,35.8,44.7s-13.9,44.6-35.8,44.6-35.8-17.3-35.8-44.6,13.9-44.7,35.8-44.7ZM160.6,90.5c.9,22.6,19.5,36.6,47.7,36.6s48.4-14.6,48.4-37.9-10.5-28.6-35.5-34.3l-14.1-3.2c-15-3.6-21.3-8.3-21.3-16.5s9.4-17,23.2-17,23.6,6.9,24.7,18.4h20.9C254.1,14.9,236.3.3,209.2.3s-45.7,14.7-45.7,36.5,10.7,28.4,33.3,33.6l15.9,3.7c15.5,3.7,21.8,8.8,21.8,17.6s-10.3,17.5-25.1,17.5-26.3-7.4-27.6-18.7h-21.3Z" />
    </svg>
  ),
  dotnet: (
    <svg viewBox="0 0 212.6 79.4" fill="currentColor" aria-hidden="true">
      <path d="M116.2,69.8h32.3v8.2h-41.4V0h39.6v8.2h-30.4v26h28.2v8.2h-28.2v27.3ZM157.1,8.2h22.5v69.8h9.1V8.2h22.5V0h-54.1v8.2ZM7.4,67.1c-1.7,0-3.1.6-4.3,1.8-1.2,1.2-1.8,2.7-1.8,4.4s.6,3.1,1.8,4.4c1.2,1.2,2.6,1.8,4.3,1.8s3.2-.6,4.4-1.8c1.2-1.2,1.8-2.7,1.8-4.4s-.6-3.1-1.8-4.4c-1.2-1.2-2.7-1.8-4.4-1.8ZM80.7,66L38.8,0h-11.9v78.1h9.1V11.1l42.6,67h11.1V0h-9.1v66Z" />
    </svg>
  ),
};

export function TechStack() {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const subRef = useInUp<HTMLDivElement>();
  const gridRef = useSlideDownLine<HTMLDivElement>(".tech-row", ".tech-inner");

  return (
    <section
      id="tech-stack"
      className="mxd-container py-[clamp(80px,10vw,150px)]"
    >
      <div className="grid grid-cols-12 gap-y-16">
        {/* Counter T/04 */}
        <div ref={counterRef} className="col-span-12 md:col-span-2">
          <span className="mxd-counter block text-[clamp(48px,6vw,80px)] leading-none text-muted-foreground">
            <ScrambleText text="T/04" triggerOn="hover" />
          </span>
        </div>

        {/* Heading */}
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <h2
            ref={titleRef}
            className="mxd-display font-medium text-[clamp(48px,7.5vw,96px)] leading-[1.05] tracking-[-0.02em] text-[color:var(--ink)]"
          >
            Our tech
            <br />
            stack
          </h2>
        </div>

        {/* Sub-line (lower-left) */}
        <div ref={subRef} className="col-span-12 md:col-span-3">
          <p className="max-w-[280px] font-sans font-medium text-[clamp(16px,1.2vw,19px)] leading-[1.4]">
            <span className="text-[color:var(--ink)]">A powerhouse in </span>
            <span className="text-muted-foreground">
              full-stack development solutions
            </span>
          </p>
        </div>

        {/* Tech grid — slideDownLine: names drop from behind the top border */}
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-x-12 md:grid-cols-2 xl:grid-cols-3"
          >
            {TECH_ITEMS.map((item) => (
              <div key={item.key} className="tech-row border-t border-border">
                <div className="overflow-hidden">
                  <div className="tech-inner flex items-center gap-4 py-[clamp(20px,2vw,32px)]">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E6E1DF] text-[color:var(--ink)] [&_svg]:size-5 md:size-12 md:[&_svg]:size-6">
                      {TECH_ICONS[item.key]}
                    </span>
                    <span className="font-sans font-medium text-[clamp(18px,1.4vw,22px)] leading-none text-[color:var(--ink)]">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
