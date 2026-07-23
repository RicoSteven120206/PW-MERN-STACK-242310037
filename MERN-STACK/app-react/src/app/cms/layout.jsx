'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/cms/components/sidebar';
import Modals from '../../components/ui/modals';
import './cms.css';

export default function CMSLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.replace('/sign-in');
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Authenticating...</span>
          </div>
          <p className="text-muted fw-semibold mb-0">Verifikasi Hak Akses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cms-container">
        <Sidebar />
        <main className="main-content p-4">{children}</main>
      </div>
      <Modals />
    </>
  );
}