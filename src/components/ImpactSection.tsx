import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SDGS = [
  { num: 1, title: "No Poverty", color: "#E5243B", desc: "Connecting residents to financial aid, housing support, and emergency assistance." },
  { num: 3, title: "Good Health", color: "#4C9F38", desc: "Matching users with local health services, mental health resources, and clinics." },
  { num: 10, title: "Reduced Inequalities", color: "#DD1367", desc: "Breaking barriers to access — language, digital literacy, bureaucratic complexity." },
];

const METRICS = [
  { label: "Sessions", value: "1,240+" },
  { label: "Plans Generated", value: "890" },
  { label: "Steps Completed", value: "3,200+" },
  { label: "Avg Time-to-Plan", value: "< 2 min" },
];

const ImpactSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display italic text-text text-center mb-4">Impact & SDGs</h2>
        <p className="text-muted text-center mb-16 max-w-lg mx-auto">Aligned with the UN Sustainable Development Goals.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SDGS.map((sdg) => (
            <div key={sdg.num} className="impact-item rounded-2xl border border-stroke bg-surface p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: sdg.color }}>
                  {sdg.num}
                </span>
                <h3 className="text-lg font-semibold text-text">{sdg.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{sdg.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m) => (
            <div key={m.label} className="impact-item text-center p-6 rounded-2xl border border-stroke bg-surface">
              <p className="text-2xl md:text-3xl font-display text-text mb-1">{m.value}</p>
              <p className="text-xs text-muted uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
