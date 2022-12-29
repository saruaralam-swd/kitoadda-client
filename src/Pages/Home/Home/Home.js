import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import AddPost from '../AddPost/AddPost';

const Home = () => {

  return (
    <div>
      <AddPost />
    </div>
  );
};

export default Home;