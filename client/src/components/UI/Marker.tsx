import React, { FC } from 'react';

interface MarkerProps {
  text: string;
}

const Marker: FC<MarkerProps> = ({ text }) => {
  return(
    <div>{text}</div>
  );
}

export default Marker;