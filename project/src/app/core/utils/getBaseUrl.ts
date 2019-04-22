const params = {
    apiURL: 'https://api.themoviedb.org/3',
    apiKey: 'df56cf406d2c44e988b7705490bae759'
};

export const getFilmUrl = (query, page) => {
    const { apiURL, apiKey } = params;
    return `${apiURL}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
};

export const getActorUrl = film => {
    const { apiURL, apiKey } = params;
    const { id } = film;
    return `${apiURL}/movie/${id}/credits?api_key=${apiKey}`;
};
