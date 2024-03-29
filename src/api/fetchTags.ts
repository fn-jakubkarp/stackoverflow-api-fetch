import axios from "axios";
import { BASE_URL } from "../const/stackexchangeApi";
import { TagInfo } from "../types/TagInfo";

export const fetchTags = async (): Promise<TagInfo[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tags?&site=stackoverflow`);
    const tags: TagInfo[] = response.data.items.map((item: any) => ({
      name: item.name,
      count: item.count,
    }));
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
