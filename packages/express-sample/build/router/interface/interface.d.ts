/// <reference path="definitions.d.ts" />
import { IContext, IResult, IApiInterface } from '@typeapi/api-router';
export interface IController {
    /**
     * Add a new pet to the store
     * @path /pet
     * @method POST
     * @tags pet
     * @security petstore_auth
     */
    addPet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<IResult<405, 'Invalid input'>>;
    /**
     * Update an existing pet
     * @path /pet
     * @method PUT
     * @tags pet
     * @security petstore_auth
     */
    updatePet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<IResult<400, 'Invalid ID supplied'> | IResult<404, 'Pet not found'> | IResult<405, 'Validation exception'>>;
    /**
     * Finds Pets by status
     * Multiple status values can be provided with comma separated strings
     * @path /pet/findByStatus
     * @method GET
     * @tags pet
     * @security petstore_auth
     * @param status - {array:string:required} Status values that need to be considered for filter
     */
    findPetsByStatus({ query: { status } }: Parameters.FindPetsByStatus, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.Pet[]> | IResult<400, 'Invalid status value'>>;
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
    findPetsByTags({ query: { tags } }: Parameters.FindPetsByTags, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.Pet[]> | IResult<400, 'Invalid tag value'>>;
    /**
     * Find pet by ID
     * Returns a single pet
     * @path /pet/{petId}
     * @method GET
     * @tags pet
     * @security api_key
     * @param petId - {integer:int64:required} ID of pet to return
     */
    getPetById({ path: { petId } }: Parameters.GetPetById, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.Pet> | IResult<400, 'Invalid ID supplied'> | IResult<404, 'Pet not found'>>;
    /**
     * Updates a pet in the store with form data
     * @path /pet/{petId}
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet that needs to be updated
     */
    updatePetWithForm({ path: { petId } }: Parameters.UpdatePetWithForm, body: Schemas.UpdatePetWithFormRequestBody, context: IContext): Promise<IResult<405, 'Invalid input'>>;
    /**
     * Deletes a pet
     * @path /pet/{petId}
     * @method DELETE
     * @tags pet
     * @security petstore_auth
     * @param api_key - {string}
     * @param petId - {integer:int64:required} Pet id to delete
     */
    deletePet({ header: { api_key }, path: { petId } }: Parameters.DeletePet, body: undefined, context: IContext): Promise<IResult<400, 'Invalid ID supplied'> | IResult<404, 'Pet not found'>>;
    /**
     * uploads an image
     * @path /pet/{petId}/uploadImage
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet to update
     */
    uploadFile({ path: { petId } }: Parameters.UploadFile, body: Schemas.UploadFileRequestBody, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.ApiResponse>>;
    /**
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     * @path /store/inventory
     * @method GET
     * @tags store
     * @security api_key
     */
    getInventory(parameters: undefined, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Schemas.GetInventoryResponse200>>;
    /**
     * Place an order for a pet
     * @path /store/order
     * @method POST
     * @tags store
     */
    placeOrder(parameters: undefined, body: Components.Schemas.Order, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.Order> | IResult<400, 'Invalid Order'>>;
    /**
     * Find purchase order by ID
     * For valid response try integer IDs with value >= 1 and <= 10.\ \ Other values will generated exceptions
     * @path /store/order/{orderId}
     * @method GET
     * @tags store
     * @param orderId - {integer:int64:required} ID of pet that needs to be fetched
     */
    getOrderById({ path: { orderId } }: Parameters.GetOrderById, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.Order> | IResult<400, 'Invalid ID supplied'> | IResult<404, 'Order not found'>>;
    /**
     * Delete purchase order by ID
     * For valid response try integer IDs with positive integer value.\ \ Negative or non-integer values will generate API errors
     * @path /store/order/{orderId}
     * @method DELETE
     * @tags store
     * @param orderId - {integer:int64:required} ID of the order that needs to be deleted
     */
    deleteOrder({ path: { orderId } }: Parameters.DeleteOrder, body: undefined, context: IContext): Promise<IResult<400, 'Invalid ID supplied'> | IResult<404, 'Order not found'>>;
    /**
     * Create user
     * This can only be done by the logged in user.
     * @path /user
     * @method POST
     * @tags user
     */
    createUser(parameters: undefined, body: Components.Schemas.User, context: IContext): Promise<IResult<'default', 'successful operation'>>;
    /**
     * Creates list of users with given input array
     * @path /user/createWithArray
     * @method POST
     * @tags user
     */
    createUsersWithArrayInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<IResult<'default', 'successful operation'>>;
    /**
     * Creates list of users with given input array
     * @path /user/createWithList
     * @method POST
     * @tags user
     */
    createUsersWithListInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<IResult<'default', 'successful operation'>>;
    /**
     * Logs user into the system
     * @path /user/login
     * @method GET
     * @tags user
     * @param username - {string:required} The user name for login
     * @param password - {string:required} The password for login in clear text
     */
    loginUser({ query: { username, password } }: Parameters.LoginUser, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Schemas.LoginUserResponse200> | IResult<400, 'Invalid username/password supplied'>>;
    /**
     * Logs out current logged in user session
     * @path /user/logout
     * @method GET
     * @tags user
     */
    logoutUser(parameters: undefined, body: undefined, context: IContext): Promise<IResult<'default', 'successful operation'>>;
    /**
     * Get user by user name
     * @path /user/{username}
     * @method GET
     * @tags user
     * @param username - {string:required} The name that needs to be fetched. Use user1 for testing.
     */
    getUserByName({ path: { username } }: Parameters.GetUserByName, body: undefined, context: IContext): Promise<IResult<200, 'successful operation', Components.Schemas.User> | IResult<400, 'Invalid username supplied'> | IResult<404, 'User not found'>>;
    /**
     * Updated user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method PUT
     * @tags user
     * @param username - {string:required} name that need to be updated
     */
    updateUser({ path: { username } }: Parameters.UpdateUser, body: Components.Schemas.User, context: IContext): Promise<IResult<400, 'Invalid user supplied'> | IResult<404, 'User not found'>>;
    /**
     * Delete user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method DELETE
     * @tags user
     * @param username - {string:required} The name that needs to be deleted
     */
    deleteUser({ path: { username } }: Parameters.DeleteUser, body: undefined, context: IContext): Promise<IResult<400, 'Invalid username supplied'> | IResult<404, 'User not found'>>;
}
export declare var apiInterface: IApiInterface;
//# sourceMappingURL=interface.d.ts.map