import React from "react";
import TaskItem from '../TaskItem';

import './TaskList.css';

function TaskList({ tarefas, handleEdit, handleDelete }) {
    return (
        <ul className="tarefas">
            {tarefas.map((tarefa, index) => (
                <TaskItem
                    key={`${tarefa}-${index}`}
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
