// Robot parts and materials
let robotParts = {};

// Create materials
const materials = {
    body: new THREE.MeshStandardMaterial({ 
        color: 0x00D4FF,
        metalness: 0.3,
        roughness: 0.4
    }),
    head: new THREE.MeshStandardMaterial({ 
        color: 0x1A2A6C,
        metalness: 0.2,
        roughness: 0.3
    }),
    limb: new THREE.MeshStandardMaterial({ 
        color: 0x4A90E2,
        metalness: 0.4,
        roughness: 0.5
    }),
    eye: new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 0.5
    })
};

// Create the robot
function createRobot() {
    // Create a group to hold all robot parts
    const robot = new THREE.Group();
    
    // Create body
    const bodyGeometry = new THREE.BoxGeometry(1, 1.2, 0.6);
    const body = new THREE.Mesh(bodyGeometry, materials.body);
    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;
    robot.add(body);
    robotParts.body = body;

    // Create head
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const head = new THREE.Mesh(headGeometry, materials.head);
    head.position.y = 2.2;
    head.castShadow = true;
    head.receiveShadow = true;
    robot.add(head);
    robotParts.head = head;

    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeometry, materials.eye);
    leftEye.position.set(-0.2, 0.2, 0.41);
    head.add(leftEye);
    robotParts.leftEye = leftEye;

    const rightEye = new THREE.Mesh(eyeGeometry, materials.eye);
    rightEye.position.set(0.2, 0.2, 0.41);
    head.add(rightEye);
    robotParts.rightEye = rightEye;

    // Create arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
    
    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, materials.limb);
    leftArm.position.set(-0.6, 1.2, 0);
    leftArm.rotation.z = Math.PI / 4;
    leftArm.castShadow = true;
    robot.add(leftArm);
    robotParts.leftArm = leftArm;

    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, materials.limb);
    rightArm.position.set(0.6, 1.2, 0);
    rightArm.rotation.z = -Math.PI / 4;
    rightArm.castShadow = true;
    robot.add(rightArm);
    robotParts.rightArm = rightArm;

    // Create legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 16);
    
    // Left leg
    const leftLeg = new THREE.Mesh(legGeometry, materials.limb);
    leftLeg.position.set(-0.3, 0.5, 0);
    leftLeg.castShadow = true;
    robot.add(leftLeg);
    robotParts.leftLeg = leftLeg;

    // Right leg
    const rightLeg = new THREE.Mesh(legGeometry, materials.limb);
    rightLeg.position.set(0.3, 0.5, 0);
    rightLeg.castShadow = true;
    robot.add(rightLeg);
    robotParts.rightLeg = rightLeg;

    // Add robot to scene
    scene.add(robot);

    // Center the robot
    robot.position.y = 0;

    return robot;
}

// Export functions and variables
window.createRobot = createRobot;
window.robotParts = robotParts; 