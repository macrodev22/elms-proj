const TextField = ({ placeholder, name, label, required=true, value='', onChange, ...rest }) => {

    return (
        <div className="flex flex-col">
                <label htmlFor={name} className="mb-2">{required && <span className="text-red-500">*</span>}{label || 'Label'}</label>
                <textarea className="border-1 p-2 rounded-md text-gray-800 border-gray-200 focus:outline-1 focus:outline-blue-300" 
                value={value} onChange={onChange} placeholder={placeholder} id={name} name={name} {...rest} ></textarea>
        </div>
    )
}

export default TextField