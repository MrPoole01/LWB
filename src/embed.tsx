import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EmbeddableLeadForm from './EmbeddableLeadForm';
import './index.css';

// Function to initialize the widget
function initLeadCaptureWidget(containerId: string = 'lead-capture-widget') {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <EmbeddableLeadForm />
      </StrictMode>
    );
  } else {
    console.error(`Container with id "${containerId}" not found`);
  }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
  initLeadCaptureWidget();
});

// Make it available globally for manual initialization
(window as any).initLeadCaptureWidget = initLeadCaptureWidget; 