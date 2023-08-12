import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {

  return (
    <div>
      {
        isLoading ? 
        <ReactLoading type={"spin"} color={"white"} height={500} width={375} />
        : null
      }
    </div>
  );
};

export default Loading;