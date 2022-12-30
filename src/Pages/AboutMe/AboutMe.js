import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import profilePlaceholder from '../../assets/profile.png'
import { MdEdit } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from 'firebase/auth';
import UpdateUserModal from './UpdateUserModal';

const AboutMe = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [openModal, setOpenModal] = useState(true);

  const { data: userData, refetch, isLoading } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://kitoadda-server.vercel.app/users/${user?.email}`);
      const data = await res.json();
      return data;
    }
  })

  return (
    <div className='bg-slate-100 h-screen'>
      <div className='pt-10 flex justify-center'>
        <div className='flex gap-5 w-[300px]'>
          <div>
            {user?.photoURL === null ?
              <img src={profilePlaceholder} className='w-[100px] rounded-full' alt='profile img' />
              :
              <img src={user?.photoURL} className='w-[100px] rounded-full' alt='profile img' />
            }
          </div>

          <div className=' space-y-2'>
            <h2 className='text-2xl font-semibold'>{user?.displayName}</h2>
            <p className='text-md'>{user?.email}</p>
            <p className='text-md'>address { } </p>
            <p className='text-md'>education { } </p>

            <label htmlFor="updateUserInfoModal" className='flex items-center gap-2 bg-[#4e5052] text-white px-3 py-2 rounded-md cursor-pointer'>
              <MdEdit className='w-6 h-6 inline-block' />
              <span>Edit Profile</span>
            </label>

            {
              openModal &&<UpdateUserModal setOpenModal={setOpenModal} userData={userData} refetch={refetch}></UpdateUserModal>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
