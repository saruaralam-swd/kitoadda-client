import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../../Components/Loading';
import AddPost from '../AddPost/AddPost';
import profilePlaceholder from '../../../assets/profile.png';
import { AuthContext } from '../../../Context/AuthProvider';
import HomePost from './HomePost';

const Home = () => {

  const { data: allPosts = [], isLoading, refetch: reload } = useQuery({
    queryKey: ['allPost'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allPostHome`);
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading />
  }

 
  return (
    <div>
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