$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();
    getResult();
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        movieSearched(searchText);
        e.preventDefault();
    });
    if (movieType == 'person') {
        document.getElementById('reviews').innerHTML = "";
        document.getElementById('likeBtn').innerHTML = "";
        document.getElementById('listModal').innerHTML = "";
        document.getElementById('listButton').innerHTML = "";
    }
    if ((movieType == 'movie') || (movieType == 'tv')) {
        document.getElementById('ActorLikeBtn').innerHTML = "";
    }
});


const date = new Date();
document.querySelector('.year').innerHTML = date.getFullYear();

setTimeout(function() {
    $('#message').fadeOut('slow');
}, 2500);

function getMovies() {
    let searchText = localStorage.getItem('searchEntry');
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=994d34ea949ad278ddad346696fea280&language=en-US&query='+searchText+'&page=1&include_adult=false&append_to_response=external_ids').then((response) => {
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
                let movieName = movie.name;
                console.log(movieName);
                let newMovieName = movieName.replace(/[']+/g, '');
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.poster_path}')" href="#"><img src="https://image.tmdb.org/t/p/w342${movie.poster_path}"></a>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.poster_path}')" href="#"><h5>${movie.name}</h5></a>
                        <h6>TV Show</h6>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'movie') && (movie.poster_path != null)) {
                let movieName = movie.title;
                console.log(movieName);
                let newMovieName = movieName.replace(/[']+/g, '');
                output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.poster_path}')" href="#"><img src="https://image.tmdb.org/t/p/w185${movie.poster_path}"></a>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.poster_path}')" href="#"><h5>${movie.title}</h5></a>
                        <h6>Movie</h6>
                    </div>
                </div>
            `;
            }
            else if ((movie.media_type == 'person') && (movie.known_for_department == 'Acting')) {
                let movieName = movie.name;
                console.log(movieName);
                let newMovieName = movieName.replace(/[']+/g, '');
                console.log(newMovieName);
                if (movie.profile_path != null) {
                    output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                    <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.profile_path}')" href="#"><img src="https://image.tmdb.org/t/p/w185${movie.profile_path}"></a>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', '${movie.profile_path}')" href="#"><h5>${movie.name}</h5></a>
                        <h6>Actor</h6>
                    </div>
                </div>
            `;
                }
                else {
                    let movieName = movie.name;
                    console.log(movieName);
                    let newMovieName = movieName.replace(/[']+/g, '');
                    console.log(newMovieName);
                    output += `
                <div class="col-md-3">
                    <div class="well text-center search-img">
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', 'https://i.imgur.com/5E6Su16.png')" href="#"><img src="https://i.imgur.com/5E6Su16.png"></a>
                        <a onclick="movieSelected('${movie.id}', '${movie.media_type}', '${newMovieName}', 'https://i.imgur.com/5E6Su16.png')" href="#"><h5>${movie.name}</h5></a>
                        <h6>Actor</h6>
                    </div>
                </div>
            `;
                }
            }
            
        });
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id, media_type, media_title, media_poster, imdb) {
    sessionStorage.setItem('movieId', id);
    sessionStorage.setItem('type', media_type);
    sessionStorage.setItem('title', media_title);
    sessionStorage.setItem('poster', media_poster);
    localStorage.setItem('movieId', id);
    localStorage.setItem('type', media_type);
    localStorage.setItem('title', media_title);
    localStorage.setItem('poster', media_poster);
    document.cookie = 'movieId=' + id + '; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/';
    window.location = 'result';
    return false;
}

function movieSearched(entry) {
    sessionStorage.setItem('searchEntry', entry);
    localStorage.setItem('searchEntry', entry);
    window.location = 'search';
    return false;
}

function getMovie() {
    let movieId = localStorage.getItem('movieId');
    let movieType = localStorage.getItem('type');
    let lastSearched = localStorage.getItem('searchEntry');
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
                        <img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')" class="btn btn-primary" href="#">View Profile</a>
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
                        <img src="https://i.imgur.com/5E6Su16.png" alt="Default Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')" class="btn btn-primary" href="#">View Profile</a>
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
                        <img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')" class="btn btn-primary" href="#">View Profile</a>
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
                        <img src="https://i.imgur.com/5E6Su16.png" alt="Default Profile Pic">
                        <br>
                        <h4>${actor.name}</h4>
                        <h6>${actor.character}</h6>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')" class="btn btn-primary" href="#">View Profile</a>
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
        if (movie.profile_path == null) {
            output += `
            <div class="row">
                <div class="col-md-4">
                    <br>
                    <img src="https://i.imgur.com/5E6Su16.png" class="thumbnail">
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
        }
        else if (movie.profile_path != null) {
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
        }

        $.each(sortedCredits.slice(0,8), (index, credit) => {
            if ((credit.media_type == 'movie') && (credit.poster_path != null)) {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="https://image.tmdb.org/t/p/w342${credit.poster_path}">
                        <br>
                        <h4>${credit.title}</h4>
                        <h6>${credit.character}</h6>
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')" class="btn btn-primary" href="#">View Page</a>
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
                            <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.name}', '${credit.poster_path}')" class="btn btn-primary" href="#">View Page</a>
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
    localStorage.setItem('searchEntry', "");
    axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=994d34ea949ad278ddad346696fea280').then(response => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        let title = '';
        $.each(movies.slice(0,8), (index, movie) => {
            if (movie.poster_path != null) {
                output += `
                <div class="col-md-6 col-lg-4 mb-4">
                <div class="card listing-preview">
                <a class="favouritesBtn" onclick="movieSelected('${movie.id}', '${movie.media_type}', '${movie.title}', '${movie.poster_path}')"><img class="card-img-top" src="https://image.tmdb.org/t/p/w342${movie.poster_path}" /></a>
                  <div class="card-body-fav text-center">
                    <a class="favouritesBtn" onclick="movieSelected('${movie.id}', '${movie.media_type}', '${movie.title}', '${movie.poster_path}')">${movie.title}</a>
                  </div>
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

function getHotTV() {
    sessionStorage.setItem('searchEntry', "");
    localStorage.setItem('searchEntry', "");
    axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=994d34ea949ad278ddad346696fea280').then(response => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        let title = '';
        $.each(movies.slice(0,8), (index, movie) => {
            if (movie.poster_path != null) {
                output += `
                <div class="col-md-6 col-lg-4 mb-4">
                <div class="card listing-preview">
                <a class="favouritesBtn" onclick="movieSelected('${movie.id}', '${movie.media_type}', '${movie.name}', '${movie.poster_path}')"><img class="card-img-top" src="https://image.tmdb.org/t/p/w342${movie.poster_path}" /></a>
                  <div class="card-body-fav text-center">
                    <a class="favouritesBtn" onclick="movieSelected('${movie.id}', '${movie.media_type}', '${movie.name}', '${movie.poster_path}')">${movie.name}</a>
                  </div>
                </div>
              </div>
            `;
            }
        });
        $('#hotTV').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function getResult() {
    let movieId = localStorage.getItem('movieId');
    let movieType = localStorage.getItem('type');
    let lastSearched = localStorage.getItem('searchEntry');
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
        let imdb = movie.imdb_id;
        sessionStorage.setItem('imdb', imdb);
        localStorage.setItem('imdb', imdb);
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
            left_output = `<a href="/" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Home</a>`;
        }
        else {
            left_output = `<a onclick="movieSearched('${lastSearched}')" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Search</a>`;
        }
        imdb_output = `<a href="https://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary text-white">View on IMDB</a>`;
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
                        <li class="list-group-item"><strong>Plot:</strong> ${movie.overview}</li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
            <h3 class="text-center mb-3">Top Billed Cast</h3>
            <div class="row">
        `;
        $.each(actorPath.slice(0,8), (index, actor) => {
            if (actor.profile_path != null) {
                output += `
                <div class="col-md-3">
                    <div class="cast well text-center">
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Profile Pic"></a>
                        <br>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><h4>${actor.name}</h4></a>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><h6>${actor.character}</h6></a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if (actor.profile_path == null) {
                output += `
                <div class="col-md-3">
                    <div class="cast well text-center">
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><img src="https://i.imgur.com/5E6Su16.png" alt="Default Profile Pic"></a>
                        <br>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><h4>${actor.name}</h4></a>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><h6>${actor.character}</h6></a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
        });

        output += `</div> `;

        $('#movie').html(output);
        $('#left').html(left_output);
        $('#imdb').html(imdb_output);
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
            left_output = `<a href="/" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Home</a>`;
        }
        else {
            left_output = `<a onclick="movieSearched('${lastSearched}')" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Search</a>`;
        }
        imdb_output = `<a href="https://imdb.com/title/${movie.external_ids.imdb_id}" target="_blank" class="btn btn-primary text-white">View on IMDB</a>`;
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
                        <li class="list-group-item"><strong>Plot:</strong> ${movie.overview}</li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
            <h3 class="text-center mb-3">Top Billed Cast</h3>
            <div class="row">
        `;
        $.each(actorPath.slice(0,8), (index, actor) => {
            if (actor.profile_path != null) {
                output += `
                <div class="col-md-3">
                    <div class="cast well text-center">
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><img src="https://image.tmdb.org/t/p/w342${actor.profile_path}" alt="Profile Pic"></a>
                        <br>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><h4>${actor.name}</h4></a>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', '${actor.profile_path}')"><h6>${actor.character}</h6></a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if (actor.profile_path == null) {
                output += `
                <div class="col-md-3">
                    <div class="cast well text-center">
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><img src="https://i.imgur.com/5E6Su16.png" alt="Default Profile Pic"></a>
                        <br>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><h4>${actor.name}</h4></a>
                        <a onclick="movieSelected('${actor.id}', 'person', '${actor.name}', 'https://i.imgur.com/5E6Su16.png')"><h6>${actor.character}</h6></a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
        });

        output += `</div>`;

        $('#movie').html(output);
        $('#left').html(left_output);
        $('#imdb').html(imdb_output);
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
        let fullBio = response.data.biography;
        let partBio = fullBio.substr(0,1000);
        let bioEnd = fullBio.substr(1000,fullBio.length);
        $.each(creditsPath, (index, credit) => {
            credits.push(credit);
        });
        var sortedCredits = credits.sort((a, b) => b.vote_count - a.vote_count);
        console.log(sortedCredits);
        if (lastSearched == "") {
            left_output = `<a href="/" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Home</a>`;
        }
        else {
            left_output = `<a onclick="movieSearched('${lastSearched}')" class="backBtn"><i class="fas fa-long-arrow-alt-left"></i> Back to Search</a>`;
        }
        imdb_output = `<a href="https://imdb.com/name/${movie.imdb_id}" target="_blank" class="btn btn-primary text-white">View on IMDB</a>`;
        if (fullBio.length > 1000) {
            if (movie.profile_path == null) {
                output += `
                <div class="row">
                    <div class="col-md-4">
                        <br>
                        <img src="https://i.imgur.com/5E6Su16.png" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <br>
                        <h2>${movie.name}</h2>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Birthday:</strong> ${movie.birthday}</li>
                            <li class="list-group-item"><strong>Birth Place:</strong> ${movie.place_of_birth}</li>
                            <li class="list-group-item"><strong>Biography:</strong> ${partBio}<span id="dots">...</span><span id="more">${bioEnd}</span></li>
                        </ul>
                        <button onclick="readMore()" id="readMoreBtn" class="favouritesBtn">Read More</button>
                    </div>
                </div>
                <br>
                <br>
                <h3 class="text-center mb-3">Top Rated Credits</h3>
                <div class="row">
            `;
            }
            else if (movie.profile_path != null) {
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
                            <li class="list-group-item"><strong>Biography:</strong> ${partBio}<span id="dots">...</span><span id="more">${bioEnd}</span></li>
                        </ul>
                        <button onclick="readMore()" id="readMoreBtn" class="favouritesBtn">Read More</button>
                    </div>
                </div>
                <br>
                <br>
                <h3 class="text-center mb-3">Top Rated Credits</h3>
                <div class="row">
            `;
            }
        }
        else {
            if (movie.profile_path == null) {
                output += `
                <div class="row">
                    <div class="col-md-4">
                        <br>
                        <img src="https://i.imgur.com/5E6Su16.png" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <br>
                        <h2>${movie.name}</h2>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Birthday:</strong> ${movie.birthday}</li>
                            <li class="list-group-item"><strong>Birth Place:</strong> ${movie.place_of_birth}</li>
                            <li class="list-group-item"><strong>Biography:</strong> ${fullBio}</li>
                        </ul>
                    </div>
                </div>
                <br>
                <br>
                <h3 class="text-center mb-3">Top Rated Credits</h3>
                <div class="row">
            `;
            }
            else if (movie.profile_path != null) {
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
                            <li class="list-group-item"><strong>Biography:</strong> ${fullBio}</li>
                        </ul>
                    </div>
                </div>
                <br>
                <br>
                <h3 class="text-center mb-3">Top Rated Credits</h3>
                <div class="row">
            `;
            }
        }
        

        $.each(sortedCredits.slice(0,8), (index, credit) => {
            if ((credit.media_type == 'movie') && (credit.poster_path != null)) {
            output += `
                <div class="col-md-3">
                    <div class="cast well text-center">
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><img src="https://image.tmdb.org/t/p/w342${credit.poster_path}"></a>
                        <br>
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><h4>${credit.title}</h4></a>
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><h6>${credit.character}</h6></a>
                        <br>
                        <br>
                    </div>
                </div>
            `;
            }
            if ((credit.media_type == 'tv') && (credit.poster_path != null)) {
                output += `
                    <div class="col-md-3">
                        <div class="cast well text-center">
                        <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><img src="https://image.tmdb.org/t/p/w342${credit.poster_path}"></a>
                            <br>
                            <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><h4>${credit.name}</h4></a>
                            <a onclick="movieSelected('${credit.id}', '${credit.media_type}', '${credit.title}', '${credit.poster_path}')"><h6>${credit.character}</h6></a>
                            <br>
                            <br>
                        </div>
                    </div>
                `;
                }
        });

        output += `</div> `;
        $('#movie').html(output);
        $('#left').html(left_output);
        $('#imdb').html(imdb_output);
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }

  function readMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readMoreBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }