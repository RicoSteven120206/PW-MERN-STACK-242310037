import React from 'react'
import { Alert } from "@/components/ui/alerts";

const Cards = ({ children }) => {
    let header, toolbar, body, footer;

    React.Children.forEach(children, child => {
        if (child.type === Cards.Header) {
            header = child;
        } else if (child.type === Cards.Toolbar) {
            toolbar = child;
        } else if (child.type === Cards.Body) {
            body = child;
        } else if (child.type === Cards.Footer) {
            footer = child;
        }
    });

    try {
        return (
            <div className="card card-xl-stretch mb-4 shadow-sm">
                {header && (
                    <div className="card-header border-0 py-0 bg-white">
                        {header}
                        {toolbar && (
                            <div className="card-toolbar">
                                {toolbar}
                            </div>
                        )}
                    </div>
                )}

                {body}
                {footer && footer}
            </div>
        );
    } catch (error) {
        return <Alert messages={error.message} title={`Card`} />
    }
};

Cards.Header = ({ children }) => (
    <div className="d-flex align-items-start justify-content-between mb-0">
        {children}
    </div>
);

Cards.Toolbar = ({ children }) => (
    <div>
        {children}
    </div>
);

Cards.Body = ({ children, className }) => {
    let class_name = `card-body ${className}`
    return (
        <div className={class_name}>
            {children}
        </div>
    )

};

Cards.Footer = ({ children, className }) => (
    <div className={`card-footer ${className}`}>
        {children}
    </div>
);

export { Cards }
