/* global describe, it, expect */
import * as utils from './utils';

describe('utils.js', () => {
  describe('camelToTitleCase', () => {
    it('should covert strings in camel case to title case', () => {
      expect(utils.camelToTitleCase('title')).toBe('Title');
      expect(utils.camelToTitleCase('titleCase')).toBe('Title Case');
      expect(utils.camelToTitleCase('longerTitleCase')).toBe('Longer Title Case');
      expect(utils.camelToTitleCase('muchLongerTitleCase')).toBe('Much Longer Title Case');
    });
  });

  describe('camelToMacroCase', () => {
    it('should convert strings in camel case to macro case', () => {
      expect(utils.camelToMacroCase('macro')).toBe('MACRO');
      expect(utils.camelToMacroCase('macroCase')).toBe('MACRO_CASE');
      expect(utils.camelToMacroCase('longerMacroCase')).toBe('LONGER_MACRO_CASE');
      expect(utils.camelToMacroCase('muchLongerMacroCase')).toBe('MUCH_LONGER_MACRO_CASE');
    });
  });

  describe('filterMacroCaseKeys', () => {
    it('should return the same object', () => {
      const macroCaseKeysObject = {
        MACRO_CASED_KEY_0: null,
        MACRO_CASED_KEY_1: null,
        MACRO_CASED_KEY_2: null,
        MACRO_CASED_KEY_3: null,
      };
      expect(utils.filterMacroCaseKeys(macroCaseKeysObject))
        .toMatchObject(macroCaseKeysObject);
    });

    it('should return object with only macro case keys', () => {
      const mixedCaseKeysObject = {
        MACRO_CASED_KEY_0: null,
        MACRO_CASED_KEY_1: null,
        MACRO_CASED_KEY_2: null,
        MACRO_CASED_KEY_3: null,
        PascalCaseKey: null,
        camelCaseKey: null,
        NOT_MACRO_CASED_KEy: null,
        iDoNtKnowWhAtImDoingCasedKey: null,
      };
      expect(utils.filterMacroCaseKeys(mixedCaseKeysObject))
        .toMatchObject({
          MACRO_CASED_KEY_0: null,
          MACRO_CASED_KEY_1: null,
          MACRO_CASED_KEY_2: null,
          MACRO_CASED_KEY_3: null,
        });
    });
  });
});
