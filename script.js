document.addEventListener('DOMContentLoaded', () => {
    /* ----- SIDEBAR/EXPLORER LOGIC ----- */
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const closeMarkup = document.createElement('button');
    closeMarkup.classList.add('sidebar-close');
    closeMarkup.innerText = 'x';
    sidebar.prepend(closeMarkup);
  
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (sidebar.classList.contains('show')) {
        toggleBtn.style.display = 'none';
      }
    });
  
    closeMarkup.addEventListener('click', () => {
      sidebar.classList.remove('show');
      toggleBtn.style.display = 'block';
    });
  
    document.querySelectorAll('.file-item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    /* ----- SCROLL FADE-IN SECTIONS ----- */
    const sections = document.querySelectorAll('.section-content');
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver(revealSection, options);
  
    sections.forEach(sec => {
      observer.observe(sec);
    });
  
    function revealSection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }
  
    /* ----- KEYBOARD FLASH ANIMATION (TWICE) ON PAGE LOAD ----- */
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(k => k.classList.add('flash'));
    setTimeout(() => {
      allKeys.forEach(k => k.classList.remove('flash'));
    }, 2000);
  
    /* ----- REPLICATE LARGER MOUSE INSIDE MONITOR ----- */
    const monitorScreen = document.querySelector('.computer-screen');
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    monitorScreen.appendChild(customCursor);
  
    monitorScreen.addEventListener('mousemove', (e) => {
      const rect = monitorScreen.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      customCursor.style.display = 'block';
      customCursor.style.left = x + 'px';
      customCursor.style.top = y + 'px';
    });
  
    monitorScreen.addEventListener('mouseleave', () => {
      customCursor.style.display = 'none';
    });
  
    /* ----- TYPING LOGIC + BLINKING CURSOR ----- */
    const screenContent = document.querySelector('.screen-content');
    const punTitle = `
      <div class="pun-title">
        Scrips & Commits to Roadmaps that Fit: Hannah's Journey From Code to Product<span class="blink-cursor"></span>
      </div>
    `;
    
    function typedHTML(msg) {
      return `${msg}<span class="blink-cursor"></span>`;
    }
    
    screenContent.innerHTML = punTitle;
  
    let typedMessage = '';
    let hasStartedTyping = false;
  
    /* KEY CLICK => TYPING LOGIC */
    document.querySelectorAll('.key').forEach(keyEl => {
      keyEl.addEventListener('click', () => {
        // If nav key => jump to section
        if (keyEl.classList.contains('nav')) {
          const targetId = keyEl.getAttribute('data-target');
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
  
        // Otherwise typed key
        const keyText = keyEl.textContent.trim();
  
        // If not started typing yet, clear the punTitle from the screen
        if (!hasStartedTyping) {
          typedMessage = '';
          screenContent.innerHTML = '';
          hasStartedTyping = true;
        }
  
        // Check special keys
        if (/^Backspace$/i.test(keyText)) {
          typedMessage = typedMessage.slice(0, -1);
        } else if (/^Enter$/i.test(keyText)) {
          typedMessage += '\n';
        } else if (/^Space$/i.test(keyText)) {
          typedMessage += ' ';
        } else {
          typedMessage += keyText;
        }
  
        // Trim leftover whitespace
        if (!typedMessage.trim()) {
          typedMessage = '';
        }
  
        // If typed is empty => restore punTitle
        if (typedMessage.length === 0) {
          hasStartedTyping = false;
          screenContent.innerHTML = punTitle;
        } else {
          screenContent.innerHTML = typedHTML(typedMessage);
        }
      });
    });
  });
