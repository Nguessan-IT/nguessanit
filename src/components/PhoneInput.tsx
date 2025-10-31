import { forwardRef } from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, className, placeholder, disabled }, ref) => {
    return (
      <PhoneInputWithCountry
        international
        defaultCountry="CI"
        value={value}
        onChange={(val) => onChange(val || "")}
        disabled={disabled}
        placeholder={placeholder || "+225 XX XX XX XX XX"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        numberInputProps={{
          className: cn(
            "flex h-10 w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ref: ref
        }}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
