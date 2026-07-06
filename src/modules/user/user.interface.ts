
export interface RegisterUserPayload {
    name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD";
  phone?: string;
  address?: string;
  image?:string
}
