import React, { useContext, useState } from 'react';
import profilePlaceholder from '../../../assets/profile.png'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import AddPostLoading from '../../../Components/AddPostLoading';
import Loading from '../../../Components/Loading';

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


      fetch('http://localhost:5000/postData', {
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

          fetch('http://localhost:5000/postData', {
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
    <div className='flex justify-center h-[300px] my-10'>
      {
        loading === true ? <Loading /> :
          <div className='w-[500px] border-black'>
            {
              user?.uid ?
                <form onSubmit={handleSubmit(handleCreatePost)}>
                  <div className='flex items-center gap-3'>
                    {user?.uid ?
                      <img src={user?.photoURL} className='w-10 rounded-full border' alt='profile img' />
                      :
                      <img src={profilePlaceholder} className='w-10 rounded-full border' alt='profile img' />
                    }
                    <div className='w-full'>
                      <input {...register('postTitle', { required: true })} type="text" className='w-full bg-[#2d2c2c] text-white rounded-full px-6 py-2' placeholder='Write your post details..' />
                      {errors.postTitle && <span className='text-red-700 text-sm'>Add your post Description</span>}
                    </div>
                  </div>

                  <input {...register('image')} type="file" className="mt-5 file-input file-input-bordered file-input-primary w-full" />
                  {addPostLoading === true ? <AddPostLoading /> : <button className='w-20 px-3 py-1 mt-5 bg-blue-500 hover:bg-blue-600  text-white rounded-full font-semibold'>Post</button>}
                </form>
                :
                <div className='text-xl font-semibold'>Please <Link to='/login' className='text-blue-500'>login</Link> to add post</div>
            }
          </div>
      }
    </div>
  );
};

export default AddPost;