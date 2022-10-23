import {useQuery} from 'react-query';

export const useGetProductsList = () => {
    const {data, isLoading, error} = useQuery('products',
    () => fetch(`https://peaceful-beyond-47525.herokuapp.com/products`).then(res => res.json()));
    return {data, isLoading, error}
}
