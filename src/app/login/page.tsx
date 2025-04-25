import LoginForm from '@/components/auth/login/LoginForm';
import React, { Suspense } from 'react';

const login = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Suspense fallback={<div>Loading login...</div>}> 
            <LoginForm/>
            </Suspense>
        </div>
    );
};

export default login;