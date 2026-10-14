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
    id: "nexus-ai",
    number: "01",
    title: "Nexus AI Platform",
    category: "AI & Neural Analytics",
    tools: "Next.js, TypeScript, Python, TailwindCSS",
    image: "/images/projects/nexus-ai.jpg",
    link: "https://github.com",
  },
  {
    id: "aura-3d",
    number: "02",
    title: "Aura 3D Studio",
    category: "WebGL Spatial Experience",
    tools: "Three.js, React Three Fiber, GLSL, GSAP",
    image: "/images/projects/aura-3d.jpg",
    link: "https://github.com",
  },
  {
    id: "cryptosphere",
    number: "03",
    title: "CryptoSphere Terminal",
    category: "Web3 & DeFi Analytics",
    tools: "React, WebSockets, Ethers.js, Chart.js",
    image: "/images/projects/cryptosphere.jpg",
    link: "https://github.com",
  },
  {
    id: "hyperion-cloud",
    number: "04",
    title: "Hyperion Cloud Console",
    category: "DevOps & Cluster Monitor",
    tools: "Node.js, Docker, Kubernetes, GraphQL",
    image: "/images/projects/hyperion-cloud.jpg",
    link: "https://github.com",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    const getScrollAmount = () => {
      const scrollWidth = workFlex.scrollWidth;
      const viewportWidth = window.innerWidth;
      const amount = scrollWidth - viewportWidth;
      return Math.max(amount, 0);
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
