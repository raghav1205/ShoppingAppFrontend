import {useQuery} from 'react-query';

export const useGetProductsList = () => {
    const {data, isLoading, error} = useQuery('products',
    () => fetch('http://localhost:8080/products').then(res => res.json()));
    return {data, isLoading, error}
}
