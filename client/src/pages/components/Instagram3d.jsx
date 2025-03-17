import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { ObjectLoader } from "three";

const InstagramModel = ({ modelPath }) => {
  const model = useLoader(ObjectLoader, modelPath);

  return <primitive object={model} scale={1} />;
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <InstagramModel modelPath="../../../public/instagram.json" />
    </Canvas>
  );
};

export default Scene;
