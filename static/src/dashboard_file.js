odoo.define('awesome_dashboard.dashboard_function', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');

    var AwesomeDashboard = AbstractAction.extend({
        template: 'dashboard',
        start: function () {
            this._super.apply(this, arguments);
            
            this._renderChartActivity();
            this._addSelectEventListener();
     
            
            console.log("Awesome Dashboard Loaded");
        },
        
  
        _addSelectEventListener: function () {
            // Find the select element by its ID in the template
            const mySelect = this.$el.find('#select_periode');
            console.log(mySelect);
            if (mySelect.length) {
                mySelect.on('change', this._onSelectChange.bind(this)); // Attach change event listener
            }
        },

        _onSelectChange: function (event) {
            // Handle the change event
            var selectedValue = $(event.target).val(); // Get the selected value
            console.log("Selected option:", selectedValue);
            if (selectedValue=='today'){
                console.log("periode dipilih:", selectedValue);
                $('#table').removeClass('hidden');                
                $('#chart').addClass('hidden');     
                $('#select_month').addClass('invisible');                
                $('#select_year').addClass('invisible');            

            }
            else {
                
                $('#table').addClass('hidden');             
                $('#chart').removeClass('hidden');                   
                if (selectedValue=='custom'){
                    $('#select_month').removeClass('invisible');                
                    $('#select_year').removeClass('invisible');                
                }
                else{
                    $('#select_month').addClass('invisible');                
                    $('#select_year').addClass('invisible');                
                }

            }

            // Perform additional actions based on the selected value
        },

        _renderChartActivity: function () {
            // Get the canvas element
            const canvas = this.$el.find('#donut-chart')[0];

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
                        display: true, // Enable the legend
                        position: 'right', // Position the legend
                        labels: {
                            color: '#333', // Legend text color
                            font: {
                                size: 14 // Font size for legend text
                            },
                            boxWidth: 12,
                            generateLabels: function (chart) {
                                const data = chart.data;
                                const datasets = data.datasets[0];
                                const total = datasets.data.reduce((sum, value) => sum + value, 0); // Calculate total data value
                                return data.labels.map((label, index) => {
                                    const value = datasets.data[index];
                                    const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
                                    return {
                                        text: `${label}: ${percentage}%`, // Custom label text with percentage
                                        fillStyle: datasets.backgroundColor[index], // Match legend color
                                        hidden: !chart.getDataVisibility(index),
                                        index: index
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        enabled: true // Show tooltips on hover
                    },
                    title: {
                        display: true, // Enable the title
                        text: 'Actity CRM', // Title text
                        font: {
                            size: 24, // Font size for the title
                            weight: 'bold' // Font weight
                        },
                        color: 'green', // Title text color
                      
                    }
                },
                animation: {
                    animateRotate: true
                }
            };
            

            // Create the chart
            new Chart(canvas, {
                type: 'doughnut',
                data: data,
                options: options
            });
        }
    });

    core.action_registry.add('dashboard', AwesomeDashboard);

    return AwesomeDashboard;
});




// /** odoo 18-module **/

// import { Component } from "@odoo/owl";
// import { registry } from "@web/core/registry";

// class AwesomeDashboard extends Component {
//     static template = "awesome_dashboard.AwesomeDashboard";
// }

// registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
