import React, { useEffect, useState } from 'react';
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

    const ERROR_MESSAGES = {
        EMAIL: 'Email is not valid',
        PASSWORD: 'Password must be at least 8 characters',
        COLOUR: 'Please select a colour',
        ANIMALS: 'Please select at least two animals',
        TIGER_TYPE: 'Please specify type if you select Tiger',
    };

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /\S+@\S+\.\S+/;
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
        let isValid = validate();
        if (isValid) {
            console.log('Form submitted successfully', form);
        }
    };

    return (
        <>
            <form method='post' action='' onSubmit={handleSubmit}>
                <h1>Fill out this awesome form</h1>
                <fieldset>
                    <h3>Your details</h3>
                    <p className={errors.email ? 'error' : ''}>
                        <label className='label' htmlFor='email'>
                            Email
                        </label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <span className='errorMessage'>{errors.email}</span>
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
                        />
                        {errors.password && (
                            <span className='errorMessage'>
                                {errors.password}
                            </span>
                        )}
                    </p>
                </fieldset>

                <fieldset>
                    <h3>Your animal</h3>
                    <p className={errors.colour ? 'error' : ''}>
                        <label className='label' htmlFor='colour'>
                            Colour
                        </label>
                        <select
                            name='colour'
                            id='colour'
                            value={form.colour}
                            onChange={handleChange}
                        >
                            <option value=''>Choose colour</option>
                            <option value='blue'>Blue</option>
                            <option value='green'>Green</option>
                            <option value='red'>Red</option>
                            <option value='black'>Black</option>
                            <option value='brown'>Brown</option>
                        </select>
                        {errors.colour && (
                            <span className='errorMessage'>
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
                            onChange={handleChange}
                        />
                        <label htmlFor='snake'>Snake</label>

                        <input
                            type='checkbox'
                            name='animal'
                            value='donkey'
                            onChange={handleChange}
                        />
                        <label>Donkey</label>

                        {errors.animals && (
                            <span className='errorMessage'>
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
                                value={form.type}
                                onChange={handleChange}
                            />
                            {errors.tigerType && (
                                <span className='errorMessage'>
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
