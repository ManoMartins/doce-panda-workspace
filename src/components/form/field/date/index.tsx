import { FormControl, TextInput, TextInputProps } from '@primer/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'

import { FieldError } from 'react-hook-form'

interface BaseDateProps extends TextInputProps {
  name: string
  label?: string
  error?: FieldError
}

const BaseDate: ForwardRefRenderFunction<HTMLInputElement, BaseDateProps> = (
  { name, label, error, ...rest },
  ref
) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      {!!label && <FormControl.Label>{label}</FormControl.Label>}

      <TextInput
        ref={ref}
        id={name}
        name={name}
        type="date"
        {...rest}
        sx={{ width: '100%' }}
      />

      {!(error == null) && (
        <FormControl.Validation data-testid={`validation-${name}`} variant={"error"}>{error.message}</FormControl.Validation>
      )}
    </FormControl>
  )
}

const Date = forwardRef(BaseDate)

export { Date }
