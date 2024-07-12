import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotesProvider } from './context/NotesContext';
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </NotesProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
