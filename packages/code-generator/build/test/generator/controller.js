"use strict";
/// <reference path="./interface/definitions.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_router_1 = require("@typeapi/api-router");
// export apiInterface for register/apiRouter usage.
var interface_1 = require("./interface/interface");
exports.apiInterface = interface_1.apiInterface;
var Controller = /** @class */ (function () {
    function Controller(options) {
        this.options = options;
    }
    /**
     * for register apiRouter event or plugin.
     * @param apiRouter - inject apiRouter instance at runtime.
     */
    Controller.prototype.apiRouterRegister = function (apiRouter) {
        //// register events or plugins here
        // apiRouter.preRouting(async (ctx) => console.log('invoke preRouting.'), true);
        // apiRouter.postRouting(async (ctx) => console.log('invoke postRouting.'));
        // apiRouter.onError(async (ctx, err) => console.log('invoke onError.'));
        // apiRouter.setPlugin(new Plugin(options));
        // apiRouter.setStatusCode('default', 200);
    };
    /**
     * Add a new pet to the store
     * @path /pet
     * @method POST
     * @tags pet
     * @security petstore_auth
     */
    Controller.prototype.addPet = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Update an existing pet
     * @path /pet
     * @method PUT
     * @tags pet
     * @security petstore_auth
     */
    Controller.prototype.updatePet = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Finds Pets by status
     * Multiple status values can be provided with comma separated strings
     * @path /pet/findByStatus
     * @method GET
     * @tags pet
     * @security petstore_auth
     * @param status - {array:string:required} Status values that need to be considered for filter
     */
    Controller.prototype.findPetsByStatus = function (_a, body, context) {
        var status = _a.query.status;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Finds Pets by tags
     * Muliple tags can be provided with comma separated strings. Use\ \ tag1, tag2, tag3 for testing.
     * @path /pet/findByTags
     * @method GET
     * @tags pet
     * @security petstore_auth
     * @param tags - {array:string:required} Tags to filter by
     * ***************************** *
     * This api has been deprecated. *
     * ***************************** *
     */
    Controller.prototype.findPetsByTags = function (_a, body, context) {
        var tags = _a.query.tags;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Find pet by ID
     * Returns a single pet
     * @path /pet/{petId}
     * @method GET
     * @tags pet
     * @security api_key
     * @param petId - {integer:int64:required} ID of pet to return
     */
    Controller.prototype.getPetById = function (_a, body, context) {
        var petId = _a.path.petId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Updates a pet in the store with form data
     * @path /pet/{petId}
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet that needs to be updated
     */
    Controller.prototype.updatePetWithForm = function (_a, body, context) {
        var petId = _a.path.petId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Deletes a pet
     * @path /pet/{petId}
     * @method DELETE
     * @tags pet
     * @security petstore_auth
     * @param api_key - {string}
     * @param petId - {integer:int64:required} Pet id to delete
     */
    Controller.prototype.deletePet = function (_a, body, context) {
        var api_key = _a.header.api_key, petId = _a.path.petId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * uploads an image
     * @path /pet/{petId}/uploadImage
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet to update
     */
    Controller.prototype.uploadFile = function (_a, body, context) {
        var petId = _a.path.petId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     * @path /store/inventory
     * @method GET
     * @tags store
     * @security api_key
     */
    Controller.prototype.getInventory = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Place an order for a pet
     * @path /store/order
     * @method POST
     * @tags store
     */
    Controller.prototype.placeOrder = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Find purchase order by ID
     * For valid response try integer IDs with value >= 1 and <= 10.\ \ Other values will generated exceptions
     * @path /store/order/{orderId}
     * @method GET
     * @tags store
     * @param orderId - {integer:int64:required} ID of pet that needs to be fetched
     */
    Controller.prototype.getOrderById = function (_a, body, context) {
        var orderId = _a.path.orderId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Delete purchase order by ID
     * For valid response try integer IDs with positive integer value.\ \ Negative or non-integer values will generate API errors
     * @path /store/order/{orderId}
     * @method DELETE
     * @tags store
     * @param orderId - {integer:int64:required} ID of the order that needs to be deleted
     */
    Controller.prototype.deleteOrder = function (_a, body, context) {
        var orderId = _a.path.orderId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Create user
     * This can only be done by the logged in user.
     * @path /user
     * @method POST
     * @tags user
     */
    Controller.prototype.createUser = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Creates list of users with given input array
     * @path /user/createWithArray
     * @method POST
     * @tags user
     */
    Controller.prototype.createUsersWithArrayInput = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Creates list of users with given input array
     * @path /user/createWithList
     * @method POST
     * @tags user
     */
    Controller.prototype.createUsersWithListInput = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Logs user into the system
     * @path /user/login
     * @method GET
     * @tags user
     * @param username - {string:required} The user name for login
     * @param password - {string:required} The password for login in clear text
     */
    Controller.prototype.loginUser = function (_a, body, context) {
        var _b = _a.query, username = _b.username, password = _b.password;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Logs out current logged in user session
     * @path /user/logout
     * @method GET
     * @tags user
     */
    Controller.prototype.logoutUser = function (parameters, body, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Get user by user name
     * @path /user/{username}
     * @method GET
     * @tags user
     * @param username - {string:required} The name that needs to be fetched. Use user1 for testing.
     */
    Controller.prototype.getUserByName = function (_a, body, context) {
        var username = _a.path.username;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Updated user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method PUT
     * @tags user
     * @param username - {string:required} name that need to be updated
     */
    Controller.prototype.updateUser = function (_a, body, context) {
        var username = _a.path.username;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    /**
     * Delete user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method DELETE
     * @tags user
     * @param username - {string:required} The name that needs to be deleted
     */
    Controller.prototype.deleteUser = function (_a, body, context) {
        var username = _a.path.username;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new api_router_1.ApiError(500, 'not implements');
            });
        });
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map