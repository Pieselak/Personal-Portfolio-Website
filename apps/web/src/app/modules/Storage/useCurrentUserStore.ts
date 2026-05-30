// import { create } from "zustand";
// import { persist } from "zustand/middleware";
//
// type CurrentUserStore = {
//   currentUser: CurrentUserResponse["data"] | undefined;
//   setCurrentUser: (value: CurrentUserStore["currentUser"]) => void;
// };
//
// export const useCurrentUserStore = create<CurrentUserStore>()(
//   persist(
//     (set) => ({
//       currentUser: undefined,
//       setCurrentUser: (value) => set({ currentUser: value }),
//     }),
//     {
//       name: "current-user-storage",
//     },
//   ),
// );
