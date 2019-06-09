
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
  return movies.sort((a, b) => {
    if (getTimeInMinutes(a.duration) - getTimeInMinutes(b.duration) == 0) {
      return a.title.localeCompare(b.title);
    }
    return(getTimeInMinutes(a.duration) - getTimeInMinutes(b.duration));
  });
}

function getTimeInMinutes(timeString) {
  let hrsMins = timeString.toString().split(' ');
  if (hrsMins[0].indexOf('h') == -1) {
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
  return movies.map(movie => movie.title).sort().slice(0, 20);
}

// Best yearly rate average
function bestYearAvg(movies) {
  if (!movies.length) return null;

  //reduce to an object with a property for each year, which is used to store an object containing the year name, count of movies that year, and the sum of their ratings
  let moviesByYear = movies.reduce((allYears, movie) => {
    let year = movie.year;
    if (year in allYears) {
      allYears[year].count++;
      allYears[year].ratingSum += parseFloat(movie.rate);
    } else {
      allYears[year] = {name: year, count: 1, ratingSum: parseFloat(movie.rate)};
    }
    return allYears;
  }, {});
  
  // get the {year, count, rating sum} objects as an array, so we can sort it.
  var yearsArray = Object.values(moviesByYear);

  let sorted = yearsArray.sort((a, b) => {
    if (a.ratingSum/a.count === b.ratingSum/b.count) {
      return a.name.localeCompare(b.name); 
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