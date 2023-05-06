import React from "react";

const Items = (props)=> {
    let {title, description, imageUrl, newsUrl} = props;
    return (
      <>
        <div className="card my-3" >
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div style={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            position: 'absolute',  
            right: '0'
          }} >
            <span className="badge rounded-pill bg-danger" >{props.source}</span>
           </div>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-primary">By {props.author} on {new Date(props.date).toGMTString()}</small></p>

            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>

          </div>
        </div>
      </>
    );
  }

export default Items;
