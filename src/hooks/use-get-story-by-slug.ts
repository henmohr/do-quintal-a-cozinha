import { useQuery} from "@tanstack/react-query";
import { getStoryBySlug } from "@/app/actions/get-story-by-slug";

interface Options {
  slug: string;
}  
export function useGetStoryBySlug(options: Options) {
  return useQuery({
    queryKey: ["story-by-slug", options],
    queryFn: () => getStoryBySlug(options),
  });
}
