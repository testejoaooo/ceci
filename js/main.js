// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Remove loader after content loads
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.querySelector('.loader').style.opacity = '0';
      document.querySelector('.loader').style.visibility = 'hidden';
    }, 1500);
  });

  // Create floating hearts in the hero section
  const floatingHearts = document.querySelector('.floating-hearts');
  for (let i = 0; i < 20; i++) {
    createHeart();
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Random positioning and timing
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    heart.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -50px;
      background-color: var(--primary-color);
      transform: rotate(45deg);
      opacity: 0.6;
      animation: floatUp ${animationDuration}s linear ${delay}s infinite;
    `;
    
    // Create heart shape with pseudo-elements
    const before = document.createElement('div');
    before.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 50%;
      top: -50%;
      left: 0;
    `;
    
    const after = document.createElement('div');
    after.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 50%;
      top: 0;
      left: -50%;
    `;
    
    heart.appendChild(before);
    heart.appendChild(after);
    floatingHearts.appendChild(heart);
    
    // Remove and recreate heart when animation is done
    setTimeout(() => {
      heart.remove();
      createHeart();
    }, (animationDuration + delay) * 1000);
  }

  // Add keyframe animation for floating hearts
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(45deg);
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100vh) rotate(45deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Modal functionality
  const modal = document.getElementById('letter-modal');
  const openBtn = document.getElementById('open-letter');
  const closeBtn = document.getElementsByClassName('close')[0];

  openBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', function(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Forgive button functionality
  const forgiveYes = document.getElementById('forgive-yes');
  const forgiveNo = document.getElementById('forgive-no');
  const thankYou = document.getElementById('thank-you');

  forgiveYes.addEventListener('click', function() {
    thankYou.classList.remove('hidden');
    thankYou.classList.add('visible');
    
    // Create celebration particles
    const celebration = document.querySelector('.celebration');
    for (let i = 0; i < 50; i++) {
      createParticle(celebration);
    }
    
    // Disable the buttons
    forgiveYes.disabled = true;
    forgiveNo.disabled = true;
  });

  // Moving 'No' button
  forgiveNo.addEventListener('mouseover', function() {
    // Random position
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 100 - 50;
    
    forgiveNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  forgiveNo.addEventListener('mouseout', function() {
    forgiveNo.style.transform = 'translate(0, 0)';
  });

  // Create celebration particles
  function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const color = getRandomColor();
    const left = Math.random() * 100;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: 0;
      background-color: ${color};
      border-radius: 50%;
      animation: celebrateUp 1s ease-out forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // Get random color for particles
  function getRandomColor() {
    const colors = [
      '#ff6b6b', // primary
      '#f06292', // secondary
      '#f8bbd0', // accent
      '#673ab7', // purple
      '#2196f3', // blue
      '#4caf50'  // green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Add keyframe animation for celebration particles
  const celebrationStyle = document.createElement('style');
  celebrationStyle.innerHTML = `
    @keyframes celebrateUp {
      0% {
        transform: translateY(0) scale(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(1) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(celebrationStyle);

  // Scroll animation for elements
  window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.reason, .photo');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // If element is in viewport
      if (position.top < window.innerHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  });
});