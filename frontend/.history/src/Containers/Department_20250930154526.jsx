import React from 'react';
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
  return (

    <Layout title="Dashboard" navClass='dashboard'>
        
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-5">
          <h1 className="fw-bolder" style={{ color: ACCENT_COLOR }}>
            Department Management 🏢
          </h1>
          <button className="btn btn-sm text-dark fw-bold" style={{ backgroundColor: ACCENT_COLOR }}>
            <i className="bi bi-plus-circle-fill me-2"></i>
            Add New Department
          </button>
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