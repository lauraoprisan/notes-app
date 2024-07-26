// src/test-utils.js
import { render } from '@testing-library/react'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'

const mockAuthContextValue = (user) => ({
  user,
  login: jest.fn(),
  signup: jest.fn(),
  logout: jest.fn(),
});

const mockNotesContextValue = {
  notes: [],
  addNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
};

const AllTheProviders = ({ children, user }) => {
  return (
    <AuthContextProvider value={mockAuthContextValue(user)}>
      <NotesProvider value={mockNotesContextValue}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </NotesProvider>
    </AuthContextProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: ({ children }) => <AllTheProviders user={options?.user}>{children}</AllTheProviders>, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }