export const fetchUrl = async ({ url, shouldLag, callback }) => {
    const res = await fetch(url);
    const data = await res.json();
    if (shouldLag) await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    callback(data)
};