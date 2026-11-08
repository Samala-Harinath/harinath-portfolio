"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Pointer-reactive low-poly sculpture. Pauses off-screen, when the tab
 * is hidden, and when the user prefers reduced motion.
 */
export function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.setAttribute("aria-hidden", "true");
    wrap.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(1.55, 0.62, 6.15);
    camera.lookAt(0, 0, 0);

    const root = new THREE.Group();
    scene.add(root);

    const gemGeo = new THREE.IcosahedronGeometry(1.32, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b0764,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.18,
      flatShading: true,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    root.add(gem);

    const wireGeo = new THREE.IcosahedronGeometry(1.38, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.36,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    root.add(wire);

    const coreGeo = new THREE.OctahedronGeometry(0.34, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xf5f3ff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    const ringGeo = new THREE.TorusGeometry(2.18, 0.011, 16, 180);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.72,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = 0.25;
    root.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.62, 0.006, 12, 160);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.38,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 1.65;
    ring2.rotation.z = 0.45;
    root.add(ring2);

    const orbit = new THREE.Group();
    root.add(orbit);
    const shardGeo = new THREE.OctahedronGeometry(0.085, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xe9d5ff,
      metalness: 0.75,
      roughness: 0.22,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.45,
    });
    const shards: THREE.Mesh[] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / count) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 2.18, Math.sin(angle * 2) * 0.28, Math.sin(angle) * 2.18);
      orbit.add(shard);
      shards.push(shard);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.38));

    const key = new THREE.DirectionalLight(0xfff7ff, 1.05);
    key.position.set(4.2, 5.2, 6);
    scene.add(key);

    const violet = new THREE.PointLight(0x7c3aed, 22, 14);
    violet.position.set(-2.8, 1.4, 2.2);
    scene.add(violet);

    const cyan = new THREE.PointLight(0x22d3ee, 12, 14);
    cyan.position.set(3.1, -1.2, 2.4);
    scene.add(cyan);

    const rim = new THREE.DirectionalLight(0xc4b5fd, 0.85);
    rim.position.set(-5, -2.2, -3);
    scene.add(rim);

    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (width < 2 || height < 2) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    const timer = new THREE.Timer();
    timer.connect(document);
    let elapsed = 0;
    let frame = 0;
    let running = true;

    const draw = (dt: number) => {
      elapsed += dt;
      root.position.y = Math.sin(elapsed * 0.7) * 0.12;
      gem.rotation.y = elapsed * 0.22;
      gem.rotation.x = Math.sin(elapsed * 0.32) * 0.16;
      wire.rotation.copy(gem.rotation);
      core.rotation.y = -elapsed * 0.55;
      core.rotation.x = elapsed * 0.3;
      ring.rotation.z = elapsed * 0.16;
      ring2.rotation.z = -elapsed * 0.11;
      orbit.rotation.y = elapsed * 0.32;
      shards.forEach((shard, index) => {
        shard.rotation.x = elapsed * 0.9 + index;
        shard.rotation.y = elapsed * 0.45;
      });
      const targetY = pointer.x * 0.42;
      const targetX = pointer.y * 0.26;
      root.rotation.y += (targetY - root.rotation.y) * 0.06;
      root.rotation.x += (targetX - root.rotation.x) * 0.06;
      renderer.render(scene, camera);
    };

    const tick = () => {
      if (!running) return;
      timer.update();
      draw(Math.min(timer.getDelta(), 0.05));
      frame = requestAnimationFrame(tick);
    };

    if (reduce) {
      draw(0);
    } else {
      tick();
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
        return;
      }
      if (reduce) return;
      timer.update();
      running = true;
      tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const applyTheme = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      gemMat.color.set(light ? 0x6d28d9 : 0x3b0764);
      gemMat.emissive.set(light ? 0x4c1d95 : 0x5b21b6);
      gemMat.emissiveIntensity = light ? 0.08 : 0.18;
      gemMat.roughness = light ? 0.34 : 0.28;
      wireMat.color.set(light ? 0x5b21b6 : 0xc4b5fd);
      wireMat.opacity = light ? 0.26 : 0.36;
      ringMat.color.set(light ? 0x0e7490 : 0x67e8f9);
      ring2Mat.color.set(light ? 0x6d28d9 : 0xa78bfa);
      coreMat.color.set(light ? 0xede9fe : 0xf5f3ff);
      shardMat.color.set(light ? 0x7c3aed : 0xe9d5ff);
      shardMat.emissiveIntensity = light ? 0.15 : 0.45;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      timer.disconnect();
      timer.dispose();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      themeObserver.disconnect();
      gemGeo.dispose();
      gemMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === wrap) wrap.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} className="absolute inset-0" aria-hidden />;
}
