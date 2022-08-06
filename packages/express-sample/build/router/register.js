"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_router_1 = require("@typeapi/api-router");
var controller = require("./controller");
var security_1 = require("./security");
var plugins_1 = require("./plugins");
exports.Controllers = { controller: controller };
function register(connector, optionsOrRegisters, routerRegister) {
    var controllerOptions = {};
    if (optionsOrRegisters instanceof Function)
        routerRegister = optionsOrRegisters;
    else if (typeof optionsOrRegisters === 'object' && optionsOrRegisters !== null)
        controllerOptions = optionsOrRegisters;
    var security = new api_router_1.ApiSecurity({ controller: new security_1.Security(controllerOptions) });
    Object.keys(exports.Controllers).forEach(function (ctrlName) {
        var Ctrl = exports.Controllers[ctrlName];
        var controller = new Ctrl.Controller(controllerOptions);
        var apiRouter = new api_router_1.ApiRouter({ apiInterface: Ctrl.apiInterface, controller: controller, security: security, plugins: plugins_1.plugins });
        routerRegister && routerRegister(apiRouter);
        apiRouter.registerApis(connector);
    });
    return connector;
}
exports.register = register;
exports.default = register;
//# sourceMappingURL=register.js.map