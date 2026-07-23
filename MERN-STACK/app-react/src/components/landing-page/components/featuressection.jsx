export function FeaturesSection() {
    return (
        <section id="books" className="py-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <h2 className="fw-bold text-center">Featured Books</h2>
                        <p className="text-center text-muted">Handpicked selections just for you.</p>
                    </div>
                </div>
                <div className="row g-4">
                    {ListBooks.map((book) => (
                        <div key={book.id} className="col-md-6 col-lg-3">
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ListBooks = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        img: "harpot.jpg",
        author: "J.K. Rowling",
        is_free: false,
        sinopsis: "Harry Potter is a wizard, and he's going to Hogwarts School of Witchcraft and Wizardry.",
        rating: 4.5,
        views: 1000
    },
    {
        id: 2,
        title: "Hunger Games",
        img: "hg.jpg",
        author: "Suzanne Collins",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 4.9,
        views: 2000
    },
    {
        id: 3,
        title: "Maze Runner",
        img: "maze.jpeg",
        author: "James Dashner",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 4.7,
        views: 500
    },
    {
        id: 4,
        title: "Divergent",
        img: "divergent.jpeg",
        author: "Veronica Roth",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 3.7,
        views: 300
    },
]

const BookCard = ({ book }) => {
  const { title, author, rating, img } = book;

  // Fungsi untuk merender bintang berdasarkan rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi bi-star${i < Math.floor(rating) ? "-fill" : ""} text-warning`}
      ></i>
    ));
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <div className="bg-light p-4 mb-3 rounded">
          {img ? (
            <img
              src={`/books-images/${img}`}
              alt={title}
              className="img-fluid"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          ) : (
            <i
              className="bi bi-book-half"
              style={{ fontSize: "4rem", color: "#6c757d" }}
            ></i>
          )}
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="text-muted small mb-2">by {author}</p>
        <div className="mb-2">
          {renderStars(rating)}
          <span className="ms-2 text-muted small">({rating})</span>
        </div>
      </div>
    </div>
  );
};