import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hls from "hls.js";

const ROLES = ["Triage Needs", "Find Services", "Build Action Plans", "Track Impact"];
const VIDEO_SRC = "https://stream.mux.com/Gs3wZfrtz6ZfqZqQ02c02Z7lugV00FGZvRpcqFTel66r3g.m3u8";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
      video.play().catch(() => {});
    }
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.1);
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cycling roles
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          UK AI AGENT HACKATHON '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text mb-6">
          CivicLift
        </h1>

        <p className="blur-in text-lg md:text-xl lg:text-2xl text-muted mb-10">
          An AI agent that{" "}
          <span key={roleIndex} className="inline-block font-display italic text-text animate-role-fade-in">
            {ROLES[roleIndex]}
          </span>
        </p>

        <p className="blur-in text-sm md:text-base text-muted leading-relaxed max-w-md mx-auto mb-12">
          An autonomous AI agent that turns urgent needs into completed steps — matching residents to local services,
          generating action plans, and tracking real impact. Aligned with UN SDGs 1, 3 &amp; 10.
        </p>

        <div className="blur-in flex items-center justify-center gap-4">
          <a
            href="#how-it-works"
            className="group relative px-7 py-3.5 bg-text text-bg text-sm rounded-full font-medium transition-transform hover:scale-105"
          >
            See How It Works
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-7 py-3.5 text-text text-sm rounded-full border-2 border-stroke transition-transform hover:scale-105 overflow-hidden"
          >
            <span
              className="absolute inset-0 -m-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)" }}
            />
            <span className="relative z-10 flex items-center gap-1 bg-bg rounded-full px-7 py-3.5 -m-[2px] border-0">
              View on GitHub
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke overflow-hidden">
          <div className="w-full h-1/2 bg-text animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
