import { TagInfo } from "../api/fetchTags";

export const sortTags = (
  tags: TagInfo[],
  orderBy: keyof TagInfo,
  order: "asc" | "desc",
): TagInfo[] => {
  return tags.slice().sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });
};
