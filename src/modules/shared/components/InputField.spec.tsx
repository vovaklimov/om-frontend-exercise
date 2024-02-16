import { InputField } from './InputField';
import { render } from '@testing-library/react';

describe('InputField', () => {
  it('should render error message when input is invalid and error message is present', () => {
    const errorMessage = 'error';
    const { getByText } = render(
      <InputField isInvalid errorMessage={errorMessage} label="label" />,
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should not render error message when input is valid even if error message is present', () => {
    const errorMessage = 'error';
    const { queryByText } = render(
      <InputField isInvalid={false} errorMessage={errorMessage} label="label" />,
    );

    expect(queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
