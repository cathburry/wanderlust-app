import React, { FC, InputHTMLAttributes } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  onChangeVal: (name: string | undefined, value: TimePickerValue) => void;
  currVal: TimePickerValue;
}

const CustomTimePicker: FC<PropsType> = ({
  name,
  currVal,
  onChangeVal,
}: PropsType) => (
  <TimePicker
    value={currVal}
    onChange={(val) => {
      onChangeVal(name, val);
    }}
  />
);

export default CustomTimePicker;
