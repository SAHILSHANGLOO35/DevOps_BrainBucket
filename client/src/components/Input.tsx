
interface InputProps {
    placeholder: string;
    reference?: any;
    className?: string
}

export function Input({ placeholder, reference, className }: InputProps) {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                ref={reference}
                className={`text-start py-2 border shadow rounded m-2 ${className || ""}`}
            />
        </div>
    );
}
