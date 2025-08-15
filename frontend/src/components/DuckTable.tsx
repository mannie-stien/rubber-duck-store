import React from "react";
import { Duck } from "../types/duck.types";
import "./DuckTable.css";

interface DuckTableProps {
  ducks: Duck[];
  onEdit: (duck: Duck) => void;
  onDelete: (id: number) => void;
}

const DuckTable: React.FC<DuckTableProps> = ({ ducks, onEdit, onDelete }) => {
  return (
    <table className="duck-table">
      <thead>
        <tr>
          <th className="th-mixed-color">ID</th>
          <th className="th-mixed-color">Color</th>
          <th className="th-mixed-color">
            Size <span>Tamaño</span>
          </th>
          <th className="th-mixed-color">
            Price <span>Precio</span>
          </th>
          <th className="th-mixed-color">
            Quantity <span>Cantidad</span>
          </th>
          <th className="th-mixed-color">
            Actions <span>Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {ducks.map((duck) => (
          <tr key={duck.id}>
            <td data-label="ID">{duck.id}</td>
            <td
              data-label="Color"
              className={`color-${duck.color.toLowerCase()}`}
            >
              {duck.color}
            </td>
            <td data-label="Size">{duck.size}</td>
            <td data-label="Price">{duck.price.toFixed(2)} USD</td>
            <td data-label="Quantity">{duck.quantity.toLocaleString()}</td>
            <td data-label="Actions" className="actions-cell">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(duck);
                }}
                className="action-link edit"
              >
                edit
              </a>
              <span className="action-separator">/</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(duck.id);
                }}
                className="action-link delete"
              >
                delete
              </a>
              <div className="actions-subtext">Editar Borrar</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DuckTable;
