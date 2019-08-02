const times = [
//'180727_230155',
//'180728_000155',
  '180731_070156',
  '180801_070155',
  '180801_130206',
//'180816_010155',
  '180825_010158',
  '180825_070159',
  '180825_130200',
  '180825_190154',
  '180826_010156',
  '180826_130237',
  '180826_190154',
  '180828_010155',
  '180828_070155',
  '180828_130159',
  '180828_190156',
  '180829_010158',
  '180829_070258',
  '180829_130156',
  '180829_190200',
  '180830_010153',
  '180830_070157',
  '180830_130158',
  '180830_190155',
  '180831_010154',
  '180831_070158',
  '180831_130156',
  '180831_190158',
  '180901_010205',
  '180901_070159',
  '180901_130155',
  '180901_190157',
  '180902_010211',
  '180902_070153',
  '180902_130207',
  '180902_190205',
  '180903_070246',
  '180903_130207',
  '180903_190158',
  '180904_010156',
  '180904_070157',
  '180904_130157',
  '180904_190156',
  '180905_010159',
  '180905_070155',
  '180905_130202',
  '180905_190157',
  '180906_010155',
  '180906_070156',
  '180906_130203',
  '180906_190202',
  '180907_010157',
  '180907_070205',
  '180907_130156',
  '180907_190158',
  '180908_010159',
  '180908_070200',
  '180908_130156',
  '180908_190159' ]


window.movieResources = times.map( time => ({
    name: time,
    path: `https://s3.amazonaws.com/na.entwine.io/crrel/atlas/South_${time}/ept.json`
})).filter((x, i) => i % 10 == 0)

