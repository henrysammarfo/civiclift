import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Cpu, Code2, Database, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STACK = [
  { icon: Bot, name: "OpenClaw", desc: "Agent orchestration framework powering CivicLift's autonomous reasoning." },
  { icon: Cpu, name: "FLock API", desc: "Open-source LLM inference via Qwen for natural language understanding." },
  { icon: Code2, name: "TypeScript", desc: "End-to-end type safety across the entire agent pipeline." },
  { icon: Database, name: "SQLite", desc: "Lightweight persistent storage for session state and service data." },
  { icon: Send, name: "Telegram", desc: "Primary user interface — accessible, instant, no app download needed." },
];

const TechStack = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tech-stack" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display italic text-text text-center mb-4">Tech Stack</h2>
        <p className="text-muted text-center mb-16 max-w-lg mx-auto">Built with open-source tools for maximum transparency and extensibility.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK.map((item, i) => (
            <div key={i} className="tech-card rounded-2xl border border-stroke bg-surface p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #89AACC22, #4E85BF18)" }}>
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text mb-1">{item.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
