import ruPhrases from '../localization/ru';
import enPhrases from '../localization/en';
import dePhrases from '../localization/de';

const createVocabular = (lang) => {
   switch (lang) {
      case 'RU':
         return ruPhrases;
      case 'EN':
         return enPhrases;
      case 'DE':
         return dePhrases;
      default:
         return null;
   }
};

export default createVocabular;
