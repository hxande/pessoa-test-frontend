import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import api from '../../services/api';

const CreatePerson = () => {
    const [selectedSex, setSelectedSex] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sex: '',
        address: {
            cep: '',
            street: '',
            city: '',
            state: ''
        }
    });

    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        async function loadPerson() {
            if (+id !== 0) {
                const response = await api.get(`people/${id}`);
                setFormData({
                    name: response.data.name,
                    age: response.data.age,
                    sex: response.data.sex,
                    address: {
                        cep: response.data.address.cep,
                        street: response.data.address.street,
                        city: response.data.address.city,
                        state: response.data.address.state
                    }
                });
                setSelectedSex(response.data.sex);
            }
        }

        loadPerson();
    }, []);

    useEffect(() => {
        if (formData.address.cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${formData.address.cep}/json/`)
                .then(response => {
                    setFormData({
                        ...formData, address: {
                            cep: response.data.cep,
                            street: response.data.logradouro,
                            city: response.data.localidade,
                            state: response.data.uf
                        }
                    });
                });
        }
    }, [formData.address.cep]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleInputChangeAddress(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, address: { ...formData.address, [name]: value } });
    }

    function handleSelectSex(event: ChangeEvent<HTMLSelectElement>) {
        const sex = event.target.value;
        setSelectedSex(event.target.value);
        setFormData({ ...formData, sex: sex });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (+id === 0) {
            await api.post('people', formData);
            alert('Pessoa criada!');
        } else {
            await api.put(`people/${id}`, formData);
            alert('Pessoa atualizada!');
        }
        history.push('/');
    }

    return (
        <div id='page-create-person'>
            <form onSubmit={handleSubmit}>
                <h1>CADASTRO</h1>
                <fieldset>
                    <legend>
                        <h2>Dados da Pessoa</h2>
                    </legend>
                    <div className='field'>
                        <label htmlFor='name'>Nome da pessoa</label>
                        <input
                            value={formData.name}
                            type='text'
                            name='name'
                            id='name'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='field-group'>
                        <div className='field'>
                            <label htmlFor='age'>Idade</label>
                            <input
                                value={formData.age}
                                type='number'
                                name='age'
                                id='age'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='sex'>Sexo</label>
                            <select name='sex' id='sex' value={selectedSex} onChange={handleSelectSex}>
                                <option value=''>Selecione</option>
                                <option value='F'>Feminino</option>
                                <option value='M'>Masculino</option>
                                <option value='O'>Outro</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>
                    <div className='field-group'>
                        <div className='field'>
                            <label htmlFor='cep'>CEP</label>
                            <input
                                value={formData.address.cep}
                                type='text'
                                name='cep'
                                id='cep'
                                onChange={handleInputChangeAddress}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='street'>Rua</label>
                            <input
                                value={formData.address.street}
                                type='text'
                                name='street'
                                id='street'
                                onChange={handleInputChangeAddress}
                            />
                        </div>
                    </div>
                    <div className='field-group'>
                        <div className='field'>
                            <label htmlFor='city'>Cidade</label>
                            <input
                                value={formData.address.city}
                                type='text'
                                name='city'
                                id='city'
                                onChange={handleInputChangeAddress}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='state'>Estado</label>
                            <input
                                value={formData.address.state}
                                type='text'
                                name='state'
                                id='state'
                                onChange={handleInputChangeAddress}
                            />
                        </div>
                    </div>
                </fieldset>
                <button type='submit'>
                    Cadastrar Pessoa
                </button>
            </form>
        </div>
    );
}

export default CreatePerson;