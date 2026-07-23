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
import { DELETE_BOOK } from "@/components/apis/BookServices";
import Form from "./form";

export default function Tabledata({ data = [], ReloadData }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ps-4 pada kolom pertama & pe-4 pada kolom terakhir disesuaikan presisi dengan header
  const table_headers = [
    { name: "NO", field: "id", sortable: false, className: "ps-4 pe-2 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "TITLE", field: "title", sortable: true, className: "px-3 py-3 align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "AUTHOR", field: "author", sortable: true, className: "px-3 py-3 align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "LANGUAGE", field: "language", sortable: true, className: "px-3 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "RATE/VIEW", field: "rate", sortable: false, className: "px-3 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "SUBSCRIBE", field: "is_free", sortable: true, className: "px-3 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
    { name: "ACTIONS", field: "id", sortable: false, className: "ps-2 pe-4 py-3 text-center align-middle bg-light text-secondary fw-semibold border-bottom" },
  ];

  const handleEdit = (book) => {
    openModal({
      message: <Form book_id={book.id} ReloadBook={ReloadData} />,
      size: "xl",
    });
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const res = await DELETE_BOOK(bookId);
        if (res && (res.success || res.statusCode === 200)) {
          openModal({
            message: <ModalResponse message="Book deleted successfully!" title="Success" />,
          });
          if (ReloadData) ReloadData();
        } else {
          openModal({
            message: <ModalResponse message={res?.message || "Failed to delete book"} title="Error" />,
          });
        }
      } catch (err) {
        openModal({
          message: <ModalResponse message={err?.message || "Error deleting book"} title="Error" />,
        });
      }
    }
  };

  const ResultData = useMemo(() => {
    let computedData = Array.isArray(data) ? [...data] : [];

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            return false;
          }
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
      {/* Header Kartu: Padding px-4 sejajar lurus dengan ps-4 & pe-4 pada tabel */}
      <Cards.Header className="px-4 py-3 bg-white border-bottom flex-wrap gap-3">
        <h5 className="fw-bold fs-4 mb-0 text-dark">Book Lists</h5>
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
                paginatedData.map((book, index) => (
                  <tr key={book.id || index}>
                    <td className="ps-4 pe-2 py-3 text-center align-middle text-muted fs-6">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <strong className="text-dark fs-6">{book.title}</strong>
                    </td>
                    <td className="px-3 py-3 align-middle text-secondary fs-6">
                      {book.author}
                    </td>
                    <td className="px-3 py-3 text-center align-middle text-secondary fs-6">
                      {book.language || "English"}
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="text-dark fw-semibold">{Number(book.rating || 0).toFixed(2)}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-eye text-info"></i>
                          <span className="text-dark fw-semibold">{book.views || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <span className="badge bg-secondary px-3 py-2 fw-normal rounded-2">
                        {book.is_free ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="ps-2 pe-4 py-3 text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="warning"
                          outline
                          className="btn-sm p-2 d-inline-flex align-items-center justify-content-center rounded-2"
                          onClick={() => handleEdit(book)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="danger"
                          outline
                          className="btn-sm p-2 d-inline-flex align-items-center justify-content-center rounded-2"
                          onClick={() => handleDelete(book.id)}
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
                  <td colSpan="7" className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <p className="text-muted mb-0">No books found</p>
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