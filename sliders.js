$(document).ready(function(){
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

    // Development Slider 1 (27 Summit) - Starts immediately
    $('.development-slider-images-1').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        centerMode: false,
        centerPadding: '0px',
        fade: true,
        appendDots: $('.development-slider-dots-1'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: false,
                    fade: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: false,
                    fade: true
                }
            }
        ]
    });

    // Development Slider 2 (Casa Sia) - Starts after 1 second
    setTimeout(function() {
        $('.development-slider-images-2').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            centerMode: false,
            centerPadding: '0px',
            fade: true,
            appendDots: $('.development-slider-dots-2'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                }
            ]
        });
    }, 1000);

    // Development Slider 3 (Pelican Gardens) - Starts after 2 seconds
    setTimeout(function() {
        $('.development-slider-images-3').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            centerMode: false,
            centerPadding: '0px',
            fade: true,
            appendDots: $('.development-slider-dots-3'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                }
            ]
        });
    }, 2000);

    // Development Slider 4 (Pelican Grove) - Starts after 3 seconds
    setTimeout(function() {
        $('.development-slider-images-4').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            centerMode: false,
            centerPadding: '0px',
            fade: true,
            appendDots: $('.development-slider-dots-4'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        fade: true
                    }
                }
            ]
        });
    }, 3000);

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
});






// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.querySelector('.contact-us');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
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
