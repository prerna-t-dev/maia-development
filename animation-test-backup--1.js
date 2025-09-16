// Image Reveal Animation using GSAP and ScrollTrigger
// Wait for GSAP to be loaded
window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined') {
        console.log('gsap found')
        
        // Check if ScrollTrigger is available
        if (typeof ScrollTrigger !== 'undefined' && typeof Observer !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
            console.log('ScrollTrigger found')
            console.log(gsap.version);
            gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

            // console.log(gsap.ScrollTrigger.static);
            
            
            // Generic clip-path reveal from top to bottom with scale contained within mask
            // Target ALL image reveal wrappers
            gsap.utils.toArray(".image-reveal--wrapper").forEach(wrapper => {
                gsap.fromTo(wrapper.querySelector("img"), 
                    { 
                        clipPath: "inset(0% 0 100% 0)", // Start: completely hidden from bottom
                        scale: 1.1 // Start: slightly scaled up (contained within mask)
                    }, 
                    { 
                        clipPath: "inset(0% 0 0% 0%)", // End: fully visible
                        scale: 1, // End: normal scale
                        duration: 0.7,
                        // ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        ease: "cubic-bezier(0.77, 0, 0.175, 1)",
                        scrollTrigger: {
                            trigger: wrapper, // Use the individual wrapper as trigger
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Scale down animation for images (works with both img tags and background images)
            // Target ALL scale-down wrappers
            gsap.utils.toArray(".image-scale-down--wrapper").forEach(wrapper => {
                // Check if it has an img tag or is a background image container
                const imgElement = wrapper.querySelector("img");
                const targetElement = imgElement || wrapper; // Use img if exists, otherwise use wrapper for background images
                
                gsap.fromTo(targetElement, 
                    { 
                        scale: 1.2 // Start: scaled up
                    }, 
                    { 
                        scale: 1, // End: normal scale
                        duration: 1.2,
                        ease: "cubic-bezier(0.77, 0, 0.175, 1)",
                        scrollTrigger: {
                            trigger: wrapper,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Text reveal animation for multi-line text (using the exact technique from reference)
            // Target ALL text-reveal wrappers
            gsap.utils.toArray(".text-reveal--wrapper").forEach(wrapper => {
                const textElement = wrapper.querySelector("h1, h2, h3, h4, h5, h6, p, span");
                if (textElement) {
                    // Split text by <br> tags and create individual line wrappers
                    const originalHTML = textElement.innerHTML;
                    const lines = originalHTML.split(/<br\s*\/?>/i);
                    
                    // Clear original content and create the proper structure
                    textElement.innerHTML = '';
                    lines.forEach((line, index) => {
                        if (line.trim()) {
                            // Get the original text alignment
                            const originalTextAlign = window.getComputedStyle(textElement).textAlign;
                            
                            // Create wrapper div with overflow-hidden (like the reference)
                            const lineWrapper = document.createElement('div');
                            lineWrapper.className = 'overflow-hidden lh-fix';
                            lineWrapper.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative;`;
                            
                            // Create the actual text span
                            const lineSpan = document.createElement('div');
                            lineSpan.innerHTML = line;
                            lineSpan.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative; transform: translate(0%, 100%);`;
                            
                            // Nest them properly
                            lineWrapper.appendChild(lineSpan);
                            textElement.appendChild(lineWrapper);
                            
                            // Animate using the exact transform technique from reference
                            gsap.to(lineSpan, {
                                y: '0%', // Slide up to normal position
                                duration: 1, // Slower duration (increased from 0.8)
                                // ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                ease: "power4",
                                delay: index * 0.25, // Slightly slower stagger (increased from 0.2)
                                scrollTrigger: {
                                    trigger: wrapper,
                                    start: "top 90%",
                                    toggleActions: "play none none reverse"
                                }
                            });
                        }
                    });
                }
            });
            
            // NEW: Smart paragraph animation for text without <br> tags
            // Target ALL text-reveal--paragraph wrappers
            gsap.utils.toArray(".text-reveal--paragraph").forEach(wrapper => {
                // Check if this wrapper has already been processed
                if (wrapper.dataset.processed === 'true') return;
                
                const textElement = wrapper.querySelector("h1, h2, h3, h4, h5, h6, p");
                if (textElement && !textElement.dataset.processed) {
                    // Mark as processed to avoid conflicts
                    textElement.dataset.processed = 'true';
                    wrapper.dataset.processed = 'true';
                    
                    // Store original content and styles
                    const originalHTML = textElement.innerHTML;
                    const originalTextAlign = window.getComputedStyle(textElement).textAlign;
                    const originalFontSize = window.getComputedStyle(textElement).fontSize;
                    const originalFontFamily = window.getComputedStyle(textElement).fontFamily;
                    const originalFontWeight = window.getComputedStyle(textElement).fontWeight;
                    
                    // Create a temporary span to measure text
                    const tempSpan = document.createElement('span');
                    tempSpan.style.cssText = `
                        position: absolute;
                        visibility: hidden;
                        white-space: nowrap;
                        font-size: ${originalFontSize};
                        font-family: ${originalFontFamily};
                        font-weight: ${originalFontWeight};
                    `;
                    document.body.appendChild(tempSpan);
                    
                    // Get container width
                    const containerWidth = wrapper.offsetWidth;
                    
                    // Split text into words
                    const words = originalHTML.split(/\s+/);
                    const lines = [];
                    let currentLine = '';
                    
                    // Build lines based on actual text width
                    words.forEach(word => {
                        tempSpan.textContent = currentLine + ' ' + word;
                        if (tempSpan.offsetWidth > containerWidth && currentLine !== '') {
                            lines.push(currentLine.trim());
                            currentLine = word;
                            tempSpan.textContent = word;
                        } else {
                            currentLine = currentLine ? currentLine + ' ' + word : word;
                        }
                    });
                    
                    // Add the last line
                    if (currentLine.trim()) {
                        lines.push(currentLine.trim());
                    }
                    
                    // Clean up temporary span
                    document.body.removeChild(tempSpan);
                    
                    // Clear original content and rebuild with proper structure
                    textElement.innerHTML = '';
                    lines.forEach((line, index) => {
                        if (line.trim()) {
                            // Create line wrapper
                            const lineWrapper = document.createElement('div');
                            lineWrapper.className = 'overflow-hidden lh-fix';
                            lineWrapper.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative; margin: 0; padding: 0;`;
                            
                            // Create text element
                            const lineSpan = document.createElement('div');
                            lineSpan.innerHTML = line;
                            lineSpan.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative; transform: translate(0%, 100%); margin: 0; padding: 0;`;
                            
                            lineWrapper.appendChild(lineSpan);
                            textElement.appendChild(lineWrapper);
                            
                            // Animate with unique ScrollTrigger
                            gsap.to(lineSpan, {
                                y: '0%', // Slide up to normal position
                                duration: 1,
                                ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                delay: index * 0.25,
                                scrollTrigger: {
                                    trigger: wrapper,
                                    start: "top 90%",
                                    toggleActions: "play none none reverse",
                                    id: `text-reveal-paragraph-${wrapper.dataset.id || Math.random()}`
                                }
                            });
                        }
                    });
                }
            });
            
            // Simple Fade Up Animation for any element
            gsap.utils.toArray(".fade-up").forEach(element => {
                // Set initial state
                gsap.set(element, {
                    opacity: 0,
                    y: 50,
                    willChange: "transform, opacity"
                });
                
                // Animate on scroll
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        once: true
                    }
                });
            });

             // Simple Fade In Animation for any element
            gsap.utils.toArray(".fade-in").forEach(element => {
                // Get custom delay from data attribute (default: 0)
                const delay = parseFloat(element.dataset.delay) || 0;
                
                // Set initial state
                gsap.set(element, {
                    opacity: 0,
                    willChange: "opacity"
                });
                
                // Animate on scroll
                gsap.to(element, {
                    opacity: 1,
                    duration: 0.8,
                    delay: delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        once: true
                    }
                });
            });
            

            // General Image Parallax Animation
            gsap.utils.toArray(".parallax-image").forEach(wrapper => {
                // Find the image inside the wrapper
                const image = wrapper.querySelector('img') || wrapper;
                
                // Pre-set will-change for better performance
                gsap.set(image, { willChange: "transform" });
                
                // Create parallax effect
                ScrollTrigger.create({
                    trigger: wrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => {
                        // Calculate parallax movement
                        const progress = self.progress;
                        const parallaxDistance = 150; // Adjust this for more/less movement
                        const yOffset = progress * parallaxDistance;
                        
                        // Apply parallax movement to the image
                        gsap.set(image, { y: yOffset });
                    }
                });
            });

            

            






            // Header Slide In Animation
            const header = document.querySelector('.header');
            if (header) {
                // Fade in header smoothly
                gsap.to(header, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power1.out",
                    delay: 0.05 // Almost no delay
                });

                // Header Hide/Show on Scroll  ---- use only if required
                // let lastScrollY = window.scrollY;
                // let isHeaderVisible = true;

                // // Create ScrollTrigger for header animation
                // ScrollTrigger.create({
                //     trigger: "body",
                //     start: "top top",
                //     end: "bottom bottom",
                //     onUpdate: (self) => {
                //         const currentScrollY = window.scrollY;
                //         const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                        
                //         // Only trigger if scroll direction changed and we're past the top
                //         if (currentScrollY > 100) {
                //             if (scrollDirection === 'down' && isHeaderVisible) {
                //                 // Hide header by moving it up
                //                 gsap.to(header, {
                //                     y: '-100%',
                //                     duration: 0.3,
                //                     ease: "power2.out"
                //                 });
                //                 isHeaderVisible = false;
                //             } else if (scrollDirection === 'up' && !isHeaderVisible) {
                //                 // Show header by moving it back down
                //                 gsap.to(header, {
                //                     y: '0%',
                //                     duration: 0.3,
                //                     ease: "power2.out"
                //                 });
                //                 isHeaderVisible = true;
                //             }
                //         } else if (currentScrollY <= 100 && !isHeaderVisible) {
                //             // Always show header when near the top
                //             gsap.to(header, {
                //                 y: '0%',
                //                 duration: 0.3,
                //                 ease: "power2.out"
                //             });
                //             isHeaderVisible = true;
                //         }
                        
                //         lastScrollY = currentScrollY;
                //     }
                // });
            }


            // Hero Banner Fade In and Parallax Animation
            const heroBanner = document.querySelector('.hero-banner-animation');
            const heroImage = document.querySelector('.hero-banner-image-animation');
            
            // Setup hero banner fade and text animation
            if (heroBanner) {
                // Wait for image to load before setting up animation
                if (heroImage && heroImage.complete) {
                    setupHeroAnimations();
                } else if (heroImage) {
                    heroImage.addEventListener('load', setupHeroAnimations);
                } else {
                    // If no image, just setup banner and text
                    setupHeroBannerFade();
                }
            }
            
            // Setup parallax animation (independent of banner)
            if (heroImage) {
                if (heroImage.complete) {
                    setupParallaxAnimation();
                } else {
                    heroImage.addEventListener('load', setupParallaxAnimation);
                }
            }
            
            // Define functions within the proper scope
            function setupHeroBannerFade() {
                // Fade in the entire hero banner
                gsap.to(heroBanner, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    delay: 0.1, // Same delay as header
                    onComplete: () => {
                        // After hero banner fades in, start text animation
                        setupTextAnimation();
                    }
                });
            }
            
            function setupTextAnimation() {
                // Reveal the heading text lines
                const heroLines = heroBanner.querySelectorAll('.line');
                if (heroLines.length > 0) {
                    gsap.to(heroLines, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.3
                    });
                }
            }
            
            function setupParallaxAnimation() {
                // Create parallax effect
                ScrollTrigger.create({
                    trigger: '.hero-image-wrapper',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => {
                        // Calculate parallax movement
                        const progress = self.progress;
                        const parallaxDistance = 250; // Adjust this for more/less movement
                        const yOffset = progress * parallaxDistance;
                        
                        // Apply parallax movement
                        gsap.set(heroImage, { y: yOffset });
                    }
                });
            }
            
            function setupHeroAnimations() {
                setupHeroBannerFade();
                setupParallaxAnimation();
            }






            
            // HOMEPAGE - PINNING - START

            // Create text animation structure immediately (before any other animations)
            // const developmentTexts = gsap.utils.toArray('.development-project-item h4, .development-project-item span');
            
            // developmentTexts.forEach((textElement, index) => {
            //     // Create text-reveal animation structure immediately
            //     const originalHTML = textElement.innerHTML;
            //     const originalTextAlign = window.getComputedStyle(textElement).textAlign;
                
            //     // Clear original content and create the proper structure
            //     textElement.innerHTML = '';
            //     const lineWrapper = document.createElement('div');
            //     lineWrapper.className = 'overflow-hidden lh-fix';
            //     lineWrapper.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative;`;
                
            //     const lineSpan = document.createElement('div');
            //     lineSpan.innerHTML = originalHTML;
            //     lineSpan.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative;`;
                
            //     lineWrapper.appendChild(lineSpan);
            //     textElement.appendChild(lineWrapper);
                
            //     // Set initial state to hidden
            //     gsap.set(lineSpan, { y: '100%', opacity: 0 });
                
            //     // Create ScrollTrigger for text animation
            //     ScrollTrigger.create({
            //         trigger: textElement,
            //         start: "top 90%",
            //         onEnter: () => {
            //             gsap.to(lineSpan, {
            //                 y: '0%',
            //                 opacity: 1,
            //                 duration: 1,
            //                 ease: "power4",
            //                 delay: index * 0.1 // Small stagger between text elements
            //             });
            //         },
            //         onLeaveBack: () => {
            //             gsap.to(lineSpan, {
            //                 y: '100%',
            //                 opacity: 0,
            //                 duration: 0.5,
            //                 ease: "power2"
            //             });
            //         },
            //         toggleActions: "play none none reverse"
            //     });
            // });

            // Section Stacking Animation with Wrapper Pinning










            //Pinner observer and scrolling

            // Swipe Section Animation (Lenis Compatible)
            let swipeCurrentIndex = 0;
            let swipeAnimating = false;
            let swipeObserverInstance = null;
            let swipeAnimationActive = false;
            let swipePanels = gsap.utils.toArray(".swipe-section .panel");
            let lastScrollTime = 0;
            let scrollCooldown = 150; // 150ms cooldown between scrolls

            // Set z-index levels for the swipe panels
            gsap.set(swipePanels, { zIndex: i => swipePanels.length - i });

            // Set up swipe section to take full viewport
            gsap.set(".swipe-section", {
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            });

            // Initially hide all panels except the first
            gsap.set(swipePanels, { 
                autoAlpha: 0, 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            });
            gsap.set(swipePanels[0], { autoAlpha: 1 });

            // ScrollTrigger pins the swipe section
            ScrollTrigger.create({
                trigger: ".swipe-section",
              start: "top top+=88px",
                end: "+=200",
                pin: true,
              pinSpacing: true,
              onEnter: () => {
                    console.log("Swipe section pinned - starting animation control");
                    swipeAnimationActive = true;
                    activateSwipeScrollControl();
              },
              onEnterBack: () => {
                    console.log("Swipe section pinned back - reactivating animation control");
                    swipeAnimationActive = true;
                    activateSwipeScrollControl();
              },
              onLeave: () => {
                    console.log("Swipe section unpinned - ending animation control");
                    swipeAnimationActive = false;
                    deactivateSwipeScrollControl();
              },
              onLeaveBack: () => {
                    console.log("Swipe section unpinned back - ending animation control");
                    swipeAnimationActive = false;
                    deactivateSwipeScrollControl();
                }
            });

            function activateSwipeScrollControl() {
                if (swipeObserverInstance) return;
                console.log("Activating swipe scroll control");
              
                // Don't pause Lenis - work with it instead
                // More targeted scroll prevention
                const preventSwipeScroll = (e) => {
                    // Only prevent during actual animation
                    if (swipeAnimating) {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              };
              
              // Add multiple event listeners to catch all scroll types
                window.addEventListener('wheel', preventSwipeScroll, { passive: false, capture: true });
                window.addEventListener('touchmove', preventSwipeScroll, { passive: false, capture: true });
                window.addEventListener('scroll', preventSwipeScroll, { passive: false, capture: true });
                window.addEventListener('touchstart', preventSwipeScroll, { passive: false, capture: true });
                window.addEventListener('touchend', preventSwipeScroll, { passive: false, capture: true });
                document.addEventListener('wheel', preventSwipeScroll, { passive: false, capture: true });
                document.addEventListener('touchmove', preventSwipeScroll, { passive: false, capture: true });
                document.addEventListener('touchstart', preventSwipeScroll, { passive: false, capture: true });
                document.addEventListener('touchend', preventSwipeScroll, { passive: false, capture: true });
                
                // Use Lenis scroll events instead of Observer
                if (typeof lenis !== 'undefined') {
                    lenis.on('scroll', (e) => {
                        const currentTime = Date.now();
                        
                        // Debounce: ignore if too soon since last scroll
                        if (currentTime - lastScrollTime < scrollCooldown) {
                            return;
                        }
                        
                        if (!swipeAnimating && swipeAnimationActive) {
                            const direction = e.direction;
                            const velocity = Math.abs(e.velocity);
                            
                            // Only trigger if there's significant scroll velocity (normal person scroll)
                            if (velocity < 1.2) {
                                return;
                            }
                            
                            lastScrollTime = currentTime;
                            
                            if (direction === 1) { // Scrolling down
                                console.log(`Swipe current index: ${swipeCurrentIndex}, attempting to go to ${swipeCurrentIndex + 1}`);
                                
                                if (swipeCurrentIndex < swipePanels.length - 1) {
                                    transitionSwipePanel(swipeCurrentIndex + 1);
                                } else {
                                    console.log("Reached last swipe panel - deactivating");
                                    deactivateSwipeScrollControl();
                                }
                            } else if (direction === -1) { // Scrolling up
                                console.log(`Swipe current index: ${swipeCurrentIndex}, attempting to go to ${swipeCurrentIndex - 1}`);
                                
                                if (swipeCurrentIndex > 0) {
                                    transitionSwipePanel(swipeCurrentIndex - 1);
                                }
                            }
                        } else if (swipeAnimating) {
                            console.log("Swipe animation in progress - ignoring scroll");
                        }
                    });
                } else {
                    // Fallback to Observer if Lenis not available
                    swipeObserverInstance = Observer.create({
                target: window,
                type: "wheel,touch,pointer",
                wheelSpeed: -1,
                        tolerance: 25,
                preventDefault: true,
                        ignoreMobile: false,
                        dragMinimum: 5,
                onUp: () => {
                            if (!swipeAnimating && swipeAnimationActive) {
                                console.log(`Swipe current index: ${swipeCurrentIndex}, attempting to go to ${swipeCurrentIndex + 1}`);
                                
                                if (swipeCurrentIndex < swipePanels.length - 1) {
                                    transitionSwipePanel(swipeCurrentIndex + 1);
                                } else {
                                    console.log("Reached last swipe panel - deactivating");
                                    deactivateSwipeScrollControl();
                                }
                            } else if (swipeAnimating) {
                                console.log("Swipe animation in progress - ignoring scroll");
                  }
                },
                onDown: () => {
                            if (!swipeAnimating && swipeAnimationActive) {
                                console.log(`Swipe current index: ${swipeCurrentIndex}, attempting to go to ${swipeCurrentIndex - 1}`);
                                
                                if (swipeCurrentIndex > 0) {
                                    transitionSwipePanel(swipeCurrentIndex - 1);
                                }
                            } else if (swipeAnimating) {
                                console.log("Swipe animation in progress - ignoring scroll");
                  }
                },
              });
                }
            }
            
            function deactivateSwipeScrollControl() {
                console.log("Deactivating swipe scroll control");
                
                // Remove Lenis event listener
                if (typeof lenis !== 'undefined') {
                    lenis.off('scroll');
                }
                
                // Kill Observer if it exists
                if (swipeObserverInstance) {
                    swipeObserverInstance.kill();
                    swipeObserverInstance = null;
                }
              
              // Remove scroll prevention
                const preventSwipeScroll = (e) => {
                    if (swipeAnimating) {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              };
              
                window.removeEventListener('wheel', preventSwipeScroll, { capture: true });
                window.removeEventListener('touchmove', preventSwipeScroll, { capture: true });
                window.removeEventListener('scroll', preventSwipeScroll, { capture: true });
                window.removeEventListener('touchstart', preventSwipeScroll, { capture: true });
                window.removeEventListener('touchend', preventSwipeScroll, { capture: true });
                document.removeEventListener('wheel', preventSwipeScroll, { capture: true });
                document.removeEventListener('touchmove', preventSwipeScroll, { capture: true });
                document.removeEventListener('touchstart', preventSwipeScroll, { capture: true });
                document.removeEventListener('touchend', preventSwipeScroll, { capture: true });
            }

            function transitionSwipePanel(newIndex) {
                if (swipeAnimating || newIndex === swipeCurrentIndex) return;
                swipeAnimating = true;
                console.log(`Transitioning swipe from panel ${swipeCurrentIndex} to panel ${newIndex}`);
                
                const prevPanel = swipePanels[swipeCurrentIndex];
                const nextPanel = swipePanels[newIndex];
                
                // Position the new panel absolutely
                gsap.set(nextPanel, { 
                autoAlpha: 0, 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                    zIndex: swipePanels.length - newIndex
              });
              
              // Create timeline for coordinated animations
              const tl = gsap.timeline({
                    defaults: { duration: 0.8, ease: "power1.inOut" },
                onComplete: () => {
                        swipeCurrentIndex = newIndex;
                        swipeAnimating = false;
                        console.log(`Completed swipe transition to panel ${newIndex}`);
                    }
                });
                
                // Show the next panel
                tl.to(nextPanel, { autoAlpha: 1 }, 0);
                
                // Hide the previous panel
                tl.to(prevPanel, { autoAlpha: 0 }, 0);
            }
















            // Select wrapper and sections
            // const wrapper = document.querySelector(".animation-test-section--wrapper");
            // const sections = gsap.utils.toArray(".animation-test-section");
            // const outerWrappers = gsap.utils.toArray(".outer");
            // const innerWrappers = gsap.utils.toArray(".inner");
            // let currentIndex = 0;
            // let animating = false;
            // let observerInstance = null;
            // let animationActive = false;
            
            // // Initially hide all sections except the first
            // gsap.set(sections, { 
            //     autoAlpha: 0, 
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     width: "100%",
            //     height: "100vh"
            // });
            // gsap.set(sections[0], { autoAlpha: 1 });
            
            // // Set up wrapper initial positions like the example
            // gsap.set(outerWrappers, { yPercent: 100 });
            // gsap.set(innerWrappers, { yPercent: -100 });
            
            // // Set section 1 wrappers to be in position (visible)
            // gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });
            
            // // ScrollTrigger pins the wrapper when section 1 reaches top + 88px
            // ScrollTrigger.create({
            //   trigger: sections[0],
            //   start: "top top+=88px",
            //   end: "+=1000",
            //   pin: wrapper,
            //   pinSpacing: true,
            //   onEnter: () => {
            //     console.log("Section 1 pinned - starting animation control");
            //     animationActive = true;
            //     activateScrollControl();
            //   },
            //   onEnterBack: () => {
            //     console.log("Section 1 pinned back - reactivating animation control");
            //     animationActive = true;
            //     activateScrollControl();
            //   },
            //   onLeave: () => {
            //     console.log("Section 1 unpinned - ending animation control");
            //     animationActive = false;
            //     deactivateScrollControl();
            //   },
            //   onLeaveBack: () => {
            //     console.log("Section 1 unpinned back - ending animation control");
            //     animationActive = false;
            //     deactivateScrollControl();
            //   }
            // });
            
            // function activateScrollControl() {
            //   if (observerInstance) return;
            //   console.log("Activating scroll control");
              
            //   // Disable scroll when animating is true
            //   const preventScroll = (e) => {
            //     if (animating) {
            //       e.preventDefault();
            //       e.stopPropagation();
            //       return false;
            //     }
            //   };
              
            //   // Add multiple event listeners to catch all scroll types
            //   window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
            //   window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
            //   window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
            //   window.addEventListener('touchstart', preventScroll, { passive: false, capture: true });
            //   window.addEventListener('touchend', preventScroll, { passive: false, capture: true });
            //   document.addEventListener('wheel', preventScroll, { passive: false, capture: true });
            //   document.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
            //   document.addEventListener('touchstart', preventScroll, { passive: false, capture: true });
            //   document.addEventListener('touchend', preventScroll, { passive: false, capture: true });
            
            //   observerInstance = Observer.create({
            //     target: window,
            //     type: "wheel,touch,pointer",
            //     wheelSpeed: -1,
            //     tolerance: 15,
            //     preventDefault: true,
            //     ignoreMobile: false,
            //     onUp: () => {
            //       if (!animating && animationActive) {
            //         console.log(`Current index: ${currentIndex}, attempting to go to ${currentIndex + 1}`);
                    
            //         // Hardcoded logic for 4 sections
            //         if (currentIndex === 0) {
            //           // Section 1 → Section 2
            //           transitionSection(1);
            //         } else if (currentIndex === 1) {
            //           // Section 2 → Section 3
            //           transitionSection(2);
            //         } else if (currentIndex === 2) {
            //           // Section 3 → Section 4
            //           transitionSection(3);
            //         } else if (currentIndex === 3) {
            //           // Section 4 → Break out of animation
            //           console.log("Breaking out of animation at section 4");
            //           deactivateScrollControl();
            //         }
            //       } else if (animating) {
            //         console.log("Animation in progress - ignoring scroll");
            //       }
            //     },
            //     onDown: () => {
            //       if (!animating && animationActive) {
            //         console.log(`Current index: ${currentIndex}, attempting to go to ${currentIndex - 1}`);
                    
            //         // Hardcoded logic for reverse
            //         if (currentIndex === 1) {
            //           // Section 2 → Section 1
            //           transitionSection(0);
            //         } else if (currentIndex === 2) {
            //           // Section 3 → Section 2
            //           transitionSection(1);
            //         } else if (currentIndex === 3) {
            //           // Section 4 → Section 3
            //           transitionSection(2);
            //         }
            //       } else if (animating) {
            //         console.log("Animation in progress - ignoring scroll");
            //       }
            //     },
            //   });
            // }
            
            // // Add a separate Observer to detect when scrolling back up from outside
            // Observer.create({
            //   target: window,
            //   type: "wheel,touch,pointer",
            //   wheelSpeed: -1,
            //   tolerance: 15,
            //   preventDefault: false, // Don't prevent default for this one
            //   ignoreMobile: false,
            //   onDown: () => {
            //     // If we're not in animation mode but scrolling up, check if we should reactivate
            //     if (!animationActive && !observerInstance) {
            //       const scrollY = window.scrollY;
            //       const section1Top = sections[0].offsetTop;
                  
            //       // If we're scrolling up and near section 1, reactivate
            //       if (scrollY < section1Top + 200) {
            //         console.log("Scrolling back up near section 1 - reactivating animation");
            //         animationActive = true;
            //         activateScrollControl();
            //       }
            //     }
            //   }
            // });
            
            // function deactivateScrollControl() {
            //   if (!observerInstance) return;
            //   console.log("Deactivating scroll control");
            //   observerInstance.kill();
            //   observerInstance = null;
              
            //   // Remove scroll prevention
            //   const preventScroll = (e) => {
            //     if (animating) {
            //       e.preventDefault();
            //       e.stopPropagation();
            //       return false;
            //     }
            //   };
              
            //   window.removeEventListener('wheel', preventScroll, { capture: true });
            //   window.removeEventListener('touchmove', preventScroll, { capture: true });
            //   window.removeEventListener('scroll', preventScroll, { capture: true });
            //   window.removeEventListener('touchstart', preventScroll, { capture: true });
            //   window.removeEventListener('touchend', preventScroll, { capture: true });
            //   document.removeEventListener('wheel', preventScroll, { capture: true });
            //   document.removeEventListener('touchmove', preventScroll, { capture: true });
            //   document.removeEventListener('touchstart', preventScroll, { capture: true });
            //   document.removeEventListener('touchend', preventScroll, { capture: true });
            // }
            
            // function transitionSection(newIndex) {
            //   if (animating || newIndex === currentIndex) return;
            //   animating = true;
            //   console.log(`Transitioning from section ${currentIndex} to section ${newIndex}`);
            
            //   const prevSection = sections[currentIndex];
            //   const nextSection = sections[newIndex];
            //   const direction = newIndex > currentIndex ? 1 : -1;
              
            //   // Position the new section absolutely to take full viewport
            //   gsap.set(nextSection, { 
            //     autoAlpha: 0, 
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     width: "100%",
            //     height: "100vh",
            //     zIndex: 1 
            //   });
              
            //   // Create timeline for coordinated animations
            //   const tl = gsap.timeline({
            //     defaults: { duration: 1.2, ease: "power1.inOut" },
            //     onComplete: () => {
            //       currentIndex = newIndex;
            //       animating = false;
            //       console.log(`Completed transition to section ${newIndex}`);
            //     }
            //   });
              
            //   // Show the next section
            //   tl.to(nextSection, { autoAlpha: 1 }, 0);
              
            //   // Animate the wrappers for the next section
            //   tl.fromTo([outerWrappers[newIndex], innerWrappers[newIndex]], 
            //     { 
            //       yPercent: i => i ? -100 * direction : 100 * direction
            //     }, 
            //     { 
            //       yPercent: 0 
            //     }, 0);
              
            //   // Animate the image for the next section (like the reference)
            //   const nextImage = nextSection.querySelector('.bg');
            //   if (nextImage) {
            //     tl.fromTo(nextImage, 
            //       { yPercent: 15 * direction }, 
            //       { yPercent: 0 }, 0);
            //   }
              
            //   // Hide the previous section
            //   tl.to(prevSection, { autoAlpha: 0 }, 0);
            // }
            




























            


            //let gotoSectionFunction; // Declare in outer scope

            // ScrollTrigger.create({
            //     trigger: ".animation-test-section--wrapper",
            //     start: "top 88px",
            //     end: "bottom top",
            //     onEnter: () => {
            //         // document.querySelectorAll("section").forEach(section => {
            //         //     section.style.position = "absolute";
            //         //     section.style.top = "0";
            //         //     section.style.height = "100vh";
            //         //     section.style.width = "100%";
            //         //     section.style.zIndex = "100";
            //         //   });
                      
            //         setupSectionStackingAnimation();
            //         // Start the animation when ScrollTrigger is reached
            //         // setTimeout(() => {
            //         //     if (gotoSectionFunction) {
            //         //         gotoSectionFunction(0, 1);
            //         //     }
            //         // }, 100);
            //     },
            //     onLeave: () => {
            //         //this.document.querySelector('.animation-test-section').style.position = 'relative';

            //         // document.querySelectorAll("section").forEach(section => {
            //         //     section.style.position = "relative";
            //         //     section.style.top = "auto";
            //         //     section.style.height = "auto";
            //         //     section.style.width = "auto";
            //         //     section.style.zIndex = "auto";
            //         //   });
            //     }
            // });



            // function setupSectionStackingAnimation() {
            //     let sections = document.querySelectorAll(".animation-test-section"),
            //     images = document.querySelectorAll(".animation-test-section .bg"),
            //     headings = gsap.utils.toArray(".animation-test-section .section-heading"),
            //     outerWrappers = gsap.utils.toArray(".animation-test-section .outer"),
            //     innerWrappers = gsap.utils.toArray(".animation-test-section .inner"),
            //     // splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
            //     currentIndex = -1,
            //     wrap = gsap.utils.wrap(0, sections.length),
            //     animating;

            //     // Set initial positions
            //     gsap.set(sections, { autoAlpha: 0 });
            //     gsap.set(sections[0], { autoAlpha: 1 });
            //     gsap.set(outerWrappers, { yPercent: 100 });
            //     gsap.set(innerWrappers, { yPercent: -100 });

            //     function gotoSection(index, direction) {
            //         console.log('gotoSection', index, direction);
            //         // Don't wrap - keep index within bounds
            //         if (index < 0 || index >= sections.length) return;
                    
            //         animating = true;
            //         let fromTop = direction === -1,
            //             dFactor = fromTop ? -1 : 1,
            //             tl = gsap.timeline({
            //               defaults: { duration: 1.25, ease: "power1.inOut" },
            //               onComplete: () => animating = false
            //             });
                    
            //         if (currentIndex >= 0) {
            //           // The first time this function runs, current is -1
            //           gsap.set(sections[currentIndex], { zIndex: 0 });
            //           tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            //             .set(sections[currentIndex], { autoAlpha: 0 });
            //         }
                    
            //         gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            //         tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
            //             yPercent: i => i ? -100 * dFactor : 100 * dFactor
            //           }, { 
            //             yPercent: 0 
            //           }, 0)
            //           .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
            //           // .fromTo(splitHeadings[index].chars, { 
            //           //     autoAlpha: 0, 
            //           //     yPercent: 150 * dFactor
            //           // }, {
            //           //     autoAlpha: 1,
            //           //     yPercent: 0,
            //           //     duration: 1,
            //           //     ease: "power2",
            //           //     stagger: {
            //           //       each: 0.02,
            //           //       from: "random"
            //           //     }
            //           //   }, 0.2);
                  
            //         currentIndex = index;
            //     }
                
            //     // Assign function to outer scope so ScrollTrigger can access it
            //     gotoSectionFunction = gotoSection;

            //     Observer.create({
            //         type: "wheel,touch,pointer",
            //         wheelSpeed: -1,
            //         onDown: () => {
            //             if (!animating && currentIndex > 0) {
            //                 gotoSection(currentIndex - 1, -1);
            //             }
            //         },
            //         onUp: () => {
            //             if (!animating && currentIndex < sections.length - 1) {
            //                 gotoSection(currentIndex + 1, 1);
            //             }
            //         },
            //         tolerance: 10,
            //         preventDefault: true
            //     });
              
            //     gotoSection(0, 1);

            // }




            //const sections = gsap.utils.toArray('.development-project-item');
            // Pin the development project items directly
            // sections.forEach((section, index) => {
            //     // Pin the section directly
            //     ScrollTrigger.create({
            //         trigger: section,
            //         start: 'top 80px',
            //         end: 'bottom top',
            //         pin: index !== sections.length - 1, // Don't pin the last item
            //         pinSpacing: false,
            //         onEnter: () => {
            //             // Smoothly animate section to center of pinned wrapper
            //             gsap.to(section, {
            //                 y: 0, // Center in wrapper
            //                 duration: 0.8, // Back to shorter duration for smooth feel
            //                 ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
            //             });
                        
            //             // Move previous sections up smoothly
            //             for (let i = 0; i < index; i++) {
            //                 gsap.to(sections[i], {
            //                     y: -(index - i) * 50,
            //                     duration: 0.8, // Back to shorter duration for smooth feel
            //                     ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
            //                 });
            //             }
                        

            //         },
            //         onLeave: () => {
            //             // Reset positions when leaving last section
            //             if (index === sections.length - 1) {
            //                 sections.forEach((sect, i) => {
            //                     gsap.to(sect, {
            //                         y: 0,
            //                         duration: 0.8, // Back to shorter duration for smooth feel
            //                         ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
            //                     });
            //                 });
            //             }
            //         }
            //     });
            // });

            // HOMEPAGE - PINNING - END
            









            // w/o text animation
            // const sections = gsap.utils.toArray('.development-project-item');

            // sections.forEach((section, index) => {
            // // ensure wrapper
            // let wrapper = section.parentNode;
            // if (!wrapper.classList.contains('development-item-wrapper')) {
            //     wrapper = document.createElement('div');
            //     wrapper.className = 'development-item-wrapper';
            //     wrapper.style.cssText = `
            //     position: relative;
            //     width: 100%;
            //     `;
            //     section.parentNode.insertBefore(wrapper, section);
            //     wrapper.appendChild(section);
            // }

            // // Start the item slightly lower so it can slide up into place
            // gsap.set(section, { y: 80, willChange: 'transform' });

            // // Flag so we only trigger the "move previous" tween once per pass
            // let prevMoved = false;

            // // Incoming: scrubbed animation that follows scroll (this is your "working" part)
            // ScrollTrigger.create({
            //     trigger: wrapper,
            //     start: 'top 80px',
            //     end: index === sections.length - 1 ? 'bottom bottom' : 'bottom top',
            //     pin: index !== sections.length - 1,
            //     pinSpacing: false,
            //     scrub: true,
            //     animation: gsap.to(section, {
            //     y: 0,
            //     ease: 'power3.out',
            //     overwrite: 'auto'
            //     }),
            //     // onUpdate monitors progress and triggers previous-section move once the incoming is effectively landed
            //     onUpdate: self => {
            //     // tweak this threshold to taste (0..1). 0.95 means "almost fully in place".
            //     const THRESHOLD = 0.95;

            //     if (index > 0) {
            //         if (!prevMoved && self.progress >= THRESHOLD) {
            //         // incoming is essentially in place -> move all previous items out of the way
            //         prevMoved = true;
            //         for (let i = 0; i < index; i++) {
            //             gsap.to(sections[i], {
            //             y: -(index - i) * 50,
            //             duration: 0.45,
            //             ease: 'power2.out',
            //             overwrite: 'auto'
            //             });
            //         }
            //         } else if (prevMoved && self.progress < (THRESHOLD - 0.06)) {
            //         // if user scrolls back up past the hysteresis margin, bring previous items back
            //         prevMoved = false;
            //         for (let i = 0; i < index; i++) {
            //             gsap.to(sections[i], {
            //             y: 0,
            //             duration: 0.35,
            //             ease: 'power2.out',
            //             overwrite: 'auto'
            //             });
            //         }
            //         }
            //     }
            //     },
            //     onRefresh: () => {
            //     // reset flag when ScrollTrigger recalculates (resize, etc.)
            //     prevMoved = false;
            //     }
            // });
            // });

            // // optional final refresh (if you dynamically inserted wrappers)
            // ScrollTrigger.refresh();







            // w/ text animation
            // const sections = gsap.utils.toArray('.development-project-item');

            // sections.forEach((section, index) => {
            // // ensure wrapper
            // let wrapper = section.parentNode;
            // if (!wrapper.classList.contains('development-item-wrapper')) {
            //     wrapper = document.createElement('div');
            //     wrapper.className = 'development-item-wrapper';
            //     wrapper.style.cssText = `
            //     position: relative;
            //     width: 100%;
            //     `;
            //     section.parentNode.insertBefore(wrapper, section);
            //     wrapper.appendChild(section);
            // }

            // // Start the item slightly lower so it can slide up into place
            // gsap.set(section, { y: 80, willChange: 'transform' });

            // // 👉 Text animation timeline
            // const textTl = gsap.timeline({ paused: true });
            // textTl.from(section.querySelectorAll('h4, p, span, svg'), {
            //     y: 30,
            //     opacity: 0,
            //     duration: 0.6,
            //     stagger: 0.1,
            //     ease: 'power3.out'
            // });

            // let prevMoved = false;

            // // ✅ Main ScrollTrigger
            // ScrollTrigger.create({
            //     trigger: wrapper,
            //     start: 'top 80px',
            //     end: index === sections.length - 1 ? 'bottom bottom' : 'bottom top',
            //     pin: index !== sections.length - 1, // pin all except last
            //     pinSpacing: false,
            //     scrub: true,
            //     animation: gsap.to(section, {
            //     y: 0,
            //     ease: 'power3.out',
            //     overwrite: 'auto'
            //     }),
            //     onToggle: self => {
            //     // 🔥 Fire text animation when section pins
            //     if (self.isActive) {
            //         textTl.restart();
            //     } else {
            //         textTl.progress(0).pause();
            //     }
            //     },
            //     onUpdate: self => {
            //     const THRESHOLD = 0.8;
            //     if (index > 0) {
            //         if (!prevMoved && self.progress >= THRESHOLD) {
            //         prevMoved = true;
            //         for (let i = 0; i < index; i++) {
            //             gsap.to(sections[i], {
            //             y: -(index - i) * 50,
            //             duration: 0.45,
            //             ease: 'power2.out',
            //             overwrite: 'auto'
            //             });
            //         }
            //         } else if (prevMoved && self.progress < (THRESHOLD - 0.06)) {
            //         prevMoved = false;
            //         for (let i = 0; i < index; i++) {
            //             gsap.to(sections[i], {
            //             y: 0,
            //             duration: 0.35,
            //             ease: 'power2.out',
            //             overwrite: 'auto'
            //             });
            //         }
            //         }
            //     }
            //     },
            //     onRefresh: () => {
            //     prevMoved = false;
            //     textTl.progress(0).pause();
            //     }
            // });

            // // ✅ Handle the very last section (hide previous so it doesn’t peek)
            // if (index === sections.length - 1) {
            //     ScrollTrigger.create({
            //     trigger: wrapper,
            //     start: 'top 80px',
            //     end: 'bottom bottom',
            //     onEnter: () => {
            //         gsap.to(sections[index - 1], {
            //         y: -100, // push it higher so it’s fully gone
            //         duration: 0.3,
            //         ease: 'power2.out'
            //         });
            //     },
            //     onLeaveBack: () => {
            //         gsap.to(sections[index - 1], {
            //         y: 0,
            //         duration: 0.3,
            //         ease: 'power2.out'
            //         });
            //     }
            //     });
            // }
            // });

            // // Final refresh
            // ScrollTrigger.refresh();


            



            


           

            


        }
    }
});
