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
 window.scrollTo = jest.fn();
});
beforeEach(() => window.history.pushState({}, '', '/'));
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
 expect(screen.getAllByText('Miro')).toHaveLength(2);
 fireEvent.click(network);
 expect(screen.getByRole('button', { name: 'Miro Frontend Developer Intern' })).toHaveAttribute('aria-expanded', 'true');
});
test('home project cards link to their own project', () => {
 render(<App />);
 expect(screen.getByRole('link', { name: /^Suncycle/ })).toHaveAttribute('href', '/projects#suncycle');
 expect(screen.getByRole('link', { name: /^Joboard/ })).toHaveAttribute('href', '/projects#joboard');
});
test('contact goes to the same footer block on home and projects', () => {
 render(<App />);
 expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
 expect(screen.getAllByRole('link', { name: 'Resume' })).toHaveLength(3);
 expect(screen.getByRole('link', { name: 'zhengwenxi7@gmail.com' })).toHaveAttribute('href', 'mailto:zhengwenxi7@gmail.com');
 fireEvent.click(screen.getByRole('link', { name: 'See all projects' }));
 expect(screen.getByRole('heading', { name: 'Things I’ve built.' })).toBeInTheDocument();
 expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
 expect(screen.getByRole('link', { name: 'zhengwenxi7@gmail.com' })).toHaveAttribute('href', 'mailto:zhengwenxi7@gmail.com');
});
test('unknown routes show a 404 page with links home and to projects', () => {
 window.history.pushState({}, '', '/about');
 render(<App />);
 expect(screen.getByRole('heading', { name: 'This page doesn’t exist.' })).toBeInTheDocument();
 expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
 expect(screen.getByRole('link', { name: 'See my projects' })).toHaveAttribute('href', '/projects');
 // eslint-disable-next-line testing-library/no-node-access -- <head> is outside Testing Library's queries
 expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});
