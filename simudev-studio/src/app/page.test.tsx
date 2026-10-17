import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from './page';

describe('Home Page', () => {
  it('renders the header and main headings', () => {
    render(<Home />);
    expect(screen.getByText('SimuDev Studio')).toBeDefined();
    expect(screen.getByText('Interactive Prototype Lab')).toBeDefined();
    expect(screen.getByText('6 Interactive Modules')).toBeDefined();
  });

  it('renders the featured testing prototype', () => {
    render(<Home />);
    expect(screen.getByText('AI Test Automation & TDD Arena')).toBeDefined();
    expect(screen.getByText('Launch Testing Arena ⚡')).toBeDefined();
  });

  it('lists all core and testing prototypes', () => {
    render(<Home />);
    expect(screen.getByText('Simulated Agile Sprint & Multi-Agent PR Review')).toBeDefined();
    expect(screen.getByText('Interactive System Architecture & Incident War Room')).toBeDefined();
    expect(screen.getByText('CodeVenture: Universal Gamified Micro-Quest Generator')).toBeDefined();
    expect(screen.getByText('Pair-Programming Sandbox with AI Mentor')).toBeDefined();
    expect(screen.getByText('AI-Driven Prompt Engineering Puzzle Rooms')).toBeDefined();
  });
});
