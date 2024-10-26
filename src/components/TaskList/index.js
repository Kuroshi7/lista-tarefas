import React from "react";
import TaskItem from '../TaskItem/index'
import'./TaskList.css'


function TaskList({tarefas, handleEdit,handleDelete}){
    return(
        <ul className="tarefas">
        {tarefas.map((tarefa,index)=>(
            <TaskItem
                key={tarefa}
                tarefa={tarefa}
                index={index}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        ))}
    </ul>
    );
}

export default TaskList;
