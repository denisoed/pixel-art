export interface IPixel {
  x: number;
  y: number;
  color: string;
}

export interface IUser {
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
}

export interface IArt {
  id: string;
  name: string;
}
