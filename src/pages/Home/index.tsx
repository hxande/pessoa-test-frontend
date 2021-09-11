import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';

interface Item {
    id: number;
    name: string;
    age: number;
    sex: string;
}

const Home = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get('people').then(response => {
            setItems(response.data);
        });
    }, []);

    async function handleDeletePerson(id: number) {
        await api.delete(`people/${id}`);
        alert('Pessoa excluída!');
        api.get('people').then(response => {
            setItems(response.data);
        });
    }

    return (
        <div id='page-home'>
            <div className='content'>
                <main>
                    <h1>APP - Cadastro de Pessoa</h1>

                    <Link to='/create-person/0'>
                        <strong>
                            Cadastre uma Pessoa
                        </strong>
                    </Link>
                </main>
            </div>

            <div className='content'>
                <fieldset>
                    <legend>
                        <h2>Pessoas Cadastradas</h2>
                    </legend>
                    <div className='items-grid'>
                        {items.map(item => (
                            <div
                                key={item.id}
                            >
                                <span>{item.name}</span>
                                <span>{item.sex}</span>
                                <span>{item.age}</span>
                                <Link to={{ pathname: `/create-person/${item.id}` }}>
                                    <button><FaEdit /></button>
                                </Link>
                                <button
                                    onClick={() => handleDeletePerson(item.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>

        </div>
    );
}

export default Home;