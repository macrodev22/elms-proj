
const DropDown = ({ name, options, required=true, value='', onChange, label='Leave type', disabled=false, error=null }) => {


    return (
        <div className="flex flex-col mb-4">
                    <label htmlFor={name} className="mb-2 text-gray-800">{required && <span className="text-red-500">*</span>}{label}</label>
                    <select name={name} id={name} className="p-2 border-2 rounded-md border-gray-100" value={value} onChange={onChange} disabled={disabled} >
                        <option value="" disabled>--Select</option>
                        { options && options.map(o => <option value={o.value} key={o.value}>{o.label}</option>) }
                    </select>
                    {error && <span className="text-red-500">{ error }</span>}
                </div>
    )
}

export default DropDown