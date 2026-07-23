import React from 'react'

export function CategoriesSection() {
  return (
    <section id="categories" className="py-5 bg-light">
      <div className="container">
        
        <div className="row mb-5">
          <div className="col">
            <h2 className="fw-bold text-center">Browse by Category</h2>
            <p className="text-center text-muted">
              Find books in your favorite genres
            </p>
          </div>
        </div>

        <div className="row g-3">
          {genre_data.map((category, index) => (
            <div key={index} className="col-md-4 col-lg-2">
              <div className={`card text-center border-${category.color} h-100`}>
                <div className="card-body">
                  <i
                    className={`bi ${category.icon} text-${category.color}`}
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <h6 className="mt-3 mb-0">{category.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

const genre_data = [ 
    { name: "Fiction", icon: "bi-journal-text", color: "primary" }, 
    { name: "Non-Fiction", icon: "bi-newspaper", color: "success" }, 
    { name: "Science", icon: "bi-lightbulb", color: "info" }, 
    { name: "History", icon: "bi-clock-history", color: "warning" }, 
    { name: "Biography", icon: "bi-person", color: "danger" }, 
    { name: "Children", icon: "bi-balloon", color: "secondary" }, 
]; 