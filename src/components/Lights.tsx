export function Lights() {
  return (
    <>
      {/* Soft base fill */}
      <ambientLight intensity={0.4} />

      {/* Key light — strong, casts shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, 10, -10, 0.1, 40]}
        />
      </directionalLight>

      {/* Cool rim spotlight for highlights */}
      <spotLight
        position={[-6, 6, 4]}
        angle={0.32}
        penumbra={0.85}
        intensity={1.6}
        color="#cfe0ff"
        castShadow
      />

      {/* Warm accent point light for specular pop */}
      <pointLight position={[3, -3, 4]} intensity={1.3} color="#ffd9b3" />
    </>
  )
}