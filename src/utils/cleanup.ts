import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Cleanup function to stop all audio and clear intervals/timeouts
export const cleanup = () => {
  // Stop all audio elements
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  // Stop all video elements
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
};

// Show error boundary when needed
export const showErrorBoundary = () => {
  const errorBoundary = document.getElementById('error-boundary');
  if (errorBoundary) {
    errorBoundary.classList.remove('hidden');
  }
};

// Safe navigation function that cleans up before navigating
export const safeNavigate = (router: AppRouterInstance, path: string) => {
  cleanup();
  router.push(path);
}; 