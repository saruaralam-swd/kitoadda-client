import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { AiFillLike } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import profilePlaceholder from '../../assets/profile.png'
import { useForm } from 'react-hook-form';

const Post = ({ postData, refetch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { _id, likeCount, userName, postTitle, userImage, image } = postData;
  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAddLoading, setCommentAddLoading] = useState(false);


  const handleLikeCount = (id) => {
    fetch(`http://localhost:5000/like/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('like add success');
          setLike(true);
          refetch();
        }
      })
  };

  const handleCreateComment = id => {
    if (commentText !== '') {
      setCommentAddLoading(true)
      
      const commentData = {
        date : new Date().getTime(),
        postId: id,
        commentText: commentText,
      }

      fetch('http://localhost:5000/comment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(commentData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            alert('comment add success')
            setCommentAddLoading(false);
          }
        })
    }
  };

  return (
    <div className="flex justify-center">
      <div className='w-[600px] border-2 p-5 bg-[#242526] text-white rounded-xl'>
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

        <div className='flex items-center gap-5 py-2'>
          {
            like === true ?
              <button onClick={() => handleLikeCount(_id)}><AiFillLike className='w-7 h-7 inline-block text-blue-600' /></button>
              :
              <button onClick={() => handleLikeCount(_id)}><AiFillLike className='w-7 h-7 inline-block ' /></button>
          }
          <p>{likeCount}</p>


          <input onMouseOut={(e) => setCommentText(e.target.value)} defaultValue={commentText} type="text" className=' w-full px-3 py-2 pl-4 bg-slate-600  text-white rounded-full' placeholder='write your comment...' />
          {
            commentAddLoading === true ?
              <button className='btn-disabled bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-full w-[120px]'>
                <div role="status" >
                  <svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  send
                </div>
              </button>
              :
              <button onClick={() => handleCreateComment(_id)} className=' bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-full'>send</button>
          }
        </div>
             

      </div>
    </div >

  );
};

export default Post;