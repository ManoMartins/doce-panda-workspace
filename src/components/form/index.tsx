import { Box, BoxProps } from "@primer/react";
import { Children, ReactNode, cloneElement, isValidElement } from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import { Text, Date } from "./field";

type FormProps<T extends FieldValues> = Omit<
  BoxProps,
  "onSubmit" | "children"
> & {
  children: ReactNode;
  defaultValues?: any;
  onSubmit: (data: T) => void;
  methods: UseFormReturn<any, any>;
};

function Form<T extends FieldValues>({
  children,
  defaultValues,
  onSubmit,
  methods,
  ...rest
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box {...rest}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }

          if (child.props.name) {
            return cloneElement(child, {
              ...child.props,
              error: errors[child.props.name],
              ...register(child.props.name),
              key: child.props.name,
            });
          }

          if (child.props.type === "submit") {
            return cloneElement(child, {
              ...child.props,
              isLoading: isSubmitting,
            });
          }

          return child;
        })}
      </Box>
    </form>
  );
}

Form.Text = Text;
Form.Date = Date;

export default Form;
