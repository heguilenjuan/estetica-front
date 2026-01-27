import React, {
    type ChangeEvent,
    type CSSProperties
} from 'react';
import type { HTMLInputTypeAttribute } from 'react';

interface InputProps {
    ref?: React.Ref<HTMLInputElement>;
    id?: string;
    name: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
}

export const InputComponent = ({
    ref,
    id,
    name,
    label,
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    disabled = false,
    required = false,
    error,
    ariaLabel,
    className,
    style
}: InputProps) => {

    const inputId = id ?? `input-${name}`;
    const hasLabel = Boolean(label);
    const hasError = Boolean(error);

    return (
        <div className={`${className ?? ''}`} style={style}>
            {hasLabel && (
                <label htmlFor={inputId}>
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                required={required}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${inputId}-error` : undefined}
                aria-label={!hasLabel ? ariaLabel : undefined}
            />

            {hasError && (
                <span
                    id={`${inputId}-error`}
                    role="alert"
                    className="input-error"
                >
                    {error}
                </span>
            )}
        </div>
    );
}
