import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import Post from './Post';

const AllPosts = () => {
  const { data: allPosts = [], isLoading, refetch:reload } = useQuery({
    queryKey: ['allPost'],
    queryFn: async () => {
      const res = await fetch(`https://kitoadda-server.vercel.app/allPost`);
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='py-5' >
      {
        allPosts.map(postData => <Post  key={postData._id} postData={postData} reload={reload}></Post>)
      }
    </div>
  );
};

export default AllPosts;