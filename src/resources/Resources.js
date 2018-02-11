import * as Account from '../account/Account.js';
import * as AppConstants from '../constants/AppConstants.js';
import axios from 'axios';

let morphology = {};
let morphType = Account.getPreference(AppConstants.MORPH_TYPE);

export function getMorphology(book, chapter) {
  function success(resolve) {
    if (chapter) {
      const chapterMorph = getChapterMorph(book, chapter);
      resolve(chapterMorph);
    } else {
      resolve(morphology[book]);
    }
  }

  return new Promise((resolve, reject) => {
    if (morphology[book]) {
      success(resolve);
    } else {
      const url = `/resources/morph/${morphType}_parsed/${book}.txt`;
      axios.get(url).then((result) => {
        morphology[book] = result.data;
        success(resolve);
      });
    }
  });
}

export const bookShortNames = [
  "MT", "MR", "LU", "JOH", "AC",
  "RO", "1CO", "2CO", "GA", "EPH", "PHP", "COL", "1TH", "2TH",
  "1TI", "2TI", "TIT", "PHM",
  "HEB", "JAS", "1PE", "2PE", "1JO", "2JO", "3JO",
  "JUDE", "RE"
];

export const chapterCounts = {
  "MT" : 28, "MR" : 16, "LU" : 24, "JOH" : 21, "AC" : 28,
  "RO" : 16, "1CO" : 16, "2CO" : 13, "GA" : 6, "EPH" : 6,
  "PHP" : 4, "COL" : 4, "1TH" : 5, "2TH" : 3,
  "1TI" : 6, "2TI" : 4, "TIT" : 3, "PHM" : 1,
  "HEB" : 13, "JAS" : 5, "1PE" : 5, "2PE" : 3,
  "1JO" : 5, "2JO" : 1, "3JO" : 1,
  "JUDE" : 1, "RE" : 22
};

export const bookMediumNames = {
  "MT" : "Matt", "MR" : "Mark", "LU" : "Luke", "JOH" : "John",
  "AC" : "Acts", "RO" : "Rom", "1CO" : "1Cor", "2CO" : "2Cor",
  "GA" : "Gal", "EPH" : "Eph", "PHP" : "Phil", "COL" : "Col",
  "1TH" : "1Thess", "2TH" : "2Thess", "1TI" :
  "1Tim", "2TI" : "2Tim", "TIT" : "Titus", "PHM" : "Philem",
  "HEB" : "Heb", "JAS" : "James", "1PE" : "1Pet", "2PE" : "2Pet",
  "1JO" : "1John", "2JO" : "2John", "3JO" : "3John",
  "JUDE" : "Jude", "RE" : "Rev"
};

function getChapterMorph(book, chapter) {
  const bookMorph = morphology[book];
  const chapterMorph = [];
  for (let i=0; i<bookMorph.length; i++) {
    const refParsed = bookMorph[i][0].match(/\d\d?\d?/g);
    const morphChapter = parseInt(refParsed[0], 10);
    if (morphChapter < chapter) {
      continue;
    } else if (morphChapter > chapter) {
      break;
    }
    chapterMorph.push(bookMorph[i]);
  }
  return parseChapterMorphByVerse(chapterMorph);
}

function parseChapterMorphByVerse(chapterMorph) {
  const morphByVerse = [{
    [AppConstants.VERSE]: 1,
    [AppConstants.WORDS]: []
  }];
  let currVerse = 1;
  let lastVerse = morphByVerse[0];
  chapterMorph.forEach(morph => {
    const refParsed = morph[0].match(/\d\d?\d?/g);
    const verse = parseInt(refParsed[1], 10);
    const word = morph.slice(1);

    if (verse !== currVerse) {
      lastVerse = {
        [AppConstants.VERSE]: verse,
        [AppConstants.WORDS]: [word]
      };
      morphByVerse.push(lastVerse);
      currVerse = verse;
    } else {
      lastVerse[AppConstants.WORDS].push(word);
    }
  });
  return morphByVerse;
}








