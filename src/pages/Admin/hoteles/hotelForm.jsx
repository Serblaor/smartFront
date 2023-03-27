import { useState } from "react";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HotelForm = ({ hotelData, onSubmit, onUpdateSuccess, onClose }) => {
    const [stateHotel, setStateHotel] = useState(hotelData);
    const [hotelUpdated, setHotelUpdated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (hotelData._id) { // Si hay un ID, envía una solicitud PUT
                await axios.put(`/hotels/${stateHotel._id}`, stateHotel);
                if (onUpdateSuccess) {
                    onUpdateSuccess();
                }
            } else { // Si no hay un ID, envía una solicitud POST
                // await axios.post(/hotels/, formData);
            }
            onSubmit();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: "row", justifyContent: 'flex-start', flexWrap: 'wrap', height: '100vh', width: "100%" }}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
                <Form.Group controlId="name">
                    <Form.Label style={{ fontSize: '1rem' }}>Name:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.name} onChange={(e) => setStateHotel({ ...stateHotel, name: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label style={{ fontSize: '1rem' }}>Type:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.type} onChange={(e) => setStateHotel({ ...stateHotel, type: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label style={{ fontSize: '1rem' }}>City:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.city} onChange={(e) => setStateHotel({ ...stateHotel, city: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label style={{ fontSize: '1rem' }}>Address:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.address} onChange={(e) => setStateHotel({ ...stateHotel, address: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="distance">
                    <Form.Label style={{ fontSize: '1rem' }}>Distance:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.distance} onChange={(e) => setStateHotel({ ...stateHotel, distance: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="photos">
                    <Form.Label style={{ fontSize: '1rem' }}>Photos:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.photos[0]} onChange={(e) => setStateHotel({ ...stateHotel, photos: [e.target.value] })} />
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Label style={{ fontSize: '1rem' }}>Title:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.title} onChange={(e) => setStateHotel({ ...stateHotel, title: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="desc">
                    <Form.Label style={{ fontSize: '1rem' }}>Description:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} as="textarea" value={stateHotel.desc} onChange={(e) => setStateHotel({ ...stateHotel, desc: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="cheapestPrice">
                    <Form.Label style={{ fontSize: '1rem' }}>Cheapest Price:</Form.Label>
                    <Form.Control style={{ height: '40px', borderRadius: '10px' }} type="text" value={stateHotel.cheapestPrice} onChange={(e) => setStateHotel({ ...stateHotel, cheapestPrice: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="featured">
                    <Form.Check type="checkbox" checked={stateHotel.featured} label="Featured:" onChange={(e) => setStateHotel({ ...stateHotel, featured: e.target.checked })} />
                </Form.Group>
                <Button style={{ height: '40px', borderRadius: '10px' }} variant="primary" type="submit">{hotelData._id ? 'Update' : 'Create'}</Button>
                <Button style={{ height: '40px', borderRadius: '10px' }} variant="secondary" onClick={onClose}>Cancel</Button>
            </Form>
        </div>
    );
};
export default HotelForm;

