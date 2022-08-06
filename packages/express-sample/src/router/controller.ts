/// <reference path="./interface/definitions.ts" />

import { ApiRouter, IResult, ApiError, IRouterRegister } from '@typeapi/api-router';
import { IConnection } from '@typeapi/api-router';
// if you want use connector specific object in context.connection, import IConnection from connector module. ex:
// import { IConnection } from '@typeapi/express-connector';

import { IController } from './interface/interface';
// export apiInterface for register/apiRouter usage.
export { apiInterface } from './interface/interface';

import { IContext as ISecurityContext } from './security';
import { IContext as IPluginsContext } from './plugins';
interface IContext extends ISecurityContext<IConnection>, IPluginsContext {
    // extend context type from plugin or events, like parsed user from security. ex:
    // user?: { name: string, age?: number }
}
export interface IOptions {
    // define service object type which passed in options from register. ex:
    // dbConn: db;
}

export class Controller implements IController, IRouterRegister {
    constructor(private options?: IOptions) {
    }
    /**
     * for register apiRouter event or plugin.
     * @param apiRouter - inject apiRouter instance at runtime.
     */
    apiRouterRegister(apiRouter: ApiRouter): void {
        //// register events or plugins here
        // apiRouter.preRouting(async (ctx) => console.log('invoke preRouting.'), true);
        // apiRouter.postRouting(async (ctx) => console.log('invoke postRouting.'));
        // apiRouter.onError(async (ctx, err) => console.log('invoke onError.'));
        // apiRouter.setPlugin(new Plugin(options));
        // apiRouter.setStatusCode('default', 200);
    }
    /**
     * Add a new pet to the store
     * @path /pet
     * @method POST
     * @tags pet
     * @security petstore_auth
     */
    async addPet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<
        IResult<405, 'Invalid input'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Update an existing pet
     * @path /pet
     * @method PUT
     * @tags pet
     * @security petstore_auth
     */
    async updatePet(parameters: undefined, body: Components.RequestBodies.Pet, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'> |
        IResult<405, 'Validation exception'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Finds Pets by status
     * Multiple status values can be provided with comma separated strings
     * @path /pet/findByStatus
     * @method GET
     * @tags pet
     * @security petstore_auth
     * @param status - {array:string:required} Status values that need to be considered for filter
     */
    async findPetsByStatus({
        query: { status }
    }: Parameters.FindPetsByStatus, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet[]> |
        IResult<400, 'Invalid status value'>
    > {
        throw new ApiError(500, 'not implements');
    }
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
    async findPetsByTags({
        query: { tags }
    }: Parameters.FindPetsByTags, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet[]> |
        IResult<400, 'Invalid tag value'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Find pet by ID
     * Returns a single pet
     * @path /pet/{petId}
     * @method GET
     * @tags pet
     * @security api_key
     * @param petId - {integer:int64:required} ID of pet to return
     */
    async getPetById({
        path: { petId }
    }: Parameters.GetPetById, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Pet> |
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Updates a pet in the store with form data
     * @path /pet/{petId}
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet that needs to be updated
     */
    async updatePetWithForm({
        path: { petId }
    }: Parameters.UpdatePetWithForm, body: Schemas.UpdatePetWithFormRequestBody, context: IContext): Promise<
        IResult<405, 'Invalid input'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Deletes a pet
     * @path /pet/{petId}
     * @method DELETE
     * @tags pet
     * @security petstore_auth
     * @param api_key - {string} 
     * @param petId - {integer:int64:required} Pet id to delete
     */
    async deletePet({
        header: { api_key },
        path: { petId }
    }: Parameters.DeletePet, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Pet not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * uploads an image
     * @path /pet/{petId}/uploadImage
     * @method POST
     * @tags pet
     * @security petstore_auth
     * @param petId - {integer:int64:required} ID of pet to update
     */
    async uploadFile({
        path: { petId }
    }: Parameters.UploadFile, body: Schemas.UploadFileRequestBody, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.ApiResponse>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     * @path /store/inventory
     * @method GET
     * @tags store
     * @security api_key
     */
    async getInventory(parameters: undefined, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Schemas.GetInventoryResponse200>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Place an order for a pet
     * @path /store/order
     * @method POST
     * @tags store
     */
    async placeOrder(parameters: undefined, body: Components.Schemas.Order, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Order> |
        IResult<400, 'Invalid Order'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Find purchase order by ID
     * For valid response try integer IDs with value >= 1 and <= 10.\ \ Other values will generated exceptions
     * @path /store/order/{orderId}
     * @method GET
     * @tags store
     * @param orderId - {integer:int64:required} ID of pet that needs to be fetched
     */
    async getOrderById({
        path: { orderId }
    }: Parameters.GetOrderById, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.Order> |
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Order not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Delete purchase order by ID
     * For valid response try integer IDs with positive integer value.\ \ Negative or non-integer values will generate API errors
     * @path /store/order/{orderId}
     * @method DELETE
     * @tags store
     * @param orderId - {integer:int64:required} ID of the order that needs to be deleted
     */
    async deleteOrder({
        path: { orderId }
    }: Parameters.DeleteOrder, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid ID supplied'> |
        IResult<404, 'Order not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Create user
     * This can only be done by the logged in user.
     * @path /user
     * @method POST
     * @tags user
     */
    async createUser(parameters: undefined, body: Components.Schemas.User, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Creates list of users with given input array
     * @path /user/createWithArray
     * @method POST
     * @tags user
     */
    async createUsersWithArrayInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Creates list of users with given input array
     * @path /user/createWithList
     * @method POST
     * @tags user
     */
    async createUsersWithListInput(parameters: undefined, body: Components.RequestBodies.UserArray, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Logs user into the system
     * @path /user/login
     * @method GET
     * @tags user
     * @param username - {string:required} The user name for login
     * @param password - {string:required} The password for login in clear text
     */
    async loginUser({
        query: { username, password }
    }: Parameters.LoginUser, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Schemas.LoginUserResponse200> |
        IResult<400, 'Invalid username/password supplied'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Logs out current logged in user session
     * @path /user/logout
     * @method GET
     * @tags user
     */
    async logoutUser(parameters: undefined, body: undefined, context: IContext): Promise<
        IResult<'default', 'successful operation'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Get user by user name
     * @path /user/{username}
     * @method GET
     * @tags user
     * @param username - {string:required} The name that needs to be fetched. Use user1 for testing.
     */
    async getUserByName({
        path: { username }
    }: Parameters.GetUserByName, body: undefined, context: IContext): Promise<
        IResult<200, 'successful operation', Components.Schemas.User> |
        IResult<400, 'Invalid username supplied'> |
        IResult<404, 'User not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Updated user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method PUT
     * @tags user
     * @param username - {string:required} name that need to be updated
     */
    async updateUser({
        path: { username }
    }: Parameters.UpdateUser, body: Components.Schemas.User, context: IContext): Promise<
        IResult<400, 'Invalid user supplied'> |
        IResult<404, 'User not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
    /**
     * Delete user
     * This can only be done by the logged in user.
     * @path /user/{username}
     * @method DELETE
     * @tags user
     * @param username - {string:required} The name that needs to be deleted
     */
    async deleteUser({
        path: { username }
    }: Parameters.DeleteUser, body: undefined, context: IContext): Promise<
        IResult<400, 'Invalid username supplied'> |
        IResult<404, 'User not found'>
    > {
        throw new ApiError(500, 'not implements');
    }
}


