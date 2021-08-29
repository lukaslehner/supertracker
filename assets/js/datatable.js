const allTerms = new Set();
let dt_sortby = 1;
let dt_order = "asc";
let dt_search = "";

jQuery(function () {
  // var primaryFilter = jQuery('#primaryfilter');
  // createMultiSelect('Type', ';', primaryFilter);

  jQuery('.datatable-container table th').each(function(){
    let icons = ``;
    const content = jQuery(this).text();
    const index = jQuery(this).index() + 1;
    const classes = index == 1 ? 'active' : '';
    const className = jQuery(this).attr('class');

    switch (className) {
      case 'country-coverage':
        icons = `
          <svg class="asc" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
            <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
            <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
            <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
          </svg>
          <svg class="desc" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-sort-numeric-up-alt" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
            <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
          </svg>
        `;
        break;
      default:
        icons = `
          <svg class="desc" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-sort-alpha-up-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5z"/>
            <path fill-rule="evenodd" d="M6.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L4 3.207l1.646 1.647a.5.5 0 0 0 .708 0z"/>
            <path d="M9.027 7h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055L9.027 6.309V7zm.637 7l.418-1.371h1.781L12.281 14h1.121l-1.78-5.332h-1.235L8.597 14h1.067zM11 9.687l.652 2.157h-1.351l.652-2.156H11z"/>
          </svg>
          <svg class="asc" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-sort-alpha-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 4 2z"/>
            <path fill-rule="evenodd" d="M6.354 11.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L4 12.793l1.646-1.647a.5.5 0 0 1 .708 0z"/>
            <path d="M9.664 7l.418-1.371h1.781L12.281 7h1.121l-1.78-5.332h-1.235L8.597 7h1.067zM11 2.687l.652 2.157h-1.351l.652-2.157H11zM9.027 14h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055l-2.578 3.719V14z"/>
          </svg>
        `;
        break;
    }
    
    jQuery(this).html(`<a class="${classes}" data-order="true" data-sortby="${index}">${content}${icons}</a>`)
  })
  
  var titles = getTerms('title', ';');
  titles.forEach((title) => allTerms.add(title));

  createMultiSelect("policy-area", ";", jQuery("th.policy-area"), { showLabel: false });
  createMultiSelect("country-coverage", ";", jQuery("th.country-coverage"), { showLabel: false });
  createMultiSelect("data-format", ";", jQuery("th.data-format"), { showLabel: false });
  createMultiSelect("authors", ";", jQuery("th.authors"), { showLabel: false, showTermResultsNumber: false });
  // createMultiSelect("start-date", ";", jQuery('th.start-date'), { showLabel: false });
  createDateRangeFilter("time-coverage", ";", jQuery('th.time-coverage'));
  // createMultiSelect("end-date", ";", jQuery('th.end-date'), { showLabel: false });
  createMultiSelect("source", ";", jQuery('th.source'), { showLabel: false });
  createMultiSelect("world-region", ";", jQuery('th.world-region'), { showLabel: false });
  createMultiSelect("provider", ";", jQuery('th.provider'), { showLabel: false });

  var surveyFilter = jQuery("#surveyfilter");

  createMultiSelect("target-population", ";", jQuery('th.target-population'), { showLabel: false });
  createMultiSelect("sampling-method", ";", jQuery('th.sampling-method'), { showLabel: false });
  // createMultiSelect("time", ";", jQuery('th.time'), { showLabel: false });
  createMultiSelect("data-collection-interval", ";", jQuery('th.data-collection-interval'), { showLabel: false });
  createMultiSelect("individual-level-data", ";", jQuery('th.individual-level-data'), { showLabel: false });
  createMultiSelect("number-of-observations", ";", jQuery('th.number-of-observations'), { showLabel: false });
  createMultiSelect("micro-data-availability", ";", jQuery('th.micro-data-availability'), { showLabel: false });

  jQuery("#sortby").change(function () {
    dt_sortby = jQuery(this).val();
    datatableFilter();
  });
  jQuery("#order").change(function () {
    dt_order = jQuery(this).val();
    datatableFilter();
  });

  jQuery(".datatable-container a").attr('target', '_blank');

  jQuery('a[data-sortby]').click(function() {
    const elem = jQuery(this);
    const active = jQuery(this).hasClass('active')
    let order = jQuery(this).attr('data-order') === 'true';
    if(active){
      order = !order
    }

    dt_sortby = jQuery(this).parent().index() + 1;
    dt_order = order ? 'asc' : 'desc';

    jQuery(this).attr('data-order', order);

    jQuery('[data-sortby]').removeClass('active')
    jQuery(this).addClass('active')
    
    datatableFilter();
  })

  jQuery('th.title').append(`<input placeholder="Enter Searchterm" autocomplete="off" type="text" class="form-control" id="search_filter">`);
  jQuery("#search_filter").on("input change keypress", function () {
    datatableFilter("all", jQuery(this).val());
  });

  datatableFilter();

  jQuery('[data-action="download-csv"]').click(function (e) {
    var link = jQuery(this).attr('href');
    downloadCsv(link);
    e.preventDefault();
  });

  jQuery("#search_filter").autoComplete({
    resolver: "custom",
    events: {
      search: function (query, callback) {
        query = query.toLowerCase();
        const results = [...allTerms]
          .flat(Infinity)
          .filter((elem) => elem && elem.toLowerCase().includes(query));
        callback(results);
      },
    },
  });
});

/** Actual Fitler Function */
const datatableFilterTerms = new Map();
const datatableDateRangeFilterTerms = new Map();
function datatableDateRangeFilter(column, start, end){
  if(column && start && end){
    datatableDateRangeFilterTerms.set(column, {start, end});
  }else if(column){
    datatableDateRangeFilterTerms.delete(column);
  }

  datatableFilter();
}
function datatableFilter(column, terms) {
  if (column) {
    if (!Array.isArray(terms)) {
      terms = [terms];
    }
    datatableFilterTerms.set(column, terms);
  }

  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");

  const allTerms = [...datatableFilterTerms.values()].flat();
  const allFilter = [...datatableFilterTerms.values()];

  let visibleElems = 0;
  let totalElems = rows.length;
  rows.each(function () {
    textContent = this.textContent.toLowerCase();

    let show = true;

    datatableFilterTerms.forEach((terms, cat)=>{
      let catShow = true;
      let catTextContent = jQuery(this).find(`.${cat}`).text().toLowerCase() || '';
      
      if(!terms || terms.length === 0) return;      

      switch (cat) {
        case 'all':
          catShow = terms.every((term) => textContent.includes(term.toLowerCase()))          
          break;
        case 'country-coverage':
          catShow = terms.every((term) => catTextContent.includes(term.toLowerCase()))          
          break;
        default:
          catShow = terms.some((term) => catTextContent.includes(term.toLowerCase()))
          break;
      }

      if(!catShow) show = false;
    })

    const uptodateTerm = 'up-to-date';
    datatableDateRangeFilterTerms.forEach(({start, end}, cat)=>{
      cell = jQuery(this).find(`.${cat}`);
      let startString = cell.attr('data-start');
      let endString = cell.attr('data-end');
      if(startString && endString){
        const dataStart = startString.includes(uptodateTerm) ? moment() : moment(startString);
        const dataEnd = endString.includes(uptodateTerm) ? moment() : moment(endString);
        if(
          !start.isBetween(dataStart, dataEnd) ||
          !end.isBetween(dataStart, dataEnd)
        ){
          show = false;
        }
      }else{
        show = false;
      }
      // let textContent =jQuery(this).find(`.${cat}`).text();
      // if(textContent){
      //   let date;
      //   if(textContent.includes(uptodateTerm)){
      //     date = moment();
      //   }else{
      //     date = moment(textContent);
      //   }
      //   if(!date.isBetween(start, end)){
      //     show = false;
      //   }
      // }else{
      //   show = false;
      // }
    })

    if (!show) {
      jQuery(this).addClass("hidden");
    } else {
      jQuery(this).removeClass("hidden");
      visibleElems++;
    }
  });

  jQuery('[data-content="DATASETS_FOUND"]').text(visibleElems);
  jQuery('[data-content="DATASETS_TOTAL"]').text(totalElems);

  sortTable(table, dt_sortby, dt_order);
}

function sortTable(table, column, order) {
  var asc = order === "asc",
    tbody = table.find("tbody");

  var columnClass =  table.find("th:nth-child(" + column + ")").attr('class');

  console.log(columnClass);

  tbody
    .find("tr")
    .sort(function (a, b) {
      var compare = 0;
      switch (columnClass) {
        case 'country-coverage':
          var aSize = $("td:nth-child(" + column + ")", a).text().split(';').length;
          var bSize = $("td:nth-child(" + column + ")", b).text().split(';').length;
          compare = aSize-bSize;
          break;
        default:
          compare = $("td:nth-child(" + column + ")", a)
            .text()
            .localeCompare($("td:nth-child(" + column + ")", b).text());
      }
      return asc ? compare : compare * -1;
    })
    .appendTo(tbody);
}

function createMultiSelect(column, splitter, container, options = {}) {
  const { showLabel = true, showTermResultsNumber = true } = options;
  var id = makeSafeForCSS(column) + "_filter";

  var terms = getTerms(column, splitter);
  var nonUniqueTerms = getTerms(column, splitter, false);

  terms.forEach((term) => allTerms.add(term));

  var options = terms
    .sort()
    .reduce((string, term) => {
      var termResultsNumber = nonUniqueTerms.filter(t => t === term).length;
      var termResultsNumberString = showTermResultsNumber ? `(${termResultsNumber})` : '';
      return `${string}<option value="${term}">${term} ${termResultsNumberString}</option>`;
    }, '');

  var labelElement = showLabel ? `<label>${column}</label>` : "";

  var filter = `
    <div class="filter-element ${id}_container">
      ${labelElement}
      <select data-container="body" data-live-search="true" title="Select Filter..." multiple id="${id}">
        ${options}
      </select>
    </div>  
  `;

  container.append(filter);

  jQuery(`#${id}`).selectpicker();

  jQuery(`#${id}`).on("change", function (event) {
    datatableFilter(column, jQuery(this).val());
  });
}

function createDateRangeFilter(column, splitter, container){
  var terms = getTerms(column, splitter);

  terms.forEach((term) => allTerms.add(term));

  var id = makeSafeForCSS(column) + "_filter";
  
  var picker = `
    <div class="filter-element ${id}_container">
      <input placeholder="Select Date" type="text" name="daterange" class="form-control" id="${id}">
    </div>  
  `;

  container.append(picker);

  var format = 'YYYY-MM-DD';

  jQuery(`#${id}`).daterangepicker({
    locale: { 
      cancelLabel: 'Clear',
      format: format,
    },
    ranges: {
      'Entire Pandemic': [moment('2020-03-12'), moment().subtract(1, 'day')],
      'Spring 2020': [moment('2020-03-12'), moment('2020-04-30')],
      'Autumn 2020': [moment('2020-11-02'), moment('2020-11-30')],
      'Winter 2020/2021': [moment('2020-12-15'), moment('2021-01-30')],
      'Spring 2021': [moment('2021-02-24'), moment('2021-04-29')],
      'Up-to-Date': [moment().subtract(2, 'day'),moment().subtract(1, 'day')],
    },
    "alwaysShowCalendars": true,
    autoUpdateInput: false,
  }, function(start, end){
    picker = jQuery(`#${id}`);
    picker.val(start.format(format) + ' - ' + end.format(format));
    datatableDateRangeFilter(column, start, end);
  });
  
  jQuery(`#${id}`).on('cancel.daterangepicker', function(ev, picker) {
    picker = jQuery(`#${id}`);
    picker.val('');
    datatableDateRangeFilter(column);
  });
}

function getTerms(column, splitter, unique = true) {
  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");
  const headings = table.find("thead tr>*");
  let terms = new Set();
  if(!unique){
    terms = new Array();
  }

  const columnNumber = headings.toArray().findIndex(function (elem) {
    return jQuery(elem).hasClass(column);
  });

  rows.each(function () {
    const row = jQuery(this);

    const elem = row.find(`.${column}`)[0];
    let newTerms = elem ? elem.textContent : "";
    newTerms = newTerms
      .split(splitter)
      .map((term) => term.trim())
      .filter(term => term !== '');

    if(unique){
      terms = new Set([...terms, ...newTerms]);
    }else{
      terms = [...terms, ...newTerms];
    }
  });

  return [...terms];
}

function makeSafeForCSS(name) {
  return name.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return "_" + s.toLowerCase();
    return "__" + ("000" + c.toString(16)).slice(-4);
  });
}

async function downloadCsv(link) {
  var response = await fetch(link);
  var csv = await response.text();

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csv]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "data.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
