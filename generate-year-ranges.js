/**
 * Created by xxcgreen on 18/08/15.
 */

// globals
var startDateColHeading = 'StartDate';
var endDateColHeading = 'EndDate';
var valuesColHeading = 'LIB. HAS(CHECKIN)';

/**
 * Do any cleaning of the year values required
 *
 * @param {String} rawYear
 */
function cleanYear(rawYear) {
  var returnVal = rawYear.replace(/^\D*/, '');
  returnVal = returnVal.replace(/\D.*/, '');
  return returnVal;
}

/**
 * Private function, parses a string containing years into
 * a start and end year according to given business rules
 *
 * @param {String} strVal
 */
function parseYears(strVal) {
  // remove everything after semi colon, appears to be a
  // comment delimiter
  var strVal = strVal.split(';')[0].trim();

  var parts = strVal.match(/\([^\()]+\)/g);

  if (parts === null) {
    // -2015
    if (strVal.search(/^-\d+/) !== -1) {
      return {
        startYear: strVal.substr(1),
        endYear: strVal.substr(1)
      };
    }
  }
  else {
    // 1(1991)
    if (parts.length === 1) {
      return {
        startYear: cleanYear(parts[0]),
        endYear: cleanYear(parts[0])
      };
    }
    else {
      // 45(1997)-61(2013)  62(2014)-
      if (strVal.substr(-1,1) === '-') {
        return {
          startYear: cleanYear(parts[0]),
          endYear: null
        };
      }
      // everything else
      else {
        return {
          startYear: cleanYear(parts[0]),
          endYear: cleanYear(parts[parts.length - 1])
        };
      }
    }
  }

  return false;
}

/**
 * Given a row, return the index of the column with the
 * given text value
 *
 * @param {Array[String]} headings
 * @param {String} searchText
 */
function getColumnIndex(headings, searchText) {
  return headings.indexOf(searchText);
}

/**
 * Top level function, generates year ranges from the necessary
 * cells in the spreadsheet
 */
function generateYearRanges() {
  var spreadsheets = SpreadsheetApp.getActive();
  var spreadsheet = spreadsheets.getSheets()[0];

  var rowQuery = spreadsheet.getRange(1, 1, spreadsheet.getLastRow(), spreadsheet.getLastColumn());
  var rows = rowQuery.getValues();

  var headings = rows[0];

  var startDateCol = getColumnIndex(headings, startDateColHeading);
  var endDateCol = getColumnIndex(headings, endDateColHeading);
  var valuesCol = getColumnIndex(headings, valuesColHeading);

  // skip first row as headings
  for (var i = 1, l = rows.length; i < l; i++) {
    var values = parseYears('' + rows[i][valuesCol]);

    if (values) {
      // google sheets work on 1 based counting, not 0
      spreadsheet.getRange(i + 1, startDateCol + 1).setValue(values.startYear);
      spreadsheet.getRange(i + 1, endDateCol + 1).setValue(values.endYear);
    }
  }
}

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Generate year ranges', functionName: 'generateYearRanges'}
  ];
  spreadsheet.addMenu('UQL', menuItems);
}
