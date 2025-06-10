// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Part information
const partInfo = {
    body: "Main Body Module",
    head: "Control Unit",
    leftArm: "Left Manipulator",
    rightArm: "Right Manipulator",
    leftLeg: "Left Support",
    rightLeg: "Right Support",
    leftEye: "Left Sensor",
    rightEye: "Right Sensor"
};

// Create info panel
function createInfoPanel() {
    const panel = document.createElement('div');
    panel.className = 'info-panel';
    panel.style.display = 'none';
    panel.style.position = 'absolute';
    panel.style.backgroundColor = 'rgba(26, 42, 108, 0.9)';
    panel.style.color = 'white';
    panel.style.padding = '1rem';
    panel.style.borderRadius = '5px';
    panel.style.zIndex = '1000';
    document.body.appendChild(panel);
    return panel;
}

const infoPanel = createInfoPanel();

// Handle mouse move
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(Object.values(robotParts));

    // Reset all parts to default state
    Object.values(robotParts).forEach(part => {
        if (part.material) {
            part.material.emissive.setHex(0x000000);
            part.material.emissiveIntensity = 0;
        }
    });

    // Hide info panel
    infoPanel.style.display = 'none';

    // If we have intersections
    if (intersects.length > 0) {
        const selectedPart = intersects[0].object;
        
        // Find the part name
        const partName = Object.keys(robotParts).find(key => robotParts[key] === selectedPart);
        
        if (partName) {
            // Highlight the part
            if (selectedPart.material) {
                selectedPart.material.emissive.setHex(0x00D4FF);
                selectedPart.material.emissiveIntensity = 0.2;
            }

            // Show info panel
            infoPanel.textContent = partInfo[partName];
            infoPanel.style.display = 'block';
            infoPanel.style.left = `${event.clientX + 10}px`;
            infoPanel.style.top = `${event.clientY + 10}px`;
        }
    }
}

// Handle mouse click
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(Object.values(robotParts));

    if (intersects.length > 0) {
        const selectedPart = intersects[0].object;
        
        // Find the part name
        const partName = Object.keys(robotParts).find(key => robotParts[key] === selectedPart);
        
        if (partName) {
            // Animate the part
            const originalScale = selectedPart.scale.clone();
            selectedPart.scale.multiplyScalar(1.2);
            
            // Reset scale after animation
            setTimeout(() => {
                selectedPart.scale.copy(originalScale);
            }, 200);
        }
    }
}

// Initialize interaction
function initInteraction() {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
}

// Export function
window.initInteraction = initInteraction; 