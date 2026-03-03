import { useEffect, useRef } from "react";
import { MessageSquare, Brain, Search, ClipboardCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { icon: MessageSquare, title: "User sends a message", desc: "Via Telegram or WhatsApp — describe what you need help with." },
  { icon: Brain, title: "Agent triages", desc: "Understands urgency, category, and the specific need using AI reasoning." },
  { icon: Search, title: "Services matched", desc: "Finds relevant local resources — food banks, shelters, health clinics." },
  { icon: ClipboardCheck, title: "Action plan delivered", desc: "Call scripts, email drafts, step-by-step guides, and follow-up reminders." },
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
      // Parallax on heading
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
        <h2 className="hiw-heading text-3xl md:text-5xl font-display italic text-text text-center mb-4">How It Works</h2>
        <p className="hiw-heading text-muted text-center mb-16 max-w-lg mx-auto">Four steps from need to action — fully autonomous.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="step-card rounded-2xl border border-stroke bg-surface p-6 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #89AACC33, #4E85BF22)" }}>
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted font-mono">0{i + 1}</span>
              <h3 className="text-lg font-semibold text-text">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
