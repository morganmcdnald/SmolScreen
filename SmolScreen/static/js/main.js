$(document).ready(() => {
    getMovie();
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        movieSearched(searchText);
        e.preventDefault();
    });
});

const date = new Date();
document.querySelector('.year').innerHTML = date.getFullYear();

function getMovies() {
    let searchText = sessionStorage.getItem('searchEntry');
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=994d34ea949ad278ddad346696fea280&language=en-US&query='+searchText+'&page=1&include_adult=false').then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        let title = '';

        output = `
        <div class="col-md-12">
            <h3>You searched for "${searchText}"</h3>
            <br>
        </div>
        `;
        $.each(movies, (index, movie) => {
            if ((movie.media_type == 'tv') && (movie.poster_path != null)) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}">
                        <h5>${movie.name}</h5>
                        <h6>TV Show</h6>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'movie') && (movie.poster_path != null)) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
                        <h5>${movie.title}</h5>
                        <h6>Movie</h6>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'person') && (movie.profile_path != null) && (movie.known_for_department == 'Acting')) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w185${movie.profile_path}">
                        <h5>${movie.name}</h5>
                        <h6>Actor</h6>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Profile</a>
                    </div>
                </div>
            `;
            }
            
        });
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id, media_type) {
    sessionStorage.setItem('movieId', id);
    sessionStorage.setItem('type', media_type);
    window.location = 'result';
    return false;
}

function movieSearched(entry) {
    sessionStorage.setItem('searchEntry', entry);
    window.location = 'search';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let movieType = sessionStorage.getItem('type');
    let lastSearched = sessionStorage.getItem('searchEntry');
    if (movieType == 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=994d34ea949ad278ddad346696fea280&language=en-US&append_to_response=credits').then((response) => {
        console.log(response);
        let movie = response.data;
        let genrePath = response.data.genres;
        let directors = response.data.credits.crew;
        let genreList = "";
        let directorList = "";
        let actorPath =response.data.credits.cast;
        let actors = [];
        let genres = [];
        let output = "";
        $.each(genrePath, (index, genre) => {
            genres.push(" " + genre.name);
        });
        $.each(directors, (index, director) => {
            if (director.job == 'Director') {
                directorList += `${director.name}`
            }
        });
        $.each(actorPath, (index, actor) => {
            actors.push(" " + actor.name);
        });
        if (lastSearched == "") {
            output = `<div class="row">
                <div class="col-md-4">
                    <br>
                    <a href="/" class="btn btn-secondary">Back to Home</a>
                </div>  
            </div>`;
        }
        else {
            output = `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <a onclick="movieSearched('${lastSearched}')" class="btn btn-secondary">Back to Search</a>
                </div>  
            </div>`;
        }
        output += `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <br>
                    <h2>${movie.title}</h2>
                    <h5 class="tagline">${movie.tagline}</h5>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${genres}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${directorList}</li>
                    </ul>
                    <br>
                    <a href="https://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View on IMDB</a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <h3>Plot</h3>
                    ${movie.overview}
                    <hr>
                </div>
            </div>
            <h3>Cast</h3>
            <div class="row">
        `;
        $.each(actorPath.slice(0,8), (index, actor) => {
            if (actor.profile_path != null) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Default Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person')" class="btn btn-primary" href="#">View Profile</a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if (actor.profile_path == null) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="/assets/DefaultProfilePic.png">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person')" class="btn btn-primary" href="#">View Profile</a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
        });

        output += `

            </div>
            <br>
            <div class="row">
                
            </div>
            <br>
            <br>
        `;
        $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if (movieType == 'tv') {
        axios.get('https://api.themoviedb.org/3/tv/'+movieId+'?api_key=994d34ea949ad278ddad346696fea280&language=en-US&append_to_response=credits,external_ids').then((response) => {
        console.log(response);
        let movie = response.data;
        let genrePath = response.data.genres;
        let actorPath =response.data.credits.cast;
        let actors = [];
        let genres = [];
        let output = "";
        $.each(genrePath, (index, genre) => {
            genres.push(" " + genre.name);
        });
        $.each(actorPath, (index, actor) => {
            actors.push(" " + actor.name);
        });
        if (lastSearched == "") {
            output = `<div class="row">
                <div class="col-md-4">
                    <br>
                    <a href="/" class="btn btn-secondary">Back to Home</a>
                </div>  
            </div>`;
        }
        else {
            output = `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <a onclick="movieSearched('${lastSearched}')" class="btn btn-secondary">Back to Search</a>
                </div>  
            </div>`;
        }
        output += `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <br>
                    <h2>${movie.name}</h2>
                    <h5>${movie.tagline}</h5>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${genres}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.first_air_date}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
                        <li class="list-group-item"><strong>Status:</strong> ${movie.status}</li>
                        <li class="list-group-item"><strong>Seasons:</strong> ${movie.number_of_seasons}</li>
                        <li class="list-group-item"><strong>Episodes:</strong> ${movie.number_of_episodes}</li>
                    </ul>
                    <br>
                    <a href="https://imdb.com/title/${movie.external_ids.imdb_id}" target="_blank" class="btn btn-primary">View on IMDB</a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <h3>Plot</h3>
                    ${movie.overview}
                    <hr>
                </div>
            </div>
            <h3>Cast</h3>
            <div class="row">
        `;
        $.each(actorPath.slice(0,8), (index, actor) => {
            if (actor.profile_path != null) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Default Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person')" class="btn btn-primary" href="#">View Profile</a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if (actor.profile_path == null) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="/assets/DefaultProfilePic.png">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person')" class="btn btn-primary" href="#">View Profile</a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
        });

        output += `

            </div>
            <br>
            <div class="row">
                
            </div>
            <br>
            <br>
        `;
        $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if (movieType == 'person') {
        axios.get('https://api.themoviedb.org/3/person/'+movieId+'?api_key=994d34ea949ad278ddad346696fea280&language=en-US&append_to_response=combined_credits,external_ids').then((response) => {
        console.log(response);
        let movie = response.data;
        let creditsPath = response.data.combined_credits.cast;
        let credits = [];
        let output = "";
        $.each(creditsPath, (index, credit) => {
            credits.push(credit);
        });
        var sortedCredits = credits.sort((a, b) => b.vote_count - a.vote_count);
        console.log(sortedCredits);
        if (lastSearched == "") {
            output = `<div class="row">
                <div class="col-md-4">
                    <br>
                    <a href="/" class="btn btn-secondary">Back to Home</a>
                </div>  
            </div>`;
        }
        else {
            output = `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <a onclick="movieSearched('${lastSearched}')" class="btn btn-secondary">Back to Search</a>
                </div>  
            </div>`;
        }
        output += `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <img src="https://image.tmdb.org/t/p/w342${movie.profile_path}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <br>
                    <h2>${movie.name}</h2>
                    <br>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Birthday:</strong> ${movie.birthday}</li>
                        <li class="list-group-item"><strong>Birth Place:</strong> ${movie.place_of_birth}</li>
                    </ul>
                    <br>
                    <a href="https://imdb.com/name/${movie.imdb_id}" target="_blank" class="btn btn-primary">View on IMDB</a>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <br>
                    <h3>Biography</h3>
                    <hr>
                    ${movie.biography}
                    <hr>
                </div>
            </div>
            <h3>Credits</h3>
            <div class="row">
        `;
        $.each(sortedCredits.slice(0,8), (index, credit) => {
            if ((credit.media_type == 'movie') && (credit.poster_path != null)) {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w342${credit.poster_path}">
                        <br>
                        <h4>${credit.title}</h4>
                        <h6>${credit.character}</h6>
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}')" class="btn btn-primary" href="#">View Page</a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if ((credit.media_type == 'tv') && (credit.poster_path != null)) {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="https://image.tmdb.org/t/p/w342${credit.poster_path}">
                            <br>
                            <h4>${credit.name}</h4>
                            <h6>${credit.character}</h6>
                            <a onclick="movieSelected('${credit.id}', '${credit.media_type}')" class="btn btn-primary" href="#">View Page</a>
                            <br>
                            <br>
                        </div>
                    </div>
                `;
                }
        });

        output += `

            </div>
            <br>
            <div class="row">
                
            </div>
            <br>
            <br>
        `;
        $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

function getHot() {
    sessionStorage.setItem('searchEntry', "");
    axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=994d34ea949ad278ddad346696fea280').then(response => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        let title = '';
        $.each(movies.slice(0,4), (index, movie) => {
            if ((movie.media_type == 'tv') && (movie.poster_path != null)) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}">
                        <h5>${movie.name}</h5>
                        <h6>TV Show</6>
                        <br>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'movie') && (movie.poster_path != null)) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}">
                        <h5>${movie.title}</h5>
                        <h6>Movie</6>
                        <br>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'person') && (movie.profile_path != null) && (movie.known_for_department == 'Acting')) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <img src="https://image.tmdb.org/t/p/w185${movie.profile_path}">
                        <h5>${movie.name}</h5>
                        <h6>Actor</6>
                        <br>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}')" class="btn btn-primary" href="#">Profile</a>
                    </div>
                </div>
            `;
            }
            
        });
        $('#hot').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}