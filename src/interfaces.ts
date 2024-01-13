export interface IApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface IPixel {
  x: number;
  y: number;
  color: string;
}

export interface IUser {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  picture: string;
  provider: string;
  updatedAt: string;
  username: string;
}

export interface IArt {
  id: string;
  name: string;
  json: string;
}

export interface IArtPayload {
  name: string;
  json: string;
}
