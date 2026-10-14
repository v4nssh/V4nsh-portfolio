import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "medinotes",
    number: "01",
    title: "MediNotes Platform",
    category: "EdTech · 1M+ Views & ₹20k+ Revenue",
    tools: "Next.js, TypeScript, PostgreSQL, Razorpay",
    image: "/images/projects/medinotes.jpg",
    link: "https://medinotes.in",
  },
  {
    id: "tropos",
    number: "02",
    title: "Tropos Intelligence",
    category: "Atmospheric Telemetry & Hotspot AI",
    tools: "Next.js, Google Earth Engine, ISRO INSAT-3DR, Gemini",
    image: "/images/projects/tropos.jpg",
    link: "https://troposs.vercel.app",
  },
  {
    id: "kisanflow",
    number: "03",
    title: "KisanFlow Platform",
    category: "Smart India Hackathon 2026 Shortlisted",
    tools: "Next.js, Python, Supabase, Queue Telemetry",
    image: "/images/projects/cryptosphere.jpg",
    link: "https://github.com/v4nssh",
  },
  {
    id: "atmospheric-engine",
    number: "04",
    title: "Atmospheric Telemetry Engine",
    category: "PyData Indore Hackathon · Runner-Up",
    tools: "Python, Gemma AI, ISRO Satellite Data, GEE",
    image: "/images/projects/hyperion-cloud.jpg",
    link: "https://github.com/v4nssh",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    const getScrollAmount = () => {
      const boxes = workFlex.querySelectorAll(".work-box");
      if (boxes.length === 0) return 0;
      const lastBox = boxes[boxes.length - 1] as HTMLElement;
      const totalWidth = lastBox.offsetLeft + lastBox.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = totalWidth - viewportWidth + 60;
      return Math.max(needed, 0);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work-pin",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      timeline.kill();
      ScrollTrigger.getById("work-pin")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
