import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/Search";


const Searc = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const data = await fetch(`${process.env.REACT_APP_API}/search/${values.keyword}`)
            let result = await data.json()
            setValues({...values, results:result})
            navigate('/search')
        } 
        catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e)=> setValues({...values, keyword:e.target.value})}        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default Searc