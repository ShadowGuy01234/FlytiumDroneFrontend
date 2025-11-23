import React from "react";
import "./Hero.css";
import { ArrowRight } from "lucide-react";

const Hero = ({ handleOrderPopup }) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://res.cloudinary.com/dzqtx9kms/video/upload/f_auto,q_auto/Drone_Forest_Chase_Hyper_Realistic_Action_jc5zse.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/95 backdrop-blur-sm" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 md:px-12">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300 drop-shadow">
          Flytium Drones
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl">
          A New Chapter in Aerial Innovation
        </h1>
        <p className="mt-6 text-base text-slate-100/90 drop-shadow sm:text-lg md:text-xl">
          Experience next-generation unmanned systems engineered for precision,
          performance, and mission success.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/store"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 transition hover:bg-white"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
          >
            Explore Services
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex">
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-white via-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
