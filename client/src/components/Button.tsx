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
    primary: "bg-purple-600 text-white hover:bg-purple-500 transition-all duration-200",
    secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-normal flex items-center";

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
