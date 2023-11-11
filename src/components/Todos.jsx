import React, { useEffect, useState } from 'react'

function Todos() {
  const [todos,setTodos] = useState([]);
  const [isEditOpen,setIsEditOpen] = useState(false);
  const [editId,setEditId] = useState(0);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  useEffect(()=>{
    fetch('http://localhost:3000/todos').then(responce => {
        if(!responce.ok){
            throw new Error('failed');
        }
        return responce.json();
    }).then(result => {
        const todo = Object.keys(result).map(key => result[key]);
        console.log(todo + "from frontend");
        setTodos(todo);
    }).catch(err => {
        console.log(err);
    }).finally("updated successfully");
  })
  return (
      <div>{todos.map(item => {
        return (
            <div>
                <h1>Title : {item.title}</h1>
                <div style={{display:"inline"}}>Description : {item.description}</div>
                <button style={{marginLeft:"10px"}} id={item._id} onClick={()=>{
                    fetch(`http://localhost:3000/removeTodo/${item._id}`,{
                        method: 'DELETE',
                        headers : {
                          'Content-Type':'application/json'
                        }
                    })
                }}>Delete</button>
                <button style={{marginLeft:"10px"}} id={item._id} onClick={()=>{
                    setEditId(item._id);
                    setIsEditOpen(true);
                }}>Edit</button>
            </div>
        )
    })}
     {isEditOpen && <div>
      <br />
        <label htmlFor="todoTitle">Title : </label>
        <input  type="text" id="todoTitle" onChange={(e)=>{setTitle(e.target.value)}}/>
        <br />
        <label htmlFor="todoDesc">Description : </label>
        <input  type="text" id="todoDesc" onChange={(e)=>{setDescription(e.target.value)}}/>
        <br />
        <button onClick={()=>{
          fetch(`http://localhost:3000/todo/${editId}`,{
            method: 'PUT',
            headers : {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    "todo" :{
                      "title" : title,
                      "description" : description
                    }
                  })
          }).then(responce => {
            if(!responce.ok){
              console.log("error identified");
              return;
            }
            return responce.json();
          }).then(err => {
            if(err){console.log("error")}
          })
          setIsEditOpen(false)}}>
         Edit
        </button>
      </div>}
     </div>
  )
}

export default Todos