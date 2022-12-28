import React from 'react';

const Loading = () => {
  return (
    <div class="flex justify-center items-center space-x-2">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;