
import { getAllProducts } from "@/app/actions/get-all-products"
import { useQuery } from "@tanstack/react-query"

interface Options {
  search?: string
  categories?: string[]
  price?: string[]
}

export const useGetAllProducts = (options?: Options) => {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getAllProducts(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
