
const InputNumber = ({ label, newAttribute, setNewAttribute}) => {
    const changeHandler = (event) => setNewAttribute(event.target.value);
    return (
        <div>
             {label}: <input
             value={newAttribute}
             onChange={changeHandler} />
        </div>
    );
};

export default InputNumber;