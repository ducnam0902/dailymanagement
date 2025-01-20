import http from "./api-factory";
import { ImageResponse, OkResponse } from "../types/common";
import { SignInFormData, SignUpFormData, UserResponse } from "../types/user";

const UserService = {
  uploadImage: async (body: FormData): Promise<ImageResponse> => {
    const resp = await http.post<ImageResponse>("/user/upload-image", body, {
      headers: {
        "Content-Type": "",
      },
    });
    return resp.data;
  },
  createUser: async (data: SignUpFormData): Promise<OkResponse> => {
    const resp = await http.post("/user", data);
    return resp.data;
  },
  signIn: async (body: SignInFormData): Promise<UserResponse> => {
    const resp = await http.post<UserResponse>("/user/login", body);
    return resp.data;
  },
  signOut: async (): Promise<OkResponse> => {
    const resp = await http.get("/user/logout");
    return resp.data;
  },
  getCurrentUser: async () => {
    const resp = await http.get("/user/currentUser");
    return resp;
  },
};

export default UserService;
