import { create } from "zustand";
import { UserClass } from "./types";

type UserState = {
  isLoggedIn: boolean;
  username?: string;
  id?: number;
  token?: string;
  classes: UserClass[];
  login: (username: string, token: string, id: number) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  classes: [],
  login: async (username, token, id) => {
    set({ isLoggedIn: true, username, token, id });
    try {
      const response = await fetch(
        `http://localhost:8000/users/${id}/classes`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        set({ classes: data.classes });
      } else {
        // console.log("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  },
  logout: () => {
    set({ isLoggedIn: false, username: undefined, token: undefined });
  },
}));
