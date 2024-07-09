import { render } from '@testing-library/react';
import AuthPage from './AuthPage';


describe("AuthPage", () => {
    test('renders without crashing', () => {
        render(<AuthPage/>);
      });

})
