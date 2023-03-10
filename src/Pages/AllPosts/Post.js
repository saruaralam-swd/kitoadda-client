import React, { useContext, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import CommentDetails from './CommentDetails';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { BsThreeDots } from "react-icons/bs";

const Post = ({ postData, reload }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { _id, likeCount, userName, postTitle, userImage, image } = postData;
  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAddLoading, setCommentAddLoading] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const [seeAllText, setSeeAllText] = useState(false);

  console.log(seeAllText);


  const { data: allComments = [], refetch } = useQuery({
    queryKey: ['allComments'],
    queryFn: async () => {
      const res = await fetch(`https://kitoadda-server.vercel.app/allComments`);
      const data = await res.json();
      return data;
    }
  });

  const comments = allComments.filter(comment => comment.postId === _id)

  const handleLikeCount = (id) => {
    if (!user?.uid) {
      toast('Please login')
    }
    else {
      fetch(`https://kitoadda-server.vercel.app/like/${id}`, {
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
            reload();
          }
        })
    }
  };

  const handleCreateComment = id => {
    if (commentText === '' || !user?.uid) {
      toast('Please login');
    }
    else {
      setCommentAddLoading(true)

      const commentData = {
        userImage: user?.photoURL,
        userName: user?.displayName,
        date: new Date().getTime(),
        postId: id,
        commentText: commentText,
      }

      fetch('https://kitoadda-server.vercel.app/comment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(commentData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            toast.success('comment add success')
            setCommentAddLoading(false);
            refetch()

          }
        })
    }
  };

  const x = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aliquam labore at tempora doloremque facilis aspernatur. Quaerat fugit officiis a!";


  return (
    <div className="flex justify-center mt-3">
      <div className='w-[600px]  p-5 bg-[#242526] text-white rounded-xl'>


        {/* Poster info */}
        <div className='flex items-center justify-between'>
          <div className='flex gap-3 items-center'>
            {userImage === null ?
              <img src='https://i.ibb.co/Ytsgm3z/profile.png' className='w-10 rounded-full' alt='profile img' />
              :
              <img src={userImage} className='w-10 rounded-full' alt='profile img' />
            }

            <div>
              <h2 className='text-md font-semibold'>{userName}</h2>
              <p className='text-xs'>{new Date().toString().slice(4, 24)}</p>
            </div>
          </div>

          <button className='w-9 h-9 bg-[#3A3B3C] rounded-full flex items-center justify-center'><BsThreeDots className='h-5 w-5 ' /></button>
        </div>

        {/* post tile */}
        <div className='mt-2'>
          <p className='text-md mb-1'>
            {x.length > 10 && <>{x.slice(0, 5)} <span onClick={() => setSeeAllText(true)}>...See more</span></>}
            {seeAllText && <>{x.slice(5, x.length)}</>}
          </p>

        </div>

        {/* post image */}
        {image === '' ? <></> : <img src={image} className='w-full h-[300px] object-cover rounded-md' alt="" />}

        {/* display total like and comment */}
        <div className='mt-3 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button className='w-5 h-5 bg-blue-600 rounded-full flex justify-center items-center'><AiFillLike className='w-3 h-3' /></button>
            <p className='text-xs'>{likeCount}</p>
          </div>
          {comments.length > 0 && <button onClick={() => setLoadComments(!loadComments)} className='text-slate-300 hover:underline'>{comments.length} comments</button>}
        </div>


        <div className='flex items-center gap-5 py-2 border-b-2 border-slate-600 pb-2'>
          {
            like === true ?
              <button onClick={() => handleLikeCount(_id)}><AiFillLike className='w- h-7 inline-block text-blue-600' /></button>
              :
              <button onClick={() => handleLikeCount(_id)}><AiFillLike className='w- h-7 inline-block ' /></button>
          }



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

        {/* display comments */}
        {loadComments && comments.map(comment => <CommentDetails key={comment._id} comment={comment} ></CommentDetails>)}
      </div>
    </div >
  );
};

export default Post;