export interface NotifyClientsRequest {
  room: string;
  eventName: string;
  jsonMessage?: string;
  message: string;
}

export interface NotifyClientsInterface {
  notifyClients(data: NotifyClientsRequest): Promise<any>;
}
