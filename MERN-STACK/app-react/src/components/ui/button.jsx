import React from "react";

const Button = ({
    children,
    variant = "primary",
    size = "md",
    outline = false,
    icon,
    iconPosition = "left",
    disabled = false,
    loading = false,
    fullWidth = false,
    className = "",
    onClick,
    type = "button",
    ...props
}) => {
    const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
    const sizeClass = size !== "md" ? `btn-${size}` : ""; 
    const widthClass = fullWidth ? "w-100" : "";
    const disabledClass = disabled || loading? "disabled" : "";
    const buttonClasses = `btn ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`.trim();

    return (
        <button 
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
        >
            {loading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Loading...
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <i className={`bi bi-${icon} me-2`}></i>
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        <i className={`bi bi-${icon} ms-2`}></i>
                    )}
                </>
            )}
        </button>
    );
}

export {Button};