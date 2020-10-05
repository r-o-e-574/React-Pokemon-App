import { useSelector } from 'react-redux';

const useFetchUrl = () =>  {
    const shouldLag = useSelector(({ lag }) => lag);
    return async (url, callback) => {
        const res = await fetch(url);
        const data = await res.json();
        if (shouldLag) await new Promise(resolve => setTimeout(resolve, 2000));
        console.log({data});
        callback(data)
    };
};

export default useFetchUrl;