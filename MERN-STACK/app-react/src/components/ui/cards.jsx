import React from 'react';
import { Alert } from "@/components/ui/alerts";

const Cards = ({ children, className = "" }) => {
  let header, toolbar, body, footer;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
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
      <div className={`card card-xl-stretch mb-4 shadow-sm ${className}`.trim()}>
        {header && (
          <div className="card-header border-0 p-0 bg-white">
            {header}
            {toolbar && <div className="card-toolbar">{toolbar}</div>}
          </div>
        )}

        {body}
        {footer && footer}
      </div>
    );
  } catch (error) {
    return <Alert messages={error.message} title={`Card`} />;
  }
};

Cards.Header = ({ children, className = "" }) => (
  <div className={`d-flex align-items-center justify-content-between mb-0 ${className}`.trim()}>
    {children}
  </div>
);

Cards.Toolbar = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

Cards.Body = ({ children, className = "" }) => {
  return (
    <div className={`card-body ${className}`.trim()}>
      {children}
    </div>
  );
};

Cards.Footer = ({ children, className = "" }) => (
  <div className={`card-footer ${className}`.trim()}>
    {children}
  </div>
);

export { Cards };