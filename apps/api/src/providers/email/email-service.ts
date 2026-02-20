export interface EmailProps {
    subject: string,
    text?: string
    html?: string
}

export interface EmailService {
    send(to: string, content: EmailProps): Promise<void>
}