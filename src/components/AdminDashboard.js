import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

function AdminDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(() => {
        fetchSubmissions();
    }, [templateName, dateFrom, dateTo]);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('/api/form-submissions', {
                params: {
                    templateName,
                    dateFrom,
                    dateTo
                }
            });
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching form submissions:', error);
            alert('Error fetching form submissions');
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="filters">
                <label>
                    Template Name:
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="e.g., Blood Test"
                    />
                </label>
                <label>
                    Date From:
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </label>
                <label>
                    Date To:
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </label>
                <button onClick={fetchSubmissions}>Apply Filters</button>
            </div>

            <div className="submissions-list">
                <h3>Submitted Forms</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Template Name</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index}>
                                <td>{submission.templateName}</td>
                                <td>{submission.formData.Date}</td>
                                <td>
                                    <button onClick={() => alert(JSON.stringify(submission.formData, null, 2))}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
