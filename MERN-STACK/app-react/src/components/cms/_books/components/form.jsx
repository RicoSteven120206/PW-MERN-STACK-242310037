"use client";

import React, { useEffect, useState } from "react";
import { TextAreaInput, TextInput, InputImage, InputCheckbox } from "@/components/ui/forms";
import { Button } from "@/components/ui/button";
import { openModal, ModalResponse } from "@/components/ui/modals";
import { GET_BOOK_BY_ID, CREATE_BOOK, UPDATE_BOOK } from "@/components/apis/BookServices";
import { Alert } from "@/components/ui/alerts";

export default function Form({ book_id, ReloadBook }) {
  const obj_book = {
    title: "",
    author: "",
    sinopsis: "",
    story: "",
    is_free: false,
    image: null,
  };

  const [formData, setFormData] = useState(obj_book);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ReloadBookByID = async () => {
    try {
      const result = await GET_BOOK_BY_ID(book_id);
      if (result && result.success && result.data) {
        setFormData(result.data);
        if (result.data.image) {
          const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URI}${result.data.image}`;
          setImagePreview(imageUrl);
        }
      } else {
        openModal({
          message: <ModalResponse message={result?.message || "Data not found"} title="Error" />,
        });
      }
    } catch (err) {
      setError(err?.message || "Failed to load book detail");
    }
  };

  useEffect(() => {
    if (book_id) {
      ReloadBookByID();
    }
  }, [book_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, WEBP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("sinopsis", formData.sinopsis);
      formDataToSend.append("story", formData.story);
      formDataToSend.append("is_free", formData.is_free);

      if (formData.image instanceof File) {
        formDataToSend.append("coverImage", formData.image);
      }

      let result;
      if (book_id) {
        result = await UPDATE_BOOK(book_id, formDataToSend);
      } else {
        result = await CREATE_BOOK(formDataToSend);
      }

      if (result && result.success) {
        openModal({ open: false });
        openModal({
          message: (
            <ModalResponse
              message={`Book has been successfully ${book_id ? "updated" : "created"}!`}
              title="Success"
            />
          ),
        });
        if (ReloadBook) ReloadBook();
      } else {
        if (result?.errors && Array.isArray(result.errors)) {
          const errMsg = result.errors.map((e) => e.message).join(", ");
          setError(errMsg);
        } else {
          setError(result?.message || `Failed to ${book_id ? "update" : "create"} book`);
        }
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-4 border-bottom pb-2">
        <h3 className="mb-1 fw-bold">{book_id ? "Edit Book" : "Add New Book"}</h3>
        <p className="text-muted fs-6 mb-0">Fill in the details for the book.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-6 d-flex flex-column gap-3">
          <TextInput
            title="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <TextAreaInput
            title="Sinopsis (Min. 10 chars)"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={3}
            required
          />
          <TextAreaInput
            title="Story (Min. 10 chars)"
            name="story"
            value={formData.story}
            onChange={handleInputChange}
            rows={5}
            required
          />
        </div>

        <div className="col-lg-6 d-flex flex-column gap-3">
          <div className="row g-2 align-items-center">
            <div className="col-8">
              <TextInput
                title="Author Name"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4">
              <InputCheckbox
                title="Type Book"
                value="Is Free"
                name="is_free"
                is_switch={true}
                checked={formData.is_free}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <InputImage
            title="Cover Image"
            onChange={handleImageChange}
            required={!book_id}
            imagePreview={imagePreview}
          />
        </div>
      </div>

      {error && (
        <div className="mt-3">
          <Alert message={error} variant="danger" />
        </div>
      )}

      <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="light"
          className="px-4"
          onClick={() => openModal({ open: false })}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-4"
          disabled={loading}
          style={{ backgroundColor: "#437059", borderColor: "#437059" }}
        >
          {loading ? "Submitting..." : book_id ? "Update Book" : "Submit Book"}
        </Button>
      </div>
    </form>
  );
}