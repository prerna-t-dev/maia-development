

//0. No smooth scroll - pins to top(no text animation)
const sections = gsap.utils.toArray('.development-project-item');
            
            // Create wrapper divs around each section for smooth pinning
            sections.forEach((section, index) => {
                // Use existing wrapper or create one if needed
                let wrapper = section.parentNode;
                if (!wrapper.classList.contains('development-item-wrapper')) {
                    // Create wrapper div only if one doesn't exist
                    wrapper = document.createElement('div');
                    wrapper.className = 'development-item-wrapper';
                    wrapper.style.cssText = `
                        position: relative;
                        width: 100%;
                    `;
                    
                    // Insert wrapper before section and move section inside
                    section.parentNode.insertBefore(wrapper, section);
                    wrapper.appendChild(section);
                }
                
                // Pin the wrapper (not the section)
                ScrollTrigger.create({
                    trigger: wrapper,
                    start: 'top 80px',
                    end: index === sections.length - 1 ? 'bottom bottom' : 'bottom top',
                    pin: index !== sections.length - 1,
                    pinSpacing: false,
                    onEnter: () => {
                        // Smoothly animate section to center of pinned wrapper
                        gsap.to(section, {
                            y: 0, // Center in wrapper
                            duration: 0.8, // Back to shorter duration for smooth feel
                            ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
                        });
                        
                        // Move previous sections up smoothly
                        for (let i = 0; i < index; i++) {
                            gsap.to(sections[i], {
                                y: -(index - i) * 50,
                                duration: 0.8, // Back to shorter duration for smooth feel
                                ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
                            });
                        }
                    },
                    onLeave: () => {
                        // Reset positions when leaving last section
                        if (index === sections.length - 1) {
                            sections.forEach((sect, i) => {
                                gsap.to(sect, {
                                    y: 0,
                                    duration: 0.8, // Back to shorter duration for smooth feel
                                    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
                                });
                            });
                        }
                    }
                });
            });








            
//1. smooth pinning the wrapper - working but timing is off
// const sections = gsap.utils.toArray('.development-project-item');

sections.forEach((section, index) => {
  // ensure wrapper
  let wrapper = section.parentNode;
  if (!wrapper.classList.contains('development-item-wrapper')) {
    wrapper = document.createElement('div');
    wrapper.className = 'development-item-wrapper';
    wrapper.style.cssText = `
      position: relative;
      width: 100%;
    `;
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);
  }

  // Start the item slightly lower so it can slide up into place
  gsap.set(section, { y: 80, willChange: 'transform' });

  // Flag so we only trigger the "move previous" tween once per pass
  let prevMoved = false;

  // Incoming: scrubbed animation that follows scroll (this is your "working" part)
  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top 80px',
    end: index === sections.length - 1 ? 'bottom bottom' : 'bottom top',
    pin: index !== sections.length - 1,
    pinSpacing: false,
    scrub: true,
    animation: gsap.to(section, {
      y: 0,
      ease: 'power3.out',
      overwrite: 'auto'
    }),
    // onUpdate monitors progress and triggers previous-section move once the incoming is effectively landed
    onUpdate: self => {
      // tweak this threshold to taste (0..1). 0.95 means "almost fully in place".
      const THRESHOLD = 0.95;

      if (index > 0) {
        if (!prevMoved && self.progress >= THRESHOLD) {
          // incoming is essentially in place -> move all previous items out of the way
          prevMoved = true;
          for (let i = 0; i < index; i++) {
            gsap.to(sections[i], {
              y: -(index - i) * 50,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        } else if (prevMoved && self.progress < (THRESHOLD - 0.06)) {
          // if user scrolls back up past the hysteresis margin, bring previous items back
          prevMoved = false;
          for (let i = 0; i < index; i++) {
            gsap.to(sections[i], {
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      }
    },
    onRefresh: () => {
      // reset flag when ScrollTrigger recalculates (resize, etc.)
      prevMoved = false;
    }
  });
});

// optional final refresh (if you dynamically inserted wrappers)
ScrollTrigger.refresh();








//2. smooth pinning the section - lil better but timing is still off
// const sections = gsap.utils.toArray('.development-project-item');

sections.forEach((section, index) => {
  // ensure wrapper
  let wrapper = section.parentNode;
  if (!wrapper.classList.contains('development-item-wrapper')) {
    wrapper = document.createElement('div');
    wrapper.className = 'development-item-wrapper';
    wrapper.style.cssText = `
      position: relative;
      width: 100%;
    `;
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);
  }

  // Start the item slightly lower so it can slide up into place
  gsap.set(section, { y: 80, willChange: 'transform' });

  // Flag so we only trigger the "move previous" tween once per pass
  let prevMoved = false;

  // Incoming: scrubbed animation that follows scroll (this is your "working" part)
  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top 80px',
    end: index === sections.length - 1 ? 'bottom bottom' : 'bottom top',
    pin: index !== sections.length - 1,
    pinSpacing: false,
    scrub: 0.15,
    animation: gsap.to(section, {
      y: 0,
      ease: 'power3.out',
      overwrite: 'auto'
    }),
    // onUpdate monitors progress and triggers previous-section move once the incoming is effectively landed
    onUpdate: self => {
      // tweak this threshold to taste (0..1). 0.95 means "almost fully in place".
      const THRESHOLD = 0.95;

      if (index > 0) {
        if (!prevMoved && self.progress >= THRESHOLD) {
          // incoming is essentially in place -> move all previous items out of the way
          prevMoved = true;
          for (let i = 0; i < index; i++) {
            gsap.to(sections[i], {
              y: -(index - i) * 50,
              duration: 1,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        } else if (prevMoved && self.progress < (THRESHOLD - 0.06)) {
          // if user scrolls back up past the hysteresis margin, bring previous items back
          prevMoved = false;
          for (let i = 0; i < index; i++) {
            gsap.to(sections[i], {
              y: 0,
              duration: 1,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      }
    },
    onRefresh: () => {
      // reset flag when ScrollTrigger recalculates (resize, etc.)
      prevMoved = false;
    }
  });
});

// optional final refresh (if you dynamically inserted wrappers)
ScrollTrigger.refresh();