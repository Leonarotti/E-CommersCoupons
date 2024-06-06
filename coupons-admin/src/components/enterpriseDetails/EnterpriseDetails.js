// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import enterpriseService from '../../services/EnterpriseService';
// import './EnterpriseDetails.css';

// const EnterpriseDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [enterprise, setEnterprise] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [backendErrors, setBackendErrors] = useState({});

//     useEffect(() => {
//         enterpriseService.getEnterpriseById(id).then(response => {
//             setEnterprise(response.data);
//         }).catch(error => {
//             console.error("Error fetching enterprise:", error);
//         });
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEnterprise({ ...enterprise, [name]: value });
//     };

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         setBackendErrors({});
//         enterpriseService.updateEnterprise(enterprise).then(response => {
//             if (response.status === 200) {
//                 setEditMode(false);
//             } else {
//                 setBackendErrors(response);
//             }
//         }).catch(error => {
//             console.error("Error updating enterprise:", error);
//             setBackendErrors(error);
//         });
//     };

//     const handleManageCoupons = () => {
//         navigate(`/enterprises/${id}/coupons`);
//     };

//     const goBack = () => {
//         navigate('/');
//     };

//     if (!enterprise) return <div>Loading...</div>;

//     return (
//         <div className="enterprise-details">
//             <button onClick={goBack}>Back to Enterprises</button>
//             <h1>{editMode ? 'Edit Enterprise' : 'Enterprise Details'}</h1>
//             <form onSubmit={handleUpdate}>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={enterprise.name}
//                     onChange={handleChange}
//                     disabled={!editMode}
//                     required
//                 />
//                 {backendErrors.name && <span className="error">{backendErrors.name}</span>}
                
//                 <label>Address:</label>
//                 <input
//                     type="text"
//                     name="address"
//                     value={enterprise.address}
//                     onChange={handleChange}
//                     disabled={!editMode}
//                     required
//                 />
//                 {backendErrors.address && <span className="error">{backendErrors.address}</span>}
                
//                 <label>License:</label>
//                 <input
//                     type="text"
//                     name="license"
//                     value={enterprise.license}
//                     onChange={handleChange}
//                     disabled={!editMode}
//                     required
//                 />
//                 {backendErrors.license && <span className="error">{backendErrors.license}</span>}
                
//                 <label>Phone:</label>
//                 <input
//                     type="text"
//                     name="phone"
//                     value={enterprise.phone}
//                     onChange={handleChange}
//                     disabled={!editMode}
//                     required
//                 />
//                 {backendErrors.phone && <span className="error">{backendErrors.phone}</span>}
                
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={enterprise.email}
//                     onChange={handleChange}
//                     disabled={!editMode}
//                     required
//                 />
//                 {backendErrors.email && <span className="error">{backendErrors.email}</span>}

//                 <label>
//                     <input
//                         type="checkbox"
//                         name="is_enabled"
//                         checked={enterprise.is_enabled}
//                         onChange={(e) => handleChange({ target: { name: 'is_enabled', value: e.target.checked } })}
//                         disabled={!editMode}
//                     />
//                     Enabled
//                 </label>
                
//                 {editMode && <button type="submit">Update</button>}
//                 {!editMode && <button type="button" onClick={() => setEditMode(true)}>Edit</button>}
//             </form>
//             <button onClick={handleManageCoupons}>Manage Coupons</button>
//         </div>
//     );
// };

// export default EnterpriseDetails;
