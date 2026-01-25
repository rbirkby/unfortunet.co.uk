function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  // Random starting position in upper portion of screen
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * (window.innerHeight * 0.3);
  
  star.style.left = startX + 'px';
  star.style.top = startY + 'px';
  
  const duration = 1.2; // seconds
  const tailLength = 8; // number of tail segments
  
  document.body.appendChild(star);
  
  // Create tail segments
  const tailSegments = [];
  for (let i = 0; i < tailLength; i++) {
    const tail = document.createElement('div');
    tail.className = 'shooting-star-tail';
    tail.style.left = startX + 'px';
    tail.style.top = startY + 'px';
    tail.style.opacity = (1 - i / tailLength) * 0.6;
    document.body.appendChild(tail);
    tailSegments.push(tail);
  }
  
  // Animate the position
  const startTime = Date.now();
  const positions = [{ x: startX, y: startY }];
  let lastX = startX;
  let lastY = startY;
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    
    const currentX = startX + 1200 * progress;
    const currentY = startY + 1200 * progress;
    
    star.style.left = currentX + 'px';
    star.style.top = currentY + 'px';
    star.style.opacity = 1 - progress;
    
    // Store 3 intermediate positions per frame for denser tail
    const stepsPerFrame = 3;
    for (let i = 1; i <= stepsPerFrame; i++) {
      const fraction = i / stepsPerFrame;
      const interpX = lastX + (currentX - lastX) * fraction;
      const interpY = lastY + (currentY - lastY) * fraction;
      positions.unshift({ x: interpX, y: interpY });
    }
    
    if (positions.length > tailLength) {
      positions.splice(tailLength);
    }
    
    lastX = currentX;
    lastY = currentY;
    
    tailSegments.forEach((tail, index) => {
      if (index < positions.length) {
        tail.style.left = positions[index].x + 'px';
        tail.style.top = positions[index].y + 'px';
        tail.style.opacity = (1 - index / tailLength) * (1 - progress);
      }
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      star.remove();
      tailSegments.forEach(tail => tail.remove());
    }
  };
  
  animate();
}

// Create a shooting star every 20 seconds
setInterval(createShootingStar, 20000);

// Create one immediately on page load
createShootingStar();
