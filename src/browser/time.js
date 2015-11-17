import moment from 'moment';
import _ from 'lodash';

export function age(timestamp) {
  let seconds = ageInSeconds(timestamp);
  let agem = moment.duration(seconds, 'seconds');
  let components = [
    [agem.years(), 'y'],
    [agem.months(), 'm'],
    [agem.days(), 'd'],
    [agem.hours(), 'h'],
    [agem.minutes(), 'm'],
    [agem.seconds(), 's'],
  ]
  let toShow = _(components)
    .filter(([count, _]) => count > 0 )
    .take(2)
    .map(([count, label]) => `${count}${label}`)
    .value();

  if (toShow.length == 0) {
    return "now";
  } else {
    return toShow.join(" ");
  }
}

export function ageInSeconds(timestamp) {
  let then = moment(timestamp, moment.ISO_8601);
  let now = moment();
  return now.unix() - then.unix();
}
