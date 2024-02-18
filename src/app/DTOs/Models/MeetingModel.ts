export interface MeetingModel{
    id: number;
    name: string;
    durationInMinutes: number;
    startDateTime: Date;
    reason: string;
    initiatorUserId: string | null;
    initiatorFullName: string | null;
}