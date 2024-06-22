// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Correctly mock the FormValidation component with the full path
jest.mock('./components/formValidation/FormValidation', () => () => {
    return (
        <div data-testid='form-validation'>Mocked FormValidation Component</div>
    );
});

test('renders the App component', () => {
    render(<App />);

    // Check if the heading "Form Validation" is rendered
    const headingElement = screen.getByText(/Form Validation/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders FormValidation component within App', () => {
    render(<App />);

    // Check if the FormValidation component is present in the DOM
    const formValidationElement = screen.getByTestId('form-validation');
    expect(formValidationElement).toBeInTheDocument();
});
