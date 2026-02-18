interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    children,
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) => {
    return (
        <button
            type="button"
            className={`rounded-md bg-black px-3 py-1.5 text-sm text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
