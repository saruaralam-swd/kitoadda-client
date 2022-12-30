import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import Post from './Post';

const AllPosts = () => {

  const { data: allPosts = [], isLoading, refetch } = useQuery({
    queryKey: ['allPost'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allPost`);
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <div >
      {
        allPosts.map(postData => <Post key={postData._id} postData={postData} refetch={refetch}></Post>)
      }
    </div>
  );
};

export default AllPosts;