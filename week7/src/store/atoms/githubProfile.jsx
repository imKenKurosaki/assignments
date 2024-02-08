import { atom } from "recoil";

export const githubProfileAtom = atom({
    key: "githubProfileAtom",
    default: {
        login: "Github user",
        avatar_url: "",
        followers: 0,
        following: 0,
        public_repos: 0
    }
});
