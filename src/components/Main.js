import React,{Component} from "react";
import'./Main.css'

//form
import  {FaPlus} from 'react-icons/fa';
//tarefas
import  {FaEdit, FaWindowClose} from 'react-icons/fa';


export default class Main extends Component{
    state={
        novaTarefa: '',
        tarefas:[],
        index: -1,
    };

    componentDidMount(){
        const tarefas = JSON.parse(localStorage.getItem('tarefas'))
        if(!tarefas) return;

        this.setState({tarefas})

    }

    componentDidUpdate(prevProps,prevState){
        const {tarefas} = this.state
        if(tarefas === prevState.tarefas) return;

        localStorage.setItem('tarefas',JSON.stringify(tarefas))
    }

    handleSubmit = (ev)=>{
        ev.preventDefault();
        const {tarefas, index} = this.state
        let {novaTarefa} = this.state
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        if(index === -1){
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: ''
            });
        } else{

            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
            })
        }


    }

    handleChange = (ev)=>{
        this.setState({
            novaTarefa: ev.target.value,
        })
    }

    handleEdit = (ev, index) =>{
        const {tarefas} = this.state;

        this.setState({
            index,
            novaTarefa: tarefas[index],
        });

    }

    handleDelete = (ev, index) =>{
        const {tarefas} = this.state
        const novasTarefas = [...tarefas]
        novasTarefas.splice(index,1)

        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    render(){
        const {novaTarefa, tarefas} = this.state

        return(
            <div className="main">
                <h1>Lista de Tarefas</h1>

                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <input onChange={this.handleChange}
                    type="text"
                    value={novaTarefa}
                    />
                    <button type="submit">
                        <FaPlus/>
                    </button>
                </form>

            <ul className="tarefas">
                {tarefas.map((tarefa,index)=>(
                    <li key={tarefa}>
                        {tarefa}
                        <span>
                            <FaEdit
                            onClick={(ev)=>this.handleEdit(ev,index)}
                            className="edit"
                            />

                            <FaWindowClose
                            onClick={(ev)=>this.handleDelete(ev,index)}
                            className="delete"
                            />

                        </span>
                    </li>
                ))}
            </ul>

            </div>
        );
    }
}
