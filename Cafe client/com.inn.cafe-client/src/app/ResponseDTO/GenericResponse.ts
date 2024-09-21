import { MESSAGE_TYPE } from "../Enums";

export class GenericResponse<T> {
    message: string;
    message_type: MESSAGE_TYPE;
    data: T;
}