import { GetMeetingsForUserRequest } from "./GetMeetingsForUserRequest";

export interface DeleteMeetingRequest {
    meetingId: number;
    getMeetingsForUserRequest: GetMeetingsForUserRequest;
}