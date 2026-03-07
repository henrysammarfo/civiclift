import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-stroke py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-full p-[2px] flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)" }}
          >
            <span className="flex items-center justify-center w-full h-full rounded-full bg-bg text-[10px] font-display italic tracking-tighter text-text">
              CL
            </span>
          </span>
          <span className="text-sm text-muted">
            CivicLift © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/henrysammarfo/civiclift"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://t.me/civilclift_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Telegram
          </a>
          <a
            href="#home"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Back to top ↑
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-muted flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary" /> for the UK AI Agent Hackathon
          </p>
          <p className="text-[10px] text-muted/70 uppercase tracking-widest">
            Powered by FLock.io × RouteBox × OpenClaw
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
