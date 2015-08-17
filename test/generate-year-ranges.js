/**
 * Created by xxcgreen on 18/08/15.
 */

describe('Test parsing of year formats', function() {
  it('should deal with lone year end value', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '-2012'
    ];

    var expected = {
      startYear: null,
      endYear:'2012'
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should add start and end year for a lone year value', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '254(2012)',
      '20:3(2012)'
    ];

    var expected = {
      startYear:'2012',
      endYear:'2012'
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should deal with various date formats', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '254(2012/2013) Supp.(Apr,1999/Mar,2000)'
    ];

    var expected = {
      startYear:'2012/2013',
      endYear:'Apr,1999/Mar,2000'
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should add start and end year for multiple values', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '10(1976)-25(1991)',
      '39 40 41:2(1976)  56(1992)  70rev(1991)'
    ];

    var expected = {
      startYear:'1976',
      endYear:'1991'
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should add only start year for values ending in -', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '1(1974)-32(2006)  33(2007)-',
      '3(1974)-Dec/Jan(2002/2003)  Oct/Nov(2003)-Dec/Jan(2006/07)  Apr/May(2007)-Dec/Jan(2011/12)  Feb/Mar(2012)-',
    ];

    var expected = {
      startYear:'1974',
      endYear:null
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should ignore comments', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      '10(1976)-25(1991);lacking some issues prior to (1982)',
      '39 40 41:2(1976)  56(1992)  70rev(1991);"lacking 87,93,96,130(1996)  158(1999)  161(1999)"'
    ];

    var expected = {
      startYear:'1976',
      endYear:'1991'
    };

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toEqual(expected);
    }
  });

  it('should ignore text or blank values', function () {
    expect(parseYears).toBeDefined();
    var testValues = [
      'Current year only',
      ''
    ];

    for (var i = 0, l = testValues.length; i < l; i++) {
      expect(parseYears(testValues[i])).toBeFalsy();
    }
  });

})
