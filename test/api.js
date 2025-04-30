const fetchData = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

export default fetchData;