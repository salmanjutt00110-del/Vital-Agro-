import { useEffect } from 'react';

/**
 * Hook to automatically play/pause a video element when it enters/leaves the viewport,
 * or when the user switches tabs / leaves the page.
 * Reduces CPU and GPU usage on pages with background videos.
 * 
 * @param {React.RefObject<HTMLVideoElement>} videoRef 
 */
export default function useVideoAutoplay(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play only if page is visible
          if (!document.hidden) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Check if element is still in viewport before playing
        const rect = video.getBoundingClientRect();
        const inViewport = (
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0
        );
        if (inViewport) {
          video.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.unobserve(video);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoRef]);
}
