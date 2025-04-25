import { inspect } from "util";

const getData = async() => {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        console.log(inspect(data, { depth: null, colors: true }));        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

getData();