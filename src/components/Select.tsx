import { useRef, useState, useEffect } from 'react';

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type Props = {
    value: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    id?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    error?: string;
    required?: boolean;
    searchable?: boolean;
    clearable?: boolean;
};

export const Select = ({
    value,
    onChange,
    options,
    id,
    label,
    placeholder = '選択してください',
    disabled = false,
    loading = false,
    error,
    required = false,
    searchable = false,
    clearable = false,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const errorId = error ? `${id}-error` : undefined;

    const selectedOption = options.find(opt => opt.value === value);
    
    const filteredOptions = searchable && searchQuery
        ? options.filter(opt => 
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options;

    // 外側クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // ドロップダウンを開いたときに検索入力にフォーカス
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const handleToggle = () => {
        if (!disabled && !loading) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.('');
        setSearchQuery('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled || loading) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                setIsOpen(!isOpen);
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchQuery('');
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setIsOpen(false);
                }
                break;
        }
    };

    return (
        <div className="w-full" ref={containerRef}>
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
                </label>
            )}
            
            <div className="relative">
                {/* Select Button */}
                <button
                    type="button"
                    id={id}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                    disabled={disabled || loading}
                    className={`
                        w-full px-4 py-2.5 
                        text-left text-base
                        bg-white
                        border rounded-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                        flex items-center justify-between gap-2
                        ${error 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }
                        ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
                    `}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={errorId}
                    aria-required={required}
                    aria-busy={loading}
                >
                    <span className={`flex-1 truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    
                    <div className="flex items-center gap-1">
                        {clearable && selectedOption && !disabled && !loading && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                                aria-label="クリア"
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        
                        {loading ? (
                            <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <svg 
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </div>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                        {searchable && (
                            <div className="p-2 border-b border-gray-200">
                                <div className="relative">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="検索..."
                                        className="w-full px-3 py-2 pl-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <svg 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        
                        <ul 
                            role="listbox"
                            className="overflow-y-auto max-h-48 py-1"
                        >
                            {filteredOptions.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-gray-500 text-center">
                                    {searchQuery ? '該当する項目がありません' : 'オプションがありません'}
                                </li>
                            ) : (
                                filteredOptions.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={option.value === value}
                                            onClick={() => !option.disabled && handleSelect(option.value)}
                                            disabled={option.disabled}
                                            className={`
                                                w-full px-4 py-2.5 text-left text-sm
                                                transition-colors duration-150
                                                flex items-center justify-between
                                                ${option.value === value 
                                                    ? 'bg-blue-50 text-blue-700 font-medium' 
                                                    : 'text-gray-900 hover:bg-gray-50'
                                                }
                                                ${option.disabled 
                                                    ? 'opacity-50 cursor-not-allowed' 
                                                    : 'cursor-pointer'
                                                }
                                            `}
                                        >
                                            <span>{option.label}</span>
                                            {option.value === value && (
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {error && (
                <span 
                    id={errorId}
                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
};