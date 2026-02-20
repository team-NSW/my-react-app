import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-blue-600 text-white
        hover:bg-blue-700 
        focus:ring-blue-500
        disabled:bg-blue-300
    `,
    secondary: `
        bg-gray-600 text-white
        hover:bg-gray-700
        focus:ring-gray-500
        disabled:bg-gray-300
    `,
    success: `
        bg-green-600 text-white
        hover:bg-green-700
        focus:ring-green-500
        disabled:bg-green-300
    `,
    danger: `
        bg-red-600 text-white
        hover:bg-red-700
        focus:ring-red-500
        disabled:bg-red-300
    `,
    warning: `
        bg-yellow-500 text-white
        hover:bg-yellow-600
        focus:ring-yellow-500
        disabled:bg-yellow-300
    `,
    ghost: `
        bg-transparent text-gray-700 border border-gray-300
        hover:bg-gray-50
        focus:ring-gray-500
        disabled:bg-gray-50 disabled:text-gray-400
    `,
    link: `
        bg-transparent text-blue-600
        hover:text-blue-700 hover:underline
        focus:ring-blue-500
        disabled:text-blue-300
    `,
};

const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
    xl: 'px-6 py-3.5 text-xl',
};

export const Button = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    type = 'button',
    ...props
}: Props) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`
                inline-flex items-center justify-center gap-2
                font-medium rounded-lg
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-60
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? 'w-full' : ''}
                ${variant !== 'link' ? 'shadow-sm hover:shadow' : ''}
                ${className}
            `}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg 
                        className="animate-spin h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>読み込み中...</span>
                </>
            ) : (
                <>
                    {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
                    <span>{children}</span>
                    {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};