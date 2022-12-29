import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signInUserLoading, setSignInUserLoading] = useState(false);
  const navigate = useNavigate();

  // handleLogin
  const handleLogin = data => {
    setSignInUserLoading(true);
    const email = data?.email;
    const password = data?.password;

    login(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSignInUserLoading(false)
        navigate('/');
        alert('login success')
      })
      .catch(error => {
        alert(error.message)
        setSignInUserLoading(false)
      })
  };

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6" >
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0" >
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full hidden md:flex" alt="login img" />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <button className='bg-slate-100 hover:bg-slate-300  w-10 h-10 flex items-center justify-center rounded-full'>
                  <FcGoogle className='h-6 w-6' />
                </button>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" >
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>

              {/* <!-- email --> */}
              <div className="mb-6">
                <input {...register('email', { required: true })} type="text" className="form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Email address" />
                {errors.email && <span className='text-red-600 pl-2'>email required</span>}
              </div>

              {/* <!-- password --> */}
              <div className="mb-6">
                <input {...register('password', { required: true })} type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
                {errors.password && <span className='text-red-600 pl-2'>password required</span>}
              </div>

              {/* <div className="flex justify-between items-center mb-6">
                <a href="#!" className="text-gray-800">Forgot password?</a>
              </div> */}

              {
                signInUserLoading === true ?
                  <button className='inline-block btn-disabled px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full uppercase font-semibold'>
                    <div role="status">
                      <svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span className="sr-only">Loading...</span>
                      login
                    </div>
                  </button>
                  :
                  <button className='inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full uppercase font-semibold'>login</button>
              }

              <p className="text-sm font-semibold mt-2 pt-1 mb-0"> Don't have an account? <Link to='/signup' href="#!" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out" >Register</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;