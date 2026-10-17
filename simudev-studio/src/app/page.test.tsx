import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from './page';

describe('Home Page', () => {
  it('renders the header and main headings', () => {
    render(<Home />);
    expect(screen.getByText('SimuDev Studio')).toBeDefined();
    expect(screen.getByText('Role-Playing Prototype Suite')).toBeDefined();
    expect(screen.getByText('3 Interactive Experiences')).toBeDefined();
  });

  it('renders Prototype 1 (Function Design BA/SA)', () => {
    render(<Home />);
    expect(screen.getByText('Functional Design & Requirement Scope Filter')).toBeDefined();
    expect(screen.getByText('Role: Business Analyst / System Analyst')).toBeDefined();
    expect(screen.getByText(/Launch BA\/SA Challenge/)).toBeDefined();
  });

  it('renders Prototype 2 (Git Mastery Developer)', () => {
    render(<Home />);
    expect(screen.getByText('Git Mastery & Workflow Competency Simulator')).toBeDefined();
    expect(screen.getByText('Role: Software Developer')).toBeDefined();
    expect(screen.getByText(/Launch Developer Simulator/)).toBeDefined();
  });

  it('renders Prototype 3 (PR Review Tech Lead)', () => {
    render(<Home />);
    expect(screen.getByText('PR Code Review & Approval Gate (Kanban Integrated)')).toBeDefined();
    expect(screen.getByText('Role: Senior Engineer / Tech Lead')).toBeDefined();
    expect(screen.getByText(/Launch Tech Lead Gate/)).toBeDefined();
  });
});
