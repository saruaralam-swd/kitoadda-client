import React from 'react';
import profilePlaceholder from '../../assets/profile.png';

const CommentDetails = ({ comment }) => {

  const { commentText } = comment;

  return (
    <div className='mt-2'>
      <div className='grid grid-cols-12 gap-4'>
        <img src={profilePlaceholder} className=' col-span-1 w-10 rounded-full border' alt='profile img' />

        <div className='bg-[#54565a] rounded-md col-span-11 pl-2'>
          <h2 className='mb-2 font-semibold'>Md. Saruar Alalm</h2>
          <p>{commentText}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;