import { useQuery } from "react-query"
const useGetCart = (userid) => {
    const {data, isLoading, isError} = useQuery(['cart'], () => {
        return fetch(`http://localhost:8080/cart/${userid}`).then(res => res.json())
    },
    {
        enabled: !!userid
    })
    return {data, isLoading, isError}
}
export default useGetCart