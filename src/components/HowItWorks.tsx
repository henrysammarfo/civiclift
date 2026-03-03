import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Message",
    desc: "A resident reaches out via Telegram — plain language, any time.",
    accent: "#89AACC",
  },
  {
    num: "02",
    title: "Triage",
    desc: "The agent parses urgency, identifies the category, and maps the need.",
    accent: "#6B9CC4",
  },
  {
    num: "03",
    title: "Match",
    desc: "Local services are surfaced — food banks, clinics, shelters, legal aid.",
    accent: "#5A8DB8",
  },
  {
    num: "04",
    title: "Act",
    desc: "A tailored action plan — call scripts, drafts, reminders — is delivered.",
    accent: "#4E85BF",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
      gsap.to(".hiw-heading", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="hiw-heading text-3xl md:text-5xl font-display italic text-text text-center mb-4">
          How It Works
        </h2>
        <p className="hiw-heading text-muted text-center mb-16 max-w-lg mx-auto">
          Four steps from need to action — fully autonomous.
        </p>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-stroke" />

          {STEPS.map((step, i) => (
            <div key={i} className="step-card relative flex flex-col items-center text-center px-6 py-8">
              {/* Number circle */}
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${step.accent}15, transparent 70%)`,
                  border: `1px solid ${step.accent}30`,
                }}
              >
                <span
                  className="text-3xl font-display italic"
                  style={{ color: step.accent }}
                >
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-display italic text-text mb-3">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
