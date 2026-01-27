import React, { type CSSProperties, type ReactNode, type Ref } from 'react';
import './Button.style.css';

interface ButtonProps {
    ref?: Ref<HTMLButtonElement>,
    children: ReactNode;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    ariaLabel?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const ButtonComponent = ({
    ref,
    children,
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
    ariaLabel,
    icon,
    style,
    className
}: ButtonProps) => {
    const isDisabled = disabled || loading;
    const hasText = Boolean(children);

    return (
        <>
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                onClick={onClick}
                style={style}
                className={` ${className ?? ''}`}
                aria-disabled={isDisabled}
                aria-busy={loading || undefined}
                aria-label={!hasText ? ariaLabel : undefined}
            >
                {loading && (<span className={"btn-spinner"} aria-hidden="true" />)}

                {hasText && children}

                {icon && <span className='btn-icon'>{icon}</span>}
            </button>
        </>
    )
}