import React from 'react'

export default function ChooseUs() {
  return (
    <section id='chooseus' className='py-5  bg-light'>
        <div className='container'>
            <div className='mb-5'>
                <div>
                    <h2 className='fw-bold text-center'>Why Choose Us?</h2>
                    <p  className='text-center text-muted'>Your onestop destination for all things book</p>
                </div>
            </div>
            <div className='row g-4'>
                {listChoose.map((item) => (
                    <div key={item.id} className='col-md-6 col-lg-4'>
                        <Choose item={item} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

const listChoose = [
    {
        id: 1,
        title: "Vast Collection",
        description: "Acces thousands of books across all genres, from best sellers to hidden gems.",
        icon: "bi bi-collection"
    },
    {
        id: 2,
        title: "Fast Delivery",
        description: "Get your books delivered quickly and securely to your doorstep.",
        icon: "bi bi-truck"
    },
    {
        id: 3,
        title: "Best Prices",
        description: "Get the best seller deals on your favorite books without breaking the bank.",
        icon: "bi bi-percent"
    }
];

const Choose = ({item}) => {
    const {title, description, icon} = item;

    return (
        <div className='card h-100'>
            <div className='card-body text-center'>
                <div className='p-4 mb-3'>
                    <i className={`${icon} fs-1 text-primary`}></i>
                </div>
                <h5 className='fw-bold'>{title}</h5>
                <p className='text-muted'>{description}</p>
            </div>
        </div>
    )
}
