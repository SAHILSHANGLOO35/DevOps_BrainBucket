interface InputProps {
    placeholder: string;
    reference?: any; // Specify the correct type for refs
    className?: string;
    value?: string; // Optional value prop for controlled components
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
}

export function Input({ placeholder, reference, className, value, onChange }: InputProps) {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                ref={reference}
                value={value} // Allows controlled usage
                onChange={onChange} // Allows controlled usage
                className={`text-start py-2 border shadow rounded m-2 ${className || ""}`}
            />
        </div>
    );
}
