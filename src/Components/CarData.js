import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../Stylesheets/CarData.css';

const CarData = ({ cars, handleDelete, handleEdit }) => {
    return cars.map(car => (
        <tr key={car.id}>
            <td>{car.carName}</td>
            <td>{car.model}</td>
            <td>{car.color}</td>
            <td>{car.company}</td>
            <td>
                <div className='d-flex flex-row mb-3'>
                    <div className='p-2'>
                        <button
                            className='Delete-btn'
                            onClick={() => handleDelete(car.id)}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                    <div className='p-2'>
                        <button
                            className='Update-btn'
                            onClick={() => handleEdit(car.id)}
                        >
                            <EditIcon />
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    ));
};

export default CarData;
