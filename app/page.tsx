import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Button from "./components/Button";

const VideoPlayer = dynamic(() => import("@/app/components/VideoPlayer"));

const Landing = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-[1000px] mx-auto mt-20 px-4">
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

          <div className="w-1/2 flex justify-center">
            <VideoPlayer />
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="text-center">
            <h2 className="text-[36px] font-bold">Key Features</h2>
            <p className="text-base text-(--text-light)">
              Everything you need to streamline your development and testing
              workflow without the hassle of a real backend.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
