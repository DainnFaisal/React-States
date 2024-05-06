import React, { useState, useEffect } from 'react';
import CarData from './CarData';
import '../Stylesheets/SimpleCRUD.css'

const getDatafromLS = () => {
    const data = localStorage.getItem('Cars-list');
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
};

function SimpleCRUD() {

    const [carName, setCarName] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [company, setCompany] = useState('');
    const [cars, setCars] = useState(getDatafromLS());
    const [editMode, setEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    function handleRegister(event) {
        event.preventDefault();
        let car = {
            carName,
            model,
            color,
            company
        };

        if (editMode && selectedCar) {
            const updatedCars = cars.map(item =>
                item.id === selectedCar.id ? { ...item, ...car } : item
            );
            setCars(updatedCars);
            setEditMode(false);
            setSelectedCar(null);
        } else {
            setCars([...cars, { ...car, id: Date.now() }]);
        }

        // Clearing input fields after registration or editing
        setCarName('');
        setModel('');
        setColor('');
        setCompany('');
    }

    const handleEdit = id => {
        const carToEdit = cars.find(car => car.id === id);
        if (carToEdit) {
            setCarName(carToEdit.carName);
            setModel(carToEdit.model);
            setColor(carToEdit.color);
            setCompany(carToEdit.company);
            setEditMode(true);
            setSelectedCar(carToEdit);
        }
    };

    const handleDelete = id => {
        const filteredCars = cars.filter(element => element.id !== id);
        setCars(filteredCars);
    };

    useEffect(() => {
        localStorage.setItem('Cars-list', JSON.stringify(cars));
    }, [cars]);

    return (
        <>
            <div className='container'>
                <div className='create-new-car-form'>
                    <form onSubmit={handleRegister}>
                        <br />
                        <h4 className='create-heading'>
                            {editMode ? 'Edit Car:' : 'Create Car:'}
                        </h4>
                        <br />
                        <input
                            type='text'
                            placeholder='Car Name:'
                            value={carName}
                            onChange={e => setCarName(e.target.value)}
                            className='input-fields'
                        />
                        <br />
                        <br />
                        <input
                            type='number'
                            placeholder='Car Model:'
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            className='input-fields'
                        />
                        <br />
                        <br />
                        <input
                            type='text'
                            placeholder='Car Color:'
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            className='input-fields'
                        />
                        <br />
                        <br />
                        <input
                            type='text'
                            placeholder='Company:'
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            className='input-fields'
                        />
                        <br />
                        <br />
                        <button className='Register-btn'>
                            {editMode ? 'Update' : 'Register'}
                        </button>
                        <br />
                        <br />
                    </form>
                </div>
            </div>

            <h4 className='list-heading'>Cars List:</h4>
            <br />
            <div className='Car-list-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Car Name:</th>
                            <th>Car Model:</th>
                            <th>Car Color:</th>
                            <th>Company:</th>
                            <th>Action:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CarData
                            cars={cars}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SimpleCRUD;
