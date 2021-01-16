import React from 'react';

type EntryProps = {
  healthCheckRating: number;
};

type HealthColor = { 3: string; 2: string; 1: string };

const Heart = ({ healthCheckRating }: EntryProps) => {
  const heartColor: { [key: number]: any } = {
    3: 'red',
    2: 'orange',
    1: 'yellow',
    0: 'green',
  };

  return (
    <i
      className='heart icon'
      style={{ color: heartColor[healthCheckRating] }}
    />
  );
};

export default Heart;
