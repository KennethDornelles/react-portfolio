import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
  writable: true
});

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => {},
  clear: () => {},
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});