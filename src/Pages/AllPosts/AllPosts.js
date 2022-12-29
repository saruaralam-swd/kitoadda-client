import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { AiFillLike } from "react-icons/ai";

const AllPosts = () => {
  const { user } = useContext(AuthContext);

  return (
    <div >

      <div className="flex justify-center">
        <div className='w-[600px] border-2 p-5 bg-slate-700 text-white rounded-xl'>
          <div className='flex items-center gap-2 border-b-2 border-slate-600 pb-2'>
            <img src={user?.photoURL} className='w-10 rounded-full' alt='profile img' />
            <h2 className='text-lg font-semibold'>{user?.displayName}</h2>
          </div>

          <p className='my-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore sequi sed corrupti ea fugit dolor mollitia corporis minus ab nostrum!</p>
          <img src='https://i.ibb.co/wzTbyDW/10.png' className='w-[600px] h-[300px] object-cover rounded-md' alt="" />

          <div className='flex items-center gap-5 py-2'>
            <button><AiFillLike className='w-7 h-7 inline-block text-blue-700' /></button>
            <button><AiFillLike className='w-7 h-7 inline-block ' /></button>
            <p>0</p>
            <input type="text" className='w-full px-3 py-2 pl-4 bg-slate-600  text-white rounded-full' placeholder='write your comment...' />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AllPosts;