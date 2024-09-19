import {
  TypeBlockedPatterns,
  TypeWhitelistedPatterns,
} from "@/utils/cleanText";

const blockedPatterns: TypeBlockedPatterns = [
  "https://scratch.mit.edu/users/*",
  "https://scratch.mit.edu/studios/*",
  "https://scratch.mit.edu/projects/*",
  "https://turbowarp.org/projects/*",
];

const whitelistedPatterns: TypeWhitelistedPatterns = [
  "https://scratch.mit.edu/users/Masaabu-YT",
  "https://scratch.mit.edu/users/Fun_117",
  "https://scratch.mit.edu/studios/31959115",
  "https://scratch.mit.edu/studios/34675120",
];

export { blockedPatterns, whitelistedPatterns };
