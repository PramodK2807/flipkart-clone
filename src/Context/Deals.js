// import { useEffect, useState } from "react"

// const useCategory = () => {
  

//     const [categories, setCategory] = useState([])
    
//     const getCategories = async() => {
//         let data = await fetch(`${process.env.REACT_APP_API}/category`)
//         let cat = await data.json()
//         setCategory(cat?.category)
//     }

//     useEffect(() => {
//         getCategories()
//     },[])

//     return categories

// }
// export default useCategory