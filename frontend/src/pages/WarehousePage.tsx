import React, { useState, useEffect } from "react";
import { getDucks, deleteDuck, addDuck, updateDuck } from "../api/duckService";
import { Duck, CreateDuckDto, UpdateDuckDto } from "../types/duck.types";
import Header from "../components/Header";
import DuckTable from "../components/DuckTable";
import Modal from "../components/Modal";
import DuckForm from "../components/DuckForm";

const WarehousePage: React.FC = () => {
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingDuck, setEditingDuck] = useState<Duck | null>(null);

  const fetchDucks = async () => {
    try {
      setIsLoading(true);
      const response = await getDucks();
      setDucks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch ducks. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDucks();
  }, []);

  const openAddModal = () => {
    setEditingDuck(null);
    setIsModalOpen(true);
  };

  const openEditModal = (duck: Duck) => {
    setEditingDuck(duck);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDuck(null); 
  };

  const saveDuck = async (duckData: CreateDuckDto | UpdateDuckDto) => {
    try {
      if (editingDuck) {
        const updatePayload: UpdateDuckDto = {
          price: (duckData as Duck).price,
          quantity: (duckData as Duck).quantity,
        };
        await updateDuck(editingDuck.id, updatePayload);
      } else {
        await addDuck(duckData as CreateDuckDto);
      }
      closeModal();
      fetchDucks();
    } catch (err) {
      alert("Failed to save duck. Please check the console for details.");
      console.error(err);
    }
  };


  const handleDeleteDuck = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this duck?")) {
      try {
        await deleteDuck(id);
        fetchDucks(); 
      } catch (err) {
        alert("Failed to delete duck.");
        console.error(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>Almacen de Patitos</h1>
        <h2>Duck Warehouse</h2>

        <button className="add-button" onClick={openAddModal}>
          add duck <br />
          <span>Agregar Patito</span>
        </button>
        <hr />
        {isLoading && <p>Loading ducks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isLoading && !error && (
          <DuckTable
            ducks={ducks}
            onEdit={openEditModal}
            onDelete={handleDeleteDuck}
          />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingDuck ? "Edit Duck" : "Add New Duck"}
        >
          <DuckForm
            onSave={saveDuck}
            onCancel={closeModal}
            duckToEdit={editingDuck}
          />
        </Modal>
      </div>
    </>
  );
};

export default WarehousePage;
