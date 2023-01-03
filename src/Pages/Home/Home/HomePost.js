import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import profilePlaceholder from '../../../assets/profile.png';

const HomePost = ({ postData }) => {
  const { userImage, userName, postTitle, image, likeCount } = postData;

  return (
    <div className="flex justify-center mt-3">
      <div className='w-[600px] p-5 bg-[#414346] text-white rounded-xl'>
        <div className='flex items-center gap-2 border-b-2 border-slate-600 pb-2'>
          {userImage === null ?
            <img src={profilePlaceholder} className='w-10 rounded-full border' alt='profile img' />
            :
            <img src={userImage} className='w-10 rounded-full border' alt='profile img' />
          }
          <h2 className='text-lg font-semibold'>{userName}</h2>
        </div>

        <p className='my-2'>{postTitle}</p>

        {
          image === '' ?
            <></>
            :
            <img src={image} className='w-full h-[300px] object-cover rounded-md' alt="" />
        }

        <div className='flex items-center gap-2 py-2 border-b-2 border-slate-600 pb-2'>
          <button><AiFillLike className='w-5 h-5 inline-block' /></button>
          <p className='m-0'>{likeCount}</p>
        </div>
       


        {/* <div>
          {
            comments.map(comment => <CommentDetails key={comment._id} comment={comment} ></CommentDetails>)
          }
        </div> */}
      </div>
    </div >
  );
};

export default HomePost;