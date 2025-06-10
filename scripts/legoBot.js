// Lego Bot Toy
function createToy() {
    const legoBot = new THREE.Group();
    const blockMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000, metalness: 0.1, roughness: 0.7 });
    const connectorMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.3, roughness: 0.5 });
    // Base block
    const base = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), blockMaterial);
    legoBot.add(base);
    // Middle block
    const middle = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), blockMaterial);
    middle.position.y = 0.9;
    legoBot.add(middle);
    // Head block
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), blockMaterial);
    head.position.y = 1.7;
    legoBot.add(head);
    // Connectors
    const middleConnector = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16), connectorMaterial);
    middleConnector.position.y = 0.85;
    legoBot.add(middleConnector);
    const headConnector = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16), connectorMaterial);
    headConnector.position.y = 1.65;
    legoBot.add(headConnector);
    // Arms
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), blockMaterial);
    leftArm.position.set(-0.65, 0.9, 0);
    legoBot.add(leftArm);
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), blockMaterial);
    rightArm.position.set(0.65, 0.9, 0);
    legoBot.add(rightArm);
    return legoBot;
}
window.createLegoBotToy = createToy; 