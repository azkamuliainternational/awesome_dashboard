odoo.define('awesome_dashboard.dashboard_function', function (require) {
    "use strict";

    var rpc = require('web.rpc');
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var ChartRenderer = require('awesome_dashboard.chart_renderer');  // Import the chart renderer

    var AwesomeDashboard = AbstractAction.extend({
        template: 'qwebdashboard',

        start: function () {
            this._super.apply(this, arguments);

            this._renderChartActivity();  // Call the imported function
            this._addSelectEventListener();
            this._fetchStatistics(); 
            
            console.log("Awesome Dashboard Loaded");
        },
        
        _fetchStatistics: function () {
            var result = rpc.query({ route: '/awesome_dashboard/statistics' });

            if (result && typeof result.then === 'function') {
                result.then(function (data) {
                    console.log("Statistics:", data);
                }).fail(function (error) {
                    console.error("Error fetching statistics:", error);
                });
            } else {
                console.error("rpc.query() did not return a Promise");
            }
        },
        
        _addSelectEventListener: function () {
            const mySelect = this.$el.find('#select_periode');
            if (mySelect.length) {
                mySelect.on('change', this._onSelectChange.bind(this));
            }
        },

        _onSelectChange: function (event) {
            var selectedValue = $(event.target).val();
            console.log("Selected option:", selectedValue);

            if (selectedValue == 'today') {
                $('#table').removeClass('hidden');
                $('#chart').addClass('hidden');
                $('#select_month').addClass('invisible');
                $('#select_year').addClass('invisible');
            } else {
                $('#table').addClass('hidden');
                $('#chart').removeClass('hidden');

                if (selectedValue == 'custom') {
                    $('#select_month').removeClass('invisible');
                    $('#select_year').removeClass('invisible');
                } else {
                    $('#select_month').addClass('invisible');
                    $('#select_year').addClass('invisible');
                }
            }
        },

        _renderChartActivity: function () {
            ChartRenderer.renderChartActivity(this.$el);
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