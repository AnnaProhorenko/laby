let numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?");
let personalMovieDB = {
    count : numberOfFilms,
    movies : {}, 
};
let lastFilm = prompt("Один из послених просмотренных фильмов?");
let rating = prompt("На сколько оцените его?");
personalMovieDB.movies[lastFilm] = rating;
lastFilm = prompt("Один из послених просмотренных фильмов?");
rating = prompt("На сколько оцените его?");
personalMovieDB.movies[lastFilm] = rating;
console.log(personalMovieDB);