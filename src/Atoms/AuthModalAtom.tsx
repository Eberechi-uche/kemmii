import { atom } from "recoil";
export interface AuthModalState {
  open: boolean;
  view: "log in" | "sign up" | "reset password" | "profile";
}
const defaultModalState: AuthModalState = {
  open: false,
  view: "log in",
};

export const authModalState = atom<AuthModalState>({
  key: "AuthModalSate",
  default: defaultModalState,
});
