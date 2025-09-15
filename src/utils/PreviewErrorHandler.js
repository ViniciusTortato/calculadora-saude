/**
 * Utility to handle preview script errors gracefully
 */
export class PreviewErrorHandler {
  static init() {
    // Override the problematic preview script function
    if (typeof window !== 'undefined' && window.setInspectorActive) {
      const originalSetInspectorActive = window.setInspectorActive;
      
      window.setInspectorActive = function(isActive) {
        try {
          return originalSetInspectorActive.call(this, isActive);
        } catch (error) {
          console.warn('Preview inspector error caught:', error.message);
          return false;
        }
      };
    }

    // Add global error handler for preview-related errors
    window.addEventListener('error', (event) => {
      if (event.error && event.error.stack && event.error.stack.includes('preview-script')) {
        event.preventDefault();
        console.warn('Preview script error suppressed:', event.error.message);
      }
    });
  }

  static ensureInspectorElement() {
    if (!document.querySelector('[data-preview-inspector]')) {
      const inspector = document.createElement('div');
      inspector.setAttribute('data-preview-inspector', 'true');
      inspector.style.display = 'none';
      document.body.appendChild(inspector);
      return inspector;
    }
    return document.querySelector('[data-preview-inspector]');
  }
}

// Initialize preview error handling
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    PreviewErrorHandler.init();
    PreviewErrorHandler.ensureInspectorElement();
  });
}
