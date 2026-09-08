import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
jest.mock('./components/ConnectionGlobe', () => ({ onCompanyHover, onCompanySelect }: {
 onCompanyHover: (index: number | null) => void;
 onCompanySelect: (index: number) => void;
}) => <button aria-label="Interactive experience map" onMouseEnter={() => onCompanyHover(2)} onClick={() => onCompanySelect(2)}>Experience map</button>);
jest.mock('@vercel/analytics/react', () => ({ Analytics: () => null }), { virtual: true });
beforeAll(() => {
 Object.defineProperty(window, 'matchMedia', { value: () => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }) });
 Element.prototype.scrollIntoView = jest.fn();
});
test('work entries expand individually and can be collapsed', () => {
 render(<App />);
 const bybit = screen.getByRole('button', { name: 'Bybit Compliance quality assurance' });
 const bluerate = screen.getByRole('button', { name: 'Bluerate Full-stack development' });
 expect(bybit).toHaveAttribute('aria-expanded', 'true');
 fireEvent.click(bluerate);
 expect(bluerate).toHaveAttribute('aria-expanded', 'true');
 expect(bybit).toHaveAttribute('aria-expanded', 'false');
 expect(screen.getByText('A website and ERP system, from architecture to production.')).toBeVisible();
 fireEvent.click(bluerate);
 expect(bluerate).toHaveAttribute('aria-expanded', 'false');
});
test('resume links use the supplied CV and the experience map reveals a company', () => {
 render(<App />);
 screen.getAllByRole('link', { name: 'Resume' }).forEach(link => expect(link).toHaveAttribute('href', '/Edward_CV.pdf'));
 const network = screen.getByRole('button', { name: 'Interactive experience map' });
 fireEvent.mouseEnter(network);
 expect(screen.getByText('Click the node to explore')).toBeVisible();
 expect(screen.getAllByText('Mira')).toHaveLength(2);
 fireEvent.click(network);
 expect(screen.getByRole('button', { name: 'Mira Frontend Developer Intern' })).toHaveAttribute('aria-expanded', 'true');
});
