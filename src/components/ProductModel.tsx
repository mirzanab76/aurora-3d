import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

const lerp = THREE.MathUtils.lerp

type Keyframe = {
    at: number
    position: [number, number, number]
    scale: number
    rotation: [number, number, number]
}

// Section-by-section choreography (offset 0 -> 1 across all pages)
const KEYFRAMES: Keyframe[] = [
    { at: 0.0, position: [0, 0, 0], scale: 0.55, rotation: [0, 0, 0] }, // Hero: centered, fully visible
    { at: 0.33, position: [1.7, 0, 0], scale: 0.45, rotation: [0.1, -0.7, 0] }, // About: slides right
    { at: 0.66, position: [0, 0, 0], scale: 0.7, rotation: [0.2, Math.PI, 0] }, // Features: dramatic rotation
    { at: 1.0, position: [-1.5, -0.2, 0], scale: 0.4, rotation: [0, Math.PI * 1.6, 0.1] }, // Footer
]

function sampleKeyframes(offset: number): {
    position: [number, number, number]
    scale: number
    rotation: [number, number, number]
} {
    const o = THREE.MathUtils.clamp(offset, 0, 1)
    let a = KEYFRAMES[0]
    let b = KEYFRAMES[KEYFRAMES.length - 1]

    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
        if (o >= KEYFRAMES[i].at && o <= KEYFRAMES[i + 1].at) {
            a = KEYFRAMES[i]
            b = KEYFRAMES[i + 1]
            break
        }
    }

    const span = b.at - a.at || 1
    const t = THREE.MathUtils.clamp((o - a.at) / span, 0, 1)
    const e = t * t * (3 - 2 * t) // smoothstep easing

    return {
        position: [
            lerp(a.position[0], b.position[0], e),
            lerp(a.position[1], b.position[1], e),
            lerp(a.position[2], b.position[2], e),
        ],
        scale: lerp(a.scale, b.scale, e),
        rotation: [
            lerp(a.rotation[0], b.rotation[0], e),
            lerp(a.rotation[1], b.rotation[1], e),
            lerp(a.rotation[2], b.rotation[2], e),
        ],
    }
}

export function ProductModel() {
    const group = useRef<THREE.Group>(null!)
    const scroll = useScroll()

    useFrame((state, delta) => {
        if (!group.current) return

        const k = sampleKeyframes(scroll.offset)
        // Frame-rate independent damping factor
        const damp = 1 - Math.pow(0.0015, delta)

        // --- Position (with a gentle idle float) ---
        const floatY = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
        group.current.position.x = lerp(group.current.position.x, k.position[0], damp)
        group.current.position.y = lerp(group.current.position.y, k.position[1] + floatY, damp)
        group.current.position.z = lerp(group.current.position.z, k.position[2], damp)

        // --- Scale ---
        const s = lerp(group.current.scale.x, k.scale, damp)
        group.current.scale.set(s, s, s)

        // --- Rotation: scroll keyframe + cursor parallax ---
        const targetRotX = k.rotation[0] + state.pointer.y * 0.25
        const targetRotY = k.rotation[1] + state.pointer.x * 0.4
        group.current.rotation.x = lerp(group.current.rotation.x, targetRotX, damp * 0.6)
        group.current.rotation.y = lerp(group.current.rotation.y, targetRotY, damp * 0.6)
        group.current.rotation.z = lerp(group.current.rotation.z, k.rotation[2], damp * 0.6)
    })

    const lensPositions: Array<[number, number]> = [
        [-0.16, 0.16],
        [0.16, 0.16],
        [0, -0.16],
    ]

    return (
        <group ref={group} dispose={null}>
            {/* Unibody */}
            <RoundedBox args={[2, 4, 0.28]} radius={0.14} smoothness={8} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#1c1c22"
                    metalness={0.75}
                    roughness={0.28}
                    clearcoat={1}
                    clearcoatRoughness={0.15}
                    reflectivity={0.6}
                />
            </RoundedBox>

            {/* Glossy display */}
            <mesh position={[0, 0.05, 0.151]}>
                <planeGeometry args={[1.76, 3.7]} />
                <meshPhysicalMaterial
                    color="#05060a"
                    metalness={0.2}
                    roughness={0.08}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                    emissive="#0a1a3a"
                    emissiveIntensity={0.35}
                />
            </mesh>

            {/* Subtle screen glow */}
            <mesh position={[0, 0.9, 0.153]}>
                <planeGeometry args={[1.4, 0.9]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.18} />
            </mesh>

            {/* Triple-camera module (back) */}
            <group position={[-0.55, 1.35, -0.18]}>
                <RoundedBox args={[0.7, 0.7, 0.08]} radius={0.12} smoothness={6} castShadow>
                    <meshPhysicalMaterial color="#101015" metalness={0.7} roughness={0.3} clearcoat={1} />
                </RoundedBox>
                {lensPositions.map(([x, y], i) => (
                    <mesh key={i} position={[x, y, -0.07]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
                        <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.1} clearcoat={1} />
                    </mesh>
                ))}
            </group>
        </group>
    )
}