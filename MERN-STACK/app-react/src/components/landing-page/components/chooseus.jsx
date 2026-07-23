import { title } from "process"

export function ChooseUs() {
    return (
        <section id="choose" className="py-5 bg-light">
            <div className="container">
                <div className="mb-5">
                    <div>
                        <h2 className="fw-bold text-center">Why Choose Us?</h2>
                        <p className="text-center text-muted">Your onestop destination for all things book</p>
                    </div>
                </div>
                <div className="row g-4">
                    {ListChoose.map((item) => (
                        <div key = {item.id} className="col-md-6 col-lg-4">
                            <Choose item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ListChoose = [
    {
        id: 1,
        title: "Vast Collection",
        description: "Access over 100.000 books accross all genres and categories.",
        icon: "bi bi-collection"
    },
    {
        id: 2,
        title: "Fast Delivery",
        description: "Get your books delivered to your doorstep within 2-3 days.",
        icon: "bi bi-truck"
    },
    {
        id: 3,
        title: "Best Prices",
        description: "Access over 100.000 books accross all genres and categories.",
        icon: "bi bi-percent"
    },
]

const Choose = ({ item }) => {
  const { title, description, icon } = item;

  return (
    <div className="card h-100">
        <div className="card-body text-center">
            <div className="p-4 mb-3">
                <i className={`${icon} fs-1 text-primary`}></i>
            </div>
            <h5 className="fw-bold">{title}</h5>
            <p className="text-muted">{description}</p>
        </div>
    </div>
  );
};