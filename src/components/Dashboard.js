import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const knownTemplates = [
    "Biochemistry Markers",
    "Blood Test",
    "Bone Marrow Examination",
    "Culture Sensitivity",
    "Semen Examination",
    "Stool Examination"
];

function Dashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [labID, setLabID] = useState('');

    useEffect(() => {
        fetchSubmissions();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [templateName, dateFrom, dateTo, labID]);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/form-submissions`);
            setSubmissions(response.data);
            setFilteredSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching form submissions:', error);
            alert('Error fetching form submissions');
        }
    };

    const applyFilters = () => {
        let filtered = submissions;

        if (templateName) {
            filtered = filtered.filter(submission => submission.templateName === templateName);
        }

        if (dateFrom) {
            filtered = filtered.filter(submission => {
                const submissionDate = submission.formData?.Date ? new Date(submission.formData.Date) : null;
                return submissionDate && submissionDate >= new Date(dateFrom);
            });
        }

        if (dateTo) {
            filtered = filtered.filter(submission => {
                const submissionDate = submission.formData?.Date ? new Date(submission.formData.Date) : null;
                return submissionDate && submissionDate <= new Date(dateTo);
            });
        }

        if (labID) {
            filtered = filtered.filter(submission => submission.formData?.['Lab ID'] === labID);
        }

        setFilteredSubmissions(filtered);
    };

    const handleChartClick = (elems) => {
        if (elems.length > 0) {
            const index = elems[0].index;
            const template = pieChartData.labels[index]; // Use pieChartData here
            setTemplateName(template);
        }
    };

    // Group submissions by date and count them for the bar chart
    const submissionsByDate = filteredSubmissions.reduce((acc, submission) => {
        const date = submission.formData?.Date || 'Unknown';
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
    }, {});

    const barChartData = {
        labels: Object.keys(submissionsByDate),
        datasets: [
            {
                label: 'Submissions per Day',
                data: Object.values(submissionsByDate),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    // Group submissions by template name for the pie chart
    const submissionCounts = submissions.reduce((acc, submission) => {
        const name = submission.templateName;
        if (!acc[name]) {
            acc[name] = 0;
        }
        acc[name] += 1;
        return acc;
    }, {});

    const pieChartData = {
        labels: Object.keys(submissionCounts),
        datasets: [
            {
                data: Object.values(submissionCounts),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
            },
        ],
    };

    const pieChartOptions = {
        onClick: (_, elems) => handleChartClick(elems),
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div className="admin-dashboard">
            <h1>ScopEx Admin Dashboard</h1>

            <div className="filters">
                <label>
                    Select Report: 
                    <select
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    >
                        <option value="">All Templates</option>
                        {knownTemplates.map((template, index) => (
                            <option key={index} value={template}>
                                {template}
                            </option>
                        ))}
                    </select>
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
                <label>
                    Lab ID:
                    <input
                        type="text"
                        value={labID}
                        onChange={(e) => setLabID(e.target.value)}
                        placeholder="e.g., 12345"
                    />
                </label>
            </div>

            <div className="chart-container">
                <div className="chart" style={{ width: '45%' }}>
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <div className="chart" style={{ width: '45%' }}>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>

            <div className="submissions-list">
                <h3>Patients</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>                               
                            <th>Report Name</th>                         
                            <th>Submission Date</th>
                            <th>Lab ID</th>
                            <th>More details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((submission, index) => (
                            <tr key={index}>
                                <td>{submission.formData?.['Name'] || 'N/A'}</td>
                                <td>{submission.formData?.['Age'] || 'N/A'}</td>                                   
                                <td>{submission.templateName}</td>                             
                                <td>{submission.formData?.['Date'] || 'N/A'}</td>
                                <td>{submission.formData?.['Lab ID'] || 'N/A'}</td>
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

export default Dashboard;
