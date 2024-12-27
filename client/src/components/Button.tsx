import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    isDisabled?: boolean;
}

const variantClasses = {
    primary: "bg-purple-900 text-white hover:bg-purple-600 transition-all duration-200",
    secondary: "bg-purple-300 text-purple-950 hover:bg-purple-400 hover:text-white transition-all duration-200",
};

const defaultStyles = "px-4 py-2 rounded-md font-semibold flex items-center";

// destructuring props
export function Button({
    variant,
    text,
    startIcon,
    onClick,
    fullWidth,
    loading,
    isDisabled,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${variantClasses[variant]} ${defaultStyles} ${
                fullWidth ? "w-full justify-center items-center tracking-wider font-semibold" : ""
            } ${loading ? "opacity-45" : ""}`}
            disabled={isDisabled==false ? !isDisabled : loading}
        >
            <div className="pr-2">{startIcon}</div>
            {text}
        </button>
    );
}
