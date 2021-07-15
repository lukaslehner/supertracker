---
layout: datatable
title: Policy Trackers
permalink: /policy-trackers/
order: 1
bodyclass: page-datatable
---
<form class="filter-container mb-3">
  
  <div>
    <div class="filter-metadata font-weight-bold mt-2 d-flex justify-content-between">
      <div class="d-flex align-items-end">
        <span>Results: </span> <span data-content="DATASETS_FOUND"></span> / <span data-content="DATASETS_TOTAL"></span>
      </div>
      <span></span>
      <a href="https://raw.githubusercontent.com/lukaslehner/supertracker/master/_data/trackers.csv" target="_blank" class="btn btn-primary" data-action="download-csv">Download as CSV</a>
    </div>      
  </div>

</form>  


<div class="datatable-container">
  <table>
    
    {%- assign rownumber = 0 -%}
    {% for row in site.data.trackers %}
      {% if forloop.first %}
      <thead>
        <tr>
          <th class="title">
            Title
          </th>
          <th class="authors">
            <a data-sortby>
              Authors
            </a>
          </th>          
          <th class="policy-area">
            <a data-sortby>
              Policy Area
            </a>
          </th>
          <th class="focus">
            <a data-sortby>
              Focus
            </a>
          </th>
          <th class="world-region">
            <a data-sortby>
              World Region
            </a>
          </th>          
          <th class="country-coverage">
            <a data-sortby>
              Country Coverage
            </a>
          </th>
          <th class="time-coverage">
            <a data-sortby>
              Time Coverage
            </a>
          </th>     
          <th class="data-format">
            <a data-sortby>
              Data Format
            </a>
          </th>    
          <th class="provider">
            <a data-sortby>
              Provider
            </a>
          </th>          
          <th class="source">
            <a data-sortby>
              Source
            </a>
          </th>            
          <th class="type">Type</th>
        </tr>
      </thead>
      <tbody>
      {% else %}
        {%- assign rownumber = rownumber | plus: 1 -%}
        <tr>
          <td class="title">
            <a href="{{row['Link']}}" target="_blank">
              {{ row['Title'] }}
            </a>
          </td>
          <td class="authors">
            {{ row['Authors'] | markdownify }}
          </td>
          <td class="policy-area">
            {{ row['Policy Area'] }}
          </td>
          <td class="focus">
            {{ row['Focus'] }}
          </td>
          <td class="world-region">
            {{ row['World Region'] }}
          </td>
          <td class="country-coverage">
            {%- assign country_codes = row['Country Coverage'] | split: "; " -%}
            {%- assign i = 1 -%}
            
            {%- for codeUnsave in country_codes -%}
              {%- assign i = i | plus: 1 -%}
              {%- assign code = codeUnsave | strip -%}
              {%- assign country_name = site.data.countries | where: "Alpha-3 code", code | map: 'Country' -%}
              {%- assign country_name = country_name[0] -%}

              {%- if country_name -%}
                {{ country_name }}
              {%- else -%}
                {{ code }}
              {%- endif -%}
              
              {%- if i == 10 -%}
                {%- assign too_many_countries = true -%}
                <!-- <br><a class="btn btn-sm btn-secondary font-weight-bold" data-toggle="collapse" href="#row_countries_{{rownumber}}"> show {{ country_codes.size | minus: 10 }} more countries... </a> -->
                <div class="more collapse" id="row_countries_{{rownumber}}">
              {%- endif -%}
              {{'; '}}
              {%- if forloop.last == true and i >= 10 -%}
                </div>
                {%- if too_many_countries -%}
                  <br><a class="show-more btn btn-sm btn-secondary" data-toggle="collapse" href="#row_countries_{{rownumber}}" data-content="show {{ country_codes.size | minus: 10 }} more countries..."></a>
                {%- endif -%}
              {%- endif -%}



            {% endfor %}
          </td>
          <td class="time-coverage" data-start="{{row['Start Date']}}" data-end="{{row['End Date']}}">
            {{ row['Start Date'] | date: '%d.%b %Y' }} - {{ row['End Date'] | date: '%d.%b %Y' }}
          </td>
          <td class="data-format">
            {{ row['Data Format'] }}
          </td>
          <td class="provider">
            {{ row['Provider'] }}
          </td>
          <td class="source">
            {{ row['Source'] }}
          </td>
          <td class="type">
            {{ row['Type'] }}
          </td>
        </tr>
      {% endif %}
    {% endfor %}
    </tbody>
  </table>
</div>