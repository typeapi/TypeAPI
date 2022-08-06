declare namespace Components {
    namespace RequestBodies {
        export type Pet = Schemas.Pet;
        export type UserArray = Schemas.User[];
    }
    namespace Schemas {
        export interface ApiResponse {
            code?: number; // int32
            type?: string;
            message?: string;
        }
        export interface Category {
            id?: number; // int64
            name?: string;
        }
        export interface Order {
            id?: number; // int64
            petId?: number; // int64
            quantity?: number; // int32
            shipDate?: string; // date-time
            /**
             * Order Status
             */
            status?: "placed" | "approved" | "delivered";
            complete?: boolean;
        }
        export interface Pet {
            id?: number; // int64
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
        export interface Tag {
            id?: number; // int64
            name?: string;
        }
        export interface User {
            id?: number; // int64
            username?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
            phone?: string;
            /**
             * User Status
             */
            userStatus?: number; // int32
        }
    }
}
declare namespace Paths {
    namespace CreateUser {
        export type RequestBody = Components.Schemas.User;
    }
    namespace DeleteOrder {
        namespace Parameters {
            export type OrderId = number; // int64
        }
        export interface PathParameters {
            orderId: Parameters.OrderId; // int64
        }
    }
    namespace DeletePet {
        export interface HeaderParameters {
            api_key?: Parameters.ApiKey;
        }
        namespace Parameters {
            export type ApiKey = string;
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId; // int64
        }
    }
    namespace DeleteUser {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
    }
    namespace FindPetsByStatus {
        namespace Parameters {
            export type Status = ("available" | "pending" | "sold")[];
        }
        export interface QueryParameters {
            status: Parameters.Status;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pet[];
        }
    }
    namespace FindPetsByTags {
        namespace Parameters {
            export type Tags = string[];
        }
        export interface QueryParameters {
            tags: Parameters.Tags;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pet[];
        }
    }
    namespace GetInventory {
        namespace Responses {
            export interface $200 {
                [name: string]: number; // int32
            }
        }
    }
    namespace GetOrderById {
        namespace Parameters {
            export type OrderId = number; // int64
        }
        export interface PathParameters {
            orderId: Parameters.OrderId; // int64
        }
        namespace Responses {
            export type $200 = Components.Schemas.Order;
        }
    }
    namespace GetPetById {
        namespace Parameters {
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId; // int64
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pet;
        }
    }
    namespace GetUserByName {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace LoginUser {
        namespace Parameters {
            export type Password = string;
            export type Username = string;
        }
        export interface QueryParameters {
            username: Parameters.Username;
            password: Parameters.Password;
        }
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace PlaceOrder {
        export type RequestBody = Components.Schemas.Order;
        namespace Responses {
            export type $200 = Components.Schemas.Order;
        }
    }
    namespace UpdatePetWithForm {
        namespace Parameters {
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId; // int64
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        export type RequestBody = Components.Schemas.User;
    }
    namespace UploadFile {
        namespace Parameters {
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId; // int64
        }
        namespace Responses {
            export type $200 = Components.Schemas.ApiResponse;
        }
    }
}

declare namespace Schemas {
    export interface UpdatePetWithFormRequestBody {
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

    export type UploadFileRequestBody = string;

    export type GetInventoryResponse200 = Paths.GetInventory.Responses.$200;
    export type LoginUserResponse200 = Paths.LoginUser.Responses.$200;
}
declare namespace Parameters {
    export interface FindPetsByStatus{
         query: Paths.FindPetsByStatus.QueryParameters;
    }
    export interface FindPetsByTags{
         query: Paths.FindPetsByTags.QueryParameters;
    }
    export interface GetPetById{
         path: Paths.GetPetById.PathParameters;
    }
    export interface UpdatePetWithForm{
         path: Paths.UpdatePetWithForm.PathParameters;
    }
    export interface DeletePet{
         header: Paths.DeletePet.HeaderParameters;
         path: Paths.DeletePet.PathParameters;
    }
    export interface UploadFile{
         path: Paths.UploadFile.PathParameters;
    }
    export interface GetOrderById{
         path: Paths.GetOrderById.PathParameters;
    }
    export interface DeleteOrder{
         path: Paths.DeleteOrder.PathParameters;
    }
    export interface LoginUser{
         query: Paths.LoginUser.QueryParameters;
    }
    export interface GetUserByName{
         path: Paths.GetUserByName.PathParameters;
    }
    export interface UpdateUser{
         path: Paths.UpdateUser.PathParameters;
    }
    export interface DeleteUser{
         path: Paths.DeleteUser.PathParameters;
    }
}
