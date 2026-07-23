"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CREATE_USER,
  UPDATE_USER,
  GET_USER_BY_ID,
} from "@/components/apis/UserServices";
import { openModal, ModalResponse } from "@/components/ui/modals";

export default function FormUser({ user_id, ReloadUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  // Ambil detail data jika dalam mode Edit
  useEffect(() => {
    if (user_id) {
      setLoading(true);
      GET_USER_BY_ID(user_id)
        .then((res) => {
          if (res && (res.success || res.data)) {
            const data = res.data || res;
            setFormData({
              username: data.username || "",
              email: data.email || "",
              password: "", // Kosongkan password saat edit
              is_active: data.is_active ?? true,
            });
          }
        })
        .catch((err) => console.error("Error fetching user detail:", err))
        .finally(() => setLoading(false));
    }
  }, [user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      const payload = { ...formData };

      // Jika mode Edit dan password tidak diisi, hapus dari payload agar tidak mengubah password lama
      if (user_id && !payload.password) {
        delete payload.password;
      }

      if (user_id) {
        res = await UPDATE_USER(user_id, payload);
      } else {
        res = await CREATE_USER(payload);
      }

      if (res && (res.success || res.statusCode === 200 || res.statusCode === 201)) {
        openModal({
          message: (
            <ModalResponse
              message={`User successfully ${user_id ? "updated" : "created"}!`}
              title="Success"
            />
          ),
        });
        if (ReloadUser) ReloadUser();
      } else {
        openModal({
          message: (
            <ModalResponse
              message={res?.message || "Failed to save user"}
              title="Error"
              variant="danger"
            />
          ),
        });
      }
    } catch (err) {
      openModal({
        message: (
          <ModalResponse
            message={err?.message || "Something went wrong"}
            title="Error"
            variant="danger"
          />
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <h4 className="fw-bold mb-4">{user_id ? "Edit User" : "Add New User"}</h4>

      {/* Field Username */}
      <div className="mb-3">
        <label className="form-label fw-semibold text-secondary">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </div>

      {/* Field Email */}
      <div className="mb-3">
        <label className="form-label fw-semibold text-secondary">Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      {/* Field Status Active */}
      <div className="mb-3">
        <label className="form-label fw-semibold text-secondary">Status</label>
        <select
          className="form-select"
          value={formData.is_active ? "true" : "false"}
          onChange={(e) =>
            setFormData({ ...formData, is_active: e.target.value === "true" })
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Field Password */}
      <div className="mb-4">
        <label className="form-label fw-semibold text-secondary">
          Password {user_id && <small className="text-muted">(Leave blank if unchanged)</small>}
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!user_id}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <Button variant="primary" type="submit" disabled={loading} className="px-4">
          {loading ? "Saving..." : user_id ? "Update User" : "Save User"}
        </Button>
      </div>
    </form>
  );
}