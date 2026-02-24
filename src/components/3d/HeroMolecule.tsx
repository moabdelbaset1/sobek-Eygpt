"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import { Color } from 'three';

function Atom({ position, color = "#2563eb", size = 0.2 }: { position: [number, number, number], color?: string, size?: number }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
                color={color}
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

function Bond({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
    const startVec = new Float32Array(start);
    const endVec = new Float32Array(end);
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    const dist = Math.sqrt(
        Math.pow(end[0] - start[0], 2) +
        Math.pow(end[1] - start[1], 2) +
        Math.pow(end[2] - start[2], 2)
    );

    return (
        <mesh position={[midX, midY, midZ]} rotation={[0, 0, Math.atan2(end[1] - start[1], end[0] - start[0])]}>
            <cylinderGeometry args={[0.05, 0.05, dist, 8]} />
            <meshStandardMaterial color="#cbd5e1" opacity={0.3} transparent />
        </mesh>
    );
}

function DNAHelix() {
    const groupRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1; // Slower rotation
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    const points = [];
    const count = 15; // Fewer points for clarity
    const radius = 3;
    const height = 10;

    for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2; // Less twists
        const y = (t - 0.5) * height;

        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;

        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        points.push({
            p1: [x1, y, z1] as [number, number, number],
            p2: [x2, y, z2] as [number, number, number],
            color1: "#3504fb", // Red
            color2: "#f30404"  // Blue
        });
    }

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]} position={[2, 0, 0]}>
            {points.map((p, i) => (
                <group key={i}>
                    <Atom position={p.p1} color={p.color1} size={0.5} />
                    <Atom position={p.p2} color={p.color2} size={0.5} />
                    <mesh position={[(p.p1[0] + p.p2[0]) / 2, p.p1[1], (p.p1[2] + p.p2[2]) / 2]}
                        rotation={[0, -Math.atan2(p.p2[2] - p.p1[2], p.p2[0] - p.p1[0]), Math.PI / 2]}>
                        <cylinderGeometry args={[0.08, 0.08, radius * 2, 12]} />
                        <meshStandardMaterial color="#f6f2f2" opacity={0.6} transparent />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function Molecules() {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <DNAHelix />
        </Float>
    );
}

function ParticleField() {
    const ref = useRef<any>(null);
    // @ts-ignore
    const sphere = useMemo(() => random.inSphere(new Float32Array(1500), { radius: 12 }), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta / 60;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.04}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
}

export default function HeroMolecule() {
    return (
        <div className="absolute inset-0 z-0 opacity-100">
            <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, 0, -10]} intensity={2} color="#3b82f6" />
                <pointLight position={[0, -10, 0]} intensity={1} color="#ef4444" />

                <ParticleField />
                <Molecules />

                <fog attach="fog" args={['#0f172a', 5, 30]} />
            </Canvas>
        </div>
    );
}
