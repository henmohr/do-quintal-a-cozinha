import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/app/actions/get-all-stories";

interface UseGetAllStoriesOptions {
  search?: string;
  tags?: string[];
  profileId?: string;
}

export function useGetAllStories(options?: UseGetAllStoriesOptions) {
  return useQuery({
    queryKey: ["stories", options],
    queryFn: () => getAllStories(options),
  });
}   