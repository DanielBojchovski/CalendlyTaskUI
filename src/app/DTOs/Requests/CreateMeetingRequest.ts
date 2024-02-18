export interface CreateMeetingRequest{
    name: string;
    durationInMinutes: number;
    startDateTime: Date;
    reason: string;
    userId: string;
    initiatorUserId: string | null;
}