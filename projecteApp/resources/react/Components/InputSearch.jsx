export const InputSearch = ({placeholder, value, handleChange, name})=> {

    return (
        <input className="p-1 border rounded-md bg-grey border-blue1" placeholder={placeholder} value={value} onChange={(event) => handleChange(event.target.value, event.target.name)} name={name}></input>
    );
}