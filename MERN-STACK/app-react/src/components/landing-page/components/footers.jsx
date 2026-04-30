import React from "react";

export default function Footers() {
  const socialLinks = [
    { icon: "facebook", url: "#", label: "Facebook" },
    { icon: "twitter", url: "#", label: "Twitter" },
    { icon: "instagram", url: "#", label: "Instagram" },
    { icon: "linkedin", url: "#", label: "LinkedIn" },
  ];
  const quickLinks = [
    { text: "About Us", url: "#" },
    { text: "Contact", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
  ];
  const contactItems = [
    { icon: "geo-alt", text: "123 Book Street, Reading City" },
    { icon: "telephone", text: "+1 234 567 8900" },
    { icon: "envelope", text: "info@bookstore.com" },
  ];

  return (
    <footer id="contact" className="bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">
              <i className="bi bi-book-fill me-2"></i>
              Readly<sup>+</sup>
            </h5>
            <p className="text-muted">
              Your trusted online bookstore since 2024
            </p>
            <SocialMediaLinks links={socialLinks} />
          </div>
          <FooterSection title="Quick Links">
            <LinkList links={quickLinks} />
          </FooterSection>
          <FooterSection title="Contact Info">
            <ContactInfo items={contactItems} />
          </FooterSection>
        </div>
        <hr />
        <div className="text-center text-muted">
          <p className="mb-0">
            &copy; 2026 Frederico Steven Kwok All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const SocialMediaLinks = ({ links, iconSize = "1.5rem", className = "" }) => {
  return (
    <div className={`d-flex gap-3 ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="text-dark"
          arialabel={link.label}
        >
          <i
            className={`bi bi-${link.icon}`}
            style={{ fontSize: iconSize }}
          ></i>
        </a>
      ))}
    </div>
  );
};

const FooterSection = ({ title, children, className = "" }) => {
  return (
    <div className={`col-md-4 mb-3 ${className}`}>
      <h6 className="fw-bold">{title}</h6>
      {children}
    </div>
  );
};

const ContactInfo = ({ items, className = "" }) => {
  return (
    <ul className={`list-unstyled text-muted ${className}`}>
      {items.map((item, index) => (
        <li key={index}>
          <i className={`bi bi-${item.icon} me-2`}></i>
          {item.text}
        </li>
      ))}
    </ul>
  );
};

const LinkList = ({ links, className = "" }) => {
  return (
    <ul className={`list-unstyled ${className}`}>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} className="text-muted text-decoration-none">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
};
