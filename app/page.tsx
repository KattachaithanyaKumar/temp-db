"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Button from "./components/Button";

const VideoPlayer = dynamic(() => import("@/app/components/VideoPlayer"));

import { INFO_CARDS, STEPS } from "@/data/landingData";
import InfoCard from "./components/InfoCard";
import Footer from "./components/Footer";
import { useCheckAuth } from "./hooks/useCheckAuth";

const Landing = () => {
  useCheckAuth("public");

  return (
    <div>
      <Navbar />
      <main className="max-w-[1000px] mx-auto mt-20 px-4 pb-20">
        <section
          id="hero"
          className="flex items-center justify-between gap-14 h-[500px]"
        >
          <div className="w-1/2 space-y-6">
            <h1 className="text-[48px] font-extrabold leading-tight">
              Instant Mock APIs. <br /> Zero Config.
            </h1>
            <p className="text-(--text-light) text-lg">
              Generate RESTful endpoints from your data schema in seconds.
              Perfect for frontend development, testing, and demos.
            </p>
            <Button variant="primary">Start Building →</Button>
          </div>

          <div className="w-1/2 flex justify-center relative">
            <div className="relative before:absolute before:inset-0 before:blur-3xl before:bg-(--blue) before:opacity-30 before:rounded-full before:scale-125">
              <VideoPlayer />
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="text-center mx-auto w-[70%]">
            <h2 className="text-4xl font-bold leading-tight">Key Features</h2>
            <p className="text-base text-(--text-light) ">
              Everything you need to streamline your development and testing
              workflow without the hassle of a real backend.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            {INFO_CARDS.map((card) => (
              <InfoCard card={card} key={card.title} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mt-30">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-3">How it Works</h2>
              <p className="text-base text-(--text-light) max-w-[600px] mx-auto">
                Get your mock API running in just a few clicks — define your
                data, generate endpoints, and start testing instantly. No
                servers, no setup, no hassle.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              {STEPS.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4 md:w-1/4"
                >
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-(--blue) text-white font-bold text-lg shadow-[0_0_25px_var(--blue)]">
                    {index + 1}
                  </div>

                  <h4 className="text-xl font-semibold">{step.title}</h4>
                  <p className="text-(--text-light) text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing"></section>
        <section id="CTA">
          <div className="relative mt-30 py-20">
            {/* Glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--blue)_0%,transparent_70%)] opacity-40 blur-3xl"></div>

            <div className="relative max-w-[900px] mx-auto text-center p-12 rounded-2xl bg-linear-to-t from-(--blue-dark) to-(--blue) shadow-[0_0_40px_rgba(41,41,218,0.5)] border border-(--blue)">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Ready to accelerate your workflow?
              </h1>

              <p className="text-(--text-light) text-base max-w-[600px] mx-auto mb-8">
                Stop waiting for backends. Start building faster today. Create
                your first temporary API for free — no credit card required.
              </p>

              <Button variant="primary">Get Started for Free</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
