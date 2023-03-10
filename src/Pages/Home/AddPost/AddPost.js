import React, { useContext, useState } from 'react';
import profilePlaceholder from '../../../assets/profile.png'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import AddPostLoading from '../../../Components/AddPostLoading';
import Loading from '../../../Components/Loading';
import './AddPost.css'

const AddPost = () => {
  const { user, loading } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_imageBb_Key;
  const [addPostLoading, setAddPostLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = data => {
    setAddPostLoading(true);
    let image = data?.image[0];
    const formData = new FormData();
    formData.append('image', image);

    // without image
    if (data.image.length === 0) {
      data.image = "";
      data.userName = user?.displayName;
      data.userEmail = user?.email;
      data.userImage = user?.photoURL;
      const date = new Date().getTime();
      data.date = date;
      data.likeCount = 0;


      fetch('https://kitoadda-server.vercel.app/postData', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            alert('successfully add post')
            setAddPostLoading(false);
            navigate('/media');
          }
        })
    }

    // with image
    if (data.image.length === 1) {
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(imageData => {
          data.image = imageData?.data?.url;
          data.userName = user?.displayName;
          data.userEmail = user?.email;
          data.userImage = user?.photoURL;
          const date = new Date().getTime();
          data.date = date;
          data.likeCount = 0;

          fetch('https://kitoadda-server.vercel.app/postData', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(data => {
              if (data.acknowledged) {
                alert('successfully add post')
                setAddPostLoading(false);
                navigate('/media');
              }
            })
        });
    }
  };

  return (
    <div className='flex justify-center  py-10'>
      {
        loading === true ? <Loading /> :
          <div className='w-[600px] rounded-md p-5 pt-5 bg-[#414346]'>
            {
              user?.uid ?
                <form onSubmit={handleSubmit(handleCreatePost)}>
                  <div className='flex items-center gap-3'>
                    {
                      user?.photoURL === null ?
                        <img src={profilePlaceholder} className='w-10 rounded-full border' alt='profile img' />
                        :
                        <img src={user?.photoURL} className='w-10 rounded-full border' alt='profile img' />
                    }

                    <div className='w-full'>
                      <input {...register('postTitle', { required: true })} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Write your post details..' />
                      {errors.postTitle && <span className='text-red-700 text-sm'>Add your post Description</span>}
                    </div>
                  </div>

                  <input  {...register('image')} type="file" className="cursor-pointer w-full mt-5 rounded-md px-4 py-2" />
                  {addPostLoading === true ? <AddPostLoading /> : <button className='w-20 px-3 py-1 mt-5 bg-blue-500 hover:bg-blue-600  text-white rounded-full font-semibold'>Post</button>}
                </form>
                :
                <div className='text-xl font-semibold text-white'>Please <Link to='/login' className='text-blue-500'>login</Link> to add post</div>
            }
          </div>
      }
    </div>
  );
};

export default AddPost;