jQuery(function () {
  jQuery("#search_filter").on('keyup change',function (event) {
    dt_filter(jQuery(this).val());
  });
  jQuery("#category_filter").on('change',function (event) {
    dt_filter(jQuery(this).val());
  });
  jQuery("#coverage_fitler").on('change',function (event) {
    dt_filter(jQuery(this).val());
  });
  jQuery("#dataformat_filter").on('change',function (event) {
    dt_filter(jQuery(this).val());
  });
  
  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");
  let categories = new Set();
  let coverage = new Set();
  let dataFormat = new Set();
  
  rows.each(function(){
    const row = jQuery(this);    

    let c = row.find('td.category').text();
    c = c.split(',').map(elem=>elem.trim());
    categories = new Set([...categories, ...c]);
    
    let cov = row.find('td.coverage').text();
    cov = cov.split(';').map(elem=>elem.trim());
    coverage = new Set([...coverage, ...cov]);

    let d = row.find('td.data-format').text();
    d = d.split(';').map(elem=>elem.trim());
    dataFormat = new Set([...dataFormat, ...d]);
  })

  categories.forEach((elem)=>{
    jQuery('#category_filter').append('<option>'+elem+'</option>')
  })
  coverage.forEach((elem)=>{
    jQuery('#coverage_filter').append('<option>'+elem+'</option>')
  })
  dataFormat.forEach((elem)=>{
    jQuery('#dataformat_filter').append('<option>'+elem+'</option>')
  })
});

function dt_filter(filters) {
  if (!Array.isArray(filters)) {
    filters = [filters];
  }
  const table = jQuery(".datatable-container table");
  const rows = table.find("tbody tr");
  rows.each(function () {
    textContent = this.textContent.toUpperCase();
    const show = filters.every((term) => textContent.includes(term.toUpperCase()));
    console.log(show);
    if (!show) {
      jQuery(this).hide();
    } else {
      jQuery(this).show();
    }
  });
}
