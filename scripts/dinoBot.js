// Dino Bot Toy
function createToy() {
    const dino = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, metalness: 0.2, roughness: 0.8 });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.5, roughness: 0.5 });
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.8, 0.6), bodyMaterial);
    dino.add(body);
    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.6), bodyMaterial);
    head.position.set(0.8, 0.4, 0);
    dino.add(head);
    // Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), eyeMaterial);
    leftEye.position.set(1.1, 0.5, 0.2);
    dino.add(leftEye);
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), eyeMaterial);
    rightEye.position.set(1.1, 0.5, -0.2);
    dino.add(rightEye);
    // Legs
    const legGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.3);
    const frontLeftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    frontLeftLeg.position.set(0.5, -0.5, 0.3);
    dino.add(frontLeftLeg);
    const frontRightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    frontRightLeg.position.set(0.5, -0.5, -0.3);
    dino.add(frontRightLeg);
    const backLeftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    backLeftLeg.position.set(-0.5, -0.5, 0.3);
    dino.add(backLeftLeg);
    const backRightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    backRightLeg.position.set(-0.5, -0.5, -0.3);
    dino.add(backRightLeg);
    // Tail
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.05, 1, 16), bodyMaterial);
    tail.position.set(-1, 0.2, 0);
    tail.rotation.z = Math.PI / 4;
    dino.add(tail);
    return dino;
}
window.createDinoBotToy = createToy; 