import { updateEmail, updateProfile } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const UpdateUserModal = ({ userData, refetch, setOpenModal }) => {
  console.log(userData);

  const { user, updateUser, updateUserEmail } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleProfileEdit = (data) => {
    const displayName = data.displayName;
    const email = data.email;
    const address = data.address;
    const education = data.education;


    updateUser({ displayName })
      .then(result => {

        fetch('', {
          method: "PUT",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user?.displayName)
        })
          .then(res => res.json())
          .then(data => {
            
          })

        refetch();
        setOpenModal(false);
      })
      .catch(error => toast.error(error.message));

    updateUserEmail(email)
      .then(result => {
        refetch()
        setOpenModal(false);
      })
      .catch(error => toast.error(error.message));


  };

  return (
    <>
      {/* modal */}
      <input type="checkbox" id="updateUserInfoModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="updateUserInfoModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold text-center">Edit profile</h3>

          <form onSubmit={handleSubmit(handleProfileEdit)}>
            {/* name */}
            <div className="mb-6">
              <input {...register('displayName')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue={user?.displayName} />
            </div>

            {/* email */}
            <div className="mb-6">
              <input {...register('email')} type="email" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue={user?.email} />
            </div>

            {/* address */}
            <div className="mb-6">
              <input {...register('address')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Your  address' />
            </div>

            {/* education */}
            <div className="mb-6">
              <input {...register('education')} type="text" className="form-control block w-full  px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Your education' />
            </div>

            <div className='divider'></div>

            <button className='w-24 bg-slate-500 hover:bg-slate-600 text-white px-2 py-1 rounded-md'>Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserModal;