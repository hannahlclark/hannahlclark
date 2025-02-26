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

    /* ----- ADD KEYBOARD HOVER EFFECT ----- */
    document.querySelectorAll('.key').forEach(keyEl => {
        keyEl.addEventListener('mouseover', () => {
            keyEl.classList.add('key-hover');
        });
        keyEl.addEventListener('mouseleave', () => {
            keyEl.classList.remove('key-hover');
        });
    });
  
    /* ----- TYPING LOGIC + BLINKING CURSOR ----- */
    /* ----- TYPING LOGIC + BLINKING CURSOR ----- */
    const screenContent = document.querySelector('.screen-content');
    const titleText = "Scripts & Commits to Roadmaps that Fit: Hannah's Journey From Code to Product";
    let index = 0;
    let hasStartedTyping = false;
    let typedMessage = '';

    function typeTitle() {
        if (index < titleText.length) {
            let typedText = titleText.substring(0, index + 1);
            let formattedText = typedText + '<span class="blink-cursor"></span>';
            screenContent.innerHTML = `<span class="pun-title">${formattedText}</span>`;
            index++;
            setTimeout(typeTitle, 50); // Adjust speed here
        } else {
            screenContent.innerHTML = `<span class="pun-title">${titleText}<span class="blink-cursor"></span></span>`;
        }
    }

    // Start typing animation
    typeTitle();

    /* KEY CLICK => TYPING LOGIC */
    document.querySelectorAll('.key').forEach(keyEl => {
        keyEl.addEventListener('click', () => {
            const keyText = keyEl.textContent.trim();

            // If not started typing yet, clear the title from the screen
            if (!hasStartedTyping) {
                typedMessage = '';
                screenContent.innerHTML = '';
                hasStartedTyping = true;
            }

            // Handle special keys
            if (/^Backspace$/i.test(keyText)) {
                typedMessage = typedMessage.slice(0, -1);
            } else if (/^Enter$/i.test(keyText)) {
                typedMessage += '\n';
            } else if (/^Space$/i.test(keyText)) {
                typedMessage += ' ';
            } else {
                typedMessage += keyText;
            }

            // Trim whitespace
            if (!typedMessage.trim()) {
                typedMessage = '';
            }

            // If typed is empty => restore final typed title correctly
            if (typedMessage.length === 0) {
                hasStartedTyping = false;
                screenContent.innerHTML = `<span class="pun-title">${titleText}<span class="blink-cursor"></span></span>`;
                index = titleText.length; // Reset index to prevent retyping animation
            } else {
                screenContent.innerHTML = `<span class="pun-title">${typedMessage}<span class="blink-cursor"></span></span>`;
            }
        });
    });
});