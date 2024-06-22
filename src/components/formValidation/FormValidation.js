import React, { useState, useEffect } from 'react';
import './FormValidation.css';

const FormValidation = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        colour: '',
        animals: [],
        tigerType: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const ERROR_MESSAGES = {
        EMAIL: 'Email is not valid',
        PASSWORD: 'Password must be at least 8 characters',
        COLOUR: 'Please select a colour',
        ANIMALS: 'Please select at least two animals',
        TIGER_TYPE: 'Please specify type if you select Tiger',
    };

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email))
            tempErrors.email = ERROR_MESSAGES.EMAIL;
        if (form.password.length < 8)
            tempErrors.password = ERROR_MESSAGES.PASSWORD;
        if (!form.colour) tempErrors.colour = ERROR_MESSAGES.COLOUR;
        if (form.animals.length < 2)
            tempErrors.animals = ERROR_MESSAGES.ANIMALS;
        if (form.animals.includes('tiger') && !form.tigerType)
            tempErrors.tigerType = ERROR_MESSAGES.TIGER_TYPE;

        setErrors(tempErrors);

        // Return TRUE if there is no errors
        return Object.keys(tempErrors).length === 0;
    };

    //After validation find the first error field on focus it
    useEffect(() => {
        if (isSubmitted) {
            const firstErrorField = document.querySelector(
                '[aria-invalid="true"]'
            );
            console.log(firstErrorField);
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    }, [errors, isSubmitted]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setForm({ ...form, animals: [...form.animals, value] });
            } else {
                setForm({
                    ...form,
                    animals: form.animals.filter((animal) => animal !== value),
                });
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        let isValid = validate();
        if (isValid) {
            console.log('Form submitted successfully', form);
        }
    };

    return (
        <>
            <form method='post' action='' onSubmit={handleSubmit} noValidate>
                <h1>Fill out this awesome form</h1>
                <fieldset>
                    <legend>Your details</legend>
                    <p className={errors.email ? 'error' : ''}>
                        <label className='label' htmlFor='email'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={form.email}
                            onChange={handleChange}
                            aria-describedby={
                                errors.email ? 'email-error' : null
                            }
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                            <span id='email-error' className='errorMessage'>
                                {errors.email}
                            </span>
                        )}
                    </p>
                    <p className={errors.password ? 'error' : ''}>
                        <label className='label' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={form.password}
                            onChange={handleChange}
                            aria-describedby={
                                errors.password ? 'password-error' : null
                            }
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        {errors.password && (
                            <span id='password-error' className='errorMessage'>
                                {errors.password}
                            </span>
                        )}
                    </p>
                </fieldset>

                <fieldset>
                    <legend>Your animal</legend>
                    <p className={errors.colour ? 'error' : ''}>
                        <label className='label' htmlFor='colour'>
                            Colour
                        </label>
                        <select
                            name='colour'
                            id='colour'
                            value={form.colour}
                            onChange={handleChange}
                            aria-describedby={
                                errors.colour ? 'colour-error' : null
                            }
                            aria-invalid={errors.colour ? 'true' : 'false'}
                        >
                            <option value=''>Choose colour</option>
                            <option value='blue'>Blue</option>
                            <option value='green'>Green</option>
                            <option value='red'>Red</option>
                            <option value='black'>Black</option>
                            <option value='brown'>Brown</option>
                        </select>
                        {errors.colour && (
                            <span id='colour-error' className='errorMessage'>
                                {errors.colour}
                            </span>
                        )}
                    </p>
                    <p className={errors.animals ? 'error' : ''}>
                        <span className='label'>Animal</span>

                        <input
                            type='checkbox'
                            name='animal'
                            value='bear'
                            id='bear'
                            onChange={handleChange}
                        />
                        <label htmlFor='bear'>Bear</label>

                        <input
                            type='checkbox'
                            name='animal'
                            value='tiger'
                            id='tiger'
                            onChange={handleChange}
                        />
                        <label htmlFor='tiger'>Tiger</label>

                        <input
                            type='checkbox'
                            name='animal'
                            value='snake'
                            id='snake'
                            onChange={handleChange}
                        />
                        <label htmlFor='snake'>Snake</label>

                        <input
                            type='checkbox'
                            name='animal'
                            value='donkey'
                            id='donkey'
                            onChange={handleChange}
                        />
                        <label htmlFor='donkey'>Donkey</label>

                        {errors.animals && (
                            <span id='animals-error' className='errorMessage'>
                                {errors.animals}
                            </span>
                        )}
                    </p>
                    {form.animals.includes('tiger') && (
                        <p className={errors.tigerType ? 'error' : ''}>
                            <label className='label' htmlFor='tiger_type'>
                                Type of Tiger
                            </label>
                            <input
                                type='text'
                                name='tigerType'
                                id='tiger_type'
                                value={form.tigerType}
                                onChange={handleChange}
                                aria-describedby={
                                    errors.tigerType ? 'tigerType-error' : null
                                }
                                aria-invalid={
                                    errors.tigerType ? 'true' : 'false'
                                }
                            />
                            {errors.tigerType && (
                                <span
                                    id='tigerType-error'
                                    className='errorMessage'
                                >
                                    {errors.tigerType}
                                </span>
                            )}
                        </p>
                    )}
                </fieldset>

                <button type='submit'>Create account</button>
            </form>
        </>
    );
};

export default FormValidation;
