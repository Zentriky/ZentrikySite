/* Cookie rain */
document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('cookies-link');
    if (!link) return;
  
    link.addEventListener('click', e => {
      e.preventDefault();      
      makeItRainCookies(40);
    });
  });
  
  function makeItRainCookies(count = 30) {
    const durationMin = 2;     
    const durationVar = 2;
  
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const cookie = document.createElement('span');
        cookie.className = 'cookie-drop';
        cookie.textContent = '🍪';
  
        //random horizontal start
        cookie.style.left = Math.random() * 100 + 'vw';
  
        //random animation duration
        cookie.style.animationDuration = (durationMin + Math.random() * durationVar) + 's';
  
        document.body.appendChild(cookie);
  
        //remove after the animation completes
        cookie.addEventListener('animationend', () => cookie.remove());
      }, i * 100);              
    }
  }
  