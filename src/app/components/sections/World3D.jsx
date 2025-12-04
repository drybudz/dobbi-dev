'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function World3D({ size = 100, showFloating = false }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const sphereRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Ensure scene background is transparent
    scene.background = null;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      transparent: true 
    });
    
    // Ensure renderer clears to transparent
    renderer.setClearColor(0x000000, 0);
    
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Ensure canvas has transparent background
    renderer.domElement.style.background = 'transparent';
    renderer.domElement.style.display = 'block';
    
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/world-texture.png');
    
    const material = new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: false
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    camera.position.z = 2.5;

    // Auto-rotate animation
    let lastTime = Date.now();
    const autoRotateSpeed = 0.005;

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to ~60fps
      lastTime = currentTime;

      if (!isDraggingRef.current) {
        // Auto-rotate on Y-axis only
        sphere.rotation.y += autoRotateSpeed;
      } else {
        // Apply momentum/inertia when dragging stops
        if (rotationVelocityRef.current.y !== 0) {
          sphere.rotation.y += rotationVelocityRef.current.y;
          rotationVelocityRef.current.y *= 0.95; // Friction
          if (Math.abs(rotationVelocityRef.current.y) < 0.001) {
            rotationVelocityRef.current.y = 0;
            isDraggingRef.current = false;
          }
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      rotationVelocityRef.current.y = 0;
      previousMousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const rotationSpeed = 0.01;
      sphere.rotation.y += deltaX * rotationSpeed;

      // Store velocity for momentum
      rotationVelocityRef.current.y = deltaX * rotationSpeed * 0.5;

      previousMousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        rotationVelocityRef.current.y = 0;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      e.preventDefault();

      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const rotationSpeed = 0.01;
      sphere.rotation.y += deltaX * rotationSpeed;

      rotationVelocityRef.current.y = deltaX * rotationSpeed * 0.5;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [size]);

  // Floating animation
  useEffect(() => {
    if (showFloating && containerRef.current) {
      const floatingAnimation = gsap.to(containerRef.current, {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });

      return () => {
        floatingAnimation.kill();
      };
    }
  }, [showFloating]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: size, 
        height: size,
        background: 'transparent',
        overflow: 'hidden'
      }} 
    />
  );
}

