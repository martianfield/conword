'use strict';

const dayNames = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  de: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
  fr: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
  it: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'],
  es: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
};

module.exports = function (days, options) {
  // fix options
  options = options ? options : { language:'en', zeroBased:false, connector:'-' };
  let zeroBased, connector, language
  zeroBased = options.zeroBased ? options.zeroBased : false;
  connector = options.connector ? options.connector : '-';
  language = options.language ? options.language : 'en';
  language = dayNames.hasOwnProperty(language) ? language : 'en';

  // default result
  let result = {
    days: [],
    periods: []
  }

  // transform days to matrix
  let matrix = [];
  let allWeek = true;
  let modificator = zeroBased ? 0 : 1;
  for(let i=0; i<7; i+=1) {
    if(days.find(day => { return day === i + (modificator)})) {
      matrix.push(true);
    }
    else {
      matrix.push(false);
      allWeek = false;
    }
  }

  // available month names
  for( let i=0; i<7; i+=1) {
    if(matrix[i]) {
      result.days.push(dayNames[language][i]);
    }
  }

  // periods
  let periods = [];
  if(allWeek) {
    periods.push({start:0, end:6});
  }
  else {
    let currentPeriod = {}
    for( let i=0; i<7; i+=1) {
      let daySelected = matrix[i];
      if(daySelected) {
        // start a new period
        if(currentPeriod.start === undefined) {
          currentPeriod.start = i;
        }
        // end the period if we are on sunday
        if(i === 6) {
          currentPeriod.end = i
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
    // check if the last period crossed the week boundary ... combine the first and last period into one
    if(matrix[6] && matrix[0]) {
      let first = periods.shift();
      periods[periods.length-1].end = first.end;
    }
  }


  // make words out of numbers
  for(let i=0; i<periods.length; i+=1) {
    let period = {
      start: dayNames[language][periods[i].start],
      end: dayNames[language][periods[i].end]
    }
    if(period.start !== period.end) {
      result.periods.push(`${period.start}${connector}${period.end}`)
    }
    else {
      result.periods.push(`${period.start}`)
    }
  }

  return result
}