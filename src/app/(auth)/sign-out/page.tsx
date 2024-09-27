'use client'
import userApi from '@/api/user';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleErrorApiResponse } from '@/utils/helper';
const SignOutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await userApi.signOut();
        if (response.ok) {
          localStorage.removeItem('user');
          router.replace('/sign-in');
        }

      } catch (error) {
        handleErrorApiResponse(error);
      }
    }
    logoutUser();
  }, []);

  return (
    <div>

    </div>
  );
}

export default SignOutPage;
