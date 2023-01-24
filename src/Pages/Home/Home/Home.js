import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Loading from '../../../Components/Loading';
import AddPost from '../AddPost/AddPost';
import HomePost from './HomePost';

const Home = () => {
  const [file, setFile] = useState('');

  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ['allPost'],
    queryFn: async () => {
      const res = await fetch(`https://kitoadda-server.vercel.app/allPostHome`);
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='bg-[#18191A]'>
      <AddPost />
      <div>
        {
          allPosts.map(postData => <HomePost key={postData._id} postData={postData}></HomePost>)
        }
      </div>
    </div>
  );
};

export default Home;