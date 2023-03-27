import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Button } from "react-bootstrap";



const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault(e)
    if (selectedRooms.length === 0) {
      // Mostrar una alerta de error si no hay habitaciones seleccionadas
      swal({
        title: "Error",
        text: "You must select at least one room before proceeding.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
      // Agregar la alerta de confirmación
      swal({
        title: "Reserva confirmada",
        text: "Su reserva ha sido confirmada con éxito.",
        icon: "success",
        button: "OK",
      });
    } catch (err) { }
  };

  


  return (

    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price} per night</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>

          </div>

        ))}
        <form action="">

          <div className="rPassengerData">
            <span>Passenger data:</span>
            <div className="rPassengerFormItem">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"

              />
            </div>

            <div className="rPassengerFormItem">
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"

              />
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="birthdate">Birthdate:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
              />
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="documentType">Document Type:</label>
              <select
                id="documentType"
                name="documentType"
              >
                <option value="">Select document type</option>
                <option value="id">ID</option>
                <option value="passport">Passport</option>
                <option value="CC">CC</option>
              </select>
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="documentNumber">Document Number:</label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
              />
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="rPassengerFormItem">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
              />
            </div>
            <div className="rEmergencyContact">
              <span>Emergency contact:</span>
              <div className="rPassengerFormItem">
                <label htmlFor="emergencyContactName">Name:</label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="name"
                />
              </div>
              <div className="rPassengerFormItem">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
            </div>
          </div>
        </form>

        <Button style={{
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "#003580",
        }} onClick={handleClick} className="rButton">
          Reserve Now!
        </Button>

      </div>

    </div>


  )
}

export default Reserve;



