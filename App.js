import logo from './logo.svg';
import React,{useEffect, useState} from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);//false-todopage  true-completed page
  const [allTodos,setTodos]=useState([]);//todos stores in an array
  const [NewTitle,setNewTitle] = useState("");
  const [NewDescription,setNewDescription] = useState("");
  const [completedTodo,setCompletedTodos] = useState([]);
  const [currentEdit,setCurrentEdit] = useState("");

  const handleaddTodo = ()=>{
    let newTodoItem={
      title:NewTitle,
      description:NewDescription,
    }
    let updatedTodoArr =[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo =(index)=>
  {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
  const handleComplete = (index)=>
  {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();

    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn

    }

    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo = index=>
  {
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodo',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
  useEffect(()=>
  {
let savedTodo = JSON.parse(localStorage.getItem('todolist'))
let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
if(savedTodo)
{
  setTodos(savedTodo);
}
if(savedCompletedTodo)
{
  setCompletedTodos(savedCompletedTodo);
}
  },[]
  );

  const handleEdit = (index,item)=>{
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>
  {

  }

  const handleUpdateDescription = (value)=>
    {
      
    }
  return (
    
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={NewTitle} onChange ={(e)=>setNewTitle(e.target.value)}  placeholder = "अपना कार्य दर्ज करें"/>
          </div>
          <div className='todo-input-item'>
            <label id='desc'>Description</label>
            <input type="text" value={NewDescription} onChange ={(e)=>setNewDescription(e.target.value)} placeholder = "अपने कार्य का विवरण दर्ज करें"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleaddTodo} className='primarybutton' > Add+</button>
          </div>
        </div>
        <div className='btn-area'>
          <button type='button' className={`secondarybutton ${isCompleteScreen===false && 'active'}`}onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button type='button' className={`secondarybutton ${isCompleteScreen===true && 'active'}`}onClick={()=>setIsCompleteScreen(true)}>Completed</button>  
        </div>
        <div className='todo-list'>
         {isCompleteScreen===false && allTodos.map((item,index)=>{
          if(currentEdit===index)
            {
              <div className='edit-wrapper'>
                <input placeholder='updated title' onChange={(e)=>handleUpdateTitle(e.target.value)} 
                value={currentEditedItem.title}></input>
                <textarea placeholder='updated description' onChange={(e)=>handleUpdateTitle(e.target.value)}
                value={currentEditedItem.description}></textarea>
              </div>
            } 
            else{
          return(
            <div className = 'todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
              <FaRegCheckCircle className='check-icon' onClick={()=>handleComplete(index)}/>
              <AiOutlineEdit className='edit-icon' onClick={()=>handleEdit(index,item)}
              title='edit'></AiOutlineEdit>
            </div>
          </div>
          )
        }
         })}
         <div className='todo-list'>
         {isCompleteScreen===true && completedTodo.map((item,index)=>{
          return(
            <div className = 'todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed On:{item.completedOn}</small></p>
            </div>
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='delete'/>
              
            </div>
          </div>
          )
         })}
        </div>
        </div>
    </div>
    </div>
  );
}

export default App;
