$(document).ready(function(){
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
