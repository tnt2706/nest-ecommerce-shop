export interface NotifyClientsRequest {
  room: string;
  eventName: string;
  jsonMessage?: string;
  message: string;
}
