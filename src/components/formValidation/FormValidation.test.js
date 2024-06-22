import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormValidation from './FormValidation';

describe('FormValidation Component', () => {
    test('renders the form with all fields', () => {
        render(<FormValidation />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Colour')).toBeInTheDocument();
        expect(screen.getByLabelText('Bear')).toBeInTheDocument();
        expect(screen.getByLabelText('Tiger')).toBeInTheDocument();
        expect(screen.getByLabelText('Snake')).toBeInTheDocument();
        expect(screen.getByLabelText('Donkey')).toBeInTheDocument();
    });

    test('validates email field', () => {
        render(<FormValidation />);
        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
        fireEvent.click(screen.getByText('Create account'));
        expect(screen.getByText(/Email is not valid/i)).toBeInTheDocument();
    });

    test('validates password field', () => {
        render(<FormValidation />);
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.click(screen.getByText('Create account'));
        expect(
            screen.getByText('Password must be at least 8 characters')
        ).toBeInTheDocument();
    });

    test('validates colour selection', () => {
        render(<FormValidation />);
        fireEvent.click(screen.getByText('Create account'));
        expect(screen.getByText('Please select a colour')).toBeInTheDocument();
    });

    test('validates animal selection', () => {
        render(<FormValidation />);
        fireEvent.click(screen.getByText('Create account'));
        expect(
            screen.getByText('Please select at least two animals')
        ).toBeInTheDocument();
    });

    test('validates tiger type if tiger is selected', () => {
        render(<FormValidation />);
        fireEvent.click(screen.getByLabelText('Tiger'));
        fireEvent.click(screen.getByText(/Create account/i));
        expect(
            screen.getByText('Please specify type if you select Tiger')
        ).toBeInTheDocument();
    });

    test('submits form successfully', () => {
        render(<FormValidation />);
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByLabelText('Colour'), {
            target: { value: 'blue' },
        });
        fireEvent.click(screen.getByLabelText('Bear'));
        fireEvent.click(screen.getByLabelText('Tiger'));
        fireEvent.change(screen.getByLabelText('Type of Tiger'), {
            target: { value: 'Bengal' },
        });
        fireEvent.click(screen.getByText('Create account'));

        expect(
            screen.queryByText(/Email is not valid/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Password must be at least 8 characters/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Please select a colour/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Please select at least two animals/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Please specify type if you select Tiger/i)
        ).not.toBeInTheDocument();
    });
});
