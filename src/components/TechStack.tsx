import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillConfig {
  name: string;
  badge: string;
  color: string;
  bg: string;
}

const SKILLS: SkillConfig[] = [
  { name: "React", badge: "⚛", color: "#61DAFB", bg: "#082330" },
  { name: "Next.js", badge: "▲", color: "#FFFFFF", bg: "#1f1d24" },
  { name: "TypeScript", badge: "TS", color: "#3178C6", bg: "#0a1e36" },
  { name: "JavaScript", badge: "JS", color: "#F7DF1E", bg: "#2e2905" },
  { name: "Node.js", badge: "Node", color: "#68A063", bg: "#122611" },
  { name: "Python", badge: "Py", color: "#4584B6", bg: "#0a2133" },
  { name: "Three.js", badge: "3D", color: "#C2A4FF", bg: "#231138" },
  { name: "MongoDB", badge: "Mongo", color: "#47A248", bg: "#0d260e" },
  { name: "MySQL", badge: "SQL", color: "#00758F", bg: "#06222b" },
  { name: "Express", badge: "Ex", color: "#E5E7EB", bg: "#1f2024" },
  { name: "Tailwind", badge: "CSS", color: "#38BDF8", bg: "#0a2433" },
  { name: "Docker", badge: "Docker", color: "#2496ED", bg: "#082138" },
  { name: "GraphQL", badge: "GQL", color: "#E10098", bg: "#360624" },
  { name: "Git", badge: "Git", color: "#F05032", bg: "#361007" },
  { name: "Redux", badge: "Redux", color: "#764ABC", bg: "#1e0e38" },
  { name: "PostgreSQL", badge: "PG", color: "#336791", bg: "#0c1e2e" },
  { name: "C++", badge: "C++", color: "#00599C", bg: "#07182b" },
  { name: "AWS", badge: "AWS", color: "#FF9900", bg: "#362002" },
];

function createBallTexture(skill: SkillConfig): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Background radial gradient
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
  grad.addColorStop(0, skill.bg);
  grad.addColorStop(0.65, "#0e0c14");
  grad.addColorStop(1, "#050408");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Outer glowing ring
  ctx.strokeStyle = skill.color;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle inner accent ring
  ctx.strokeStyle = `${skill.color}55`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 206, 0, Math.PI * 2);
  ctx.stroke();

  // Badge icon with glow
  ctx.save();
  ctx.shadowColor = skill.color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = skill.color;
  ctx.font = "900 115px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(skill.badge, 256, 205);
  ctx.restore();

  // Skill Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 8;
  ctx.fillText(skill.name.toUpperCase(), 256, 335);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

function SkillSphere({
  skill,
  position,
  material,
}: {
  skill: SkillConfig;
  position: [number, number, number];
  material: THREE.Material;
}) {
  const api = useRef<RapierRigidBody>(null);
  const scale = 0.95;

  const handleLaunch = () => {
    api.current?.applyImpulse(
      new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        18 + Math.random() * 14,
        (Math.random() - 0.5) * 16
      ),
      true
    );
  };

  return (
    <RigidBody
      ref={api}
      colliders={false}
      position={position}
      restitution={0.72}
      friction={0.25}
      linearDamping={0.35}
      angularDamping={0.25}
      name={skill.name}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeo}
        material={material}
        onClick={handleLaunch}
        name={skill.name}
      />
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    vec.current.set(x, y, 0);
    ref.current?.setNextKinematicTranslation(vec.current);
  });

  return (
    <RigidBody
      ref={ref}
      type="kinematicPosition"
      colliders={false}
      position={[0, 0, 0]}
    >
      <BallCollider args={[1.7]} />
    </RigidBody>
  );
}

function Boundaries() {
  return (
    <>
      {/* Floor */}
      <CuboidCollider position={[0, -6.6, 0]} args={[20, 1, 10]} restitution={0.6} />
      {/* Left Wall */}
      <CuboidCollider position={[-12.5, 0, 0]} args={[1, 18, 10]} restitution={0.6} />
      {/* Right Wall */}
      <CuboidCollider position={[12.5, 0, 0]} args={[1, 18, 10]} restitution={0.6} />
      {/* Ceiling */}
      <CuboidCollider position={[0, 9.5, 0]} args={[20, 1, 10]} restitution={0.6} />
      {/* Front Glass */}
      <CuboidCollider position={[0, 0, 4.5]} args={[20, 18, 1]} restitution={0.6} />
      {/* Back Wall */}
      <CuboidCollider position={[0, 0, -4.5]} args={[20, 18, 1]} restitution={0.6} />
    </>
  );
}

const TechStack = () => {
  useEffect(() => {
    // Refresh scroll triggers when techstack is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const materials = useMemo(() => {
    return SKILLS.map((skill) => {
      const texture = createBallTexture(skill);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.35,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
    });
  }, []);

  return (
    <div className="techstack" id="techstack">
      <div className="techstack-header">
        <h2>My Techstack</h2>
        <p className="techstack-subtitle">
          ⚡ Interactive Physics Ball Pit — Drag to kick, click to bounce!
        </p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 16], fov: 42, near: 0.1, far: 100 }}
        className="tech-canvas"
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.35;
        }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 16, 12]} intensity={2.6} castShadow />
        <directionalLight position={[-10, 10, -6]} intensity={1.2} color="#c2a4ff" />
        <pointLight position={[0, -4, 6]} intensity={1.2} color="#ffffff" />

        <Physics gravity={[0, -18, 0]}>
          <Boundaries />
          <Pointer />
          {SKILLS.map((skill, index) => {
            const col = index % 6;
            const row = Math.floor(index / 6);
            const x = (col - 2.5) * 2.8 + (Math.random() - 0.5) * 0.4;
            const y = 3.5 + row * 2.2 + Math.random() * 0.4;
            const z = (Math.random() - 0.5) * 1.5;
            return (
              <SkillSphere
                key={skill.name}
                skill={skill}
                position={[x, y, z]}
                material={materials[index]}
              />
            );
          })}
        </Physics>
      </Canvas>
    </div>
  );
};

export default TechStack;
