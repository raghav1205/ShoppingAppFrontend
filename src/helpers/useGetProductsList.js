import {useQuery} from 'react-query';

export const useGetProductsList = () => {
    const {data, isLoading, error} = useQuery('products',
    () => fetch(`${process.env.REACT_APP_API_URL}/products`).then(res => res.json()));
    return {data, isLoading, error}
}
