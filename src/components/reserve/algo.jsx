// const Reserve = ({ setOpen, hotelId }) => {
//     const [selectedRooms, setSelectedRooms] = useState([]);
//     const [passengerData, setPassengerData] = useState({
//         firstName: "",
//         lastName: "",
//         birthdate: "",
//         gender: "",
//         documentType: "",
//         documentNumber: "",
//         email: "",
//         phoneNumber: "",
//         emergencyContact: {
//             name: "",
//             phoneNumber: "",
//         },
//     });

//     const handlePassengerDataChange = (event) => {
//         const target = event.target;
//         const name = target.name;
//         const value = target.value;

//         setPassengerData((prevPassengerData) => ({
//             ...prevPassengerData,
//             [name]: value,
//         }));
//     };

//     const handleEmergencyContactChange = (event) => {
//         const target = event.target;
//         const name = target.name;
//         const value = target.value;

//         setPassengerData((prevPassengerData) => ({
//             ...prevPassengerData,
//             emergencyContact: {
//                 ...prevPassengerData.emergencyContact,
//                 [name]: value,
//             },
//         }));
//     };

//     const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
//     const { dates } = useContext(SearchContext);

//     const getDatesInRange = (startDate, endDate) => {
//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         const date = new Date(start.getTime());

//         const dates = [];

//         while (date <= end) {
//             dates.push(new Date(date).getTime());
//             date.setDate(date.getDate() + 1);
//         }

//         return dates;
//     };

//     const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//     const isAvailable = (roomNumber) => {
//         const isFound = roomNumber.unavailableDates.some((date) =>
//             alldates.includes(new Date(date).getTime())
//         );

//         return !isFound;
//     };

//     const handleSelect = (e) => {
//         const checked = e.target.checked;
//         const value = e.target.value;
//         setSelectedRooms(
//             checked
//                 ? [...selectedRooms, value]
//                 : selectedRooms.filter((item) => item !== value)
//         );
//     };

//     const navigate = useNavigate();

//     const handleClick = async () => {
//         try {
//             await Promise.all(
//                 selectedRooms.map((roomId) => {
//                     const res = axios.put(`/rooms/availability/${roomId}`, {
//                         dates: alldates,
//                         firstName: passengerData.firstName,
//                         lastName: passengerData.lastName,
//                         birthDate: passengerData.birthdate,
//                         gender: passengerData.gender,
//                         documentType: passengerData.documentType,
//                         documentNumber: passengerData.documentNumber,
//                         email: passengerData.email,
//                         phone: passengerData.phoneNumber,
//                         emergencyContact: passengerData.emergencyContact,
//                     });
//                     return res.data;
//                 })
//             );
//             setOpen(false);
//             navigate("/");
//         } catch (err) { }
//     };

//     return (
//         <div className="reserve">
//             <div className="rContainer">
//                 <FontAwesomeIcon
//                     icon={faCircleXmark}
//                     className="rClose"
//                     onClick={() => setOpen(false)}
//                 />
//                 <span>Select your rooms:</span>
//                 {data.map((item) => (
//                     <div className="rItem" key={item._id}>
//                         <div className="rItemInfo">
//                             <div className="rTitle">{item.title}</div>
//                             <div className="rDesc">{item.desc}</div>
//                             <div className="rMax">
//                                 Max people: <b>{item.maxPeople}</b>
//                             </div>
//                             <div className="rPrice">${item.price} per night</div>
//                         </div>
//                         <div className="rItemSelect">
//                             <input
//                                 type="checkbox"
//                                 value={item._id}
//                                 onChange={handleSelect}
//                                 disabled={!isAvailable(item)}
//                             />
//                             <span>{isAvailable(item) ? "Available" : "Not available"}</span>
//                         </div>
//                     </div>
//                 ))}
//                 <div className="rPassengerData">
//                     <span>Passenger data:</span>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={passengerData.firstName}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="surname">Lastname:</label>
//                         <input
//                             type="text"
//                             id="surname"
//                             name="surname"
//                             value={passengerData.lastName}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="birthdate">Birthdate:</label>
//                         <input
//                             type="date"
//                             id="birthdate"
//                             name="birthdate"
//                             value={passengerData.birthdate}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="gender">Gender:</label>
//                         <select
//                             id="gender"
//                             name="gender"
//                             value={passengerData.gender}
//                             onChange={handlePassengerDataChange}
//                         >
//                             <option value="">Select gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentType">Document Type:</label>
//                         <select
//                             id="documentType"
//                             name="documentType"
//                             value={passengerData.documentType}
//                             onChange={handlePassengerDataChange}
//                         >
//                             <option value="">Select document type</option>
//                             <option value="id">ID</option>
//                             <option value="passport">Passport</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentNumber">Document Number:</label>
//                         <input
//                             type="text"
//                             id="documentNumber"
//                             name="documentNumber"
//                             value={passengerData.documentNumber}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={passengerData.email}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="phoneNumber">Phone Number:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={passengerData.phoneNumber}
//                             onChange={handlePassengerDataChange}
//                         />
//                     </div>
//                     <div className="rEmergencyContact">
//                         <span>Emergency contact:</span>
//                         <div className="rPassengerFormItem">
//                             <label htmlFor="emergencyContactName">Name:</label>
//                             <input
//                                 type="text"
//                                 id="emergencyContactName"
//                                 name="name"
//                                 value={passengerData.emergencyContact.name}
//                                 onChange={handleEmergencyContactChange}
//                             />
//                         </div>
//                         <button onClick={handleClick} className="rButton">
//                             Reserve Now!
//                         </button>
//                     </div>
//                 </div>
//                 </div>
//                 </div>
//                 )
//                 }
         
//                 export default Reserve;


// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import "./reserve.css";
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";



// const Reserve = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
//   const { dates } = useContext(SearchContext);

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unavailableDates.some((date) =>
//       alldates.includes(new Date(date).getTime())
//     );

//     return !isFound;
//   };

//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms(
//       checked
//         ? [...selectedRooms, value]
//         : selectedRooms.filter((item) => item !== value)
//     );
//   };

//   const navigate = useNavigate();

//   const handleClick = async () => {
//     if (selectedRooms.length === 0) {
//       // Mostrar una alerta de error si no hay habitaciones seleccionadas
//       swal({
//         title: "Error",
//         text: "Debe seleccionar al menos una habitación antes de continuar.",
//         icon: "error",
//         button: "OK",
//       });
//       return;
//     }
  
//     try {
//       await Promise.all(
//         selectedRooms.map((roomId) => {
//           const res = axios.put(`/rooms/availability/${roomId}`, {
//             dates: alldates,
//           });
//           return res.data;
//         })
//       );
//       setOpen(false);
//       navigate("/");
//       // Agregar la alerta de confirmación
//       swal({
//         title: "Reserva confirmada",
//         text: "Su reserva ha sido confirmada con éxito.",
//         icon: "success",
//         button: "OK",
//       });
//     } catch (err) {}
//   };
  
  
//   return (
//     <form action="">
//     <div className="reserve">
//       <div className="rContainer">
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="rClose"
//           onClick={() => setOpen(false)}
//         />
//         <span>Select your rooms:</span>
//         {data.map((item) => (
//           <div className="rItem" key={item._id}>
//             <div className="rItemInfo">
//               <div className="rTitle">{item.title}</div>
//               <div className="rDesc">{item.desc}</div>
//               <div className="rMax">
//                 Max people: <b>{item.maxPeople}</b>
//               </div>
//               <div className="rPrice">${item.price} per night</div>
//             </div>
//             <div className="rSelectRooms">
//               {item.roomNumbers.map((roomNumber) => (
//                 <div className="room">
//                   <label>{roomNumber.number}</label>
//                   <input
//                     type="checkbox"
//                     value={roomNumber._id}
//                     onChange={handleSelect}
//                     disabled={!isAvailable(roomNumber)}
//                   />
//                 </div>
//               ))}
//             </div>
            
//           </div>
          
//         ))}
        
//           <div className="rPassengerData">
//                     <span>Passenger data:</span>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
                            
//                         />
//                     </div>
                   
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="surname">Surname:</label>
//                         <input
//                             type="text"
//                             id="surname"
//                             name="surname"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="birthdate">Birthdate:</label>
//                         <input
//                             type="date"
//                             id="birthdate"
//                             name="birthdate"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="gender">Gender:</label>
//                         <select
//                             id="gender"
//                             name="gender"
                            
//                         >
//                             <option value="">Select gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentType">Document Type:</label>
//                         <select
//                             id="documentType"
//                             name="documentType"
                            
//                         >
//                             <option value="">Select document type</option>
//                             <option value="id">ID</option>
//                             <option value="passport">Passport</option>
//                             <option value="CC">CC</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentNumber">Document Number:</label>
//                         <input
//                             type="text"
//                             id="documentNumber"
//                             name="documentNumber"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="phoneNumber">Phone Number:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             name="phoneNumber"
                            
//                         />
//                     </div>
//                     <div className="rEmergencyContact">
//                         <span>Emergency contact:</span>
//                         <div className="rPassengerFormItem">
//                             <label htmlFor="emergencyContactName">Name:</label>
//                             <input
//                                 type="text"
//                                 id="emergencyContactName"
//                                 name="name"
                                
//                             />
//                         </div>
//                         <div className="rPassengerFormItem">
//                         <label htmlFor="phoneNumber">Phone Number:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             name="phoneNumber"
                            
//                         />
//                     </div>
//                         </div>
//                         </div>
                   
//          <button onClick={handleClick} className="rButton">
//            Reserve Now!
//          </button>
         
//          </div>
      
//          </div>
//          </form>

//          )
//          }
        
    



// export default Reserve;

// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/// 
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/



// import "../reserve/algo.css"

// const Algo = () => {
//     return(
//                     <div className="rPassengerData">
//                     <span>Passenger data:</span>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
                            
//                         />
//                     </div>
                   
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="surname">Surname:</label>
//                         <input
//                             type="text"
//                             id="surname"
//                             name="surname"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="birthdate">Birthdate:</label>
//                         <input
//                             type="date"
//                             id="birthdate"
//                             name="birthdate"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="gender">Gender:</label>
//                         <select
//                             id="gender"
//                             name="gender"
                            
//                         >
//                             <option value="">Select gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentType">Document Type:</label>
//                         <select
//                             id="documentType"
//                             name="documentType"
                            
//                         >
//                             <option value="">Select document type</option>
//                             <option value="id">ID</option>
//                             <option value="passport">Passport</option>
//                             <option value="CC">CC</option>
//                         </select>
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="documentNumber">Document Number:</label>
//                         <input
//                             type="text"
//                             id="documentNumber"
//                             name="documentNumber"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
                            
//                         />
//                     </div>
//                     <div className="rPassengerFormItem">
//                         <label htmlFor="phoneNumber">Phone Number:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             name="phoneNumber"
                            
//                         />
//                     </div>
//                     <div className="rEmergencyContact">
//                         <span>Emergency contact:</span>
//                         <div className="rPassengerFormItem">
//                             <label htmlFor="emergencyContactName">Name:</label>
//                             <input
//                                 type="text"
//                                 id="emergencyContactName"
//                                 name="name"
                                
//                             />
//                         </div>
//                         </div>
//                         <div className="rPassengerFormItem">
//                         <label htmlFor="phoneNumber">Phone Number:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             name="phoneNumber"
                            
//                         />
//                     </div>
//                         </div>
//                         )
//                         }
//                         export default Algo;

// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
// /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
 /* ------------ --------------- OTRA FUNCION ----------------------------------------------*/
//* ------------ --------------- OTRA FUNCION ----------------------------------------------*/



// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import "./reserve.css";
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   Box,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@material-ui/core";

// const Reserve = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
//   const { dates } = useContext(SearchContext);

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unavailableDates.some((date) =>
//       alldates.includes(new Date(date).getTime())
//     );

//     return !isFound;
//   };

//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms(
//       checked
//         ? [...selectedRooms, value]
//         : selectedRooms.filter((item) => item !== value)
//     );
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setSubmitting(true);
//     if (selectedRooms.length === 0) {
//       // Mostrar una alerta de error si no hay habitaciones seleccionadas
//       swal({
//         title: "Error",
//         text: "Debe seleccionar al menos una habitación antes de continuar.",
//         icon: "error",
//         button: "OK",
//       });
//       setSubmitting(false);
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedRooms.map((roomId) => {
//           const res = axios.put(`/rooms/availability/${roomId}`, {
//             dates: alldates,
//           });
//           return res.data;
//         })
//       );
//       setOpen(false);
//       navigate("/");
//       // Agregar la alerta de confirmación
//       swal({
//         title: "Reserva confirmada",
//         text: "Su reserva ha sido confirmada con éxito.",
//         icon: "success",
//         button: "OK",
//       });
//     } catch (error) {
//       console.log(error);
//       // Mostrar una alerta de error si ocurre un error al actualizar la disponibilidad de la habitación
//       swal({
//         title: "Error",
//         text:
//           "Ocurrió un error al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.",
//         icon: "error",
//         button: "OK",
//       });
//     }
//     setSubmitting(false);
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(2, "Mínimo 2 caracteres")
//       .max(50, "Máximo 50 caracteres")
//       .required("Este campo es requerido"),
//     email: Yup.string().email("Ingrese un correo electrónico válido").required("Este campo es requerido"),
//     phone: Yup.string()
//       .matches(/^[0-9]+$/, "Solo se permiten números")
//       .required("Este campo es requerido"),
//     cardName: Yup.string().required("Este campo es requerido"),
//     cardNumber: Yup.string()
//       .matches(/^[0-9]+$/, "Solo se permiten números")
//       .length(16, "Debe ser un número de 16 dígitos")
//       .required("Este campo es requerido"),
//     cvc: Yup.string()
//       .matches(/^[0-9]+$/, "Solo se permiten números")
//       .length(3, "Debe ser un número de 3 dígitos")
//       .required("Este campo es requerido"),
//     expirationDate: Yup.string()
//     .matches(/^\d{2}\d{2}$/, "Formato inválido")
//       .required("Este campo es requerido"),
//   });

//   return (
//     <div className="reserve">
//       <Typography variant="h4">Reserva</Typography>
//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           phone: "",
//           cardName: "",
//           cardNumber: "",
//           cvc: "",
//           expirationDate: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className="reserve__form">
//             <Box mt={2} mb={2}>
//               <Typography variant="h5">Detalles de la reserva</Typography>
//             </Box>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="room">Habitación</InputLabel>
//                   <Field
//                     as={Select}
//                     name="room"
//                     id="room"
//                     disabled={loading}
//                     inputProps={{ name: "room", id: "room" }}
//                   >
//                     {error && <MenuItem value="">Error al cargar las habitaciones</MenuItem>}
//                     {!error && (
//                       <>
//                         {data &&
//                           data.map((room) => (
//                             <MenuItem
//                               key={room._id}
//                               value={room._id}
//                               disabled={!isAvailable(room)}
//                             >
//                               {room.name} - {room.price} €/noche
//                               {!isAvailable(room) && (
//                                 <FontAwesomeIcon
//                                   icon={faCircleXmark}
//                                   className="reserve__unavailable-icon"
//                                 />
//                               )}
//                             </MenuItem>
//                           ))}
//                         {data && data.length === 0 && (
//                           <MenuItem value="">No hay habitaciones disponibles</MenuItem>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage name="room" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="checkIn">Fecha de entrada</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="checkIn"
//                     id="checkIn"
//                     type="date"
//                     defaultValue={startDate}
//                     disabled={loading}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <FontAwesomeIcon icon={faCalendarAlt} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <ErrorMessage name="checkIn" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="checkOut">Fecha de salida</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="checkOut"
//                     id="checkOut"
//                     type="date"
//                     defaultValue={finalDate}
//                     disabled={loading}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <FontAwesomeIcon icon={faCalendarAlt} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <ErrorMessage name="checkOut" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="guests">Huéspedes</InputLabel>
//                   <Field
//                     as={Select}
//                     name="guests"
//                     id="guests"
//                     disabled={loading}
//                     inputProps={{ name: "guests", id: "guests" }}
//                   >
//                     {[1, 2, 3, 4].map((n) => (
//                       <MenuItem key={n} value={n}>
//                         {n} {n === 1 ? "huésped" : "huéspedes"}
//                       </MenuItem>
//                     ))}
//                   </Field>
//                   <ErrorMessage name="guests" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//             </Grid>
//             <Box mt={4} mb={2}>
//               <Typography variant="h5">Detalles del huésped</Typography>
//             </Box>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="name">Nombre y apellido</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="name"
//                     id="name"
//                     type="text"
//                     disabled={loading}
//                   />
//                   <ErrorMessage name="name" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="email">Correo electrónico</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="email"
//                     id="email"
//                     type="email"
//                     disabled={loading}
//                   />
//                   <ErrorMessage name="email" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="phone">Teléfono</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="phone"
//                     id="phone"
//                     type="tel"
//                     disabled={loading}
//                   />
//                   <ErrorMessage name="phone" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//             </Grid>
//             <Box mt={4} mb={2}>
//               <Typography variant="h5">Detalles del pago</Typography>
//             </Box>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="cardName">Nombre en la tarjeta</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="cardName"
//                     id="cardName"
//                     type="text"
//                     disabled={loading}
//                   />
//                   <ErrorMessage name="cardName" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="cardNumber">Número de tarjeta</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="cardNumber"
//                     id="cardNumber"
//                     type="text"
//                     disabled={loading}
//                     InputProps={{
//                       inputComponent: CreditCardNumberFormat,
//                     }}
//                   />
//                   <ErrorMessage name="cardNumber" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="cvc">CVC</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="cvc"
//                     id="cvc"
//                     type="text"
//                     disabled={loading}
//                     InputProps={{
//                       inputComponent: CVCFormat,
//                     }}
//                   />
//                   <ErrorMessage name="cvc" component="div" className="reserve__error" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="expirationDate">Fecha de expiración</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="expirationDate"
//                     id="expirationDate"
//                     type="text"
//                     disabled={loading}
//                     InputProps={{
//                       inputComponent: ExpirationDateFormat,
//                     }}
//                   />
//                   <ErrorMessage
//                     name="expirationDate"
//                     component="div"
//                     className="reserve__error"
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="total">Total</InputLabel>
//                   <Field
//                     as={TextField}
//                     name="total"
//                     id="total"
//                     type="text"
//                     disabled={true}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           {selectedRoom && selectedRoom.price && (
//                             <>
//                               {`${selectedRoom.price} x ${nights} noche${nights > 1 ? "s" : ""}`}
//                               <strong>{`${totalPrice} €`}</strong>
//                             </>
//                           )}
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </FormControl>
//               </Grid>
//             </Grid>
//             <Box mt={4} mb={2}>
//               <Typography variant="h5">Confirmación</Typography>
//             </Box>
//             <Box mb={2}>
//               <Typography>
//                 Al hacer clic en "Reservar ahora", aceptas nuestros

//                 <Link href="/terminos-y-condiciones" target="_blank">
//                   Términos y condiciones
//                 </Link>
//                 &nbsp;y&nbsp;
//                 <Link href="/politica-de-privacidad" target="_blank">
//                   Política de privacidad
//                 </Link>
//                 .
//               </Typography>
//             </Box>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={isSubmitting || !selectedRoom}
//             >
//               {isSubmitting && (
//                 <CircularProgress size={24} className="reserve__submitting" />
//               )}
//               Reservar ahora
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default Reserve;


const envioCorreo = async () => {
    await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      body: JSON.stringify({
        "sender": {
          "name": "TOP BEATS!",
          "email": "lella.soporte@gmail.com"
        },
        "to": [
          {
            "email": "lella.soporte@gmail.com",
            "name": "Luis LLancamil"
          }
        ],
        "subject": "Hello world",
        "htmlContent": "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
      }),
      headers: {
        'accept': 'application/json',
        'api-key': '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',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        console.log('--------------------------------DATA -------------------------------------', data);
      })
      .catch(console.log);
  }

