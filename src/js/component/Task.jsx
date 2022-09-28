import React from "react";

export const Task = (props) => {
    return(
        <div className="tarea">
            <p>
               {props.task.label} 
            </p>
            
            <button
                onClick={(event) => {
                    let borraone = props.tasks.filter((task,index) => index !== props.id) 
                    props.putadddelete(borraone)
                }} 
                ><i className="fa-solid fa-xmark text-white"></i></button>
        </div>
    )
}