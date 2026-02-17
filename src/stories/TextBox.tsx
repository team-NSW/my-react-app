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
    return(
        <input
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            style ={{
                padding: "8px",
                borderRadius: "4px",
                border: error ? "1px solid red" : "1px solid #ccc",
                outline: "none",
            }}
        />
    );
};