import React, {
  FC,
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  onChangeVal: (
    name: string | undefined,
    value: ChangeEvent<HTMLElement>
  ) => void;
  className: string;
  style: CSSProperties | undefined;
  children: ReactNode;
}

const CustomDropDown: FC<PropsType> = ({
  name,
  value,
  onChangeVal,
  className,
  style,
  children,
}) => (
  <select
    name={name}
    className={className}
    value={value}
    style={style}
    onChange={(val) => {
      onChangeVal(name, val);
    }}
  >
    {children}
  </select>
);

export default CustomDropDown;
