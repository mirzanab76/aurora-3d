import { Suspense } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import {
  ScrollControls,
  Scroll,
  Environment,
  ContactShadows,
  Preload,
} from "@react-three/drei"
import { Lights } from "./components/Lights"
import { ProductModel } from "./components/ProductModel"
import { Sections } from "./components/Sections"
import { Navbar } from "./components/Navbar"

const cameraSettings = {
  position: [0, 0, 6] as [number, number, number],
  fov: 35,
}

const glSettings = {
  antialias: true,
  alpha: false,
}

export default function App() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#06070b] text-white">
      <Navbar />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={cameraSettings} 
        gl={glSettings} 
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
        }}
      >
        <color attach="background" args={["#06070b"]} />
        <fog attach="fog" args={["#06070b", 9, 22]} />

        <Lights />

        <Suspense fallback={null}>
          {/* HDRI-based reflections for premium material realism */}
          <Environment preset="city" />

          <ScrollControls pages={4} damping={0.3}>
            <ProductModel />
            <ContactShadows position={[0, -3, 0]} opacity={0.45} scale={25} blur={3} far={6} />

            <Scroll html>
              <Sections />
            </Scroll>
          </ScrollControls>

          <Preload all />
        </Suspense>
      </Canvas>
    </main>
  )
}