declare namespace Components {
    namespace RequestBodies {
        type Pet = Schemas.Pet;
        type UserArray = Schemas.User[];
    }
    namespace Schemas {
        interface ApiResponse {
            code?: number;
            type?: string;
            message?: string;
        }
        interface Category {
            id?: number;
            name?: string;
        }
        interface Order {
            id?: number;
            petId?: number;
            quantity?: number;
            shipDate?: string;
            /**
             * Order Status
             */
            status?: "placed" | "approved" | "delivered";
            complete?: boolean;
        }
        interface Pet {
            id?: number;
            category?: Category;
            /**
             * example:
             * doggie
             */
            name: string;
            photoUrls: string[];
            tags?: Tag[];
            /**
             * pet status in the store
             */
            status?: "available" | "pending" | "sold";
        }
        interface Tag {
            id?: number;
            name?: string;
        }
        interface User {
            id?: number;
            username?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
            phone?: string;
            /**
             * User Status
             */
            userStatus?: number;
        }
    }
}
declare namespace Paths {
    namespace CreateUser {
        type RequestBody = Components.Schemas.User;
    }
    namespace DeleteOrder {
        namespace Parameters {
            type OrderId = number;
        }
        interface PathParameters {
            orderId: Parameters.OrderId;
        }
    }
    namespace DeletePet {
        interface HeaderParameters {
            api_key?: Parameters.ApiKey;
        }
        namespace Parameters {
            type ApiKey = string;
            type PetId = number;
        }
        interface PathParameters {
            petId: Parameters.PetId;
        }
    }
    namespace DeleteUser {
        namespace Parameters {
            type Username = string;
        }
        interface PathParameters {
            username: Parameters.Username;
        }
    }
    namespace FindPetsByStatus {
        namespace Parameters {
            type Status = ("available" | "pending" | "sold")[];
        }
        interface QueryParameters {
            status: Parameters.Status;
        }
        namespace Responses {
            type $200 = Components.Schemas.Pet[];
        }
    }
    namespace FindPetsByTags {
        namespace Parameters {
            type Tags = string[];
        }
        interface QueryParameters {
            tags: Parameters.Tags;
        }
        namespace Responses {
            type $200 = Components.Schemas.Pet[];
        }
    }
    namespace GetInventory {
        namespace Responses {
            interface $200 {
                [name: string]: number;
            }
        }
    }
    namespace GetOrderById {
        namespace Parameters {
            type OrderId = number;
        }
        interface PathParameters {
            orderId: Parameters.OrderId;
        }
        namespace Responses {
            type $200 = Components.Schemas.Order;
        }
    }
    namespace GetPetById {
        namespace Parameters {
            type PetId = number;
        }
        interface PathParameters {
            petId: Parameters.PetId;
        }
        namespace Responses {
            type $200 = Components.Schemas.Pet;
        }
    }
    namespace GetUserByName {
        namespace Parameters {
            type Username = string;
        }
        interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            type $200 = Components.Schemas.User;
        }
    }
    namespace LoginUser {
        namespace Parameters {
            type Password = string;
            type Username = string;
        }
        interface QueryParameters {
            username: Parameters.Username;
            password: Parameters.Password;
        }
        namespace Responses {
            type $200 = string;
        }
    }
    namespace PlaceOrder {
        type RequestBody = Components.Schemas.Order;
        namespace Responses {
            type $200 = Components.Schemas.Order;
        }
    }
    namespace UpdatePetWithForm {
        namespace Parameters {
            type PetId = number;
        }
        interface PathParameters {
            petId: Parameters.PetId;
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            type Username = string;
        }
        interface PathParameters {
            username: Parameters.Username;
        }
        type RequestBody = Components.Schemas.User;
    }
    namespace UploadFile {
        namespace Parameters {
            type PetId = number;
        }
        interface PathParameters {
            petId: Parameters.PetId;
        }
        namespace Responses {
            type $200 = Components.Schemas.ApiResponse;
        }
    }
}
declare namespace Schemas {
    interface UpdatePetWithFormRequestBody {
        /**
         * Updated name of the pet
         */
        name?: string;
        /**
         * Updated status of the pet
         */
        status?: string;
        [k: string]: any;
    }
    type UploadFileRequestBody = string;
    type GetInventoryResponse200 = Paths.GetInventory.Responses.$200;
    type LoginUserResponse200 = Paths.LoginUser.Responses.$200;
}
declare namespace Parameters {
    interface FindPetsByStatus {
        query: Paths.FindPetsByStatus.QueryParameters;
    }
    interface FindPetsByTags {
        query: Paths.FindPetsByTags.QueryParameters;
    }
    interface GetPetById {
        path: Paths.GetPetById.PathParameters;
    }
    interface UpdatePetWithForm {
        path: Paths.UpdatePetWithForm.PathParameters;
    }
    interface DeletePet {
        header: Paths.DeletePet.HeaderParameters;
        path: Paths.DeletePet.PathParameters;
    }
    interface UploadFile {
        path: Paths.UploadFile.PathParameters;
    }
    interface GetOrderById {
        path: Paths.GetOrderById.PathParameters;
    }
    interface DeleteOrder {
        path: Paths.DeleteOrder.PathParameters;
    }
    interface LoginUser {
        query: Paths.LoginUser.QueryParameters;
    }
    interface GetUserByName {
        path: Paths.GetUserByName.PathParameters;
    }
    interface UpdateUser {
        path: Paths.UpdateUser.PathParameters;
    }
    interface DeleteUser {
        path: Paths.DeleteUser.PathParameters;
    }
}
//# sourceMappingURL=definitions.d.ts.map