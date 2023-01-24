import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
    firstName: Joi.string().required(),
    age: Joi.number().required(),
});

const backendUrl = process.env.REACT_APP_BACKEND

function App(){
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: joiResolver(schema),
        mode: 'all'
    });
    const [users, setUser] = useState([]);

    const onSubmit = async data => {
        axios.post(`${backendUrl}/users`, {
            firstName: data.firstName,
            age: data.age
        })
            .then(function (response){
                console.log(response);
            })
            .catch(function (error){
                console.log(error);
            });
        reset();
    };

    useEffect(() => {
        axios.get(`${backendUrl}/users`).then(value => setUser(value.data))
    }, [users])


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label
                    style={errors.firstName ? { color: 'red' } : { color: 'black' }}>
                    {'Please enter your first name'}
                </label>
                <br/>
                <input type={'text'} placeholder={'enter your first name'}
                       {...register('firstName', { required: '*' })}
                />
                <br/>
                <label style={errors.age ? { color: 'red' } : { color: 'black' }}>
                    {'Please enter your age'}
                </label>
                <br/>
                <input type={'number'} placeholder={'enter your age'}
                       {...register('age', { required: '*' })}
                />
                <br/>
                <br/>
                <input type="submit"/>
            </form>
            <hr/>
            <h1>Users:</h1>
            {users?.length
                ? users.map(value => <div key={value._id}>{value.firstName} - {value.age} </div>)
                : <h2>empty</h2>}
        </div>
    );
}

export default App;
