import React from "react";
import  {FaEdit, FaWindowClose} from 'react-icons/fa';


function TaskItem({tarefa,index,handleEdit,handleDelete}){
    return(
        <li>
        {tarefa}
        <span>
            <FaEdit
                onClick={()=> handleEdit(index)} className="edit" />
            <FaWindowClose
                onClick={()=>handleDelete(index)} className="delete"/>
        </span>
    </li>
    )
}
export default TaskItem
