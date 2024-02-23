import { Input } from "@nextui-org/react";

export const InputCustom = ({
  name,
  isRequired,
  value,
  type,
  label,
  validityState,
  errorMessage,
  onChangeFunction,
}) => {
  return (
    <Input
      name={name}
      isRequired={isRequired}
      value={value}
      type={type}
      label={label}
      variant="faded"
      isInvalid={!validityState}
      color={value !== "" ? (validityState ? "success" : "danger") : "default"}
      errorMessage={!validityState && errorMessage}
      onChange={onChangeFunction}
      className="max-w-xs font-medium"
    />
  );
};
