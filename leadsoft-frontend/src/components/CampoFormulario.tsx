import { Input } from "@/styles/ReusableStyle";
import React from "react";

type CampoProps = {
  id: string;
  label: string;
  type?: string;
  value?: string;
  error?: string;
  required?: boolean;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CampoFormulario = React.memo(function CampoFormulario({
  id,
  label,
  type = "text",
  value,
  error,
  required,
  accept,
  onChange,
}: CampoProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        type={type}
        value={type === "file" ? undefined : value}
        accept={accept}
        onChange={onChange}
        required={required}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
});
