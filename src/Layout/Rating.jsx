import React from 'react'

const Rating = ({value, text}) => {
  return (
    <div className='rating  ' style={{color:'#b27e04', fontSize:"15px"}} >
        <span>
            <i style={{fontSize:'10px'}} className={value>=1 ? 'fa-sharp fa-solid fa-star' : value>=0.5 ? 'fa-sharp fa-solid fa-star-half': 'na'} />
        </span>
        <span>
            <i style={{fontSize:'10px'}} className={value>=2 ? 'fa-sharp fa-solid fa-star' : value>=1.5 ? 'fa-sharp fa-solid fa-star-half': 'na'} />
        </span>
        <span>
            <i style={{fontSize:'10px'}} className={value>=3 ? 'fa-sharp fa-solid fa-star' : value>=2.5 ? 'fa-sharp fa-solid fa-star-half': 'na'} />
        </span>
        <span>
            <i style={{fontSize:'10px'}} className={value>=4 ? 'fa-sharp fa-solid fa-star' : value>=3.5 ? 'fa-sharp fa-solid fa-star-half': 'na'} />
        </span>
        <span>
            <i style={{fontSize:'10px'}} className={value>=5 ? 'fa-sharp fa-solid fa-star' : value>=4.5 ? 'fa-sharp fa-solid fa-star-half': 'na'} />
        </span>
        <div >{text} Reviews</div>
        <hr />
    </div>
  )
}

export default Rating