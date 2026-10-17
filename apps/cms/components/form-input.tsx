import { isBooleanInputProps, type InputProps } from 'sanity';
import { BooleanInput } from './boolean-input';


/** Studio-wide input overrides */
export const FormInput = (props: InputProps) =>
  isBooleanInputProps(props) ?
    <BooleanInput {...props} /> :
    props.renderDefault(props);
