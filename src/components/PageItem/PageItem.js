import React from 'react'
import './PageItem.css'

function PageItem(props){
    
    return(
        <div className="pageItem"
        onClick={props.pageChangedClickHandler}>{props.pageNo}</div>
    )
}

export default PageItem