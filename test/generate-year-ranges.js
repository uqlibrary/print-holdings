/**
 * Created by xxcgreen on 18/08/15.
 */

describe('Test parsing of simple year value', function() {
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
})
