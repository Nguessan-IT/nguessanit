import "react-phone-number-input/style.css";
import PhoneInputLib from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js/core";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function PhoneInput({ value, onChange, className = "", placeholder = "Numéro de téléphone" }: PhoneInputProps) {
  return (
    <PhoneInputLib
      international
      defaultCountry="CI"
      value={value as E164Number | undefined}
      onChange={(v) => onChange(v || "")}
      placeholder={placeholder}
      className={`phone-input-custom ${className}`}
    />
  );
}
