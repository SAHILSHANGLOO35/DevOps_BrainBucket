interface InputProps {
    placeholder: string;
    reference?: any; // Specify the correct type for refs
    className?: string;
    value?: string; // Optional value prop for controlled components
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function Input({ type="text", placeholder, reference, className, value, onChange }: InputProps) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                ref={reference}
                value={value}
                onChange={onChange}
                className={`text-start py-2 border shadow rounded m-2 ${className || ""}`}
            />
        </div>
    );
}
