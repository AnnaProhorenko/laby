let personalMovieDB = {
    privat: false,
    movies: {
        "Платформа": 9.7,
        "Матрица": 8.5,
        "Бесстыжие": 10.0
    },
};
function moviesTable() {
    let table = document.createElement('table');
    let tableHead = table.createTHead();
    let headerRow = tableHead.insertRow();
    let headerCell1 = headerRow.insertCell(0);
    let headerCell2 = headerRow.insertCell(1);
    headerCell1.textContent = 'Название';
    headerCell2.textContent = 'Оценка';
    let tableBody = table.createTBody();
    for (const movie in personalMovieDB.movies){
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = movie;
        cell2.textContent = personalMovieDB.movies[movie];
    }
    if (!personalMovieDB.privat){
        document.body.appendChild(table);
    }
}
moviesTable();
//lol

