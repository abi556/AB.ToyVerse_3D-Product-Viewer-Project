// Camera animation variables
let isAutoRotating = true;
let rotationSpeed = 0.5;
let lastTime = 0;

// Toggle auto-rotation
function toggleAutoRotation() {
    isAutoRotating = !isAutoRotating;
    controls.autoRotate = isAutoRotating;
}

// Update camera position for auto-rotation
function updateCameraPosition(time) {
    if (!isAutoRotating) return;

    const delta = (time - lastTime) / 1000;
    lastTime = time;

    // Calculate new camera position using polar coordinates
    const radius = 5; // Distance from center
    const angle = (time * rotationSpeed * 0.001) % (Math.PI * 2);
    
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = 2; // Keep camera at constant height
    
    // Make camera look at center
    camera.lookAt(0, 1, 0);
}

// Handle user interaction with controls
function onControlStart() {
    isAutoRotating = false;
}

function onControlEnd() {
    // Resume auto-rotation after user stops interacting
    setTimeout(() => {
        isAutoRotating = true;
    }, 2000);
}

// Initialize camera animation
function initCameraAnimation() {
    // Add event listeners for controls
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);

    // Start animation loop
    function animate(time) {
        requestAnimationFrame(animate);
        updateCameraPosition(time);
    }
    animate(0);
}

// Export functions
window.initCameraAnimation = initCameraAnimation;
window.toggleAutoRotation = toggleAutoRotation; 