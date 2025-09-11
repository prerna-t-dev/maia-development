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

    // Navigation Overlay Functionality
    const menuButton = $('#menu-bar-button');
    const navOverlay = $('#nav-overlay');
    const navClose = $('#nav-close');
    
    // Handle Google Maps iframe scroll interference
    $('.location--map iframe').on('load', function() {
        console.log('Google Maps iframe loaded - scroll handling active');
        
        // Prevent iframe from interfering with Lenis
        $(this).on('wheel', function(e) {
            // Allow normal scrolling when hovering over the map
            return true;
        });
    });

    // Function to reinitialize Lenis after overlay closes
    function reinitializeLenis() {
        setTimeout(() => {
            if (typeof Lenis !== 'undefined') {
                // Destroy any existing Lenis first
                if (window.lenis) {
                    window.lenis.destroy();
                }
                
                // Create new Lenis instance
                window.lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
                
                // Start the RAF loop
                function raf(time) {
                    if (window.lenis) {
                        window.lenis.raf(time);
                        requestAnimationFrame(raf);
                    }
                }
                requestAnimationFrame(raf);
                
                console.log('Lenis reinitialized'); // Debug log
            }
        }, 1200); // Wait for CSS transition to complete (1.2s)
    }
    
    // Force overlay off-screen on window resize
    $(window).on('resize', function() {
        if (!navOverlay.hasClass('open')) {
            navOverlay.css({
                'top': '-100vh',
                'visibility': 'hidden',
                'opacity': '0'
            });
        }
    });
    
    // Open navigation overlay - with mobile touch support
    menuButton.on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navOverlay.addClass('open');
        $('body').addClass('overflow-hidden'); // Prevent background scrolling
        
        // Completely disable Lenis and force native scrolling
        if (typeof lenis !== 'undefined') {
            lenis.destroy();
        }
        
        // Force native scrolling on the container
        setTimeout(() => {
            $('.nav-list--container').css({
                'overflow-y': 'auto',
                'height': 'calc(100vh - 160px)',
                'position': 'relative',
                'overflow-x': 'hidden'
            });
            
            // Force scroll behavior
            $('.nav-list--container')[0].style.overflowY = 'scroll';
        }, 200);
    });
    
    // Close navigation overlay - with mobile touch support
    navClose.on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked'); // Debug log
        
        // Start closing animation by removing open class
        navOverlay.removeClass('open');
        $('body').removeClass('overflow-hidden'); // Restore scrolling
        
        // Re-initialize Lenis after overlay animation completes
        reinitializeLenis();
    });
    
    // Close on overlay click (optional)
    navOverlay.on('click', function(e) {
        if (e.target === this) {
            navOverlay.removeClass('open');
            $('body').removeClass('overflow-hidden');
            
            // Re-initialize Lenis after overlay animation completes
            reinitializeLenis();
        }
    });
    
    // Close on escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && navOverlay.hasClass('open')) {
            navOverlay.removeClass('open');
            $('body').removeClass('overflow-hidden');
            
            // Re-initialize Lenis after overlay animation completes
            reinitializeLenis();
        }
    });

    // Services Accordion functionality - SIMPLE
    $('.services-header').on('click', function() {
        const submenu = $('.services-submenu');
        const toggle = $('.services-toggle');
        
        // Check if accordion is currently open
        const isOpen = submenu.css('opacity') === '1';
        
        if (!isOpen) {
            // Open accordion
            submenu.css({
                'transition': 'all 0.4s ease-out',
                'opacity': '1',
                'max-height': '150px',
                'transform': 'translateY(0) scale(1)',
                'pointer-events': 'auto',
                'margin-top': '16px'
            });
            toggle.text('-');
        } else {
            // Close accordion
            submenu.css({
                'transition': 'all 0.4s ease-out',
                'opacity': '0',
                'max-height': '0',
                'transform': 'translateY(-10px) scale(0.95)',
                'pointer-events': 'none',
                'margin-top': '0'
            });
            toggle.text('+');
        }
    });



    // Latest Posts - Dynamic Blog System
    initializeBlogSystem();

    // Latest News - Dynamic News System
    initializeLatestNewsSystem();

    // Featured Articles Slider
    $('.featured-articles-slider').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        centerMode: false,
        centerPadding: '0px',
        prevArrow: $('.featured-articles .slick-arrow-prev'),
        nextArrow: $('.featured-articles .slick-arrow-next'),
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

    // Featured Blogposts Slider
    $('.featured-blogposts-slider').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        centerMode: false,
        centerPadding: '0px',
        prevArrow: $('.featured-blog-posts .slick-arrow-prev'),
        nextArrow: $('.featured-blog-posts .slick-arrow-next'),
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

    // Article Slider Progress Bar Functionality
    $('.featured-articles-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        updateArticleProgressBar(nextSlide, slick.slideCount);
    });

    // Also update on afterChange to ensure accuracy
    $('.featured-articles-slider').on('afterChange', function(event, slick, currentSlide) {
        updateArticleProgressBar(currentSlide, slick.slideCount);
    });

    // Blogposts Slider Progress Bar Functionality
    $('.featured-blogposts-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        updateBlogpostsProgressBar(nextSlide, slick.slideCount);
    });

    // Also update on afterChange to ensure accuracy
    $('.featured-blogposts-slider').on('afterChange', function(event, slick, currentSlide) {
        updateBlogpostsProgressBar(currentSlide, slick.slideCount);
    });

    // Function to update article progress bar
    function updateArticleProgressBar(currentSlide, totalSlides) {
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
            
            $('.article-slider-progress-fill').css('width', finalPercentage + '%');
        }
    }

    // Function to update blogposts progress bar
    function updateBlogpostsProgressBar(currentSlide, totalSlides) {
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
            
            $('.blogpost-slider-progress-fill').css('width', finalPercentage + '%');
        }
    }

    // Initialize article progress bar immediately and after slider init
    function initializeArticleProgressBar() {
        const totalSlides = $('.featured-articles-slider .slick-slide').length;
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
            
            $('.article-slider-progress-fill').css('width', progressPercentage + '%');
        }
    }

    // Initialize blogposts progress bar immediately and after slider init
    function initializeBlogpostsProgressBar() {
        const totalSlides = $('.featured-blogposts-slider .slick-slide').length;
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
            
            $('.blogpost-slider-progress-fill').css('width', progressPercentage + '%');
        }
    }

    // Set initial progress immediately
    initializeArticleProgressBar();
    initializeBlogpostsProgressBar();

    // Also set it after slider initialization
    $('.featured-articles-slider').on('init', function(event, slick) {
        updateArticleProgressBar(0, slick.slideCount);
    });

    $('.featured-blogposts-slider').on('init', function(event, slick) {
        updateBlogpostsProgressBar(0, slick.slideCount);
    });

    // Manual progress check - ensure 100% when all remaining slides are visible
    $('.featured-articles-slider').on('swipe', function(event, slick, direction) {
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
            $('.article-slider-progress-fill').css('width', '100%');
        }
    });

    // Manual progress check for blogposts slider - ensure 100% when all remaining slides are visible
    $('.featured-blogposts-slider').on('swipe', function(event, slick, direction) {
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
            $('.blogpost-slider-progress-fill').css('width', '100%');
        }
    });

});

// Blog Posts Data Structure (Easy to convert to WordPress later)
const blogPosts = [
    {
        id: 1,
        title: "Under-Construction vs. Ready-to-Move-In Apartments: Which is Better for You?",
        excerpt: "Explore the pros and cons of under-construction and ready-to-move-in apartments to make an informed decision for your next home purchase.",
        category: "Apartments",
        date: "June 12, 2025",
        readTime: "5 min read",
        author: "Mayela Lozano",
        image: "images/2025/blogs/latest-blog--1.png",
        featured: true
    },
    {
        id: 2,
        title: "How to Start Investing in Real Estate: Profitable Strategies for First-Time Buyers",
        excerpt: "Learn essential strategies and tips for first-time real estate investors to maximize returns and minimize risks.",
        category: "Real Estate Investment",
        date: "June 10, 2025",
        readTime: "7 min read",
        author: "Sarah Johnson",
        image: "images/2025/blogs/latest-blog--2.png",
        featured: false
    },
    {
        id: 3,
        title: "Key Real Estate Trends Shaping 2025: Luxury Redefined",
        excerpt: "Discover the latest trends in luxury real estate that are reshaping the market in 2025.",
        category: "General",
        date: "June 8, 2025",
        readTime: "6 min read",
        author: "Michael Chen",
        image: "images/2025/blogs/latest-blog--3.png",
        featured: false
    },
    {
        id: 4,
        title: "Sustainable Living: Eco-Friendly Features in Modern Apartments",
        excerpt: "Explore how modern apartments are incorporating sustainable and eco-friendly features for a greener lifestyle.",
        category: "Sustainability",
        date: "June 6, 2025",
        readTime: "4 min read",
        author: "Emma Wilson",
        image: "images/2025/blogs/latest-blog--4.png",
        featured: false
    },
    {
        id: 5,
        title: "Bangalore's Top Residential Areas: A Complete Guide",
        excerpt: "Comprehensive guide to Bangalore's most sought-after residential areas and what makes them special.",
        category: "Location Guide",
        date: "June 4, 2025",
        readTime: "8 min read",
        author: "Rajesh Kumar",
        image: "images/2025/blogs/latest-blog--5.png",
        featured: false
    },
    {
        id: 6,
        title: "Home Loan Tips: How to Get the Best Interest Rates",
        excerpt: "Expert tips on securing the best home loan interest rates and saving thousands on your property purchase.",
        category: "Finance",
        date: "June 2, 2025",
        readTime: "5 min read",
        author: "Priya Sharma",
        image: "images/2025/blogs/latest-blog--6.png",
        featured: false
    },
    {
        id: 7,
        title: "Interior Design Trends for Modern Apartments",
        excerpt: "Stay ahead with the latest interior design trends that are transforming modern apartment living.",
        category: "Interior Design",
        date: "May 30, 2025",
        readTime: "6 min read",
        author: "David Lee",
        image: "images/2025/blogs/latest-blog--7.png",
        featured: false
    },
    {
        id: 8,
        title: "Property Investment ROI: Calculating Your Returns",
        excerpt: "Learn how to calculate and maximize your return on investment in real estate properties.",
        category: "Real Estate Investment",
        date: "May 28, 2025",
        readTime: "7 min read",
        author: "Lisa Anderson",
        image: "images/2025/blogs/latest-blog--8.png",
        featured: false
    },
    {
        id: 9,
        title: "Smart Home Technology Integration in Luxury Apartments",
        excerpt: "Discover how smart home technology is revolutionizing luxury apartment living experiences.",
        category: "Technology",
        date: "May 26, 2025",
        readTime: "5 min read",
        author: "Alex Rodriguez",
        image: "images/2025/blogs/latest-blog--9.png",
        featured: false
    }
];

// Latest News Data Structure (Easy to convert to WordPress later)
const latestNewsPosts = [
    {
        id: 1,
        title: "Hindustan Times: MAIA Estates plans ₹3,000 crore...",
        excerpt: "MAIA Estates announces ambitious expansion plans with ₹3,000 crore investment in luxury residential projects across Bangalore.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "3 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--1.png",
        featured: true
    },
    {
        id: 2,
        title: "News18: Moodboards Are Out, Mood-Led Design Is In-The...",
        excerpt: "Revolutionary approach to interior design where mood-driven concepts replace traditional moodboards in luxury living spaces.",
        category: "Posts",
        date: "June 12, 2025",
        readTime: "4 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--2.png",
        featured: false
    },
    {
        id: 3,
        title: "Real Estate News: Why NRIs and HNIs are betting BIG o",
        excerpt: "Analysis of why Non-Resident Indians and High Net Worth Individuals are increasingly investing in luxury real estate projects.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "5 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--3.png",
        featured: false
    },
    {
        id: 4,
        title: "Hindustan Times: MAIA Estates plans ₹3,000 crore...",
        excerpt: "MAIA Estates announces ambitious expansion plans with ₹3,000 crore investment in luxury residential projects across Bangalore.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "3 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--4.png",
        featured: false
    },
    {
        id: 5,
        title: "News18: Moodboards Are Out, Mood-Led Design Is In-The...",
        excerpt: "Revolutionary approach to interior design where mood-driven concepts replace traditional moodboards in luxury living spaces.",
        category: "Posts",
        date: "June 12, 2025",
        readTime: "4 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--5.png",
        featured: false
    },
    {
        id: 6,
        title: "Real Estate News: Why NRIs and HNIs are betting BIG o",
        excerpt: "Analysis of why Non-Resident Indians and High Net Worth Individuals are increasingly investing in luxury real estate projects.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "5 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--6.png",
        featured: false
    },
    {
        id: 7,
        title: "Hindustan Times: MAIA Estates plans ₹3,000 crore...",
        excerpt: "MAIA Estates announces ambitious expansion plans with ₹3,000 crore investment in luxury residential projects across Bangalore.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "3 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--7.png",
        featured: false
    },
    {
        id: 8,
        title: "News18: Moodboards Are Out, Mood-Led Design Is In-The...",
        excerpt: "Revolutionary approach to interior design where mood-driven concepts replace traditional moodboards in luxury living spaces.",
        category: "Posts",
        date: "June 12, 2025",
        readTime: "4 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--8.png",
        featured: false
    },
    {
        id: 9,
        title: "Real Estate News: Why NRIs and HNIs are betting BIG o",
        excerpt: "Analysis of why Non-Resident Indians and High Net Worth Individuals are increasingly investing in luxury real estate projects.",
        category: "Awards",
        date: "June 12, 2025",
        readTime: "5 min read",
        author: "MAIA Estates",
        image: "images/2025/articles/latest-news--9.png",
        featured: false
    }
];

// Categories for filtering
const blogCategories = [
    { id: 'all', name: 'All Posts' },
    { id: 'Apartments', name: 'Apartments' },
    { id: 'Real Estate Investment', name: 'Real Estate Investment' },
    { id: 'General', name: 'General' },
    { id: 'Sustainability', name: 'Sustainability' },
    { id: 'Location Guide', name: 'Location Guide' },
    { id: 'Finance', name: 'Finance' },
    { id: 'Interior Design', name: 'Interior Design' },
    { id: 'Technology', name: 'Technology' }
];

// Latest News Categories for filtering
const latestNewsCategories = [
    { id: 'all', name: 'All News' },
    { id: 'Awards', name: 'Awards' },
    { id: 'Posts', name: 'Posts' }
];

// Blog System State
let currentPage = 1;
let postsPerPage = 9;
let currentCategory = 'all';
let currentSearchTerm = '';
let filteredPosts = [...blogPosts];

// Latest News System State
let currentNewsPage = 1;
let newsPerPage = 9;
let currentNewsCategory = 'all';
let currentNewsSearchTerm = '';
let filteredNewsPosts = [...latestNewsPosts];

// Initialize Blog System
function initializeBlogSystem() {
    renderCategoryFilters();
    renderBlogPosts();
    renderPagination();
    initializeSearch();
    initializeCategoryFilters();
    initializeBlogPostLinks();
}

// Initialize Latest News System
function initializeLatestNewsSystem() {
    renderLatestNewsCategoryFilters();
    renderLatestNewsPosts();
    renderLatestNewsPagination();
    initializeLatestNewsSearch();
    initializeLatestNewsCategoryFilters();
    initializeLatestNewsPostLinks();
}

// Render Category Filters
function renderCategoryFilters() {
    const categoryContainer = document.querySelector('.blog-categories');
    if (!categoryContainer) return;

    categoryContainer.innerHTML = blogCategories.map(category => `
        <button class="category-filter-btn ${category.id === currentCategory ? 'active' : ''}" 
                data-category="${category.id}">
            ${category.name}
        </button>
    `).join('');
}

// Render Blog Posts
function renderBlogPosts() {
    const postsContainer = document.querySelector('.blog-posts-grid');
    if (!postsContainer) return;

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    // Fade out current content
    $(postsContainer).fadeOut(200, function() {
        // Update content
        postsContainer.innerHTML = postsToShow.map(post => `
            <a href="#" class="blog-post-card" data-post-id="${post.id}">
                <div class="blog-post-image">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                </div>
                <div class="blog-post-content">
                    <div class="blog-post-category">${post.category}</div>
                    <h3 class="blog-post-title">${post.title}</h3>
                    <p class="blog-post-date">${post.date}</p>
                </div>
            </a>
        `).join('');
        
        // Fade in new content
        $(postsContainer).fadeIn(300);
    });
}

// Render Pagination
function renderPagination() {
    const paginationContainer = document.querySelector('.blog-pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Initialize Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.blog-search-input');
    const searchBtn = document.querySelector('.blog-search-btn');
    
    if (!searchInput) return;

    // Search on input (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchTerm = e.target.value.toLowerCase();
            filterPosts();
        }, 300);
    });

    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentSearchTerm = searchInput.value.toLowerCase();
            filterPosts();
        });
    }

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearchTerm = searchInput.value.toLowerCase();
            filterPosts();
        }
    });
}

// Initialize Category Filters
function initializeCategoryFilters() {
    const categoryContainer = document.querySelector('.blog-categories');
    if (!categoryContainer) return;

    categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-filter-btn')) {
            currentCategory = e.target.dataset.category;
            currentPage = 1; // Reset to first page
            filterPosts();
        }
    });
}

// Initialize Blog Post Links
function initializeBlogPostLinks() {
    const postsContainer = document.querySelector('.blog-posts-grid');
    if (!postsContainer) return;

    postsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.blog-post-card')) {
            e.preventDefault(); // Prevent default link behavior
            const postCard = e.target.closest('.blog-post-card');
            const postId = postCard.dataset.postId;
            
            // Find the post data
            const post = blogPosts.find(p => p.id == postId);
            if (post) {
                // For now, just log the post data
                // Later this can be replaced with actual navigation to blog post page
                console.log('Clicked on post:', post);
                
                // Example: Navigate to blog post page
                // window.location.href = `/blog/${post.id}`;
                // or
                // window.location.href = `/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`;
            }
        }
    });
}

// Filter Posts based on category and search
function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = currentSearchTerm === '' || 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.category.toLowerCase().includes(currentSearchTerm);
        
        return matchesCategory && matchesSearch;
    });
    
    // Re-render everything
    renderCategoryFilters();
    renderBlogPosts();
    renderPagination();
}

// Latest News Functions

// Render Latest News Category Filters
function renderLatestNewsCategoryFilters() {
    const categoryContainer = document.querySelector('.latest-news-categories');
    if (!categoryContainer) return;

    categoryContainer.innerHTML = latestNewsCategories.map(category => `
        <button class="category-filter-btn ${category.id === currentNewsCategory ? 'active' : ''}" 
                data-category="${category.id}">
            ${category.name}
        </button>
    `).join('');
}

// Render Latest News Posts
function renderLatestNewsPosts() {
    const postsContainer = document.querySelector('.latest-news-posts-grid');
    if (!postsContainer) return;

    const startIndex = (currentNewsPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const postsToShow = filteredNewsPosts.slice(startIndex, endIndex);

    // Fade out current content
    $(postsContainer).fadeOut(200, function() {
        // Update content
        postsContainer.innerHTML = postsToShow.map(post => `
            <a href="#" class="blog-post-card" data-post-id="${post.id}">
                <div class="latest-news-post-image">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                </div>
                <div class="blog-post-content">
                    <h3 class="blog-post-title">${post.title}</h3>
                    <p class="blog-post-date">${post.date}</p>
                </div>
            </a>
        `).join('');
        
        // Fade in new content
        $(postsContainer).fadeIn(300);
    });
}

// Render Latest News Pagination
function renderLatestNewsPagination() {
    const paginationContainer = document.querySelector('.latest-news-pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredNewsPosts.length / newsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn ${currentNewsPage === 1 ? 'disabled' : ''}" 
                data-page="${currentNewsPage - 1}" ${currentNewsPage === 1 ? 'disabled' : ''}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentNewsPage - 1 && i <= currentNewsPage + 1)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentNewsPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentNewsPage - 2 || i === currentNewsPage + 2) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn ${currentNewsPage === totalPages ? 'disabled' : ''}" 
                data-page="${currentNewsPage + 1}" ${currentNewsPage === totalPages ? 'disabled' : ''}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Initialize Latest News Search Functionality
function initializeLatestNewsSearch() {
    const searchInput = document.querySelector('.latest-news-search-input');
    const searchBtn = document.querySelector('.latest-news-search-btn');
    
    if (!searchInput) return;

    // Search on input (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentNewsSearchTerm = e.target.value.toLowerCase();
            filterLatestNewsPosts();
        }, 300);
    });

    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentNewsSearchTerm = searchInput.value.toLowerCase();
            filterLatestNewsPosts();
        });
    }

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentNewsSearchTerm = searchInput.value.toLowerCase();
            filterLatestNewsPosts();
        }
    });
}

// Initialize Latest News Category Filters
function initializeLatestNewsCategoryFilters() {
    const categoryContainer = document.querySelector('.latest-news-categories');
    if (!categoryContainer) return;

    categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-filter-btn')) {
            currentNewsCategory = e.target.dataset.category;
            currentNewsPage = 1; // Reset to first page
            filterLatestNewsPosts();
        }
    });
}

// Initialize Latest News Post Links
function initializeLatestNewsPostLinks() {
    const postsContainer = document.querySelector('.latest-news-posts-grid');
    if (!postsContainer) return;

    postsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.blog-post-card')) {
            e.preventDefault(); // Prevent default link behavior
            const postCard = e.target.closest('.blog-post-card');
            const postId = postCard.dataset.postId;
            
            // Find the post data
            const post = latestNewsPosts.find(p => p.id == postId);
            if (post) {
                // For now, just log the post data
                // Later this can be replaced with actual navigation to news post page
                console.log('Clicked on news post:', post);
                
                // Example: Navigate to news post page
                // window.location.href = `/news/${post.id}`;
                // or
                // window.location.href = `/news/${post.title.toLowerCase().replace(/\s+/g, '-')}`;
            }
        }
    });
}

// Filter Latest News Posts based on category and search
function filterLatestNewsPosts() {
    filteredNewsPosts = latestNewsPosts.filter(post => {
        const matchesCategory = currentNewsCategory === 'all' || post.category === currentNewsCategory;
        const matchesSearch = currentNewsSearchTerm === '' || 
            post.title.toLowerCase().includes(currentNewsSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentNewsSearchTerm) ||
            post.category.toLowerCase().includes(currentNewsSearchTerm);
        
        return matchesCategory && matchesSearch;
    });
    
    // Re-render everything
    renderLatestNewsCategoryFilters();
    renderLatestNewsPosts();
    renderLatestNewsPagination();
}

// Initialize Pagination Event Listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination-btn') && !e.target.disabled) {
        const page = parseInt(e.target.dataset.page);
        
        // Check if it's blog pagination
        if (e.target.closest('.blog-pagination')) {
            if (page && page !== currentPage) {
                currentPage = page;
                renderBlogPosts();
                renderPagination();
                
                // Scroll to top of blog section
                const blogSection = document.querySelector('.latest-posts');
                if (blogSection) {
                    blogSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        // Check if it's latest news pagination
        if (e.target.closest('.latest-news-pagination')) {
            if (page && page !== currentNewsPage) {
                currentNewsPage = page;
                renderLatestNewsPosts();
                renderLatestNewsPagination();
                
                // Scroll to top of latest news section
                const newsSection = document.querySelector('.latest-news');
                if (newsSection) {
                    newsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }
});

// AJAX Search Simulation (for WordPress conversion later)
function searchPostsAjax(searchTerm, category = 'all', page = 1) {
    // This function will be replaced with actual WordPress AJAX calls
    // For now, it simulates the filtering we already do
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = blogPosts.filter(post => {
                const matchesCategory = category === 'all' || post.category === category;
                const matchesSearch = searchTerm === '' || 
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
                
                return matchesCategory && matchesSearch;
            });
            
            resolve({
                posts: filtered,
                total: filtered.length,
                page: page,
                totalPages: Math.ceil(filtered.length / postsPerPage)
            });
        }, 300); // Simulate network delay
    });

}

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


