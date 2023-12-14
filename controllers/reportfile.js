const pieChart = {
    type: 'pie',
    data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
            data: [75, 25], // Example data: 75% attended, 25% missed
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)', // Blue for attended
                'rgba(255, 99, 132, 0.7)' // Red for missed
            ],
            borderWidth: 1
        }]
    },
    options: {
        // Add options for the pie chart (title, legend, etc.)
    }
};

const scatterPlot = {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Enrollment',
            data: [
                { x: 1, y: 50 },
                { x: 2, y: 70 },
                { x: 3, y: 90 },
                // More data points
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.5)' // Yellowish
        }]
    },
    options: {
        // Add options for the scatter plot (title, axis labels, etc.)
    }
};

const lineChart = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Admitted',
            data: [30, 45, 60, 75, 80, 90], // Example data for admissions
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'Hired',
            data: [10, 20, 35, 45, 50, 60], // Example data for hires
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        // Add options for the line chart (title, axis labels, etc.)
    }
};

module.exports = { pieChart, scatterPlot, lineChart };
