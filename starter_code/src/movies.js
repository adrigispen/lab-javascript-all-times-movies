
// Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  return movies.reduce((acc, currentMovie) => acc + currentMovie.rate, 0)/movies.length.toFixed(2);
}


// Get the average of Drama Movies
function dramaMoviesRate(movies) {
  let dramas = movies.filter(movie => movie.genre.includes('Drama'));
  return dramas.length > 0 ? parseFloat(ratesAverage(dramas).toFixed(2)) : 0;
}

// Order by time duration, ascending
function orderByDuration(movies) {
  return sorted = movies.sort((a, b) => {
    if (getTimeInMinutes(a.duration) - getTimeInMinutes(b.duration) == 0) {
      return a.title > b.title ? 1 : -1; //I'm assuming no two movies have the exact same name
    }
    return(getTimeInMinutes(a.duration) - getTimeInMinutes(b.duration));
  });
}

function getTimeInMinutes(timeString) {
  let hrsMins = timeString.toString().split(' ');
  if (hrsMins[0][hrsMins[0].length - 1] != 'h') {
    return parseInt(hrsMins[0], 10);
  } else {
    let mins = parseInt(hrsMins.shift(),10)*60;
    if (hrsMins.length > 0) mins += parseInt(hrsMins.shift(),10);
    return mins;
  }
}

// How many movies did Steven Spielberg direct
function howManyMovies(movies) {
  return movies.filter(movie => movie.director == 'Steven Spielberg' && movie.genre.includes('Drama')).length;

}

// Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  var sorted = movies.sort((a, b) => a.title > b.title ? 1 : -1);
  return sorted.map(movie => movie.title).slice(0, 20);
}

// Best yearly rate average
function bestYearAvg(movies) {
  if (!movies.length) return null;
  let moviesByYear = movies.reduce((allYears, movie) => {
    let year = movie.year;
    if (year in allYears) {
      allYears[year].count++;
      allYears[year].ratingSum += parseFloat(movie.rate);
    } else {
      let yearObj = {name: year, count: 1, ratingSum: parseFloat(movie.rate)};
      allYears[year] = yearObj;
    }
    return allYears;
  }, {});
  
  var yearsArray = Object.values(moviesByYear);

  let sorted = yearsArray.sort((a, b) => {
    if (a.ratingSum/a.count === b.ratingSum/b.count) {
      return parseInt(a.name,10) - parseInt(b.name,10);
    } else {
      return b.ratingSum/b.count - a.ratingSum/a.count;
    }
  });
  return `The best year was ${sorted[0].name} with an average rate of ${sorted[0].ratingSum/sorted[0].count}`;
}

// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.map(movie => {
    return Object.assign({}, movie, {duration: getTimeInMinutes(movie.duration)});
  });
}