import React from 'react';
import profilePlaceholder from '../../../assets/profile.png'
import { useForm } from 'react-hook-form';

const AddPost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const imageHostKey = process.env.REACT_APP_imageBb_Key;

  const handleCreatePost = data => {
    const image = data?.image[0];
    const formData = new FormData();
    formData.append('image', image);

    if (data.image.length === 0) {
      console.log('1')
    }
    else {
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(imageData => console.log(imageData?.data?.url));
    }
  };


  return (
    <div className='flex justify-center h-[300px] my-10'>
      <div className='w-[500px] border-black'>

        <form onSubmit={handleSubmit(handleCreatePost)}>
          <div className='flex items-center gap-3'>
            <img src={profilePlaceholder} className='w-10 rounded-full border' alt='profile img' />

            <div className='w-full'>
              <input {...register('postTitle', { required: true })} type="text" className='w-full bg-[#2d2c2c] text-white rounded-full px-6 py-2' placeholder='Write your post details..' />
              {errors.postTitle && <span className='text-red-700 text-sm'>Add your post Description</span>}
            </div>
          </div>

          <input {...register('image')} type="file" className="mt-5 file-input file-input-bordered file-input-primary w-full" />
          {/* {errors.image && <span className='text-red-700 text-sm'>select image</span>} */}

          <button className='w-full py-3 px-1 mt-5 bg-blue-700 rounded-md text-white'>Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;


