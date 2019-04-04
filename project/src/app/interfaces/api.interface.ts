export interface ApiInterface {
  page: number;
  results: {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  };
  total_pages: number;
  total_results: number;
}

export interface ApiActorInterface {
  cast: {
    cast_id: number,
    character: string,
    credit_id: string,
    gender: number,
    id: number,
    name: string,
    order: number,
    profile_path: string,
  }[];
  crew: {
    credit_id: string,
    department: string,
    gender: number,
    id: number,
    job: string,
    name: string,
    profile_path: string,
  }[];
  id: number;
}
