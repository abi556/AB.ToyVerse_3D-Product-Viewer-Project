// Robot Toy
function createToy() {
    const robot = new THREE.Group();
    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00D4FF, metalness: 0.3, roughness: 0.4 });
    const headMat = new THREE.MeshStandardMaterial({ color: 0x1A2A6C, metalness: 0.2, roughness: 0.3 });
    const limbMat = new THREE.MeshStandardMaterial({ color: 0x4A90E2, metalness: 0.4, roughness: 0.5 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 });
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.2, 0.6), bodyMat);
    body.position.y = 1.2;
    robot.add(body);
    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), headMat);
    head.position.y = 2.2;
    robot.add(head);
    // Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), eyeMat);
    leftEye.position.set(-0.2, 0.2, 0.41);
    head.add(leftEye);
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), eyeMat);
    rightEye.position.set(0.2, 0.2, 0.41);
    head.add(rightEye);
    // Arms
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 16), limbMat);
    leftArm.position.set(-0.6, 1.2, 0);
    leftArm.rotation.z = Math.PI / 4;
    robot.add(leftArm);
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 16), limbMat);
    rightArm.position.set(0.6, 1.2, 0);
    rightArm.rotation.z = -Math.PI / 4;
    robot.add(rightArm);
    // Legs
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1, 16), limbMat);
    leftLeg.position.set(-0.3, 0.5, 0);
    robot.add(leftLeg);
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1, 16), limbMat);
    rightLeg.position.set(0.3, 0.5, 0);
    robot.add(rightLeg);
    robot.position.y = 0;
    return robot;
}
window.createRobotToy = createToy; 