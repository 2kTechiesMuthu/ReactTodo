import React, { useState } from "react";

function AddTodos(){
    let [title,setTitle] = useState("");
    let [description,setDescription] = useState("");
   return (
    <div>
        <label htmlFor="todoTitle">Title : </label>
        <input onChange={(e)=>{setTitle(e.target.value)}} type="text" id="todoTitle"/>
        <label htmlFor="todoDesc">Description : </label>
        <input onChange={(e)=>{setDescription(e.target.value)}} type="text" id="todoDesc"/>
        <button onClick={()=>{
            fetch("http://localhost:3000/todo",{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({"todo" : {"title":title,"description" : description}})
            })
        }}>Add Todo</button>
    </div>
   );
}

export default AddTodos;