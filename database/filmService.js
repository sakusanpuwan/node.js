import Film from "./Film.js";

export const getAllFilms = async () => {
    return await Film.query();
};

export const getFilmById = async (id) => {
    return await Film.query().findById(id); // using private helper
};

export const getFilmsByCondition = async (condition) => {
    return await Film.query().where(condition);
};

export const updateFilm = async (id, updates) => {
    const film = await Film.query().findById(id); // using private helper
    if (!film) throw new Error('Film not found');
    return await Film.query().patchAndFetchById(id, updates);
};

export const deleteFilm = async (id) => {
    return await Film.query().deleteById(id);
};

export const createFilm = async (filmData) => {
    if (Array.isArray(filmData)) {
        for (const film of filmData) {
            await Film.query().insert(film);
        }
        return;
    }
    return await Film.query().insert(filmData);
};

export const getOneFilmByCondition = async (condition) => {
    return await Film.query().findOne(condition);
};

const filmService = {
    createFilm,
    getAllFilms,
    getFilmById,
    getFilmsByCondition,
    updateFilm,
    deleteFilm,
    getOneFilmByCondition,
};
  
export default filmService;

