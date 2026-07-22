const Alert = ({ message, variant = 'warning' }) => {
    return (
        <div
            className={`alert alert-${variant}} alert-dismissible fade show`}
            role="alert">
            {message}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close">
            </button>
        </div>
    )
}

export { Alert }
