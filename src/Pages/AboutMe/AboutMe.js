import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import profilePlaceholder from '../../assets/profile.png'
import { MdEdit } from "react-icons/md";
import { useForm } from 'react-hook-form';

const AboutMe = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleProfileEdit = (data) => {
    console.log(data);
  };

  return (
    <div className='bg-slate-100 h-screen'>
      <div className='pt-10 flex justify-center'>
        <div className='flex gap-5 w-[300px]'>
          <div>
            {user?.uid ?
              <img src={user?.photoURL} className='w-[100px] rounded-full' alt='profile img' />
              :
              <img src={profilePlaceholder} className='w-[100px] rounded-full' alt='profile img' />
            }
          </div>

          <div className=' space-y-2'>
            <h2 className='text-2xl font-semibold'>{user?.displayName}</h2>
            <p className='text-md'>{user?.email}</p>

            <label htmlFor="updateUserInfoModal" className='flex items-center gap-2 bg-[#4e5052] text-white px-3 py-2 rounded-md cursor-pointer'>
              <MdEdit className='w-6 h-6 inline-block' />
              <span>Edit Profile</span>
            </label>

          </div>
        </div>
      </div>

      <input type="checkbox" id="updateUserInfoModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="updateUserInfoModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold text-center">Edit profile</h3>

          <form onSubmit={handleSubmit(handleProfileEdit)}>
            <div className="mb-6">
              <input {...register('name')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue={user?.displayName} />
            </div>

            <div className="mb-6">
              <input {...register('email')} type="email" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue={user?.email} />
            </div>

            <div className="mb-6">
              <input {...register('address')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='your address' />
            </div>

            <div className="mb-6">
              <input {...register('education')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='your education lavel' />
            </div>

            <div className='divider'></div>

            <button className='w-24 bg-slate-500 hover:bg-slate-600 text-white px-2 py-1 rounded-md'>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
