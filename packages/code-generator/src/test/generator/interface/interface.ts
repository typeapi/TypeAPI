/// <reference path="./definitions.ts" />

import { IContext, IResult, IApiInterface } from '@typeapi/api-router';

export interface IController {
    /**
     * Add a new pet to the store
     * @path /pet
     * @method POST
     * @tags pet
     * @security petstore_auth
     */
    addPet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<
        IResult<405, 'Invalid input'>
    >;
    /**
     * Update an existing pet
     * @path /pet
     * @method PUT
     * @tags pet
     * @security petstore_auth
     */
    updatePet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'> |
        IResult<405, 'Validation exception'>
    >;
    /**
     * Finds Pets by status
     * Multiple status values can be provided with comma separated strings
     * @path /pet/findByStatus
     * @method GET
     * @tags pet
     * @security petstore_auth
     * @param status - {array:string:required} Status values that need to be considered for filter
     */
    findPetsByStatus({
        query: { status }
    }: Parameters.FindPetsByStatus, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet[]> |
        IResult<400, 'Invalid status value'>
    >;
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
    findPetsByTags({
        query: { tags }
    }: Parameters.FindPetsByTags, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet[]> |
        IResult<400, 'Invalid tag value'>
    >;
    /**
     * Find pet by ID
     * Returns a single pet
     * @path /pet/{petId}
     * @method GET
     * @tags pet
     * @security api_key
     * @param petId - {integer:int64:required} ID of pet to return
     */
    getPetById({
        path: { petId }
    }: Parameters.GetPetById, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet> |
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'>
    >;
    /**
     * Updates a pet in the store with form data
     * @path /pet/{petId}
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet that needs to be updated
     */
    updatePetWithForm({
        path: { petId }
    }: Parameters.UpdatePetWithForm, body: Schemas.UpdatePetWithFormRequestBody, context: IContext): Promise<
        IResult<405, 'Invalid input'>
    >;
    /**
     * Deletes a pet
     * @path /pet/{petId}
     * @method DELETE
     * @tags pet
     * @security petstore_auth
     * @param api_key - {string} 
     * @param petId - {integer:int64:required} Pet id to delete
     */
    deletePet({
        header: { api_key },
        path: { petId }
    }: Parameters.DeletePet, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'>
    >;
    /**
     * uploads an image
     * @path /pet/{petId}/uploadImage
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet to update
     */
    uploadFile({
        path: { petId }
    }: Parameters.UploadFile, body: Schemas.UploadFileRequestBody, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.ApiResponse>
    >;
    /**
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     * @path /store/inventory
     * @method GET
     * @tags store
     * @security api_key
     */
    getInventory(parameters: undefined, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Schemas.GetInventoryResponse200>
    >;
    /**
     * Place an order for a pet
     * @path /store/order
     * @method POST
     * @tags store
     */
    placeOrder(parameters: undefined, body: Components.Schemas.Order, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Order> |
        IResult<400, 'Invalid Order'>
    >;
    /**
     * Find purchase order by ID
     * For valid response try integer IDs with value >= 1 and <= 10.\ \ Other values will generated exceptions
     * @path /store/order/{orderId}
     * @method GET
     * @tags store
     * @param orderId - {integer:int64:required} ID of pet that needs to be fetched
     */
    getOrderById({
        path: { orderId }
    }: Parameters.GetOrderById, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Order> |
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Order not found'>
    >;
    /**
     * Delete purchase order by ID
     * For valid response try integer IDs with positive integer value.\ \ Negative or non-integer values will generate API errors
     * @path /store/order/{orderId}
     * @method DELETE
     * @tags store
     * @param orderId - {integer:int64:required} ID of the order that needs to be deleted
     */
    deleteOrder({
        path: { orderId }
    }: Parameters.DeleteOrder, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Order not found'>
    >;
    /**
     * Create user
     * This can only be done by the logged in user.
     * @path /user
     * @method POST
     * @tags user
     */
    createUser(parameters: undefined, body: Components.Schemas.User, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    >;
    /**
     * Creates list of users with given input array
     * @path /user/createWithArray
     * @method POST
     * @tags user
     */
    createUsersWithArrayInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    >;
    /**
     * Creates list of users with given input array
     * @path /user/createWithList
     * @method POST
     * @tags user
     */
    createUsersWithListInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    >;
    /**
     * Logs user into the system
     * @path /user/login
     * @method GET
     * @tags user
     * @param username - {string:required} The user name for login
     * @param password - {string:required} The password for login in clear text
     */
    loginUser({
        query: { username, password }
    }: Parameters.LoginUser, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Schemas.LoginUserResponse200> |
        IResult<400, 'Invalid username/password supplied'>
    >;
    /**
     * Logs out current logged in user session
     * @path /user/logout
     * @method GET
     * @tags user
     */
    logoutUser(parameters: undefined, body: undefined, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    >;
    /**
     * Get user by user name
     * @path /user/{username}
     * @method GET
     * @tags user
     * @param username - {string:required} The name that needs to be fetched. Use user1 for testing.
     */
    getUserByName({
        path: { username }
    }: Parameters.GetUserByName, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.User> |
        IResult<400, 'Invalid username supplied'> |
        IResult<404, 'User not found'>
    >;
    /**
     * Updated user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method PUT
     * @tags user
     * @param username - {string:required} name that need to be updated
     */
    updateUser({
        path: { username }
    }: Parameters.UpdateUser, body: Components.Schemas.User, context: IContext): Promise<
        IResult<400, 'Invalid user supplied'> |
        IResult<404, 'User not found'>
    >;
    /**
     * Delete user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method DELETE
     * @tags user
     * @param username - {string:required} The name that needs to be deleted
     */
    deleteUser({
        path: { username }
    }: Parameters.DeleteUser, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid username supplied'> |
        IResult<404, 'User not found'>
    >;
}

export var apiInterface: IApiInterface = {
    openapiName: 'SwaggerPetstore',
    controllerName: '',
    serverUrl: 'http://petstore.swagger.io/v1',
    security: {
    "petstore_auth": {
        "type": "oauth2",
        "flows": {
            "implicit": {
                "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
                "scopes": {
                    "write:pets": "modify pets in your account",
                    "read:pets": "read your pets"
                }
            }
        }
    },
    "api_key": {
        "type": "apiKey",
        "name": "api_key",
        "in": "header"
    }
},
    operations: <any>[
    {
        "path": "/pet",
        "method": "post",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Add a new pet to the store",
            "operationId": "addPet",
            "responses": {
                "405": {
                    "description": "Invalid input"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "requestBody": {
                "x-typeapi-request-body": "Components.RequestBodies.Pet",
                "content": {
                    "application/json": {
                        "schema": {
                            "$id": "#/components/requestBodies/Pet",
                            "type": "object",
                            "required": [
                                "name",
                                "photoUrls"
                            ],
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "category": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "integer",
                                            "format": "int64"
                                        },
                                        "name": {
                                            "type": "string"
                                        }
                                    },
                                    "$id": "#/components/schemas/Category"
                                },
                                "name": {
                                    "type": "string",
                                    "example": "doggie"
                                },
                                "photoUrls": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "tags": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "format": "int64"
                                            },
                                            "name": {
                                                "type": "string"
                                            }
                                        },
                                        "$id": "#/components/schemas/Tag"
                                    }
                                },
                                "status": {
                                    "type": "string",
                                    "description": "pet status in the store",
                                    "enum": [
                                        "available",
                                        "pending",
                                        "sold"
                                    ]
                                }
                            }
                        }
                    }
                },
                "description": "Pet object that needs to be added to the store",
                "required": true
            },
            "x-typeapi-operation-namespace": "AddPet"
        }
    },
    {
        "path": "/pet",
        "method": "put",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Update an existing pet",
            "operationId": "updatePet",
            "responses": {
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Pet not found"
                },
                "405": {
                    "description": "Validation exception"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "requestBody": {
                "x-typeapi-request-body": "Components.RequestBodies.Pet",
                "content": {
                    "application/json": {
                        "schema": {
                            "$id": "#/components/requestBodies/Pet",
                            "type": "object",
                            "required": [
                                "name",
                                "photoUrls"
                            ],
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "category": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "integer",
                                            "format": "int64"
                                        },
                                        "name": {
                                            "type": "string"
                                        }
                                    },
                                    "$id": "#/components/schemas/Category"
                                },
                                "name": {
                                    "type": "string",
                                    "example": "doggie"
                                },
                                "photoUrls": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "tags": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "format": "int64"
                                            },
                                            "name": {
                                                "type": "string"
                                            }
                                        },
                                        "$id": "#/components/schemas/Tag"
                                    }
                                },
                                "status": {
                                    "type": "string",
                                    "description": "pet status in the store",
                                    "enum": [
                                        "available",
                                        "pending",
                                        "sold"
                                    ]
                                }
                            }
                        }
                    }
                },
                "description": "Pet object that needs to be added to the store",
                "required": true
            },
            "x-typeapi-operation-namespace": "UpdatePet"
        }
    },
    {
        "path": "/pet/findByStatus",
        "method": "get",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Finds Pets by status",
            "description": "Multiple status values can be provided with comma separated strings",
            "operationId": "findPetsByStatus",
            "parameters": [
                {
                    "name": "status",
                    "in": "query",
                    "description": "Status values that need to be considered for filter",
                    "required": true,
                    "explode": true,
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "available",
                                "pending",
                                "sold"
                            ],
                            "default": "available"
                        },
                        "$id": "#/paths/findPetsByStatus/parameters/status"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "name",
                                        "photoUrls"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "integer",
                                            "format": "int64"
                                        },
                                        "category": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "integer",
                                                    "format": "int64"
                                                },
                                                "name": {
                                                    "type": "string"
                                                }
                                            },
                                            "$id": "#/components/schemas/Category"
                                        },
                                        "name": {
                                            "type": "string",
                                            "example": "doggie"
                                        },
                                        "photoUrls": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        },
                                        "tags": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer",
                                                        "format": "int64"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    }
                                                },
                                                "$id": "#/components/schemas/Tag"
                                            }
                                        },
                                        "status": {
                                            "type": "string",
                                            "description": "pet status in the store",
                                            "enum": [
                                                "available",
                                                "pending",
                                                "sold"
                                            ]
                                        }
                                    },
                                    "$id": "#/components/schemas/Pet"
                                },
                                "$id": "#/paths/findPetsByStatus/responses/$200"
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.Pet[]"
                },
                "400": {
                    "description": "Invalid status value"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "x-typeapi-operation-namespace": "FindPetsByStatus",
            "x-typeapi-parameters-type": "Parameters.FindPetsByStatus",
            "x-typeapi-parameters-interface": [
                [
                    "query",
                    "Paths.FindPetsByStatus.QueryParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "query": {
                    "properties": {
                        "status": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "available",
                                    "pending",
                                    "sold"
                                ],
                                "default": "available"
                            }
                        }
                    },
                    "required": [
                        "status"
                    ]
                }
            }
        }
    },
    {
        "path": "/pet/findByTags",
        "method": "get",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Finds Pets by tags",
            "description": "Muliple tags can be provided with comma separated strings. Use\\ \\ tag1, tag2, tag3 for testing.",
            "operationId": "findPetsByTags",
            "parameters": [
                {
                    "name": "tags",
                    "in": "query",
                    "description": "Tags to filter by",
                    "required": true,
                    "explode": true,
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "$id": "#/paths/findPetsByTags/parameters/tags"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "name",
                                        "photoUrls"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "integer",
                                            "format": "int64"
                                        },
                                        "category": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "integer",
                                                    "format": "int64"
                                                },
                                                "name": {
                                                    "type": "string"
                                                }
                                            },
                                            "$id": "#/components/schemas/Category"
                                        },
                                        "name": {
                                            "type": "string",
                                            "example": "doggie"
                                        },
                                        "photoUrls": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        },
                                        "tags": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer",
                                                        "format": "int64"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    }
                                                },
                                                "$id": "#/components/schemas/Tag"
                                            }
                                        },
                                        "status": {
                                            "type": "string",
                                            "description": "pet status in the store",
                                            "enum": [
                                                "available",
                                                "pending",
                                                "sold"
                                            ]
                                        }
                                    },
                                    "$id": "#/components/schemas/Pet"
                                },
                                "$id": "#/paths/findPetsByTags/responses/$200"
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.Pet[]"
                },
                "400": {
                    "description": "Invalid tag value"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "deprecated": true,
            "x-typeapi-operation-namespace": "FindPetsByTags",
            "x-typeapi-parameters-type": "Parameters.FindPetsByTags",
            "x-typeapi-parameters-interface": [
                [
                    "query",
                    "Paths.FindPetsByTags.QueryParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "query": {
                    "properties": {
                        "tags": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "tags"
                    ]
                }
            }
        }
    },
    {
        "path": "/pet/{petId}",
        "method": "get",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Find pet by ID",
            "description": "Returns a single pet",
            "operationId": "getPetById",
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet to return",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "$id": "#/paths/getPetById/parameters/petId"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$id": "#/paths/getPetById/responses/$200",
                                "type": "object",
                                "required": [
                                    "name",
                                    "photoUrls"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "category": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "format": "int64"
                                            },
                                            "name": {
                                                "type": "string"
                                            }
                                        },
                                        "$id": "#/components/schemas/Category"
                                    },
                                    "name": {
                                        "type": "string",
                                        "example": "doggie"
                                    },
                                    "photoUrls": {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "tags": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "integer",
                                                    "format": "int64"
                                                },
                                                "name": {
                                                    "type": "string"
                                                }
                                            },
                                            "$id": "#/components/schemas/Tag"
                                        }
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "pet status in the store",
                                        "enum": [
                                            "available",
                                            "pending",
                                            "sold"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.Pet"
                },
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Pet not found"
                }
            },
            "security": [
                {
                    "api_key": []
                }
            ],
            "x-typeapi-operation-namespace": "GetPetById",
            "x-typeapi-parameters-type": "Parameters.GetPetById",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.GetPetById.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "petId": {
                            "type": "integer",
                            "format": "int64"
                        }
                    },
                    "required": [
                        "petId"
                    ]
                }
            }
        }
    },
    {
        "path": "/pet/{petId}",
        "method": "post",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Updates a pet in the store with form data",
            "operationId": "updatePetWithForm",
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet that needs to be updated",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "$id": "#/paths/updatePetWithForm/parameters/petId"
                    }
                }
            ],
            "responses": {
                "405": {
                    "description": "Invalid input"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "requestBody": {
                "content": {
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "description": "Updated name of the pet",
                                    "type": "string"
                                },
                                "status": {
                                    "description": "Updated status of the pet",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "x-typeapi-request-body": "Schemas.UpdatePetWithFormRequestBody"
            },
            "x-typeapi-operation-namespace": "UpdatePetWithForm",
            "x-typeapi-parameters-type": "Parameters.UpdatePetWithForm",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.UpdatePetWithForm.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "petId": {
                            "type": "integer",
                            "format": "int64"
                        }
                    },
                    "required": [
                        "petId"
                    ]
                }
            }
        }
    },
    {
        "path": "/pet/{petId}",
        "method": "delete",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "Deletes a pet",
            "operationId": "deletePet",
            "parameters": [
                {
                    "name": "api_key",
                    "in": "header",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/deletePet/parameters/api_key"
                    }
                },
                {
                    "name": "petId",
                    "in": "path",
                    "description": "Pet id to delete",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "$id": "#/paths/deletePet/parameters/petId"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Pet not found"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "x-typeapi-operation-namespace": "DeletePet",
            "x-typeapi-parameters-type": "Parameters.DeletePet",
            "x-typeapi-parameters-interface": [
                [
                    "header",
                    "Paths.DeletePet.HeaderParameters"
                ],
                [
                    "path",
                    "Paths.DeletePet.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "headers": {
                    "properties": {
                        "api_key": {
                            "type": "string"
                        }
                    },
                    "required": []
                },
                "path": {
                    "properties": {
                        "petId": {
                            "type": "integer",
                            "format": "int64"
                        }
                    },
                    "required": [
                        "petId"
                    ]
                }
            }
        }
    },
    {
        "path": "/pet/{petId}/uploadImage",
        "method": "post",
        "operation": {
            "tags": [
                "pet"
            ],
            "summary": "uploads an image",
            "operationId": "uploadFile",
            "parameters": [
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet to update",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "$id": "#/paths/uploadFile/parameters/petId"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$id": "#/paths/uploadFile/responses/$200",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "type": "integer",
                                        "format": "int32"
                                    },
                                    "type": {
                                        "type": "string"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.ApiResponse"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write:pets",
                        "read:pets"
                    ]
                }
            ],
            "requestBody": {
                "content": {
                    "application/octet-stream": {
                        "schema": {
                            "type": "string",
                            "format": "binary"
                        }
                    }
                },
                "x-typeapi-request-body": "Schemas.UploadFileRequestBody"
            },
            "x-typeapi-operation-namespace": "UploadFile",
            "x-typeapi-parameters-type": "Parameters.UploadFile",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.UploadFile.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "petId": {
                            "type": "integer",
                            "format": "int64"
                        }
                    },
                    "required": [
                        "petId"
                    ]
                }
            }
        }
    },
    {
        "path": "/store/inventory",
        "method": "get",
        "operation": {
            "tags": [
                "store"
            ],
            "summary": "Returns pet inventories by status",
            "description": "Returns a map of status codes to quantities",
            "operationId": "getInventory",
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "additionalProperties": {
                                    "type": "integer",
                                    "format": "int32"
                                },
                                "$id": "#/paths/getInventory/responses/$200"
                            }
                        }
                    },
                    "x-typeapi-response": "Schemas.GetInventoryResponse200"
                }
            },
            "security": [
                {
                    "api_key": []
                }
            ],
            "x-typeapi-operation-namespace": "GetInventory"
        }
    },
    {
        "path": "/store/order",
        "method": "post",
        "operation": {
            "tags": [
                "store"
            ],
            "summary": "Place an order for a pet",
            "operationId": "placeOrder",
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$id": "#/paths/placeOrder/responses/$200",
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "petId": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "quantity": {
                                        "type": "integer",
                                        "format": "int32"
                                    },
                                    "shipDate": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Order Status",
                                        "enum": [
                                            "placed",
                                            "approved",
                                            "delivered"
                                        ]
                                    },
                                    "complete": {
                                        "type": "boolean",
                                        "default": false
                                    }
                                }
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.Order"
                },
                "400": {
                    "description": "Invalid Order"
                }
            },
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$id": "#/paths/placeOrder/requestBody",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "petId": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "quantity": {
                                    "type": "integer",
                                    "format": "int32"
                                },
                                "shipDate": {
                                    "type": "string",
                                    "format": "date-time"
                                },
                                "status": {
                                    "type": "string",
                                    "description": "Order Status",
                                    "enum": [
                                        "placed",
                                        "approved",
                                        "delivered"
                                    ]
                                },
                                "complete": {
                                    "type": "boolean",
                                    "default": false
                                }
                            }
                        }
                    }
                },
                "description": "order placed for purchasing the pet",
                "required": true,
                "x-typeapi-request-body": "Components.Schemas.Order"
            },
            "x-typeapi-operation-namespace": "PlaceOrder"
        }
    },
    {
        "path": "/store/order/{orderId}",
        "method": "get",
        "operation": {
            "tags": [
                "store"
            ],
            "summary": "Find purchase order by ID",
            "description": "For valid response try integer IDs with value >= 1 and <= 10.\\ \\ Other values will generated exceptions",
            "operationId": "getOrderById",
            "parameters": [
                {
                    "name": "orderId",
                    "in": "path",
                    "description": "ID of pet that needs to be fetched",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "minimum": 1,
                        "maximum": 10,
                        "$id": "#/paths/getOrderById/parameters/orderId"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$id": "#/paths/getOrderById/responses/$200",
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "petId": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "quantity": {
                                        "type": "integer",
                                        "format": "int32"
                                    },
                                    "shipDate": {
                                        "type": "string",
                                        "format": "date-time"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Order Status",
                                        "enum": [
                                            "placed",
                                            "approved",
                                            "delivered"
                                        ]
                                    },
                                    "complete": {
                                        "type": "boolean",
                                        "default": false
                                    }
                                }
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.Order"
                },
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Order not found"
                }
            },
            "x-typeapi-operation-namespace": "GetOrderById",
            "x-typeapi-parameters-type": "Parameters.GetOrderById",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.GetOrderById.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "orderId": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1,
                            "maximum": 10
                        }
                    },
                    "required": [
                        "orderId"
                    ]
                }
            }
        }
    },
    {
        "path": "/store/order/{orderId}",
        "method": "delete",
        "operation": {
            "tags": [
                "store"
            ],
            "summary": "Delete purchase order by ID",
            "description": "For valid response try integer IDs with positive integer value.\\ \\ Negative or non-integer values will generate API errors",
            "operationId": "deleteOrder",
            "parameters": [
                {
                    "name": "orderId",
                    "in": "path",
                    "description": "ID of the order that needs to be deleted",
                    "required": true,
                    "schema": {
                        "type": "integer",
                        "format": "int64",
                        "minimum": 1,
                        "$id": "#/paths/deleteOrder/parameters/orderId"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid ID supplied"
                },
                "404": {
                    "description": "Order not found"
                }
            },
            "x-typeapi-operation-namespace": "DeleteOrder",
            "x-typeapi-parameters-type": "Parameters.DeleteOrder",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.DeleteOrder.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "orderId": {
                            "type": "integer",
                            "format": "int64",
                            "minimum": 1
                        }
                    },
                    "required": [
                        "orderId"
                    ]
                }
            }
        }
    },
    {
        "path": "/user",
        "method": "post",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Create user",
            "description": "This can only be done by the logged in user.",
            "operationId": "createUser",
            "responses": {
                "default": {
                    "description": "successful operation"
                }
            },
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$id": "#/paths/createUser/requestBody",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "username": {
                                    "type": "string"
                                },
                                "firstName": {
                                    "type": "string"
                                },
                                "lastName": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "phone": {
                                    "type": "string"
                                },
                                "userStatus": {
                                    "type": "integer",
                                    "format": "int32",
                                    "description": "User Status"
                                }
                            }
                        }
                    }
                },
                "description": "Created user object",
                "required": true,
                "x-typeapi-request-body": "Components.Schemas.User"
            },
            "x-typeapi-operation-namespace": "CreateUser"
        }
    },
    {
        "path": "/user/createWithArray",
        "method": "post",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Creates list of users with given input array",
            "operationId": "createUsersWithArrayInput",
            "responses": {
                "default": {
                    "description": "successful operation"
                }
            },
            "requestBody": {
                "x-typeapi-request-body": "Components.RequestBodies.UserArray",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "username": {
                                        "type": "string"
                                    },
                                    "firstName": {
                                        "type": "string"
                                    },
                                    "lastName": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "phone": {
                                        "type": "string"
                                    },
                                    "userStatus": {
                                        "type": "integer",
                                        "format": "int32",
                                        "description": "User Status"
                                    }
                                },
                                "$id": "#/components/schemas/User"
                            },
                            "$id": "#/components/requestBodies/UserArray"
                        }
                    }
                },
                "description": "List of user object",
                "required": true
            },
            "x-typeapi-operation-namespace": "CreateUsersWithArrayInput"
        }
    },
    {
        "path": "/user/createWithList",
        "method": "post",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Creates list of users with given input array",
            "operationId": "createUsersWithListInput",
            "responses": {
                "default": {
                    "description": "successful operation"
                }
            },
            "requestBody": {
                "x-typeapi-request-body": "Components.RequestBodies.UserArray",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "username": {
                                        "type": "string"
                                    },
                                    "firstName": {
                                        "type": "string"
                                    },
                                    "lastName": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "phone": {
                                        "type": "string"
                                    },
                                    "userStatus": {
                                        "type": "integer",
                                        "format": "int32",
                                        "description": "User Status"
                                    }
                                },
                                "$id": "#/components/schemas/User"
                            },
                            "$id": "#/components/requestBodies/UserArray"
                        }
                    }
                },
                "description": "List of user object",
                "required": true
            },
            "x-typeapi-operation-namespace": "CreateUsersWithListInput"
        }
    },
    {
        "path": "/user/login",
        "method": "get",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Logs user into the system",
            "operationId": "loginUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "query",
                    "description": "The user name for login",
                    "required": true,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/loginUser/parameters/username"
                    }
                },
                {
                    "name": "password",
                    "in": "query",
                    "description": "The password for login in clear text",
                    "required": true,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/loginUser/parameters/password"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "headers": {
                        "X-Rate-Limit": {
                            "description": "calls per hour allowed by the user",
                            "schema": {
                                "type": "integer",
                                "format": "int32"
                            }
                        },
                        "X-Expires-After": {
                            "description": "date in UTC when token expires",
                            "schema": {
                                "type": "string",
                                "format": "date-time"
                            }
                        }
                    },
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "$id": "#/paths/loginUser/responses/$200"
                            }
                        }
                    },
                    "x-typeapi-response": "Schemas.LoginUserResponse200"
                },
                "400": {
                    "description": "Invalid username/password supplied"
                }
            },
            "x-typeapi-operation-namespace": "LoginUser",
            "x-typeapi-parameters-type": "Parameters.LoginUser",
            "x-typeapi-parameters-interface": [
                [
                    "query",
                    "Paths.LoginUser.QueryParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "query": {
                    "properties": {
                        "username": {
                            "type": "string"
                        },
                        "password": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "username",
                        "password"
                    ]
                }
            }
        }
    },
    {
        "path": "/user/logout",
        "method": "get",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Logs out current logged in user session",
            "operationId": "logoutUser",
            "responses": {
                "default": {
                    "description": "successful operation"
                }
            },
            "x-typeapi-operation-namespace": "LogoutUser"
        }
    },
    {
        "path": "/user/{username}",
        "method": "get",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Get user by user name",
            "operationId": "getUserByName",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "The name that needs to be fetched. Use user1 for testing.",
                    "required": true,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/getUserByName/parameters/username"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "successful operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$id": "#/paths/getUserByName/responses/$200",
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "username": {
                                        "type": "string"
                                    },
                                    "firstName": {
                                        "type": "string"
                                    },
                                    "lastName": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "phone": {
                                        "type": "string"
                                    },
                                    "userStatus": {
                                        "type": "integer",
                                        "format": "int32",
                                        "description": "User Status"
                                    }
                                }
                            }
                        }
                    },
                    "x-typeapi-response": "Components.Schemas.User"
                },
                "400": {
                    "description": "Invalid username supplied"
                },
                "404": {
                    "description": "User not found"
                }
            },
            "x-typeapi-operation-namespace": "GetUserByName",
            "x-typeapi-parameters-type": "Parameters.GetUserByName",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.GetUserByName.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "username": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "username"
                    ]
                }
            }
        }
    },
    {
        "path": "/user/{username}",
        "method": "put",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Updated user",
            "description": "This can only be done by the logged in user.",
            "operationId": "updateUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "name that need to be updated",
                    "required": true,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/updateUser/parameters/username"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid user supplied"
                },
                "404": {
                    "description": "User not found"
                }
            },
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$id": "#/paths/updateUser/requestBody",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "format": "int64"
                                },
                                "username": {
                                    "type": "string"
                                },
                                "firstName": {
                                    "type": "string"
                                },
                                "lastName": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "phone": {
                                    "type": "string"
                                },
                                "userStatus": {
                                    "type": "integer",
                                    "format": "int32",
                                    "description": "User Status"
                                }
                            }
                        }
                    }
                },
                "description": "Updated user object",
                "required": true,
                "x-typeapi-request-body": "Components.Schemas.User"
            },
            "x-typeapi-operation-namespace": "UpdateUser",
            "x-typeapi-parameters-type": "Parameters.UpdateUser",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.UpdateUser.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "username": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "username"
                    ]
                }
            }
        }
    },
    {
        "path": "/user/{username}",
        "method": "delete",
        "operation": {
            "tags": [
                "user"
            ],
            "summary": "Delete user",
            "description": "This can only be done by the logged in user.",
            "operationId": "deleteUser",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "description": "The name that needs to be deleted",
                    "required": true,
                    "schema": {
                        "type": "string",
                        "$id": "#/paths/deleteUser/parameters/username"
                    }
                }
            ],
            "responses": {
                "400": {
                    "description": "Invalid username supplied"
                },
                "404": {
                    "description": "User not found"
                }
            },
            "x-typeapi-operation-namespace": "DeleteUser",
            "x-typeapi-parameters-type": "Parameters.DeleteUser",
            "x-typeapi-parameters-interface": [
                [
                    "path",
                    "Paths.DeleteUser.PathParameters"
                ]
            ],
            "x-typeapi-parameters-schema": {
                "path": {
                    "properties": {
                        "username": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "username"
                    ]
                }
            }
        }
    }
]
}
