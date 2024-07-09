import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PageLayout from './PageLayout';

// Mocking the useLocation hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

const { useLocation } = require('react-router-dom');

describe('PageLayout', () => {
  test('renders Header and Sidebar when pathname is not /authentication', () => {
    useLocation.mockReturnValue({ pathname: '/some-other-path' });
    render(
      <BrowserRouter>
        <PageLayout>
            <div>Child Mock Up</div>
        </PageLayout>
      </BrowserRouter>
    );


    expect(screen.getByRole('banner')).toBeInTheDocument(); //checks if <header> element renders
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('does not render Header and Sidebar when pathname is /authentication', () => {
    useLocation.mockReturnValue({ pathname: '/authentication' });
    render(
      <BrowserRouter>
        <PageLayout>
            <div>Child Mock Up</div>
        </PageLayout>
      </BrowserRouter>
    );


    expect(screen.queryByRole('banner')).not.toBeInTheDocument(); //checks if <header> element renders
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  test('renders children on /authentication path', () => {
    useLocation.mockReturnValue({ pathname: '/authentication' });
    render(
      <BrowserRouter>
        <PageLayout>
          <div data-testid="child-content">Child Content</div>
        </PageLayout>
      </BrowserRouter>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  })

  test('renders children on /some-other-path path', () => {
    useLocation.mockReturnValue({ pathname: '/some-other-path' });
    render(
      <BrowserRouter>
        <PageLayout>
          <div data-testid="child-content">Child Content</div>
        </PageLayout>
      </BrowserRouter>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
