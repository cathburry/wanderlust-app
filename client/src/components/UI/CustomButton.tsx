/* eslint-disable
  react/jsx-props-no-spreading
*/
import React, { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface PropsType extends ButtonProps {
  label: string;
}

const CustomButton: FC<PropsType> = (props: PropsType) => {
  const { label } = props;
  return <Button {...props}>{label}</Button>;
};

export default CustomButton;
