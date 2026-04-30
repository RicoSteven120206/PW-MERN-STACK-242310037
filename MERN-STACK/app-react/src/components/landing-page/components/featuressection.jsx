import React from 'react'
import ListBook from "../../../constants/list_books";
import BookCard from "./bookcard";

export default function FeaturesSection() {
  return (
    <section id="books" className="py-5">
        <div className="container">
            <div className="row mb-5">
                <div className="col">
                    <h2 className="fw-bold text-center">Featured Books</h2>
                    <p className="text-center text-muted">Handpicked selections just for you</p>
                </div>
            </div>
            <div className="row g-4">
                {ListBook.map((book) => (
                    <div key={book.id} className="col-md-6 col-lg-3">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
