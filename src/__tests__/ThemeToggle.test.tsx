import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

// Now using global mocks from jest.setup.js

describe('ThemeToggle Component', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
    });

    it('changes icon when toggled', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const toggleButton = screen.getByRole('button');

        // Initially should be in light mode (moon icon)
        expect(toggleButton.getAttribute('aria-label')).toBe('Mudar para modo escuro');

        // Click to change to dark theme
        fireEvent.click(toggleButton);

        // Should change to dark mode (sun icon)
        expect(toggleButton.getAttribute('aria-label')).toBe('Mudar para modo claro');

        // Click again to change back to light theme
        fireEvent.click(toggleButton);

        // Should change back to light mode
        expect(toggleButton.getAttribute('aria-label')).toBe('Mudar para modo escuro');
    });
});