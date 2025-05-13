const InputField = ({ name, type = 'text', label, required=true, placeholder = '', value='', onChange, error, ...rest }) => {

    return (
        <div className="mb-4 flex flex-col">
            <label htmlFor={name} className="text-gray-800 mb-2">{required && <span className="text-red-500">*</span>}{ label }</label>
            <input value={value} onChange={onChange} className="p-2 border-2 border-gray-100 rounded-md" type={type} placeholder={placeholder} id={name} name={name} {...rest} />
            {error && <span className="text-red-500">{ error }</span>}
        </div>
    )
}

export default InputField