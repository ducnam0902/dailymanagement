import http from "./api-factory";
import { ImageResponse } from "../types/common";
import { UserResponse } from "../types/user";

const UserService = {
  uploadImage: async (body: FormData): Promise<ImageResponse> => {
    const resp = await http.post<ImageResponse>("/user/upload-image", body);
    return resp.data;
  },
  createUser: async (data) => {
    const resp = await http.post("/user", data);
    return resp;
  },
  signIn: async (body): Promise<UserResponse> => {
    const resp = await http.post<UserResponse>("/user/login", body);
    return resp.data;
  },
  signOut: async () => {
    const resp = await http.get("/api/user/logout");
    return resp;
  },
};

export default UserService;
