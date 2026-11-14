"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Pointer-reactive low-poly sculpture.
 *
 * Framing is computed from the scene bounding sphere every resize, so the
 * composition is always fully inside the frustum regardless of container
 * aspect ratio — it never crops on narrow / portrait containers.
 *
 * Pauses off-screen, when the tab is hidden, and when the user prefers
 * reduced motion.
 */

/** Vertical field of view. Narrow enough to stay flattering, wide enough to frame well. */
const FOV = 40;
/** Radius of the sphere that contains every object + its animation travel. */
const SCENE_RADIUS = 2.52;
/** Breathing room between the sculpture and the canvas edge. */
const FIT_MARGIN = 1.16;
/** Camera direction (normalised at runtime) — a gentle 3/4 angle. */
const VIEW_DIR = new THREE.Vector3(0.26, 0.15, 1).normalize();

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motionQuery.matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.setAttribute("aria-hidden", "true");
    wrap.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);

    const root = new THREE.Group();
    scene.add(root);

    /* ── core sculpture ─────────────────────────────────────────── */

    const gemGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b0764,
      metalness: 0.6,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.16,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.2,
      flatShading: true,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    root.add(gem);

    const wireGeo = new THREE.IcosahedronGeometry(1.27, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    root.add(wire);

    const haloGeo = new THREE.IcosahedronGeometry(1.52, 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    root.add(halo);

    const coreGeo = new THREE.OctahedronGeometry(0.3, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xf5f3ff, transparent: true });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    /* ── orbital rings ──────────────────────────────────────────── */

    const ringGeo = new THREE.TorusGeometry(1.84, 0.009, 12, 200);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = 0.25;
    root.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.26, 0.006, 10, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 1.65;
    ring2.rotation.z = 0.45;
    root.add(ring2);

    /* ── orbiting shards ────────────────────────────────────────── */

    const orbit = new THREE.Group();
    root.add(orbit);
    const shardGeo = new THREE.OctahedronGeometry(0.082, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xe9d5ff,
      metalness: 0.75,
      roughness: 0.2,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.45,
      transparent: true,
    });
    const shards: THREE.Mesh[] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / count) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 1.84, Math.sin(angle * 2) * 0.26, Math.sin(angle) * 1.84);
      orbit.add(shard);
      shards.push(shard);
    }

    /* ── ambient dust ───────────────────────────────────────────── */

    const dustCount = 140;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      // Even-ish distribution on a shell between the gem and the outer ring.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 0.78;
      const s = Math.sqrt(1 - u * u);
      dustPos[i * 3] = Math.cos(theta) * s * r;
      dustPos[i * 3 + 1] = u * r * 0.55;
      dustPos[i * 3 + 2] = Math.sin(theta) * s * r;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xc4b5fd,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    root.add(dust);

    /* ── lighting ───────────────────────────────────────────────── */

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

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

    /* ── pointer parallax ───────────────────────────────────────── */

    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Clamp so the sculpture never swings further than the fit allows.
      pointer.x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1.4, 1.4);
      pointer.y = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1.4, 1.4);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* ── responsive framing ─────────────────────────────────────── */

    /**
     * Pull the camera back far enough that a sphere of SCENE_RADIUS fits
     * inside BOTH the vertical and the horizontal frustum.
     */
    const fitCamera = (aspect: number) => {
      const radius = SCENE_RADIUS * FIT_MARGIN;
      const vFov = THREE.MathUtils.degToRad(FOV);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const distV = radius / Math.sin(vFov / 2);
      const distH = radius / Math.sin(hFov / 2);
      const dist = Math.max(distV, distH);

      camera.position.copy(VIEW_DIR).multiplyScalar(dist);
      camera.lookAt(0, 0, 0);
      camera.near = Math.max(0.1, dist - radius * 2);
      camera.far = dist + radius * 3;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    let viewAspect = 1;
    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (width < 2 || height < 2) return;
      renderer.setSize(width, height, false);
      viewAspect = width / height;
      fitCamera(viewAspect);
      if (!running) renderFrame();
    };

    /* ── animation ──────────────────────────────────────────────── */

    const timer = new THREE.Timer();
    timer.connect(document);
    let elapsed = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let onScreen = true;

    const renderFrame = () => renderer.render(scene, camera);

    const tone = {
      ring: 0.7,
      ring2: 0.36,
      wire: 0.32,
      dust: 0.55,
      halo: 0.05,
    };

    const update = (dt: number) => {
      elapsed += dt;

      // Entrance: settle into place instead of popping in.
      const intro = easeOutCubic(Math.min(elapsed / 1.4, 1));
      root.scale.setScalar(0.9 + 0.1 * intro);

      ringMat.opacity = tone.ring * intro;
      ring2Mat.opacity = tone.ring2 * intro;
      wireMat.opacity = tone.wire * intro;
      dustMat.opacity = tone.dust * intro;
      haloMat.opacity = tone.halo * intro;
      shardMat.opacity = intro;
      coreMat.opacity = intro;

      root.position.y = Math.sin(elapsed * 0.6) * 0.09;

      gem.rotation.y = elapsed * 0.2;
      gem.rotation.x = Math.sin(elapsed * 0.3) * 0.14;
      wire.rotation.copy(gem.rotation);
      halo.rotation.y = -elapsed * 0.08;

      core.rotation.y = -elapsed * 0.5;
      core.rotation.x = elapsed * 0.28;
      const pulse = 1 + Math.sin(elapsed * 1.6) * 0.06;
      core.scale.setScalar(pulse);

      ring.rotation.z = elapsed * 0.14;
      ring2.rotation.z = -elapsed * 0.1;
      orbit.rotation.y = elapsed * 0.28;
      dust.rotation.y = -elapsed * 0.05;

      for (let i = 0; i < shards.length; i++) {
        shards[i].rotation.x = elapsed * 0.85 + i;
        shards[i].rotation.y = elapsed * 0.4;
      }

      // Frame-rate independent damping — same feel at 60 and 144 Hz.
      const targetY = pointer.x * 0.3;
      const targetX = pointer.y * 0.18;
      root.rotation.y = THREE.MathUtils.damp(root.rotation.y, targetY, 3.2, dt);
      root.rotation.x = THREE.MathUtils.damp(root.rotation.x, targetX, 3.2, dt);

      renderFrame();
    };

    const tick = () => {
      if (!running) return;
      timer.update();
      update(Math.min(timer.getDelta(), 0.05));
      frame = requestAnimationFrame(tick);
    };

    const staticFrame = () => {
      elapsed = 1.4;
      update(0);
    };

    const sync = () => {
      const shouldRun = !reduce && visible && onScreen;
      if (shouldRun === running) return;
      if (shouldRun) {
        running = true;
        timer.update();
        tick();
      } else {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(wrap);
    resize();

    if (reduce) staticFrame();
    else sync();

    const viewObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { rootMargin: "120px" },
    );
    viewObserver.observe(wrap);

    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionPreference = (event: MediaQueryListEvent) => {
      reduce = event.matches;
      if (reduce) {
        sync();
        staticFrame();
      } else {
        sync();
      }
    };
    motionQuery.addEventListener("change", onMotionPreference);

    /* ── theme ──────────────────────────────────────────────────── */

    const applyTheme = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      // Light theme needs a luminous crystal — dark metal reads as a black blob on white.
      gemMat.color.set(light ? 0x3b82f6 : 0x1e293b);
      gemMat.emissive.set(light ? 0x1d4ed8 : 0x1e3a8a);
      gemMat.emissiveIntensity = light ? 0.42 : 0.14;
      gemMat.metalness = light ? 0.12 : 0.6;
      gemMat.roughness = light ? 0.22 : 0.26;
      gemMat.clearcoat = light ? 0.6 : 1;
      wireMat.color.set(light ? 0x1d4ed8 : 0xc4b5fd);
      haloMat.color.set(light ? 0x60a5fa : 0x7c3aed);
      haloMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      haloMat.needsUpdate = true;
      ringMat.color.set(light ? 0x2563eb : 0x67e8f9);
      ring2Mat.color.set(light ? 0x7c3aed : 0xa78bfa);
      coreMat.color.set(light ? 0x1e40af : 0xf5f3ff);
      shardMat.color.set(light ? 0x4f46e5 : 0xe9d5ff);
      shardMat.emissive.set(light ? 0x4338ca : 0x6d28d9);
      shardMat.emissiveIntensity = light ? 0.35 : 0.45;
      dustMat.color.set(light ? 0x4f46e5 : 0xc4b5fd);
      dustMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      dustMat.needsUpdate = true;
      tone.ring = light ? 0.9 : 0.7;
      tone.ring2 = light ? 0.55 : 0.36;
      tone.wire = light ? 0.72 : 0.32;
      tone.dust = light ? 0.7 : 0.55;
      tone.halo = light ? 0.16 : 0.08;
      ambient.intensity = light ? 1.25 : 0.4;
      key.intensity = light ? 1.55 : 1.05;
      key.color.set(light ? 0xffffff : 0xfff7ff);
      violet.color.set(light ? 0x6366f1 : 0x7c3aed);
      violet.intensity = light ? 16 : 22;
      cyan.color.set(light ? 0x38bdf8 : 0x22d3ee);
      cyan.intensity = light ? 14 : 12;
      rim.color.set(light ? 0xffffff : 0xc4b5fd);
      rim.intensity = light ? 1.2 : 0.85;
      if (!running) renderFrame();
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    /* ── teardown ───────────────────────────────────────────────── */

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      timer.disconnect();
      timer.dispose();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionPreference);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      gemGeo.dispose();
      gemMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === wrap) wrap.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} className="absolute inset-0" aria-hidden />;
}
