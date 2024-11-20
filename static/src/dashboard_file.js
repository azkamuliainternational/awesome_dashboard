odoo.define('awesome_dashboard.dashboard_function', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');

    var AwesomeDashboard = AbstractAction.extend({
        template: 'dashboard',
        start: function () {
            this._super.apply(this, arguments);
            console.log("Awesome Dashboard Loaded");
        },
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
