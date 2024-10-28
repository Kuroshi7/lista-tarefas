import React, { useState, useEffect } from "react";
import Form from './Form';
import TaskList from './TaskList';
import './Main.css';

function Main() {
    const [novaTarefa, setNovaTarefa] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [index, setIndex] = useState(-1);

    // Carrega as tarefas salvas ao montar o componente
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
        if (tarefasSalvas && Array.isArray(tarefasSalvas)) {
            setTarefas(tarefasSalvas);
        }
    }, []);

    // Atualiza o localStorage com as tarefas quando elas mudam
    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        } else {
            localStorage.removeItem('tarefas');
        }
    }, [tarefas]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const novaTarefaTrimmed = novaTarefa.trim();

        if (novaTarefaTrimmed === '' || tarefas.includes(novaTarefaTrimmed)) return;

        const novasTarefas = [...tarefas];

        if (index === -1) {
            setTarefas([...novasTarefas, novaTarefaTrimmed]);
            setNovaTarefa('');
        } else {
            novasTarefas[index] = novaTarefaTrimmed;
            setTarefas(novasTarefas);
            setIndex(-1);
            setNovaTarefa('');
        }
    };

    const handleChange = (ev) => {
        setNovaTarefa(ev.target.value);
    };

    const handleEdit = (index) => {
        setIndex(index);
        setNovaTarefa(tarefas[index]);
    };

    const handleDelete = (index) => {
        const novasTarefas = tarefas.filter((_, i) => i !== index);
        setTarefas(novasTarefas);
    };

    return (
        <div className="main">
            <h1>Lista de Tarefas</h1>
            <Form
                novaTarefa={novaTarefa}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <TaskList
                tarefas={tarefas}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default Main;
