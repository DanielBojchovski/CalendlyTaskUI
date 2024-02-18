import { GetMeetingsForUserResponse } from "./GetMeetingsForUserResponse";
import { OperationStatusResponse } from "./OperationStatusResponse";

export interface DeleteMeetingResponse {
    operationStatusResponse: OperationStatusResponse;
    getMeetingsForUserResponse: GetMeetingsForUserResponse;
}