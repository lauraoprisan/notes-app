import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotesProvider } from './context/NotesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotesProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </NotesProvider>
  </React.StrictMode>
);

reportWebVitals();
