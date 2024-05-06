import React, { useState, useEffect } from 'react';
import '../Stylesheets/ManualCRUD.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ManualCRUD() {
    const CarCompany = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla'];

    const CompanyModel = {
        Toyota: ['Corolla', 'Camry', 'RAV4'],
        Honda: ['Civic', 'Accord', 'CR-V'],
        Ford: ['F-150', 'Mustang', 'Escape'],
        Chevrolet: ['Silverado', 'Camaro', 'Equinox'],
        Tesla: ['Model X', 'Model S', 'Model 3']
    };

    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [color, setColor] = useState('');
    const [carData, setCarData] = useState([]);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);     

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('carData')) || [];
        setCarData(data);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        if (!selectedCompany || !selectedModel || !color) {
            return;
        }
        

        if (editingIndex !== null) {
            const updatedData = [...carData];
            updatedData[editingIndex] = { selectedCompany, selectedModel, color };

            localStorage.setItem('carData', JSON.stringify(updatedData));
            setCarData(updatedData);

            setEditingIndex(null); 

        } else {

            const newData = { selectedCompany, selectedModel, color };
            const updatedCarData = [...carData, newData];
            localStorage.setItem('carData', JSON.stringify(updatedCarData));
            setCarData(updatedCarData);
        }

        // Reset form values after submission
        setSelectedCompany('');
        setSelectedModel('');
        setColor('');
        setSubmitAttempted(false);
    };

    // delete function
    const handleDelete = (indexToDelete) => {
        const filteredData = carData.filter((_, index) => index !== indexToDelete);
        localStorage.setItem('carData', JSON.stringify(filteredData));
        setCarData(filteredData);
    };


    // edit function 
    const handleEdit = (indexToEdit) => 
    {
        const itemToEdit = carData[indexToEdit];

        setSelectedCompany(itemToEdit.selectedCompany);

        setSelectedModel(itemToEdit.selectedModel);
        setColor(itemToEdit.color);

        setEditingIndex(indexToEdit);
    };

    
    return (
        <>
            <div className='container'>
                <div className='create-new-car-form'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='create-heading'>Register a Car:</h4>

                        <label className='form-labels'><b>Car Company:</b></label>
                        <br />
                        <select className='drop-down' value={selectedCompany} onChange={(e) => {
                            setSelectedCompany(e.target.value);
                            setSelectedModel('');                                     // Reset model selection when company changes
                        }}>
                            <option value="">Select a Company</option>
                            {CarCompany.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>
                        <br />
                        {submitAttempted && !selectedCompany && <div className="validation-message">This field is required!</div>}

                        <br />
                        <label className='form-labels'><b>Car Model:</b></label>
                        <br />
                        <select className='drop-down2' value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedCompany}>
                            <option value="">Select a Model</option>
                            {selectedCompany && CompanyModel[selectedCompany].map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        <br />
                        {submitAttempted && !selectedModel && <div className="validation-message">This field is required!</div>}

                        <br />
                        <label className='form-labels'><b>Color:</b></label>
                        <br />
                        <input className='input-fields' type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                        <br />
                        {submitAttempted && !color && <div className="validation-message">This field is required!</div>}

                        <br />
                        <button className='Register-btn' type="submit">{editingIndex !== null ? 'Update' : 'Submit'}</button>
                        <br />
                    </form>
                </div>
            </div>

            <h4 className='list-heading'>Cars List:</h4>
            <div className='Car-list-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Car Company:</th>
                            <th>Car Model:</th>
                            <th>Color:</th>
                            <th>Action:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.selectedCompany}</td>
                                <td>{data.selectedModel}</td>
                                <td>{data.color}</td>
                                <td>
                                    <button className='Delete-btn' onClick={() => handleDelete(index)}>
                                        <DeleteIcon />
                                    </button>
                                    <button className='Update-btn' onClick={() => handleEdit(index)}>
                                        <EditIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManualCRUD;
