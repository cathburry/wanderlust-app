import React, { FC, InputHTMLAttributes } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  onChangeVal: (
    name: string | undefined,
    value: Date | [Date, Date] | null
  ) => void;
  className: string;
  currVal: string | number | Date;
}

const FormDatePicker: FC<PropsType> = ({
  name,
  currVal,
  onChangeVal,
  className,
}: PropsType) => (
  <DatePicker
    className={className}
    selected={(currVal && new Date(currVal)) || null}
    onChange={(val) => {
      onChangeVal(name, val);
    }}
  />
);

export default FormDatePicker;
