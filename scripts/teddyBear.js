// Teddy Bear Toy
function createToy() {
    const bear = new THREE.Group();
    const furMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8, metalness: 0.1 });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5 });
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5 });
    // Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), furMaterial);
    body.scale.set(1, 1.2, 0.8);
    bear.add(body);
    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), furMaterial);
    head.position.set(0, 1.2, 0);
    bear.add(head);
    // Ears
    const leftEar = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), furMaterial);
    leftEar.position.set(-0.5, 1.6, 0);
    bear.add(leftEar);
    const rightEar = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), furMaterial);
    rightEar.position.set(0.5, 1.6, 0);
    bear.add(rightEar);
    // Eyes
    const whiteEyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    // Left eye (white)
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), whiteEyeMaterial);
    leftEye.position.set(-0.3, 1.3, 0.6);
    bear.add(leftEye);
    // Right eye (white)
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), whiteEyeMaterial);
    rightEye.position.set(0.3, 1.3, 0.6);
    bear.add(rightEye);
    // Left pupil
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 10), pupilMaterial);
    leftPupil.position.set(-0.3, 1.3, 0.7); // Slightly in front of the eye
    bear.add(leftPupil);
    // Right pupil
    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 10), pupilMaterial);
    rightPupil.position.set(0.3, 1.3, 0.7);
    bear.add(rightPupil);
    // Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), noseMaterial);
    nose.position.set(0, 1.1, 0.7);
    bear.add(nose);
    // Arms
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16), furMaterial);
    leftArm.position.set(-1, 0.5, 0);
    leftArm.rotation.z = Math.PI / 4;
    bear.add(leftArm);
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16), furMaterial);
    rightArm.position.set(1, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 4;
    bear.add(rightArm);
    // Legs
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16), furMaterial);
    leftLeg.position.set(-0.4, -0.8, 0);
    bear.add(leftLeg);
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16), furMaterial);
    rightLeg.position.set(0.4, -0.8, 0);
    bear.add(rightLeg);
    return bear;
}
window.createTeddyBearToy = createToy; 