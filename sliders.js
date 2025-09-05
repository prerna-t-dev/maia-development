$(document).ready(function(){
    // Responsive Breakpoint Detection and Page Reload
    let currentBreakpoint = getCurrentBreakpoint();
    
    // Check for breakpoint changes on window resize
    $(window).on('resize', function() {
        const newBreakpoint = getCurrentBreakpoint();
        if (newBreakpoint !== currentBreakpoint) {
            // Breakpoint changed, reload the page
            location.reload();
        }
    });
    
    // Function to determine current breakpoint
    function getCurrentBreakpoint() {
        const width = $(window).width();
        if (width <= 768) {
            return 'mobile';
        } else if (width <= 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }
    
    // Scroll to top on page load/refresh using Lenis
    // $(window).on('load', function() {
    //     if (typeof lenis !== 'undefined') {
    //         lenis.scrollTo(0, {
    //             duration: 1,
    //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    //         });
    //     } else {
    //         // Fallback to jQuery animate if Lenis not available
    //         $('html, body').animate({
    //             scrollTop: 0
    //         }, 500);
    //     }
    // });
    
    // Header Scroll Effect
    $(window).on('scroll', function() {
        const header = $('.header');
        if ($(window).scrollTop() > 50) {
            header.addClass('header-scrolled');
        } else {
            header.removeClass('header-scrolled');
        }
    });

    // Next Developments Slider
    $('.next-developments-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        centerMode: false,
        centerPadding: '0px',
        prevArrow: $('.next-developments .slick-arrow-prev'),
        nextArrow: $('.next-developments .slick-arrow-next'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: '0px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: '0px'
                }
            }
        ]
    });

    // News Article Slider
    $('.news-article-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        centerMode: false,
        centerPadding: '0px',
        prevArrow: $('.in-the-news .slick-arrow-prev'),
        nextArrow: $('.in-the-news .slick-arrow-next'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: '0px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: '0px'
                }
            }
        ]
    });

    // Development Slider 1 (27 Summit) - Optimized for performance
    // function initCustomSlider1() {
    //     const sliderContainer = $('.development-slider-images-1');
    //     const imageEl = sliderContainer.find('.development-slider-image');
    //     const progressBars = $('.development-slider-dots-1 .dot-progress');
    //     const images = [
    //         'images/2025/developments/dev-project--11.png',
    //         'images/2025/developments/dev-project--12.jpg',
    //         'images/2025/developments/dev-project--13.jpg',
    //         'images/2025/developments/dev-project--14.jpg'
    //     ];
    
    //     let currentIndex = 0;
    //     const rotationTime = 5000; // 5 seconds per image
    //     const fadeDuration = 900; // Smooth fade (can try 1200 for ultra-smooth)
    
    //     function showImage(index) {
    //         imageEl.stop(true, true).fadeOut(fadeDuration, 'swing', function () {
    //             $(this).attr('src', images[index]).fadeIn(fadeDuration, 'swing');
    //         });
    //     }
    
    //     function startProgressBar(index) {
    //         progressBars.eq(index).css({
    //             'transition': 'width 5s linear',
    //             'width': '100%'
    //         });
    //     }
    
    //     function resetAllDots() {
    //         progressBars.css({
    //             'transition': 'none',
    //             'width': '0%'
    //         });
    //         setTimeout(() => {
    //             progressBars.css('transition', 'width 5s linear');
    //         }, 30);
    //     }
    
    //     function nextSlide() {
    //         currentIndex++;
    //         if (currentIndex >= images.length) {
    //             resetAllDots();
    //             currentIndex = 0;
    //         }
    //         showImage(currentIndex);
    //         startProgressBar(currentIndex);
    //     }
    
    //     // Initial setup
    //     resetAllDots();
    //     showImage(currentIndex);
    //     startProgressBar(currentIndex);
    
    //     // Start auto rotation (clear before re-initializing, if needed)
    //     if (window.devSlider1Interval) clearInterval(window.devSlider1Interval);
    //     window.devSlider1Interval = setInterval(nextSlide, rotationTime);
    // }
    // // Place this call at the point where your sliders are initialized:
    // initCustomSlider1();



    // Generic Development Slider

    //1. Iteration 1 -- With Image Parallax(laggy performance)
    // function setupFadeSlider({
    //     containerSelector,
    //     imageSelector,
    //     progressSelector,
    //     imageSources,
    //     rotationTime = 5000,
    //     fadeDuration = 900,
    //     enableParallax = true
    // }) {
    //     const sliderContainer = $(containerSelector);
    //     const imageEl = sliderContainer.find(imageSelector);
    //     const progressBars = $(progressSelector);
    //     const images = imageSources;
    //     let currentIndex = 0;
    //     let rotationInterval;
    
    //     function showImage(index) {
    //         imageEl.stop(true, true).fadeOut(fadeDuration, 'swing', function () {
    //             $(this).attr('src', images[index]).fadeIn(fadeDuration, 'swing');
    //         });
    //     }
    
    //     function startProgressBar(index) {
    //         progressBars.eq(index).css({
    //             'transition': `width ${rotationTime / 1000}s linear`,
    //             'width': '100%'
    //         });
    //     }
    
    //     function resetAllDots() {
    //         progressBars.css({
    //             'transition': 'none',
    //             'width': '0%'
    //         });
    //         setTimeout(() => {
    //             progressBars.css('transition', `width ${rotationTime / 1000}s linear`);
    //         }, 30);
    //     }
    
    //     function nextSlide() {
    //         currentIndex++;
    //         if (currentIndex >= images.length) {
    //             resetAllDots();
    //             currentIndex = 0;
    //         }
    //         showImage(currentIndex);
    //         startProgressBar(currentIndex);
    //     }
    
    //     // Initial load
    //     resetAllDots();
    //     showImage(currentIndex);
    //     startProgressBar(currentIndex);
    
    //     // Clear previous interval if needed
    //     if (sliderContainer.data('rotationInterval')) {
    //         clearInterval(sliderContainer.data('rotationInterval'));
    //     }
    //     rotationInterval = setInterval(nextSlide, rotationTime);
    //     sliderContainer.data('rotationInterval', rotationInterval);

    //     // Setup parallax effect if enabled
    //     if (enableParallax && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    //         const slideItem = sliderContainer.find('.custom-development-slide-item')[0];
            
    //         if (slideItem) {
    //             // Add overflow hidden to container to contain the parallax
    //             sliderContainer.css('overflow', 'hidden !important');
                
    //             // Pre-set will-change for better performance
    //             gsap.set(slideItem, { 
    //                 willChange: "transform",
    //                 scale: 1.4 // Start slightly scaled up
    //             });
                
    //             // Create parallax effect
    //             ScrollTrigger.create({
    //                 trigger: sliderContainer[0],
    //                 start: 'top bottom',
    //                 end: 'bottom top',
    //                 scrub: true,
    //                 onUpdate: (self) => {
    //                     // Calculate parallax movement
    //                     const progress = self.progress;
    //                     const parallaxDistance = 100; // Adjust this for more/less movement
    //                     const yOffset = progress * parallaxDistance;
                        
    //                     // Apply parallax movement and scale to the slide item
    //                     gsap.set(slideItem, { 
    //                         y: yOffset,
    //                         scale: 1.1 + (progress * 0.1) // Scale from 1.1 to 1.2
    //                     });
    //                 }
    //             });
    //         }
    //     }
    // }


    //2. Iteration 2 -- With Image Parallax(lil better performance)
    function setupFadeSlider({
        containerSelector,
        imageSelector,
        progressSelector,
        imageSources,
        rotationTime = 5000,
        fadeDuration = 900,
        enableParallax = false,
        parallaxDistance = 100,
        scaleStart = 1.1,
        scaleEnd = 1.2
    }) {
        const sliderContainer = $(containerSelector);
        const imageEl = sliderContainer.find(imageSelector);
        const progressBars = $(progressSelector);
        const images = imageSources;
        let currentIndex = 0;
        let rotationInterval;
    
        // --- Fade & Progress ---
        function showImage(index) {
            imageEl.stop(true, true).fadeOut(fadeDuration, 'swing', function () {
                $(this).attr('src', images[index]).fadeIn(fadeDuration, 'swing');
            });
        }
        function startProgressBar(index) {
            progressBars.eq(index).css({
                'transition': `width ${rotationTime / 1000}s linear`,
                'width': '100%'
            });
        }
        function resetAllDots() {
            progressBars.css({ 'transition': 'none', 'width': '0%' });
            setTimeout(() => {
                progressBars.css('transition', `width ${rotationTime / 1000}s linear`);
            }, 30);
        }
        function nextSlide() {
            currentIndex++;
            if (currentIndex >= images.length) {
                resetAllDots();
                currentIndex = 0;
            }
            showImage(currentIndex);
            startProgressBar(currentIndex);
        }
        resetAllDots();
        showImage(currentIndex);
        startProgressBar(currentIndex);
    
        // --- Interval ---
        if (sliderContainer.data('rotationInterval')) {
            clearInterval(sliderContainer.data('rotationInterval'));
        }
        rotationInterval = setInterval(nextSlide, rotationTime);
        sliderContainer.data('rotationInterval', rotationInterval);
    
        // --- Parallax ---
        if (
            enableParallax &&
            typeof gsap !== 'undefined' &&
            typeof ScrollTrigger !== 'undefined'
        ) {
            const slideItem = sliderContainer.find('.custom-development-slide-item') || imageEl;
            if (slideItem) {
                // Hardware acceleration and overflow optimization
                sliderContainer.css('overflow', 'hidden');
                gsap.set(slideItem, { willChange: "transform", scale: scaleStart });
    
                ScrollTrigger.create({
                    trigger: sliderContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8, // Smoother scrub
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const yOffset = progress * parallaxDistance;
                        const scaleValue = scaleStart + (progress * (scaleEnd - scaleStart));
                        gsap.to(slideItem, {
                            y: yOffset,
                            scale: scaleValue,
                            duration: 0.2, // Animate for smoothness
                            ease: "power4.out",
                            overwrite: "auto"
                        });
                    }
                });
            }
        }
    }
    

    // Fade slider 1
    setupFadeSlider({
        containerSelector: '.development-slider-images-1',
        imageSelector: '.development-slider-image', // Adjust if your selector is different per slider
        progressSelector: '.development-slider-dots-1 .dot-progress',
        imageSources: [
            'images/2025/developments/dev-project--11.png',
            'images/2025/developments/dev-project--12.jpg',
            'images/2025/developments/dev-project--13.jpg',
            'images/2025/developments/dev-project--14.jpg'
        ]
    });    

    // Fade slider 2 - with slight delay
    setTimeout(() => {
        setupFadeSlider({
            containerSelector: '.development-slider-images-2',
            imageSelector: '.development-slider-image',
            progressSelector: '.development-slider-dots-2 .dot-progress',
            imageSources: [
                'images/2025/developments/dev-project--21.png',
                'images/2025/developments/dev-project--12.jpg',
                'images/2025/developments/dev-project--13.jpg',
                'images/2025/developments/dev-project--14.jpg'
            ]
        });
    }, 1000); // 1 second delay

    // Fade slider 3
    setTimeout(() => {
        setupFadeSlider({
            containerSelector: '.development-slider-images-3',
            imageSelector: '.development-slider-image',
            progressSelector: '.development-slider-dots-3 .dot-progress',
            imageSources: [
                'images/2025/developments/dev-project--31.png',
                'images/2025/developments/dev-project--12.jpg',
                'images/2025/developments/dev-project--13.jpg',
                'images/2025/developments/dev-project--14.jpg'
            ]
        });
    }, 2000); // 2 second delay


    // Fade slider 4
    setTimeout(() => {
        setupFadeSlider({
            containerSelector: '.development-slider-images-4',
            imageSelector: '.development-slider-image',
            progressSelector: '.development-slider-dots-4 .dot-progress',
            imageSources: [
                'images/2025/developments/dev-project--41.png',
                'images/2025/developments/dev-project--12.jpg',
                'images/2025/developments/dev-project--13.jpg',
                'images/2025/developments/dev-project--14.jpg'
            ]   
        });
    }, 3000); // 3 second delay
    
    
    



    

    // // Development Slider 2 (Casa Sia) - Optimized
    // $('.development-slider-images-2').slick({
    //     dots: true,
    //     arrows: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     pauseOnHover: false,
    //     centerMode: false,
    //     centerPadding: '0px',
    //     fade: false,
    //     appendDots: $('.development-slider-dots-2'),
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         }
    //     ]
    // });

    // // Development Slider 3 (Pelican Gardens) - Optimized
    // $('.development-slider-images-3').slick({
    //     dots: true,
    //     arrows: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     pauseOnHover: false,
    //     centerMode: false,
    //     centerPadding: '0px',
    //     fade: false,
    //     appendDots: $('.development-slider-dots-3'),
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         }
    //     ]
    // });

    // // Development Slider 4 (Pelican Grove) - Optimized
    // $('.development-slider-images-4').slick({
    //     dots: true,
    //     arrows: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     pauseOnHover: false,
    //     centerMode: false,
    //     centerPadding: '0px',
    //     fade: false,
    //     appendDots: $('.development-slider-dots-4'),
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 fade: false
    //             }
    //         }
    //     ]
    // });


    



    // Purpose Slider
    $('.purpose-slider').slick({
        dots: false,
        arrows: false,
        infinite: false, // No looping
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        pauseOnHover: false,
        centerMode: false,
        centerPadding: '0px',
        // Touch and Swipe Settings
        touchMove: true,
        swipe: true,
        swipeToSlide: true,
        touchThreshold: 10,
        swipeEvent: true,
        // Pause autoplay on touch/swipe
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true
                }
            }
        ]
    });

    // Progress Bar Functionality
    $('.purpose-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        updateProgressBar(nextSlide, slick.slideCount);
    });

    // Also update on afterChange to ensure accuracy
    $('.purpose-slider').on('afterChange', function(event, slick, currentSlide) {
        updateProgressBar(currentSlide, slick.slideCount);
    });

    // Function to update progress bar
    function updateProgressBar(currentSlide, totalSlides) {
        // Ensure we're working with valid slide numbers
        if (currentSlide >= 0 && totalSlides > 0) {
            // Get current slidesToShow setting based on screen size
            let slidesToShow = 3; // Default for desktop
            
            if (window.innerWidth <= 768) {
                slidesToShow = 1; // Mobile
            } else if (window.innerWidth <= 1024) {
                slidesToShow = 2; // Tablet
            }
            
            // Calculate when progress should complete using your formula
            // Progress completion slide = Total slides - Slides shown + 1
            const progressCompleteSlide = totalSlides - slidesToShow + 1;
            
            // Calculate progress based on current slide position
            let progressPercentage;
            if (currentSlide >= progressCompleteSlide) {
                // We're at or past the completion point
                progressPercentage = 100;
            } else {
                // Calculate progress: each slide represents equal percentage
                // For 4 completion slides: 25%, 50%, 75%, 100%
                progressPercentage = ((currentSlide + 1) / progressCompleteSlide) * 100;
            }
            
            // Ensure we don't exceed 100%
            const finalPercentage = Math.min(progressPercentage, 100);
            
            $('.purpose-slider-progress-fill').css('width', finalPercentage + '%');
            
            // Debug logging
    
        }
    }

    // Initialize progress bar immediately and after slider init
    function initializeProgressBar() {
        const totalSlides = $('.purpose-slider .slick-slide').length;
        if (totalSlides > 0) {
            // Get current slidesToShow setting based on screen size
            let slidesToShow = 3; // Default for desktop
            
            if (window.innerWidth <= 768) {
                slidesToShow = 1; // Mobile
            } else if (window.innerWidth <= 1024) {
                slidesToShow = 2; // Tablet
            }
            
            // Calculate completion point using your formula
            const progressCompleteSlide = totalSlides - slidesToShow + 1;
            
            // Calculate initial progress: 1 / completion slides * 100
            const progressPercentage = (1 / progressCompleteSlide) * 100;
            
            $('.purpose-slider-progress-fill').css('width', progressPercentage + '%');
    
        }
    }

    // Set initial progress immediately
    initializeProgressBar();

    // Also set it after slider initialization
    $('.purpose-slider').on('init', function(event, slick) {

        updateProgressBar(0, slick.slideCount);
    });

    // Manual progress check - ensure 100% when all remaining slides are visible
    $('.purpose-slider').on('swipe', function(event, slick, direction) {
        const currentSlide = slick.currentSlide;
        const totalSlides = slick.slideCount;
        
        // Get current slidesToShow setting
        let slidesToShow = 3; // Default for desktop
        if (window.innerWidth <= 768) {
            slidesToShow = 1; // Mobile
        } else if (window.innerWidth <= 1024) {
            slidesToShow = 2; // Tablet
        }
        
        // Check if we're at the completion point using your formula
        const progressCompleteSlide = totalSlides - slidesToShow + 1;
        
        if (currentSlide >= progressCompleteSlide) {
            // We're at or past the completion point
            $('.purpose-slider-progress-fill').css('width', '100%');
    
        }
    });

    // MAIA Life Purpose Slider
    $('.maialife-purpose-slider').slick({
        dots: false,
        arrows: true,
        infinite: false, // No looping
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        pauseOnHover: false,
        centerMode: false,
        centerPadding: '0px',
        // Custom arrows
        prevArrow: $('.our-purpose-mission-vision .slick-arrow-prev'),
        nextArrow: $('.our-purpose-mission-vision .slick-arrow-next'),
        // Touch and Swipe Settings
        touchMove: true,
        swipe: true,
        swipeToSlide: true,
        touchThreshold: 10,
        swipeEvent: true,
        // Pause autoplay on touch/swipe
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true
                }
            }
        ]
    });

    // Progress Bar Functionality for MAIA Life Purpose Slider
    $('.maialife-purpose-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        updateProgressBar(nextSlide, slick.slideCount);
    });

    // Also update on afterChange to ensure accuracy
    $('.maialife-purpose-slider').on('afterChange', function(event, slick, currentSlide) {
        updateProgressBar(currentSlide, slick.slideCount);
    });

    // Initialize progress bar for MAIA Life Purpose Slider
    function initializeMAIALifeProgressBar() {
        const totalSlides = $('.maialife-purpose-slider .slick-slide').length;
        if (totalSlides > 0) {
            // Get current slidesToShow setting based on screen size
            let slidesToShow = 3; // Default for desktop
            
            if (window.innerWidth <= 768) {
                slidesToShow = 1; // Mobile
            } else if (window.innerWidth <= 1024) {
                slidesToShow = 2; // Tablet
            }
            
            // Calculate completion point using your formula
            const progressCompleteSlide = totalSlides - slidesToShow + 1;
            
            // Calculate initial progress: 1 / completion slides * 100
            const progressPercentage = (1 / progressCompleteSlide) * 100;
            
            $('.maialife-purpose-slider .purpose-slider-progress-fill').css('width', progressPercentage + '%');
        }
    }

    // Set initial progress for MAIA Life Purpose Slider
    initializeMAIALifeProgressBar();

    // Also set it after slider initialization
    $('.maialife-purpose-slider').on('init', function(event, slick) {
        updateProgressBar(0, slick.slideCount);
    });

    // Manual progress check for MAIA Life Purpose Slider
    $('.maialife-purpose-slider').on('swipe', function(event, slick, direction) {
        const currentSlide = slick.currentSlide;
        const totalSlides = slick.slideCount;
        
        // Get current slidesToShow setting
        let slidesToShow = 3; // Default for desktop
        if (window.innerWidth <= 768) {
            slidesToShow = 1; // Mobile
        } else if (window.innerWidth <= 1024) {
            slidesToShow = 2; // Tablet
        }
        
        // Check if we're at the completion point using your formula
        const progressCompleteSlide = totalSlides - slidesToShow + 1;
        
        if (currentSlide >= progressCompleteSlide) {
            // We're at or past the completion point
            $('.maialife-purpose-slider .purpose-slider-progress-fill').css('width', '100%');
        }
    });

    
    // Sustainability Initiatives Slider
    $('.sustainability-initiatives-slider').slick({
        dots: false,
        arrows: true,
        infinite: true, // Enable looping
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        pauseOnHover: false,
        centerMode: false,
        centerPadding: '0px',
        // Custom arrows
        prevArrow: $('.sustainability-arrow-prev'),
        nextArrow: $('.sustainability-arrow-next'),
        // Touch and Swipe Settings
        touchMove: true,
        swipe: true,
        swipeToSlide: true,
        touchThreshold: 10,
        swipeEvent: true,
        // Pause autoplay on touch/swipe
        pauseOnFocus: true,
        // Smooth easing
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)', // Smooth ease-in-out
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    arrows: true,
                    prevArrow: $('.sustainability-arrow-prev'),
                    nextArrow: $('.sustainability-arrow-next'),
                    infinite: true, // Enable looping
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true,
                    speed: 800,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    pauseOnHover: false,
                    arrows: true,
                    prevArrow: $('.sustainability-arrow-prev'),
                    nextArrow: $('.sustainability-arrow-next'),
                    infinite: true, // Enable looping
                    touchMove: true,
                    swipe: true,
                    swipeToSlide: true,
                    speed: 800,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
                }
            }
        ]
    });

    // Team Member Drawer Functionality
    $('[data-team-member-button]').on('click', function() {
        const teamMemberId = $(this).data('team-member-button');
        openTeamMemberDrawer(teamMemberId);
    });




    // Maialife Services Slider
    // Original Slick Slider (Commented Out)
    // $('.maialife-services-slider').slick({
    //     dots: false,
    //     arrows: true,
    //     infinite: true, // Enable looping
    //     speed: 800,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     pauseOnHover: false,
    //     centerMode: false,
    //     centerPadding: '0px',
    //     // Custom arrows
    //     prevArrow: $('.maialife-services-arrow-prev'),
    //     nextArrow: $('.maialife-services-arrow-next'),
    //     // Touch and Swipe Settings
    //     touchMove: true,
    //     swipe: true,
    //     swipeToSlide: true,
    //     touchThreshold: 10,
    //     swipeEvent: true,
    //     // Pause autoplay on touch/swipe
    //     pauseOnFocus: true,
    //     // Smooth easing
    //     cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)', // Smooth ease-in-out
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 arrows: true,
    //                 prevArrow: $('.maialife-services-arrow-prev'),
    //                 nextArrow: $('.maialife-services-arrow-next'),
    //                 infinite: true, // Enable looping
    //                 touchMove: true,
    //                 swipe: true,
    //                 swipeToSlide: true,
    //                 speed: 800,
    //                 cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 pauseOnHover: false,
    //                 arrows: true,
    //                 prevArrow: $('.maialife-services-arrow-prev'),
    //                 nextArrow: $('.maialife-services-arrow-next'),
    //                 infinite: true, // Enable looping
    //                 touchMove: true,
    //                 swipe: true,
    //                 swipeToSlide: true,
    //                 speed: 800,
    //                 cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
    //             }
    //         }
    //     ]
    // });

    // GSAP Horizontal Scroll for Maialife Services (ScrollTrigger)
    function initMaialifeServicesHorizontalScroll() {
        const sliderContainer = document.querySelector('.maialife-services-slider-container');
        const slider = document.querySelector('.maialife-services-slider');
        const sliderItems = document.querySelectorAll('.maialife-services-slider-item');
        
        if (!sliderContainer || !slider || !sliderItems.length) return;
        
        // Set up initial styles for horizontal scroll
        gsap.set(slider, {
            display: 'flex',
            flexDirection: 'row',
            width: `${sliderItems.length * 100}%` // Total width = number of items * 100%
        });
        
        gsap.set(sliderItems, {
            flex: '0 0 auto',
            width: `${100 / sliderItems.length}%` // Each item takes 1/nth of total width
        });
        
        // Create horizontal scroll animation with ScrollTrigger
        gsap.to(slider, {
            x: () => -(slider.offsetWidth - sliderContainer.offsetWidth), // Scroll to show all content
            // ease: "power1.inOut",
            scrollTrigger: {
                trigger: sliderContainer,
                start: "top top+=150px", // Start when container is 40px before reaching top
                end: () => `+=${slider.offsetWidth + sliderContainer.offsetWidth}`, // Extra distance to ensure last slide is fully visible
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the container while scrolling
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
    }
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        // Wait for GSAP to be available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initMaialifeServicesHorizontalScroll();
        }
    });

    // Why Bespoke Slider
    $('.why-bespoke-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: false,
        centerPadding: '0px',
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        prevArrow: $('.why-bespoke-slider-nav .slick-arrow-prev'),
        nextArrow: $('.why-bespoke-slider-nav .slick-arrow-next')
    });
});






// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.querySelector('.contact-us');
    if (contactSection) {
        const elementTop = contactSection.offsetTop;
        const offset = 45; // 85px from top
        
        window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
        });
    }
}

// Team Member Drawer Functions
function openTeamMemberDrawer(teamMemberId) {
    // Get the content wrapper (the one in the drawer, not the storage one)
    const contentWrapper = document.querySelector('#team-member-drawer .team-member-content-wrapper');

    // Find the source content info div
    const sourceInfo = document.querySelector(`#team-member-${teamMemberId}-content`).closest('.team-member-content--info');

    if (sourceInfo && contentWrapper) {
        // Just get the innerHTML and put it directly in the wrapper
        contentWrapper.innerHTML = sourceInfo.innerHTML;

        // Remove the hidden class from the content div
        const contentDiv = contentWrapper.querySelector('.team-member-content');
        if (contentDiv) {
            contentDiv.classList.remove('hidden');
            contentDiv.style.opacity = '1';
        }
    } else {
        console.log('Source content or wrapper not found!');
    }
    
    // Get the drawer and content elements
    const drawer = document.getElementById('team-member-drawer');
    const drawerContent = drawer.querySelector('.drawer-content');
    
    // Show the drawer first
    drawer.classList.remove('hidden');
    drawer.style.opacity = '1';
    drawer.style.pointerEvents = 'all';
    
    // Force a reflow to ensure the transition works
    drawer.offsetHeight;
    
    // Slide in the content
    drawerContent.style.transform = 'translateX(0)';
    
    // Add show class for additional styling
    drawer.classList.add('show');

    // Lock body scroll
    lenis.stop();
}

function closeTeamMemberDrawer() {
    // Get the drawer and content elements
    const drawer = document.getElementById('team-member-drawer');
    const drawerContent = drawer.querySelector('.drawer-content');
    
    // Remove show class first
    drawer.classList.remove('show');
    
    // Slide out the content
    drawerContent.style.transform = 'translateX(100%)';
    
    // Wait for the slide animation to complete, then hide the drawer
    setTimeout(() => {
        // Hide the drawer completely
        drawer.style.opacity = '0';
        drawer.style.pointerEvents = 'none';
        drawer.classList.add('hidden');
        
        // Reset content position for next open
        drawerContent.style.transform = 'translateX(100%)';
        
        // Hide all team member content
        $('.team-member-content').removeClass('show').addClass('hidden');
        
        // Restart body scroll
        lenis.start();
    }, 300); // Match the CSS transition duration
}
