export interface SendEmailResponse{
    success: boolean;
    emailsWhichRecieveMail: string[];
    emailsWhichDidntRecieveMail: string[];
}