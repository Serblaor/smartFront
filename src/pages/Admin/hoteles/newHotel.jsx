import { useState } from "react";
import { hotelInputs } from "./formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const NewHotel = ({ onClose }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("https://smart-2imr.onrender.com/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/daykzpr3r/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("https://smart-2imr.onrender.com/api/hotels", newhotel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="bottom">
          <div className="right">
            <Form>
              {/* <Form.Group>
                <Form.Label htmlFor="file">Image: </Form.Label>
                <Form.Control
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </Form.Group> */}

              {hotelInputs.map((input) => (
                <Form.Group key={input.id}>
                  <Form.Label>{input.label}</Form.Label>
                  <Form.Control
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </Form.Group>
              ))}
              <Form.Group>
                <Form.Label>Featured</Form.Label>
                <Form.Control
                  id="featured"
                  as="select"
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Rooms</Form.Label>
                <Form.Control
                  id="rooms"
                  as="select"
                  multiple
                  onChange={handleSelect}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </Form.Control>
              </Form.Group>
              <Button
                style={{
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#003580",
                }}
                onClick={handleClick}
              >
                Send
              </Button>
              <Button
                style={{
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "gray",
                }}
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewHotel;
