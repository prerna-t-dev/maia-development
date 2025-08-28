// Image Reveal Animation using GSAP and ScrollTrigger
// Wait for GSAP to be loaded
window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined') {
        console.log('gsap found')
        
        // Check if ScrollTrigger is available
        if (typeof ScrollTrigger !== 'undefined') {
            console.log('ScrollTrigger found')
            gsap.registerPlugin(ScrollTrigger);
            
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
        }
    }
});
