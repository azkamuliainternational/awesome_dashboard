odoo.define('awesome_dashboard.chart_renderer', function (require) {
    "use strict";

    function renderChartActivity(container) {
        // Ensure the container exists
        const canvas = container.find('#donut-chart')[0];
        if (!canvas) {
            console.error("Chart container not found!");
            return;
        }

        // Chart data
        const data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'My First Dataset',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#EF4444',
                    '#3B82F6',
                    '#FBBF24',
                    '#10B981',
                    '#A78BFA',
                    '#F59E0B'
                ],
                hoverOffset: 4
            }]
        };

        // Chart options
        const options = {
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: '#333',
                        font: {
                            size: 14
                        },
                        boxWidth: 12,
                        generateLabels: function (chart) {
                            const datasets = chart.data.datasets[0];
                            const total = datasets.data.reduce((sum, value) => sum + value, 0);
                            return chart.data.labels.map((label, index) => {
                                const value = datasets.data[index];
                                const percentage = ((value / total) * 100).toFixed(2);
                                return {
                                    text: `${label}: ${percentage}%`,
                                    fillStyle: datasets.backgroundColor[index],
                                    hidden: !chart.getDataVisibility(index),
                                    index: index
                                };
                            });
                        }
                    }
                },
                tooltip: { enabled: true },
                title: {
                    display: true,
                    text: 'Activity CRM',
                    font: { size: 24, weight: 'bold' },
                    color: 'green'
                }
            },
            animation: { animateRotate: true }
        };

        // Create the chart
        new Chart(canvas, {
            type: 'doughnut',
            data: data,
            options: options
        });

        console.log("Chart rendered successfully");
    }

    return {
        renderChartActivity: renderChartActivity
    };
});
