'use client';

export const ErrorBoundary = () => {
  return (
    <div id="error-boundary" className="hidden fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
      <div className="text-white text-center p-6">
        <p className="text-xl mb-4">Something went wrong. Please try again.</p>
        <div 
          role="button"
          tabIndex={0}
          onClick={() => window.location.reload()} 
          onKeyDown={(e) => e.key === 'Enter' && window.location.reload()}
          className="nav-button cursor-pointer"
        >
          Reload Page
        </div>
      </div>
    </div>
  );
}; 