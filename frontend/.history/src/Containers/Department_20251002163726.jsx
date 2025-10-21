import React, { useEffect, useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, getDepartments } from '../Features/Authority';
import { useRef } from 'react';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';

const ACCENT_COLOR = '#00bcd4';
const MAIN_BG = '#0b0b0b';
const CARD_BG = '#1c1c1c';
const TEXT_COLOR = '#e0e0e0';

const departmentData = [];

function DepartmentsPage() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [lead, setLead] = useState("");
    const dispatch = useDispatch() 
    const [departments,setDepartments] = useState([])
    const [isUpdate,setUpdate] = useState(false)
    const [id,setId] =  useState('')

    
  const { user } = useSelector((state) => state.authority);


  const handleCreateDepartment = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
        const base64Image = await convertToBase64(image);
    
        const department = await dispatch(createDepartment({ name, image: base64Image, lead })).unwrap();
        console.log(department)
        setDepartments(prev => [...prev, department]); 
        const modalEl = document.getElementById("createDepartmentModal");
        if (modalEl) {
            
        const modalInstance =  bootstrapBundleMin.Modal.getInstance(modalEl) || new  bootstrapBundleMin.Modal(modalEl);
        modalInstance.hide();
        }

        setName("");
        setImage(null);
        setLead("");
    } catch (error) {
        console.error("Error creating department:", error);
        alert("Failed to create department: " + error.message);
    }
  };
const hasFetched = useRef(false);

useEffect(() => {
  if (!user || hasFetched.current) return;
  const fetchDepartments = async () => {
    try { 
      const departmentData = await dispatch(getDepartments(user)).unwrap();
      setDepartments(departmentData);
      hasFetched.current = true;  
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  fetchDepartments();
}, [user]);




    return (

        <Layout title="Department" navClass='department'>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-5">
                <h1 className="fw-bolder" style={{ color: ACCENT_COLOR }}>
                    Department Management 🏢
                </h1>
                {/* Trigger Button (already in your code, just add these props) */}
                <button
                    className="btn btn-sm text-dark fw-bold"
                    style={{ backgroundColor: ACCENT_COLOR }}
                    data-bs-toggle="modal"
                    data-bs-target="#createDepartmentModal"
                >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add New Department
                </button>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="createDepartmentModal"
                    tabIndex="-1"
                    aria-labelledby="createDepartmentModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white"> {/* Dark background and white text */}
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold text-white" id="createDepartmentModalLabel">
                                    Create New Department
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <form onSubmit={isUpdate ? :handleCreateDepartment}>
                                <div className="modal-body">
                                    {/* Department Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Department Name</label>
                                        <input
                                            type="text"
                                            className="form-control bg-secondary text-white border-0"
                                            placeholder="Enter department name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Department Image */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Department Image</label>
                                        <input
                                            type="file"
                                            className="form-control bg-secondary text-white border-0"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            accept="image/*"
                                            required
                                        />
                                    </div>

                                    {/* Department Lead */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Department Lead</label>
                                        <input
                                            type="text"
                                            className="form-control bg-secondary text-white border-0"
                                            placeholder="Enter department lead"
                                            value={lead}
                                            onChange={(e) => setLead(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-outline-light"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Create Department
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg border-0" style={{ backgroundColor: CARD_BG }}>
                <div className="card-header border-0 pb-0" style={{ backgroundColor: CARD_BG, color: TEXT_COLOR }}>
                    <h5 className="mb-0">List of Departments</h5>
                    <p className="text-muted small">Total: {departmentData.length} Departments</p>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-secondary border-secondary">#</th>
                                    <th scope="col" className="text-secondary border-secondary">Name</th>
                                    <th scope="col" className="text-secondary border-secondary">Image</th>
                                    <th scope="col" className="text-secondary border-secondary">Lead</th>
                                    <th scope="col" className="text-secondary border-secondary text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept, index) => (
                                    <tr key={dept.id}>
                                        <th scope="row" className="align-middle border-secondary">{dept.id}</th>
                                        <td className="align-middle border-secondary fw-bold" style={{ color: ACCENT_COLOR }}>
                                            {dept.name}
                                        </td>
                                        <td className="align-middle border-secondary">
                                            <img
                                                src={`http://192.168.18.40:8000/media/${dept.image}`}
                                                alt={`logo`}
                                                className=""
                                                style={{ width: '50px', height: '50px',objectFit:'contain' }}
                                            />
                                        </td>
                                        <td className="align-middle border-secondary text-white">{dept.lead}</td>
                                        <td className="align-middle border-secondary text-center">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm me-2"
                                                    style={{ backgroundColor: ACCENT_COLOR, color: 'black' }}
                                                    title="Edit"
                                                    onClick={()=>{
                                                        setUpdate(true)
                                                        setLead(dept.lead)
                                                        setImage(dept.image)
                                                        setName(dept.name)
                                                        setId(dept.id)
                                                    }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#createDepartmentModal"
                                                > 
                                                Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-end border-0" style={{ backgroundColor: CARD_BG }}>
                        <a href="#" className="btn btn-link p-0 text-decoration-none" style={{ color: ACCENT_COLOR }}>
                            View All &raquo;
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DepartmentsPage;