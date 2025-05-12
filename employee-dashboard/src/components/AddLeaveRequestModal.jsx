import Modal from "./Modal"


const AddLeaveRequestModal = (props) => {

    const { show, onClose, title } = props

    return (
        <Modal show={show} onClose={onClose} title={title} >
            <form method="post">
                <div className="flex flex-col">
                    <label htmlFor="type">Leave type</label>
                    <select name="type">
                        <option>Annual leave</option>
                    </select>
                </div>
            </form>
        </Modal>
    )
}

export default AddLeaveRequestModal