// Optimized Video Loading System
class VideoLoader {
    constructor() {
        this.videos = [];
        this.loadedVideos = new Set();
        this.init();
    }

    init() {
        // Find all videos with data-src attributes
        this.videos = document.querySelectorAll('video[data-src]');
        
        if (this.videos.length === 0) return;

        // Set up intersection observer for lazy loading
        this.setupIntersectionObserver();
        
        // Preload critical videos immediately
        this.preloadCriticalVideos();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px', // Start loading 50px before video comes into view
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadVideo(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all videos
        this.videos.forEach(video => {
            this.observer.observe(video);
        });
    }

    preloadCriticalVideos() {
        // Immediately load hero videos (above the fold)
        const heroVideos = document.querySelectorAll('.hero-video-desktop, .hero-video-mobile');
        heroVideos.forEach(video => {
            this.loadVideo(video, true); // true = critical priority
        });
    }

    async loadVideo(video, isCritical = false) {
        if (this.loadedVideos.has(video)) return;

        const dataSrc = video.getAttribute('data-src');
        if (!dataSrc) return;

        try {
            // Show loading state
            this.showLoadingState(video);

            // Set up video source
            video.src = dataSrc;
            
            // Set up source elements
            const sourceElements = video.querySelectorAll('source[data-src]');
            sourceElements.forEach(source => {
                source.src = source.getAttribute('data-src');
            });

            // Load the video
            video.load();

            // Wait for video to be ready
            await this.waitForVideoReady(video);

            // Start playing if it's the hero video
            if (video.classList.contains('hero-video-desktop') || video.classList.contains('hero-video-mobile')) {
                try {
                    await video.play();
                } catch (error) {
                    console.log('Autoplay prevented:', error);
                    // Video will play when user interacts with page
                }
            }

            // Hide loading state and show video
            this.hideLoadingState(video);
            this.loadedVideos.add(video);

        } catch (error) {
            console.error('Error loading video:', error);
            this.handleVideoError(video);
        }
    }

    waitForVideoReady(video) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Video load timeout'));
            }, 10000); // 10 second timeout

            const onCanPlay = () => {
                clearTimeout(timeout);
                video.removeEventListener('canplay', onCanPlay);
                video.removeEventListener('error', onError);
                resolve();
            };

            const onError = () => {
                clearTimeout(timeout);
                video.removeEventListener('canplay', onCanPlay);
                video.removeEventListener('error', onError);
                reject(new Error('Video load error'));
            };

            video.addEventListener('canplay', onCanPlay);
            video.addEventListener('error', onError);
        });
    }

    showLoadingState(video) {
        const placeholder = video.parentElement.querySelector('.hero-video-placeholder');
        if (placeholder) {
            placeholder.classList.remove('hidden');
        }
    }

    hideLoadingState(video) {
        const placeholder = video.parentElement.querySelector('.hero-video-placeholder');
        if (placeholder) {
            placeholder.classList.add('hidden');
        }
        
        // Add loaded class to video
        video.classList.add('loaded');
    }

    handleVideoError(video) {
        console.error('Failed to load video:', video.getAttribute('data-src'));
        
        // Hide loading spinner
        const spinner = video.parentElement.querySelector('.hero-loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
        
        // Keep placeholder image visible as fallback
    }

    // Method to preload videos on user interaction
    enableAutoplayOnInteraction() {
        const enableAutoplay = () => {
            this.videos.forEach(video => {
                if (video.classList.contains('loaded') && video.paused) {
                    video.play().catch(e => console.log('Autoplay still prevented'));
                }
            });
            
            // Remove event listeners after first interaction
            document.removeEventListener('click', enableAutoplay);
            document.removeEventListener('scroll', enableAutoplay);
            document.removeEventListener('touchstart', enableAutoplay);
        };

        // Enable autoplay on first user interaction
        document.addEventListener('click', enableAutoplay, { once: true });
        document.addEventListener('scroll', enableAutoplay, { once: true });
        document.addEventListener('touchstart', enableAutoplay, { once: true });
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.videos = [];
        this.loadedVideos.clear();
    }
}

// Initialize video loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.videoLoader = new VideoLoader();
    
    // Enable autoplay on user interaction
    window.videoLoader.enableAutoplayOnInteraction();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoLoader;
}
