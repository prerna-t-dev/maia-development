// Image Reveal Animation using GSAP and ScrollTrigger
// Wait for GSAP to be loaded
window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined') {
        console.log('gsap found')
        
        // Check if ScrollTrigger is available
        if (typeof ScrollTrigger !== 'undefined') {
            console.log('ScrollTrigger found')
            gsap.registerPlugin(ScrollTrigger);
            
            // Register SplitText if available
            if (typeof SplitText !== 'undefined') {
                console.log('SplitText found')
                gsap.registerPlugin(SplitText);
            }
            
            // Sync existing Lenis with ScrollTrigger
            if (typeof Lenis !== 'undefined' && window.lenis) {
                window.lenis.on('scroll', ScrollTrigger.update);
            }
            
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
                                    start: "top 95%", //moved from 90% to 95% -- to make it start earlier
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
                    duration: 1,
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
            const heroImageMobile = document.querySelector('.hero-banner-image-animation-mobile');
            
            // Debug: Check if elements are found
            // console.log('Hero Banner:', heroBanner);
            // console.log('Hero Image:', heroImage);
            // console.log('Hero Image Mobile:', heroImageMobile);
            
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
            // Handle single hero image
            if (heroImage) {
                if (heroImage.complete) {
                    setupParallaxAnimation();
                } else {
                    heroImage.addEventListener('load', setupParallaxAnimation);
                }
            }
            
            // Handle separate desktop and mobile hero images
            if (heroImageMobile) {
                let imagesLoaded = 0;
                const totalImages = (heroImage ? 1 : 0) + (heroImageMobile ? 1 : 0);
                
                function checkAllImagesLoaded() {
                    imagesLoaded++;
                    if (imagesLoaded >= totalImages) {
                        setupParallaxAnimation();
                    }
                }
                
                if (heroImage) {
                    if (heroImage.complete) {
                        checkAllImagesLoaded();
                    } else {
                        heroImage.addEventListener('load', checkAllImagesLoaded);
                    }
                }
                
                if (heroImageMobile) {
                    if (heroImageMobile.complete) {
                        checkAllImagesLoaded();
                    } else {
                        heroImageMobile.addEventListener('load', checkAllImagesLoaded);
                    }
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
                        
                        // Fade in the hero video wrapper after a slight delay (if it exists)
                        const heroVideoWrapper = document.querySelector('.hero-video-wrapper');
                        if (heroVideoWrapper) {
                            setupHeroVideoFade();
                        }
                    }
                });
            }
            
            function setupHeroVideoFade() {
                const heroVideoWrapper = document.querySelector('.hero-video-wrapper');
                if (heroVideoWrapper) {
                    // Set initial state
                    gsap.set(heroVideoWrapper, { opacity: 0 });
                    
                    // Fade in the video wrapper
                    gsap.to(heroVideoWrapper, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: 0.3 // Slight delay after hero banner
                    });
                }
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
                // console.log('Setting up parallax animation...');
                // console.log('Hero Image exists:', !!heroImage);
                // console.log('Hero Image Mobile exists:', !!heroImageMobile);
                
                // Create parallax effect for desktop image
                if (heroImage) {
                    console.log('Creating desktop parallax ScrollTrigger...');
                    ScrollTrigger.create({
                        trigger: '.hero-image-wrapper-desktop',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        onUpdate: (self) => {
                            // Calculate parallax movement
                            const progress = self.progress;
                            const parallaxDistance = 250; // Adjust this for more/less movement
                            const yOffset = progress * parallaxDistance;
                            
                            // Apply parallax movement to desktop image
                            gsap.set(heroImage, { y: yOffset });
                        }
                    });
                }
                
                // Create parallax effect for mobile image
                if (heroImageMobile) {
                    // console.log('Creating mobile parallax ScrollTrigger...');
                    
                    // Set initial position to 0
                    gsap.set(heroImageMobile, { y: 0 });
                    
                    // Use the mobile wrapper as trigger
                    ScrollTrigger.create({
                        trigger: '.hero-image-wrapper-mobile',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        onUpdate: (self) => {
                            // Calculate parallax movement
                            const progress = self.progress;
                            const parallaxDistance = 100; // Much smaller movement for mobile
                            const yOffset = progress * parallaxDistance;
                            
                            // Apply parallax movement to mobile image
                            gsap.set(heroImageMobile, { y: yOffset });
                        }
                    });
                }
            }
            
            function setupHeroAnimations() {
                setupHeroBannerFade();
            }


            
            // Create text animation structure immediately (before any other animations)
            const developmentTexts = gsap.utils.toArray('.development-project-item h4, .development-project-item span');
            
            developmentTexts.forEach((textElement, index) => {
                // Create text-reveal animation structure immediately
                const originalHTML = textElement.innerHTML;
                const originalTextAlign = window.getComputedStyle(textElement).textAlign;
                
                // Clear original content and create the proper structure
                textElement.innerHTML = '';
                const lineWrapper = document.createElement('div');
                lineWrapper.className = 'overflow-hidden lh-fix';
                lineWrapper.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative;`;
                
                const lineSpan = document.createElement('div');
                lineSpan.innerHTML = originalHTML;
                lineSpan.style.cssText = `display: block; text-align: ${originalTextAlign}; position: relative;`;
                
                lineWrapper.appendChild(lineSpan);
                textElement.appendChild(lineWrapper);
                
                // Set initial state to hidden
                gsap.set(lineSpan, { y: '100%', opacity: 0 });
                
                // Create ScrollTrigger for text animation
                ScrollTrigger.create({
                    trigger: textElement,
                    start: "top 90%",
                    onEnter: () => {
                        gsap.to(lineSpan, {
                            y: '0%',
                            opacity: 1,
                            duration: 1,
                            ease: "power4",
                            delay: index * 0.1 // Small stagger between text elements
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(lineSpan, {
                            y: '100%',
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2"
                        });
                    },
                    toggleActions: "play none none reverse"
                });
            });

            // Section Stacking Animation with Wrapper Pinning
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








            // Animation test - auto rotate animation
            let sections = document.querySelectorAll(".animation-test-2 section"),
            images = document.querySelectorAll(".animation-test-2 section .bg"),
            headings = gsap.utils.toArray(".animation-test-2 section .bg h4"),
            locationSpans = gsap.utils.toArray(".animation-test-2 section .project-location-span"),
            outerWrappers = gsap.utils.toArray(".animation-test-2 section .outer"),
            innerWrappers = gsap.utils.toArray(".animation-test-2 section .inner"),
            splitHeadings = null, // Will be initialized after SplitText is confirmed
            currentIndex = -1,
            wrap = gsap.utils.wrap(0, sections.length),
            animating;

            // Initialize SplitText if available - wait for fonts to load
            if (typeof SplitText !== 'undefined') {
                // Wait for fonts to load before initializing SplitText
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(() => {
                        splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" }));
                        console.log('SplitText initialized for headings (fonts loaded)');
                    });
                } else {
                    // Fallback: wait a bit for fonts to load
                    setTimeout(() => {
                        splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" }));
                        console.log('SplitText initialized for headings (fallback)');
                    }, 100);
                }
            } else {
                console.log('SplitText not available - skipping text splitting');
            }


            gsap.set(outerWrappers, { yPercent: 100 });
            gsap.set(innerWrappers, { yPercent: -100 });

            function gotoSection(index, direction) {
                index = wrap(index); // make sure it's valid
                animating = true;
                let fromTop = direction === -1,
                    dFactor = fromTop ? -1 : 1,
                    tl = gsap.timeline({
                      defaults: { duration: 1.8, ease: "power2.inOut" },
                      onComplete: () => animating = false
                    });
                if (currentIndex >= 0) {
                  // The first time this function runs, current is -1
                  gsap.set(sections[currentIndex], { zIndex: 0 });
                    tl.to(images[currentIndex], { 
                        yPercent: -15 * dFactor
                    })
                    .set(sections[currentIndex], { autoAlpha: 0 });
                }
                gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
                tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
                    yPercent: i => i ? -100 * dFactor : 100 * dFactor,
                    // opacity: 0 
                  }, { 
                    yPercent: 0,
                    // opacity: 1 
                  }, 0)
                  .fromTo(images[index], { 
                      yPercent: 15 * dFactor
                    }, { 
                      yPercent: 0
                    }, 0)
                    // Animate split text if available
                    if (splitHeadings && splitHeadings[index] && splitHeadings[index].chars) {
                        tl.fromTo(splitHeadings[index].chars, { 
                            autoAlpha: 0, 
                            yPercent: 150 * dFactor
                        }, {
                            autoAlpha: 1,
                            yPercent: 0,
                            duration: 1.5,
                            delay: 0.5,
                            ease: "power2.out",
                            stagger: {
                              each: 0.01,
                              from: "random"
                            }
                        }, 0.2);
                    }

                    // Animate project location span
                    if (locationSpans[index]) {
                        tl.fromTo(locationSpans[index], {
                            autoAlpha: 0,
                            yPercent: 30 * dFactor
                        }, {
                            autoAlpha: 1,
                            yPercent: 0,
                            duration: 1.2,
                            delay: 0.7,
                            ease: "power2.out"
                        }, 1.0); // Start after text animation begins
                    }
                  
              
                currentIndex = index;
            }


              gotoSection(0, 1);

              // Auto-rotation loop - call gotoSection every 3 seconds
              let autoRotationInterval = null;
              let autoRotationActive = false;

              function startAutoRotation() {
                  if (autoRotationActive) return;
                  
                  autoRotationActive = true;
                  console.log("Starting infinite auto-rotation every 3 seconds");
                  
                  autoRotationInterval = setInterval(() => {
                      if (!animating) {
                          const nextIndex = (currentIndex + 1) % sections.length;
                        //   console.log(`Auto-rotating from section ${currentIndex} to section ${nextIndex}`);
                          gotoSection(nextIndex, 1); // Always scroll down (direction = 1)
                      }
                  }, 3500); // 3 seconds
              }

              function stopAutoRotation() {
                  if (!autoRotationActive) return;
                  
                  autoRotationActive = false;
                  console.log("Stopping auto-rotation");
                  
                  if (autoRotationInterval) {
                      clearInterval(autoRotationInterval);
                      autoRotationInterval = null;
                  }
              }

              // Add parallax effect to the entire animation-test-2 section
              const animationWrapper = document.querySelector('.animation-test-2-wrapper');
              const animationSection = document.querySelector('.animation-test-2');
              
              if (animationWrapper && animationSection) {
                  // Set initial position
                  gsap.set(animationSection, { yPercent: -10 });
                  
                  // Create parallax ScrollTrigger
                  ScrollTrigger.create({
                      trigger: animationWrapper,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 1,
                      onUpdate: (self) => {
                          const progress = self.progress;
                          const yOffset = progress * 20; // 20% parallax movement
                          gsap.set(animationSection, { yPercent: -10 + yOffset });
                      }
                  });
              }

              // Start auto-rotation immediately
              startAutoRotation();
            






            


           

            


        }
    }
});