"use client";

import React, { useEffect, useState } from "react";
import { openModal } from "@/components/ui/modals";
import { Alert } from "@/components/ui/alerts";
import { Skeleton } from "@/components/ui/loading";
import { GET_ALL_BOOK } from "@/components/apis/BookServices";
import { CardCalculates } from "../components/card_calculates";
import { Header } from "./components/header";
import Form from "./components/form";
import Tabledata from "./components/tabledata";

export function MBooks() {
  const [books, setBooks] = useState({ loading: false, data: [], message: "" });

  const ReloadBook = async () => {
    setBooks({ loading: true, data: [], message: "" });
    try {
      const results = await GET_ALL_BOOK();
      if (results && results.data) {
        setBooks({
          loading: false,
          data: Array.isArray(results.data) ? results.data : [],
          message: "",
        });
      } else {
        setBooks({
          loading: false,
          data: [],
          message: results?.message || "Failed to fetch books",
        });
      }
    } catch (err) {
      setBooks({
        loading: false,
        data: [],
        message: err?.message || "An error occurred",
      });
    }
  };

  useEffect(() => {
    ReloadBook();
  }, []);

  const handleAddModal = () => {
    openModal({
      message: <Form ReloadBook={ReloadBook} />,
      size: "xl",
    });
  };

  const bookData = books.data || [];

  return (
    <div className="container-fluid">
      <Header handleAdd={handleAddModal} />

      <div className="row">
        <div className="col-md-3">
          <CardCalculates
            title="Total Books"
            value={bookData.length}
            icon="book"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Free Book"
            value={bookData.filter((b) => b.is_free).length}
            icon="grid"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Subscribe"
            value={bookData.filter((b) => !b.is_free).length}
            icon="calendar-event"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Authors"
            value={bookData.filter((b) => b.author).length}
            icon="people"
          />
        </div>
      </div>

      {books.loading ? (
        <Skeleton />
      ) : books.message ? (
        <Alert message={books.message} variant="danger" />
      ) : (
        <Tabledata data={bookData} ReloadData={ReloadBook} />
      )}
    </div>
  );
}

export default MBooks;