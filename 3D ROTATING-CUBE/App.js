import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDCube = () => {
  const ref = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 5;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    // Define materials for the cube faces
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Front face (red)
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Back face (green)
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top face (blue)
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom face (yellow)
      new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Right face (magenta)
      new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Left face (cyan)
    ];

    // Create the cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), materials);
    scene.add(cube);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube based on mouse position
      cube.rotation.x += (mouseY - cube.rotation.x) * 0.1;
      cube.rotation.y += (mouseX - cube.rotation.y) * 0.1;

      renderer.render(scene, camera);
    };

    // Mouse movement event handler
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    animate();

    // Add event listener
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      ref.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} />;
};

export default ThreeDCube;
