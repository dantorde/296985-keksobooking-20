
var dataAds = window.data.createAds(8);
console.log(dataAds);

var testMark = window.mark.createMark(dataAds[1]);
//console.log(testMark);

var testMap = window.map.generateMarks(dataAds);
console.log(testMap);
