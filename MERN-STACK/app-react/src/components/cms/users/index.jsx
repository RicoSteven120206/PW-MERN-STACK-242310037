"use client";

import React, { useEffect, useState, useCallback } from "react";
import TabledataUser from "./tabelDataUser";
import { GET_ALL_USER } from "@/components/apis/UserServices";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await GET_ALL_USER();
      if (res && (res.success || Array.isArray(res.data) || Array.isArray(res))) {
        setUsers(res.data || res);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container-fluid py-4">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <TabledataUser data={users} ReloadData={fetchUsers} />
      )}
    </div>
  );
}