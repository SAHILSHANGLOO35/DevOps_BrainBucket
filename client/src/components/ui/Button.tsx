import { ReactElement } from "react";

interface ButtonInterface {
    title: string;
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant: "primary" | "secondary";
}

const sizeStyles = {
    sm: "px-2 py-1 text-sm rounded-sm",
    md: "px-4 py-2 text-md rounded-md",
    lg: "px-6 py-4 text-xl rounded-lg",
};

const variantStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-600",
};

export function Button(props: ButtonInterface) {
    return (
        <button
            className={`${sizeStyles[props.size]} ${
                variantStyles[props.variant]
            }`}
        >
            <div className="flex gap-2 items-center justify-center">
                {props.startIcon}
                {props.title}
                {props.endIcon}
            </div>
        </button>
    );
}
