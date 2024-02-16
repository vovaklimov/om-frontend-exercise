import { ReactNode, forwardRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';

export interface InputFieldProps extends InputProps {
  isInvalid?: boolean;
  errorMessage?: string;
  label: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ isInvalid = false, errorMessage, label, ...inputProps }, ref) => {
    return (
      <FormControl isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <Input {...inputProps} ref={ref} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  },
);

InputField.displayName = 'InputField';
