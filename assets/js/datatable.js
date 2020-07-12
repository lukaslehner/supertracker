let dt_sortby = 1;
let dt_order = "asc";
let dt_search = "";

jQuery(function () {
  // var primaryFilter = jQuery('#primaryfilter');
  // createMultiSelect('Type', ';', primaryFilter);

  var normalFilter = jQuery("#filterlist");

  createMultiSelect("Policy Area", ";", normalFilter);
  createMultiSelect("Country Coverage", ";", normalFilter);
  createMultiSelect("Data Format", ";", normalFilter);
  createMultiSelect("Authors", ";", normalFilter);

  var surveyFilter = jQuery("#surveyfilter");

  createMultiSelect("Target Population", ";", surveyFilter);
  createMultiSelect("Sampling Method", ";", surveyFilter);
  createMultiSelect("Time", ";", surveyFilter);
  createMultiSelect("Interval of Data Collection", ";", surveyFilter);
  createMultiSelect("Individual Level Data from Pre-COVID", ";", surveyFilter);
  createMultiSelect("Number of Observations", ";", surveyFilter);
  createMultiSelect("Micro Data Availablity", ";", surveyFilter);
  createMultiSelect("Level of Observation", ";", surveyFilter);

  jQuery("#sortby").change(function () {
    dt_sortby = jQuery(this).val();
    datatableFilter();
  });
  jQuery("#order").change(function () {
    dt_order = jQuery(this).val();
    datatableFilter();
  });
  jQuery("#search_filter").on("input change", function () {
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
          .filter(elem => elem && elem.toLowerCase().includes(query));
        console.log(query, results)
        callback(results);
      },
    },
  });
});

/** Actual Fitler Function */
const datatableFilterTerms = new Map();
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

  let visibleElems = 0;
  let totalElems = rows.length;
  rows.each(function () {
    textContent = this.textContent.toLowerCase();
    const show = allTerms.every((term) =>
      textContent.includes(term.toLowerCase())
    );

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

console.log('test');

const allTerms = new Set();
function createMultiSelect(column, splitter, container) {
  var id = makeSafeForCSS(column) + "_filter";

  var terms = getTerms(column, splitter);

  console.log(terms);
  
  terms.forEach(term => allTerms.add(term))

  var options = terms.sort().reverse().reduce(
    (term, string) => `${string}<option>${term}</option>`
  );

  var filter = `
    <div class="filter-element ${id}_container">
      <label>${column}</label>
      <select class="form-control" id="${id}">
        <option selected value="">all</option>
        ${options}
      </select>
    </div>  
  `;

  container.append(filter);

  jQuery(`#${id}`).on("change", function (event) {
    datatableFilter(column, jQuery(this).val());
  });
}

function getTerms(column, splitter) {
  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");
  const headings = table.find("thead tr>*");
  let terms = new Set();

  const columnNumber = headings.toArray().findIndex(function (elem) {
    if (!elem.textContent) return false;
    return elem.textContent.toLowerCase() === column.toLowerCase();
  });

  console.log(columnNumber);

  rows.each(function () {
    const row = jQuery(this);

    const elem = row.find(`:nth-child(${columnNumber + 1})`)[0];
    let d = elem ? elem.textContent : '';
    d = d.split(splitter).map((elem) => elem.trim());
    terms = new Set([...terms, ...d]);
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
