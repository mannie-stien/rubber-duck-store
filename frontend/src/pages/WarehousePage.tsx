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

  // Fetches the list of ducks.
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

  //Handlers for opening the modal.
  const handleOpenAddModal = () => {
    setEditingDuck(null); // Clear any previous duck to ensure it's an "add" form.
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (duck: Duck) => {
    setEditingDuck(duck); // Set the duck to be edited.
    setIsModalOpen(true);
  };

  
   // Handler to close modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDuck(null); 
  };

  /**
   * Handler for the form submission.
   * this is where i decide whether to call the add or update API endpoint.
   */
  const handleSaveDuck = async (duckData: CreateDuckDto | UpdateDuckDto) => {
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
      handleCloseModal();
      fetchDucks();
    } catch (err) {
      alert("Failed to save duck. Please check the console for details.");
      console.error(err);
    }
  };


  // Handler for deleting a duck.
  const handleDeleteDuck = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this duck?")) {
      try {
        await deleteDuck(id);
        fetchDucks(); // Refresh the list on successful deletion.
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

        <button className="add-button" onClick={handleOpenAddModal}>
          add duck <br />
          <span>Agregar Patito</span>
        </button>
        <hr />
        {isLoading && <p>Loading ducks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isLoading && !error && (
          <DuckTable
            ducks={ducks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteDuck}
          />
        )}

        {/* Modal for adding/editing ducks */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingDuck ? "Edit Duck" : "Add New Duck"}
        >
          <DuckForm
            onSave={handleSaveDuck}
            onCancel={handleCloseModal}
            duckToEdit={editingDuck}
          />
        </Modal>
      </div>
    </>
  );
};

export default WarehousePage;
