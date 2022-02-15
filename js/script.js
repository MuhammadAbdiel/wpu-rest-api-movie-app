// * JQuery

// function searchMovie() {
//     $("#movie-list").html('');

//     $.ajax({
//         url: "https://omdbapi.com",
//         type: "GET",
//         dataType: "json",
//         data: {
//             'apikey': '8fc1c0ef',
//             's': $("#search-input").val()
//         },
//         success: function (result) {
//             if (result.Response == "True") {
//                 let movies = result.Search;
//                 $.each(movies, function (i, data) {
//                     $("#movie-list").append(`
//                         <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
//                             <div class="card">
//                                 <img src="${data.Poster}" class="card-img-top">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${data.Title}</h5>
//                                     <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
//                                     <a href="#" class="card-link show-details" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">Show Details</a>
//                                 </div>
//                             </div>
//                         </div>
//                     `);
//                 });

//                 $("#search-input").val('');

//             } else {
//                 $("#movie-list").html(`
//                     <div class="col">
//                         <h1 class="text-center">${result.Error}</h1>
//                     </div>
//                 `);
//             }
//         }
//     });
// }

// $("#search-button").on('click', function () {
//     searchMovie();
// });

// $("#search-input").on('keyup', function (e) {
//     if (e.keyCode == 13) {
//         searchMovie();
//     }
// });

// $("#movie-list").on('click', '.show-details', function () {
//     $.ajax({
//         url: "https://omdbapi.com",
//         type: "GET",
//         dataType: "json",
//         data: {
//             'apikey': '8fc1c0ef',
//             'i': $(this).data('id')
//         },
//         success: function (movie) {
//             if (movie.Response == "True") {
//                 $(".modal-body").html(`
//                     <div class="container-fluid">
//                         <div class="row">
//                             <div class="col-md-4 text-center mb-3">
//                                 <img src="${movie.Poster}" class="img-fluid">
//                             </div>
//                             <div class="col-md-8">
//                                 <ul class="list-group">
//                                     <li class="list-group-item"><h3>${movie.Title}</h3></li>
//                                     <li class="list-group-item">Released : ${movie.Released}</li>
//                                     <li class="list-group-item">Genre : ${movie.Genre}</li>
//                                     <li class="list-group-item">Director : ${movie.Director}</li>
//                                     <li class="list-group-item">Actors : ${movie.Actors}</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//             }
//         }
//     });
// });

// * Vanilla Javascript (Ajax)

function searchMovie() {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    const searchInput = document.getElementById('search-input');

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            let movies = result.Search;

            if (result.Response == "True") {
                movies.map(data => {
                    movieList.innerHTML += `
                        <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                            <div class="card">
                                <img src="${data.Poster}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" class="card-link show-details" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">Show Details</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                searchInput.value = '';
            } else {
                movieList.innerHTML = `
                    <div class="col">
                        <h1 class="text-center">${result.Error}</h1>
                    </div>
                `;
            }
        }
    }
    xhr.open('GET', 'https://omdbapi.com?apikey=8fc1c0ef&s=' + searchInput.value, true);
    xhr.send();
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    searchMovie();
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', function () {
    if (window.event.keyCode == 13) {
        searchMovie();
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('show-details')) {
        let id = event.target.dataset.id;

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let movie = JSON.parse(xhr.responseText);

                const modalBody = document.querySelector('.modal-body');
                if (movie.Response == "True") {
                    modalBody.innerHTML = `
                        <div div class = "container-fluid" >
                            <div class="row">
                                <div class="col-md-4 text-center mb-3">
                                    <img src="${movie.Poster}" class="img-fluid">
                                </div>
                                <div class="col-md-8">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                        <li class="list-group-item">Released : ${movie.Released}</li>
                                        <li class="list-group-item">Genre : ${movie.Genre}</li>
                                        <li class="list-group-item">Director : ${movie.Director}</li>
                                        <li class="list-group-item">Actors : ${movie.Actors}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        }
        xhr.open('GET', 'https://omdbapi.com?apikey=8fc1c0ef&i=' + id, true);
        xhr.send();
    }
});