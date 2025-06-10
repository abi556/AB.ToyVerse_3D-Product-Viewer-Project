// Butterfly Toy
function createToy() {
    const butterfly = new THREE.Group();
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB, metalness: 0.3, roughness: 0.4, transparent: true, opacity: 0.8 });
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.5, roughness: 0.5 });
    // Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 16), bodyMaterial);
    butterfly.add(body);
    // Wings
    const wingGeometry = new THREE.PlaneGeometry(1, 0.6);
    const leftWing1 = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing1.position.set(-0.5, 0.3, 0);
    leftWing1.rotation.y = Math.PI / 4;
    butterfly.add(leftWing1);
    const leftWing2 = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing2.position.set(-0.5, -0.3, 0);
    leftWing2.rotation.y = Math.PI / 4;
    butterfly.add(leftWing2);
    const rightWing1 = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing1.position.set(0.5, 0.3, 0);
    rightWing1.rotation.y = -Math.PI / 4;
    butterfly.add(rightWing1);
    const rightWing2 = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing2.position.set(0.5, -0.3, 0);
    rightWing2.rotation.y = -Math.PI / 4;
    butterfly.add(rightWing2);
    return butterfly;
}
window.createButterflyToy = createToy; 