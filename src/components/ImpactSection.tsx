import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/integrations/supabase/client";

gsap.registerPlugin(ScrollTrigger);

const SDGS = [
  {
    num: 1,
    title: "No Poverty",
    color: "#E5243B",
    desc: "Connecting residents to financial aid, housing support, and emergency assistance.",
  },
  {
    num: 3,
    title: "Good Health & Well-being",
    color: "#4C9F38",
    desc: "Matching users with local health services, mental health resources, and clinics.",
  },
  {
    num: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    desc: "Breaking barriers to access — language, digital literacy, bureaucratic complexity.",
  },
];

const STATIC_METRICS = [
  { key: "framework", label: "Agent Framework", value: "OpenClaw" },
  { key: "engine", label: "AI Engine", value: "FLock.io" },
  { key: "routing", label: "LLM Routing", value: "RouteBox" },
  { key: "triage", label: "Avg Triage Time", value: "< 2s" },
];

const METRIC_LABELS: Record<string, string> = {
  sessions: "Sessions",
  plans_generated: "Plans Generated",
  steps_completed: "Steps Completed",
  avg_time_to_plan: "Avg Time-to-Plan",
};

const METRIC_ORDER = ["sessions", "plans_generated", "steps_completed", "avg_time_to_plan"];

const ImpactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState<{ key: string; value: string; label: string }[]>(
    METRIC_ORDER.map((key) => ({ key, value: "—", label: METRIC_LABELS[key] ?? key }))
  );

  useEffect(() => {
    const mapData = (data: { metric_key: string; metric_value: string }[]) =>
      METRIC_ORDER.map((key) => {
        const row = data.find((d) => d.metric_key === key);
        return { key, value: row?.metric_value ?? "—", label: METRIC_LABELS[key] ?? key };
      });

    // Initial fetch
    supabase.from("bot_stats").select("metric_key, metric_value").then(({ data }) => {
      if (data) setMetrics(mapData(data));
    });

    // Realtime subscription
    const channel = supabase
      .channel("bot_stats_realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bot_stats" },
        (payload) => {
          const updated = payload.new as { metric_key: string; metric_value: string };
          setMetrics((prev) =>
            prev.map((m) =>
              m.key === updated.metric_key ? { ...m, value: updated.metric_value } : m
            )
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
      gsap.to(".impact-heading", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="impact-heading text-3xl md:text-5xl font-display italic text-text text-center mb-4">
          Impact & SDGs
        </h2>
        <p className="impact-heading text-muted text-center mb-16 max-w-lg mx-auto">
          Aligned with the UN Sustainable Development Goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {SDGS.map((sdg) => (
            <div
              key={sdg.num}
              className="impact-item group relative overflow-hidden rounded-xl bg-surface p-8 transition-all duration-300 hover:-translate-y-1"
              style={{ borderLeft: `3px solid ${sdg.color}` }}
            >
              <span
                className="block text-5xl font-display italic mb-4 leading-none"
                style={{ color: `${sdg.color}40` }}
              >
                {sdg.num}
              </span>
              <h3 className="text-base font-medium text-text mb-2 tracking-wide uppercase text-[13px]">
                {sdg.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{sdg.desc}</p>
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: `${sdg.color}15` }}
              />
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stroke rounded-xl overflow-hidden mb-8">
          {STATIC_METRICS.map((m) => (
            <div key={m.key} className="impact-item bg-bg text-center py-8 px-4">
              <p className="text-2xl md:text-3xl font-display italic text-text mb-2">{m.value}</p>
              <p className="text-[11px] text-muted uppercase tracking-[0.15em]">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stroke rounded-xl overflow-hidden">
          {metrics.map((m) => (
            <div key={m.key} className="impact-item bg-bg text-center py-8 px-4">
              <p className="text-3xl md:text-4xl font-display italic text-text mb-2">{m.value}</p>
              <p className="text-[11px] text-muted uppercase tracking-[0.15em]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
