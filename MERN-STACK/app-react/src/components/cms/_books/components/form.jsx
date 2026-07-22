"use client";
import React, { useEffect, useState } from 'react';
import { TextAreaInput, TextInput, InputImage, InputCheckbox } from '@/components/ui/forms';
import { Button } from "@/components/ui/buttons";
import { openModal, ModalResponse } from '@/components/ui/modals';
import { Alert } from '@/components/ui/alerts';
import ListBooks from '../../../../const/bookList'; 

const GET_BOOK_BY_ID = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = ListBooks.find((b) => b.id === Number(id));
      if (book) {
        resolve({ success: true, data: book, message: "" });
      } else {
        resolve({ success: false, data: null, message: "No record found" });
      }
    }, 300);
  });
};

const CREATE_BOOK = async (formDataToSend) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook = {
        id: Date.now(),
        title: formDataToSend.get('title'),
        author: formDataToSend.get('author'),
        sinopsis: formDataToSend.get('sinopsis'),
        story: formDataToSend.get('story'),
        is_free: formDataToSend.get('is_free') === 'true',
        img: "default_cover.png",
        rating: 5.0,
        views: 0
      };
      ListBooks.unshift(newBook);
      resolve({ success: true, message: "Book created successfully" });
    }, 500);
  });
};

const UPDATE_BOOK = async (id, formDataToSend) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = ListBooks.findIndex((b) => b.id === Number(id));
      if (index !== -1) {
        ListBooks[index] = {
          ...ListBooks[index],
          title: formDataToSend.get('title'),
          author: formDataToSend.get('author'),
          sinopsis: formDataToSend.get('sinopsis'),
          story: formDataToSend.get('story'),
          is_free: formDataToSend.get('is_free') === 'true',
        };
        resolve({ success: true, message: "Book updated successfully" });
      } else {
        resolve({ success: false, message: "Book not found" });
      }
    }, 500);
  });
};

export default function Form({ book_id, ReloadBook }) {
  const obj_book = {
    title: '',
    author: '',
    sinopsis: '',
    story: '',
    is_free: false,
    image: null
  };

  const [formData, setFormData] = useState(obj_book);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const ReloadBookByID = async () => {
    const result = await GET_BOOK_BY_ID(book_id);
    if (result.data && Object.values(result.data).length > 0) {
      setFormData(result.data);
      if (result.data.img || result.data.image) {
        const imageUrl = result.data.img || result.data.image;
        setImagePreview(imageUrl);
      }
    } else {
      openModal({ message: <ModalResponse message={result.message} title={"No record found"} /> });
      setFormData(obj_book);
    }
  };

  useEffect(() => {
    if (book_id) {
      ReloadBookByID();
    }
  }, [book_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, or PNG)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('sinopsis', formData.sinopsis);
      formDataToSend.append('story', formData.story || '');
      formDataToSend.append('is_free', formData.is_free);

      if (formData.image instanceof File) {
        formDataToSend.append('coverImage', formData.image);
      }

      if (book_id) {
        formDataToSend.append('id', book_id);
        const result = await UPDATE_BOOK(book_id, formDataToSend);
        
        if (result.success) {
          openModal({
            message: <ModalResponse
              message="Book has been successfully updated!"
              title="Success"
            />
          });
          ReloadBook();
          setFormData(obj_book);
          setImagePreview(null);
        } else {
          setError(result.message || 'Failed to update book');
        }
      } else {
        const result = await CREATE_BOOK(formDataToSend);
        if (result.success) {
          openModal({
            message: <ModalResponse
              message="Book has been successfully created!"
              title="Success"
            />
          });
          ReloadBook();
          setFormData(obj_book);
          setImagePreview(null);
        } else {
          setError(result.message || 'Failed to create book');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='d-flex align-items-start flex-column'>
        <span className="">{book_id ? "Edit Book" : "Add New Book"}</span>
        <span className="text-secondary fs-6">
          {book_id ? "Update the details for this book." : "Fill in the details for the new book."}
        </span>
      </h3>

      <div className="row">
        <div className="col-lg-6">
          <TextInput
            title="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <TextAreaInput
            title="Sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={2}
            required
          />
          <TextAreaInput
            title="Story"
            name="story"
            value={formData.story || ''}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="col-lg-6">
          <div className="row">
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
        <div className="mt-4">
          <Alert message={error} variant='danger' />
        </div>
      )}

      <div className="mt-4 text-center">
        <Button 
          type="button" 
          variant="light" 
          className="me-2 btn-lg"
          onClick={() => openModal({ open: false })}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="btn-lg">
          {book_id ? "Update Book" : "Submit Book"}
        </Button>
      </div>
    </form>
  );
}