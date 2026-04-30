import React from "react";
import UserTestimonials from "../../../constants/list_testimon";

export default function TestimonSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h2 className="fw-bold text-center">What Our Readers Say</h2>
            <p className="text-center text-muted">
              Join thousands of satisfied book lovers
            </p>
          </div>
        </div>
        <div className="row g-4">
          {UserTestimonials.map((testimonial, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < testimonial.rating ? "-fill" : ""} text-warning`}
                      ></i>
                    ))}
                  </div>
                  <p className="card-text mb-3">{testimonial.review}</p>
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary rounded-circle d-flex align-itemscenter justify-content-center"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i
                        className="bi bi-person-fill text-white"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted">Verified Buyer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
