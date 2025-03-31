import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Logo, Input, Button } from './index';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-10 border border-gray-300">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Logo width="80px" />
                </div>

                <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
                <p className="mt-2 text-center text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
                    {/* Email Input */}
                    <Input
                        placeholder="Enter Your Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Email address must be valid',
                            },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    {/* Password Input */}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
