import React from "react"; 
import { Button } from "../../ui/button";

export function HeroSection() { 
  return ( 
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden bg-primary text-white" 
      style={styles.section} 
    > 
      <div className="container"> 
        <div className="row align-items-center"> 
          <div className="col-lg-6"> 
            <h1 className="display-4 fw-bold mb-4"> 
              Discover Your Next Great Read 
            </h1> 
            <p className="lead mb-4"> 
              Explore thousands of books across all genres. From bestsellers to 
              hidden gems, find your perfect book today. 
            </p> 
            <div className="d-flex gap-3"> 
              <Button className="btn btn-light btn-lg"> 
                <i className="bi bi-search me-2"></i> 
                Browse Books 
              </Button> 
              <Button className="btn btn-outline-light btn-lg"> 
                <i className="bi bi-play-circle me-2"></i> 
                Learn More 
              </Button> 
            </div> 
          </div> 
          <div className="col-lg-6 text-center mt-4 mt-lg-0"> 
            <i 
              className="bi bi-book" 
              style={{ fontSize: "15rem", opacity: 0.8 }} 
            ></i> 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
} 
 
const styles = { 
  section: { 
    minHeight: "100vh", 
    marginTop: "-70px", 
    paddingTop: "70px", 
    display: "flex",
    alignItems: "center", 
}, 
}; 