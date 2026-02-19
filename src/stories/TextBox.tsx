export type TextBoxProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled ?: boolean;
    error ?: boolean;
};

export const TextBox = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    error = false,
}: TextBoxProps) => {
    return (
    <input
        className={`text-base px-5 py-2.5 border-none rounded bg-white text-[#333]
        shadow-[inset_0_0_0_1px_${error ? '#ef4444' : '#ccc'}]
        transition-shadow duration-300 ease-in-out
        ${error
            ? 'focus:shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]'
            : 'focus:shadow-[0_0_8px_2px_rgba(33,150,243,0.6)]'
        }
        focus:outline-none`}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
            padding: "8px",
            borderRadius: "4px",
            border: error ? "1px solid red" : "1px solid #ccc",
            outline: "none",
        }}
    />
);
};