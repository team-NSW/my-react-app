import type { InputHTMLAttributes } from 'react';
export const InputTypes = ['text', 'number', 'email', 'password', 'search', 'tel', 'url'] as const;
type InputType = typeof InputTypes[number];

export type Props  = InputHTMLAttributes<HTMLInputElement> & {
    type?: InputType;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    label?: string;
    loading?: boolean;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    icon?: React.ReactNode;
    required?: boolean;
};

export const Input = ({
    type,
    value,
    onChange,
    label,
    id,
    placeholder,
    disabled = false,
    loading = false,
    error,
    icon,
    required = false,
    ...props
}: Props) => {
    const errorId = error ? `${id}-error` : undefined;
    
    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id}
                    className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700"
                >
                    <span>{label}</span>
                    {required && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            必須
                        </span>
                    )}
                    {loading && <span className="sr-only">読み込み中</span>}
                </label>
            )}
            <div className="relative flex items-center">
                <input
                    type={type || 'text'}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    className={`
                        w-full px-4 py-2.5 
                        text-gray-900 text-base
                        bg-white
                        border rounded-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                        ${error 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }
                        ${icon ? 'pr-12' : ''}
                    `}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={errorId}
                    aria-busy={loading}
                    aria-required={required}
                    {...props}
                />
                {icon && (
                    <span 
                        className={`
                            absolute right-4 
                            text-gray-400
                            pointer-events-none
                            ${loading ? 'animate-spin' : ''}
                        `}
                        aria-hidden="true"
                        role={loading ? 'status' : undefined}
                    >
                        {icon}
                    </span>
                )}
            </div>
            {error && (
                <span 
                    id={errorId}
                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {/* エラーアイコン */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
};