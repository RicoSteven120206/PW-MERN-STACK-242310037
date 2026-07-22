"use client";
import React, { useMemo, useState } from "react";
import { Cards } from "@/components/ui/cards";
import { Button } from "@/components/ui/buttons";
import {
  HeaderDatatables,
  SearchInput,
  PaginationComponent,
} from "@/components/ui/datatables";
export default function Tabledata({ data }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalitems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const table_headers = [
    { name: "No", field: "id", sortable: false, className: "text-center" },
    { name: "Title", field: "title", sortable: true },
    { name: "Author", field: "author", sortable: true },
    { name: "Language", field: "language", sortable: true },
    { name: "Rate/View", field: "rate", sortable: false },
    { name: "Subscribe", field: "is_free", sortable: true, className: "text-center" },
    { name: "Actions", field: "id", sortable: false },
  ];
  const ResultData = useMemo(() => {
    let computedData = data;
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
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }
    setTotalItems(computedData.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]),
      );
    }
    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      );
    } else {
      return [];
    }
  }, [data, search, sorting, currentPage]);
  return (
    <Cards>
      <Cards.Header>
        <span className="card-label fw-bold fs-3">Book Lists</span>
        <div className="w-50">
          <SearchInput
            keyword={search}
            onAction={(e) => setSearch(e.target.value)}
          />
        </div>
      </Cards.Header>
      <Cards.Body className={`px-0 pb-0`}>
        <div className="table-responsive">
          <table className="table table-hover">
            <HeaderDatatables
              headers={table_headers}
              onSorting={(field, order) =>
                setSorting({
                  field,
                  order,
                })
              }
            />
            <tbody>
              {ResultData.length > 0 ? (
                ResultData.map((book, index) => (
                  <tr key={book.id}>
                    <td className="text-center">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td>
                      <strong>{book.title}</strong>
                    </td>
                    <td>{book.author}</td>
                    <td className="text-center">{book.language}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <div className="me-3">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="text-dark ms-1">{book.rating}</span>
                        </div>
                        <div className="me-3">
                          <i
                            className="bi bi-eye text-info"
                          ></i>
                          <span className="text-dark ms-1">{book.views}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-secondary">
                        {book.is_free ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        outline
                        className="btn-sm me-2"
                        onClick={() => handleEdit(book)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        outline
                        className="btn-sm me-2"
                        onClick={() => handleDelete(book.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    <i
                      className="bi bi-inbox fs-1 text-muted d-block mb-3"
                    ></i>
                    <p className="text-muted mb-0">No books found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalitems > 0 && (
            <div className="d-flex align-items-center justify-content-center">
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
