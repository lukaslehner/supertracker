const allTerms = new Set();
let dt_sortby = 1;
let dt_order = "asc";
let dt_search = "";

jQuery(function () {
  // var primaryFilter = jQuery('#primaryfilter');
  // createMultiSelect('Type', ';', primaryFilter);

  jQuery('.datatable-container table th').each(function(){
    const icons = `
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
    const content = jQuery(this).text();
    const index = jQuery(this).index() + 1;
    const classes = index == 1 ? 'active' : '';
    jQuery(this).html(`<a class="${classes}" data-order="true" data-sortby="${index}">${content}${icons}</a>`)
  })
  
  var titles = getTerms('title', ';');
  titles.forEach((title) => allTerms.add(title));

  createMultiSelect("policy-area", ";", jQuery("th.policy-area"), { showLabel: false });
  createMultiSelect("country-coverage", ";", jQuery("th.country-coverage"), { showLabel: false });
  createMultiSelect("data-format", ";", jQuery("th.data-format"), { showLabel: false });
  createMultiSelect("authors", ";", jQuery("th.authors"), { showLabel: false });
  // createMultiSelect("start-date", ";", jQuery('th.start-date'), { showLabel: false });
  createDateRangeFilter("time-coverage", ";", jQuery('th.time-coverage'));
  // createMultiSelect("end-date", ";", jQuery('th.end-date'), { showLabel: false });
  createMultiSelect("source", ";", jQuery('th.source'), { showLabel: false });
  createMultiSelect("world-region", ";", jQuery('th.world-region'), { showLabel: false });
  createMultiSelect("provider", ";", jQuery('th.provider'), { showLabel: false });

  var surveyFilter = jQuery("#surveyfilter");

  createMultiSelect("target-population", ";", jQuery('th.target-population'), { showLabel: false });
  createMultiSelect("sampling-method", ";", jQuery('th.sampling-method'), { showLabel: false });
  createMultiSelect("time", ";", jQuery('th.time'), { showLabel: false });
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

  jQuery('a[data-sortby]').click(function() {
    const elem = jQuery(this);
    const active = jQuery(this).hasClass('active')
    let order = jQuery(this).attr('data-order') === 'true';
    if(active){
      order = !order
    }

    dt_sortby = jQuery(this).data('sortby');
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

  jQuery('[data-action="download-csv"]').click(function () {
    downloadCsv();
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

  tbody
    .find("tr")
    .sort(function (a, b) {
      if (asc) {
        return $("td:nth-child(" + column + ")", a)
          .text()
          .localeCompare($("td:nth-child(" + column + ")", b).text());
      } else {
        return $("td:nth-child(" + column + ")", b)
          .text()
          .localeCompare($("td:nth-child(" + column + ")", a).text());
      }
    })
    .appendTo(tbody);
}

function createMultiSelect(column, splitter, container, options = {}) {
  const { showLabel = true } = options;

  var id = makeSafeForCSS(column) + "_filter";

  var terms = getTerms(column, splitter);

  terms.forEach((term) => allTerms.add(term));

  var options = terms
    .sort()
    .reduce((string, term) => `${string}<option>${term}</option>`, '');
  
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
      <input placeholder="Select Daterange" type="text" name="daterange" class="form-control" id="${id}">
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
      'Entire Pandemic': [moment('2020-03-11'), moment().subtract(1, 'day')],
      'Spring 2020': [moment('2020-03-11'), moment('2020-05-01')],
      'Autumn 2020': [moment('2020-11-01'), moment('2020-12-01')],
      'Winter 2020/2021': [moment('2020-12-14'), moment('2021-01-31')],
      'Spring 2021': [moment('2021-02-23'), moment('2021-04-30')],
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

function getTerms(column, splitter) {
  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");
  const headings = table.find("thead tr>*");
  let terms = new Set();

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

    terms = new Set([...terms, ...newTerms]);
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

function downloadCsv() {
  // var json_pre = '[{"Id":1,"UserName":"Sam Smith"},{"Id":2,"UserName":"Fred Frankly"},{"Id":1,"UserName":"Zachary Zupers"}]';
  // var json = $.parseJSON(json_pre);
  var csv = ``;
  const table = jQuery(".datatable-container table");

  csv += table
    .find("thead tr th")
    .toArray()
    .reduce(function (thData, elem) {
      if (jQuery(elem).hasClass("hidden")) {
        return thData;
      }
      const end = jQuery(elem).is(":last-child") ? "\n" : ",";
      return thData + elem.textContent + end;
    }, "");

  csv += table
    .find("tbody tr td")
    .toArray()
    .reduce(function (rowData, elem) {
      if (jQuery(elem).parent().hasClass("hidden")) {
        return rowData;
      }
      const end = jQuery(elem).is(":last-child") ? "\n" : ",";

      let content = elem.textContent.trim();

      return rowData + `"${content}"${end}`;
    }, "");

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csv]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "data.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
