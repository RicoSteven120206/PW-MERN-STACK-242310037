"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu_CMS } from '@/const/menu_cms';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth(); // Memanggil logout dari AuthContext

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isExpanded = !isCollapsed || isHovered;

  return (
    <aside
      className={`sidebar ${!isExpanded ? "collapsed" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-header">
        {isExpanded && (
          <h4>
            <i className="bi bi-gear-fill me-2"></i>
            CMS Readly<sup>+</sup>
          </h4>
        )}
        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <i
            className={`bi ${isCollapsed ? "bi-chevron-right" : "bi-chevron-left"}`}
          ></i>
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-menu">
          {Menu_CMS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={pathname === item.path ? "active" : ""}
                data-title={item.name}
              >
                <i className={item.icon}></i>
                <span className="menu-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button
          type="button"
          className="logout-btn"
          onClick={logout}
          data-title="Logout"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="menu-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}