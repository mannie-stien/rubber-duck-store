import React, { useState, useEffect } from 'react';
import { Duck, DuckColor, DuckSize, CreateDuckDto, UpdateDuckDto } from '../types/duck.types';
import './DuckForm.css';

const COLORS: DuckColor[] = ['Red', 'Green', 'Yellow', 'Black'];
const SIZES: DuckSize[] = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'];

interface DuckFormProps {
  duckToEdit?: Duck | null;
  onSave: (duckData: CreateDuckDto | UpdateDuckDto) => void;
  onCancel: () => void;
}

const DuckForm: React.FC<DuckFormProps> = ({ duckToEdit, onSave, onCancel }) => {
  const isEditMode = !!duckToEdit;

  // Initialize the state the form
  const [formData, setFormData] = useState({
    color: duckToEdit?.color || COLORS[0],
    size: duckToEdit?.size || SIZES[0],
    price: duckToEdit?.price || 0,
    quantity: duckToEdit?.quantity || 1,
  });

  // if the duck to edit changes, I will update the form data
  useEffect(() => {
    if (duckToEdit) {
      setFormData({
        color: duckToEdit.color,
        size: duckToEdit.size,
        price: duckToEdit.price,
        quantity: duckToEdit.quantity,
      });
    }
  }, [duckToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Converting price and quantity to numbers
    const processedValue = name === 'price' || name === 'quantity' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="duck-form">
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <select 
          id="color" 
          name="color" 
          value={formData.color} 
          onChange={handleChange} 
          disabled={isEditMode}
        >
          {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="size">Size</label>
        <select 
          id="size" 
          name="size" 
          value={formData.size} 
          onChange={handleChange} 
          disabled={isEditMode}
        >
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price (USD)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min={isEditMode ? "0" : "1"} // will not add a new duck with 0 quantity
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default DuckForm;