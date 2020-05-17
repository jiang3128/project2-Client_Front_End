import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingOrder,startDeletingOrder} from './action';

const months = ["January","February","March","April","May",
"June","July","August", "September","September","October","November",
"December"];

//props - grab data from the parent
export function Memory(props){
    const memory = props.memory;
    const dispatch = useDispatch();
    
    const [year,setYear] = useState(memory.year);
    const [month,setMonth] = useState(memory.month);
    const [day,setDay] = useState(memory.day);
    const [message,setMessage] = useState(memory.message);

    const onEdit = () => {
        dispatch(enterEditMode(memory));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(memory));
    }

    const onSave = ()=>{
        dispatch(startSavingOrder({
            id: memory.id,
            year,
            month,
            day,
            message,
        }));
    }

    const onDelete =()=>{
        dispatch(startDeletingOrder(memory));
    }

    if(memory.isEditing){
        return(
        <div className ="memory">
            <div className="memory-left">
                <input type = "text" value={year} onChange={e =>
                setYear(parseInt(e.target.value))}/>
                <input type = "text" value={month} onChange={e =>
                setMonth(parseInt(e.target.value))}/>
                <input type = "text" value={day} onChange={e =>
                setDay(parseInt(e.target.value))}/>
                <button onClick = {onSave}>Order</button>
                <button onClick = {onCancel}>cancel</button>
                <button className ="delete-button"onClick = {onDelete}>delete</button>
            </div>
            <div className = "memory-right">
                <textarea value={message} onChange={e =>
                setMessage(e.target.value)}/>
            </div>
        </div>
        
        );
    } else{
        return(
            <div className ="memory">
                <div className="memory-left">
                    <span className = "year">{memory.year}</span>
                    <span>{months[memory.month - 1]}{memory.day}</span>
                    <div className = "choose"><button onClick={onEdit} >edit</button></div>
                </div>
                <div className = "memory-right">
                    {memory.message}
                </div>
            </div>
        );
    }
}