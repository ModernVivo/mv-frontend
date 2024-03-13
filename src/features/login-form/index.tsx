import React, { useState } from 'react';

import Image from "next/image";
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAppDispatch } from '~/hooks/reduxHooks';
import { doLogin } from '~/store/slices/authSlice';
import type { LoginRequest } from "~/types/auth";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit: SubmitHandler<LoginRequest> = async (formData: LoginRequest): Promise<void> => {
    const { username, password } = formData;
    setLoading(true);
    setError('root.apiError', { message: "" });
    await dispatch(doLogin({ username, password }))
      .unwrap()
      .then(() => {
        const returnUrl = get(router, 'query.returnUrl', '/') as string;
        router.push(returnUrl);
      })
      .catch(() => {
        setError('root.apiError', { message: "Username or password does not match!" });
        setLoading(false);
      });
  }

  const apiError = get(errors, 'root.apiError.message');

  return (
    <>
      <section className="bg-text-primary">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white place-items-center">
            <Image
              src="/mv_text_logo_white.png"
              alt="logo"
              width={225}
              height={30}
              className="m-auto"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text"{...register('username')} placeholder="Username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div className="text-red-800 text-sm">{errors.username?.message}</div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" {...register('password')} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div className="text-red-800 text-sm">{errors.password?.message}</div>
                </div>
                {/* <div className="flex items-center justify-end">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div> */}
                <button disabled={isLoading} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Sign in
                </button>
                {!!apiError &&
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">{apiError}</div>
                }
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
