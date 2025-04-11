import React from "react";
import "./Button.css";

const Button = ({ href, children, onClick }) => {
    const isExternal = href?.startsWith("http");

    if (!href) {
        return (
            <button className="custom-button" onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            className="custom-button"
        >
            {children}
        </a>
    );
};

export default Button;
