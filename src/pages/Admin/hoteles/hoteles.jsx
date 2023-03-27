import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import DataTable from "react-data-table-component";
import axios from "axios";
import MyNavbar from "../../../components/navbar/Navbar";
import Modal from "react-modal";
import HotelForm from "./hotelForm.jsx";
import NewHotel from "./newHotel.jsx";

import swal from "sweetalert";
import { Button } from "react-bootstrap";

Modal.setAppElement('#root');


const Hoteles = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [hotelData, setHotelData] = useState({});
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [hotelId, setHotelId] = useState('');

  const { data, loading, error, reFetch } = useFetch("https://smart-2imr.onrender.com/api/hotels");



  const handleDisable = async () => {
    if (!Array.isArray(selectedRows)) {
      return;
    }
    const ids = selectedRows.map((row) => row._id);
    try {
      await axios.put(`https://smart-2imr.onrender.com/api/hotels/${ids.join(",")}`, { enabled: false });
      reFetch();

    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = async (selectedRow) => {
    if (!selectedRow) {
      return;
    }
    console.log(selectedRow);
    setHotelData(selectedRow);
    setEditModalOpen(true);
    setHotelId(selectedRow._id); // Agrega esta línea
  };
  const handleDelete = async () => {
    if (!Array.isArray(selectedRows)) {
      return;
    }
  
    const ids = selectedRows.map((row) => row._id);
  
    const confirmDelete = async () => {
      const result = await swal({
        title: "Are you sure you want to delete the selected items?",
        icon: "warning",
        buttons: ["Cancelar", "Confirmar"],
        dangerMode: true,
      });
  
      if (result) {
        try {
          await axios.delete(`https://smart-2imr.onrender.com/api/hotels/${ids.join(",")}`);
          reFetch();
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    confirmDelete();
  };
  

  const handleNewHotel = () => {
    setNewModalOpen(true);
  };

  const columns = [
    {
      name: "Name Hotel",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city.charAt(0).toUpperCase() + row.city.slice(1),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.cheapestPrice,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button style={{ height: '35px', borderRadius: '10px', backgroundColor: '#003580'}} onClick={() => handleEdit(row)}>Edit</Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <MyNavbar />
      <div className="hotel-container">
        <div className="button-container">
          <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: '#003580'}} onClick={handleNewHotel}>New Hotel</Button>
          <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: '#003580'}} onClick={handleDisable}>Disable</Button>
          <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: '#003580'}} onClick={handleDelete}>Delete</Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <DataTable
            title="Hotel List"
            columns={columns}
            data={data}
            selectableRows
            onSelectedRowsChange={(selectedRows) =>
              setSelectedRows(selectedRows.selectedRows)
            }
          />
        )}
        <Modal style={{ display: 'block', position: 'initial' }}
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}

        >
          <HotelForm
            onClose={() => setEditModalOpen(false)}
            onSubmit={reFetch}
            hotelData={hotelData}
            
          />
        </Modal>
        <Modal
          isOpen={newModalOpen}
          onRequestClose={() => setNewModalOpen(false)}
          
          style={{ display: 'block', position: 'initial' }}
        >
          <NewHotel
            onClose={() => setNewModalOpen(false)}
            onSubmit={reFetch}
          />
        </Modal>
      </div>
    </>
  );
};

export default Hoteles;
