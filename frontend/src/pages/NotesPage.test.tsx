import { render, screen } from '@testing-library/react';
import {logRoles } from '@testing-library/react';
import NotesPage from './NotesPage';


describe("NotesPage", () => {
    test('renders without crashing', () => {
        render(<NotesPage/>);
      });

})
