
export function validCellRender(bool) {
    if (bool.value === true) {
      return '<div style="color: green; width: 50px">' +
        '<i class="material-icons">check_box</i></div>';
    } else {
      return '<div style="color: red; width: 50px">' +
        '<i class="material-icons">indeterminate_check_box</i></div>';
    }
  }

export function inIndexCellRender(bool) {
    if (bool.value === true) {
      return '<div style="color: black; width: 50px">' +
        '<i class="material-icons">done</i></div>';
    } else {
      return '<div style="color: red; width: 50px">' +
        '<i class="material-icons"></i></div>';
    }
  }

export function checkResultCellRender(result) {

  /** we want a score of 0 to be green, a score of 1 -> 5 be yellow and a score > 5 to be red */
  let color = 'green';
  let resultingString: string;
  let text: string;

  if (result.value > 0) { color = 'yellow'; }
  if (result.value > 5) { color = 'red'; }

  if (result.value > 0) {
    text = '<text font-size="12" stroke="white" font-family="Roboto" x="50%" y="75%" text-anchor="middle">' + result.value + '</text>';
  } else {
    text = '';
  }

  resultingString = '<div>' +
      '<svg height="20" width="20">' +
      '<circle cx="10" cy="10" r="10" stroke="grey" stroke-width="1" fill="' + color + '"></circle>' +
      text +
      '</svg></div>';

  return resultingString;
}

export const spreadsListCellStyle = {'text-align': 'right', 'padding-right': '70px'};
export const spreadsDetailCellStyle = {'text-align': 'right', 'padding-right': '70px'};
export const ratingCellStyle = {'text-align': 'center'};
export const symbolCellStyle = {'text-align': '-webkit-center'};


export function numberSort (valueA, valueB) {
  if (valueA && valueB) {
    return Number(valueA.replace(/[^0-9\.]+/g, '')) - Number(valueB.replace(/[^0-9\.]+/g, ''));
  } else {
    return 0;
  }
}


const customRatingSortingDef = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB+', 'BBB',
    'BBB-', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-', 'CCC+', 'CCC'];


export function ratingCurrentSort (valueA, valueB, nodeA, nodeB) {

  const firstCompare = customRatingSortingDef.indexOf(valueB) - customRatingSortingDef.indexOf(valueA);

  if (firstCompare === 0) {
    return numberSort(nodeB.data.credit_spread_current, nodeA.data.credit_spread_current);  // inverted !
  } else {
    return firstCompare;
  }
}

export function ratingProposedSort (valueA, valueB, nodeA, nodeB) {

  const firstCompare = customRatingSortingDef.indexOf(valueB) - customRatingSortingDef.indexOf(valueA);

  if (firstCompare === 0) {
    return numberSort(nodeB.data.credit_spread_proposed, nodeA.data.credit_spread_proposed);  // inverted !
  } else {
    return firstCompare;
  }

}

export function intCellRenderer(data) {return Math.round(data.value).toString(); }
