"use client";

import React, { useMemo, useState } from "react";
import { Cards } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import {
  HeaderDatatables,
  SearchInput,
  PaginationComponent,
} from "@/components/ui/datatables";
import { openModal, ModalResponse } from "@/components/ui/modals";
import { DELETE_USER } from "@/components/apis/UserServices";
import FormUser from "./formUser";

export default function TabledataUser({ data = [], ReloadData }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Header diselaraskan dengan field dari Controller Sequelize
  const table_headers = [
    { name: "NO", field: "id", sortable: false, className: "ps-4 pe-2 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "USERNAME", field: "username", sortable: true, className: "px-3 py-3 align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "EMAIL", field: "email", sortable: true, className: "px-3 py-3 align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "STATUS", field: "is_active", sortable: true, className: "px-3 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "ACTIONS", field: "id", sortable: false, className: "ps-2 pe-4 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
  ];

  const handleAdd = () => {
    openModal({
      message: <FormUser ReloadUser={ReloadData} />,
      size: "lg",
    });
  };

  const handleEdit = (user) => {
    openModal({
      message: <FormUser user_id={user.id} ReloadUser={ReloadData} />,
      size: "lg",
    });
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await DELETE_USER(userId);
        if (res && (res.success || res.statusCode === 200)) {
          openModal({
            message: <ModalResponse message="User deleted successfully!" title="Success" />,
          });
          if (ReloadData) ReloadData();
        } else {
          openModal({
            message: <ModalResponse message={res?.message || "Failed to delete user"} title="Error" variant="danger" />,
          });
        }
      } catch (err) {
        openModal({
          message: <ModalResponse message={err?.message || "Error deleting user"} title="Error" variant="danger" />,
        });
      }
    }
  };

  const ResultData = useMemo(() => {
    let computedData = Array.isArray(data) ? [...data] : [];

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          const value = listData[key];
          return value != null && String(value).toLowerCase().includes(search.toLowerCase());
        });
      });
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData.sort((a, b) => {
        const valA = a[sorting.field] || "";
        const valB = b[sorting.field] || "";
        return reversed * String(valA).localeCompare(String(valB));
      });
    }

    return computedData;
  }, [data, search, sorting]);

  const totalitems = ResultData.length;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return ResultData.slice(start, start + ITEMS_PER_PAGE);
  }, [ResultData, currentPage]);

  return (
    <Cards className="shadow-sm border rounded-3 mt-4 overflow-hidden bg-white">
      <Cards.Header className="px-4 py-3 bg-white border-bottom flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <h5 className="fw-bold fs-4 mb-0 text-dark">User Management</h5>
          <Button variant="primary" className="btn-sm px-3 rounded-2" onClick={handleAdd}>
            <i className="bi bi-plus-lg me-1"></i> Add User
          </Button>
        </div>
        <div style={{ width: "280px" }}>
          <SearchInput
            keyword={search}
            onAction={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </Cards.Header>

      <Cards.Body className="p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <HeaderDatatables
              headers={table_headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="ps-4 pe-2 py-3 text-center align-middle text-muted fs-6">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <strong className="text-dark fs-6">{user.username}</strong>
                    </td>
                    <td className="px-3 py-3 align-middle text-secondary fs-6">
                      {user.email}
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <span className={`badge px-3 py-2 fw-normal rounded-2 ${user.is_active ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}`}>
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="ps-2 pe-4 py-3 text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="warning"
                          outline
                          className="btn-sm p-2 d-inline-flex align-items-center justify-content-center rounded-2"
                          onClick={() => handleEdit(user)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="danger"
                          outline
                          className="btn-sm p-2 d-inline-flex align-items-center justify-content-center rounded-2"
                          onClick={() => handleDelete(user.id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <i className="bi bi-people fs-1 text-muted d-block mb-3"></i>
                    <p className="text-muted mb-0">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalitems > 0 && (
            <div className="d-flex align-items-center justify-content-center py-3 px-4 border-top bg-white">
              <PaginationComponent
                total={totalitems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </Cards.Body>
    </Cards>
  );
}