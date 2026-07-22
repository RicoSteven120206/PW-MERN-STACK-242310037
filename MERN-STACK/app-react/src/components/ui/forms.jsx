const ALLOWED_PATTERN = /^[a-zA-Z0-9\s.,!?@#$%&*()\-_+=:;"'<>\/\[\]{}|\\~`]*$/;

const validateInput = (value) => {
    return ALLOWED_PATTERN.test(value);
};

const sanitizeInput = (value) => {
    return value.replace(/[^a-zA-Z0-9\s.,!?@#$%&*()\-_+=:;"'<>\/\[\]{}|\\~`]/g, '');
};

const LableTitle = ({ title, required }) => {
    return (
        <label
            className={`form-label fw-semibold ${required && 'required'}`}>
            {title}
        </label>
    )
}

const TextInput = ({ title, required, ...props }) => {
    return (
        <div className="form-group mb-3">
            {title && (
                <LableTitle title={title} required={required} />
            )}
            <input
                type="text"
                required={required}
                className="form-control" {...props} />
        </div>
    )
}

const TextAreaInput = ({ title, required, ...props }) => {
    return (
        <div className="form-group mb-3">
            {title && (
                <LableTitle title={title} required={required} />
            )}
            <textarea
                required={required}
                className="form-control"
                {...props}></textarea>
            </div>
    )
}

const InputCheckbox = ({ title, value, required, is_switch = false, ...props }) => {
    return (
        <div className="form-group">
            {title && (
                <LableTitle title={title} required={required} />
            )}
            <div className={`"form-check ${is_switch ? 'form-switch' : ''}`}>
                <input
                    type="checkbox"
                    className="form-check-input"
                    {...props}
                />
                <label className="form-check-label ms-1">
                    {value}
                </label>
            </div>
        </div>
    )
}

const InputImage = ({ title, imagePreview, required, ...props }) => {
    return (
        <div className="form-group mb-3">
            {title && (
                <LableTitle title={title} required={required} />
            )}
            <input
                type="file"
                className="form-control"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                required={required}
                {...props}
            />
            {imagePreview && (
                <div className="mt-3">
                    <img
                        src={imagePreview}
                        alt="Cover Preview"
                        style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
                        className="img-thumbnail"
                    />
                </div>
            )}
        </div>
    )
}

export { validateInput, sanitizeInput, TextInput, TextAreaInput, InputCheckbox, InputImage }
