'use strict';

const monthNames = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
};

const allYearText = {
  en: "all year",
  de: "ganzjährig",
  fr: "toute l'année",
  it: "tutto l'anno",
  es: "todo el año"
};

module.exports = function (months, options) {
  // fix options
  options = options ? options : { language:'en', zeroBased:false, connector:'-' };
  var zeroBased = options.zeroBased ? options.zeroBased : false;
  var connector = options.connector ? options.connector : '-';
  var language = options.language ? options.language : 'en';
  language = monthNames.hasOwnProperty(language) ? language : 'en';

  // default result
  var result = {
    months: [],
    periods: []
  };

  // transform months to matrix
  var matrix = [];
  var allYear = true;
  var modificator = zeroBased ? 0 : 1;
  for(var i=0; i<12; i+=1) {
    if(months.find(month => { return month === i + (modificator)})) {
      matrix.push(true);
    }
  else {
      matrix.push(false);
      allYear = false;
    }
  }

  // available month names
  for( var i=0; i<12; i+=1) {
    if(matrix[i]) {
      result.months.push(monthNames[language][i]);
    }
  }

  // periods
  var periods = []
  if(allYear) {
    periods.push({start:0, end:11});
  }
  else {
    var currentPeriod = {}
    for( var i=0; i<12; i+=1) {
      var monthSelected = matrix[i]
      if(monthSelected) {
        // start a new period
        if(currentPeriod.start === undefined) {
          currentPeriod.start = i;
        }
        // end the period if we are in december
        if(i === 11) {
          currentPeriod.end = i;
          periods.push({start:currentPeriod.start, end: currentPeriod.end});
        }
      }
      else {
        // end a period?
        if(currentPeriod.start !== undefined) {
          currentPeriod.end = i-1;
          periods.push({ start:currentPeriod.start, end:currentPeriod.end});
          currentPeriod = {};
        }
      }
    }
    // check if the last period crossed the year boundary ... combine the first and last period into one
    if(matrix[11] && matrix[0]) {
      var first = periods.shift();
      periods[periods.length-1].end = first.end;
    }
  }


  // make words out of numbers
  for(var i=0; i<periods.length; i+=1) {
    var period = {
      start: monthNames[language][periods[i].start],
      end: monthNames[language][periods[i].end]
    };
    if(periods[i].start === 0 && periods[i].end === 11) {
      result.periods.push(allYearText[language])
    }
    else if(period.start !== period.end) {
      result.periods.push(`${period.start}${connector}${period.end}`);
    }
    else {
      result.periods.push(`${period.start}`);
    }
  }

  return result
}