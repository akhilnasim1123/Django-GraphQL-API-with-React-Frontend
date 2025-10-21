import React, { useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import Layout from '../Layout/Layout';

const ACCENT_COLOR = '#00bcd4';
const MAIN_BG = '#0b0b0b';
const CARD_BG = '#1c1c1c';
const TEXT_COLOR = '#e0e0e0';

const departmentData = [
    { id: 1, name: 'Engineering', image: 'https://via.placeholder.com/40/00bcd4/ffffff?text=ENG', lead: 'Jane Doe' },
    { id: 2, name: 'Marketing', image: 'https://via.placeholder.com/40/00bcd4/ffffff?text=MKT', lead: 'John Smith' },
    { id: 3, name: 'Sales', image: 'https://via.placeholder.com/40/00bcd4/ffffff?text=SAL', lead: 'Alice Brown' },
    { id: 4, name: 'Human Resources', image: 'https://via.placeholder.com/40/00bcd4/ffffff?text=HR', lead: 'Bob Green' },
    { id: 5, name: 'Finance', image: 'https://via.placeholder.com/40/00bcd4/ffffff?text=FIN', lead: 'Charlie White' },
];

function DepartmentsPage() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [lead, setLead] = useState("");
    const handleCreateDepartment = (e) => {
        e.preventDefault();

        // Build form data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("lead", lead);

        // Submit to API or state handler
        console.log("Form submitted!", formData);

        // Close modal manually (if using Bootstrap manually)
        const modalEl = document.getElementById("createDepartmentModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();

        // Reset form
        setName("");
        setImage(null);
        setLead("");
    };

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
                        <div className="modal-content bg-">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold" id="createDepartmentModalLabel">
                                    Create New Department
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <form onSubmit={handleCreateDepartment}> {/* Replace with your submit handler */}
                                <div className="modal-body">
                                    {/* Department Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Department Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter department name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Department Image */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Department Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            accept="image/*"
                                            required
                                        />
                                    </div>

                                    {/* Department Lead */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Department Lead</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter department lead"
                                            value={lead}
                                            onChange={(e) => setLead(e.target.value)}
                                            required
                                        />
                                        {/* Optional: Convert to dropdown if you're fetching leads from user list */}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
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
                                {departmentData.map((dept, index) => (
                                    <tr key={dept.id}>
                                        <th scope="row" className="align-middle border-secondary">{dept.id}</th>
                                        <td className="align-middle border-secondary fw-bold" style={{ color: ACCENT_COLOR }}>
                                            {dept.name}
                                        </td>
                                        <td className="align-middle border-secondary">
                                            <img
                                                src={dept.image}
                                                alt={`${dept.name} logo`}
                                                className="rounded-circle"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        </td>
                                        <td className="align-middle border-secondary text-muted">{dept.lead}</td>
                                        <td className="align-middle border-secondary text-center">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm me-2"
                                                    style={{ backgroundColor: ACCENT_COLOR, color: 'black' }}
                                                    title="Edit"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete"
                                                >
                                                    <i className="bi bi-trash-fill"></i>
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