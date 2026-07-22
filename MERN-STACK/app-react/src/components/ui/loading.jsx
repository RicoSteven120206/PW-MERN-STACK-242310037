const Skeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </div>
            </div>
        </div>
    )
}

const Spinners = ({varian="primary"}) => {
    return (
        <div className={`spinner-border text-${varian}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export { Skeleton, Spinners }