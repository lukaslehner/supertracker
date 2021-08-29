---
layout: datatable
title: Surveys
permalink: /surveys/
order: 2
bodyclass: page-datatable surveys
---
<form class="filter-container mb-3">
  
  <div>
    <div class="filter-metadata font-weight-bold mt-2 d-flex justify-content-between">
      <div class="d-flex align-items-end">
        <span>Results: </span> <span data-content="DATASETS_FOUND"></span> / <span data-content="DATASETS_TOTAL"></span>
      </div>
      <span></span>
      <a href="https://raw.githubusercontent.com/lukaslehner/supertracker/master/_data/surveys.csv" target="_blank" class="btn btn-primary" data-action="download-csv">Download as CSV</a>
    </div>      
  </div>

</form>  


<div class="datatable-container surveys">
  <table>
    {%- assign rownumber = 0 -%}
    {% for row in site.data.surveys %}
      {% if forloop.first %}
      <thead>
        <tr>
          <th class="sampling-method">Sampling</th>
          <th class="title">Title</th>
          <th class="policy-area">Policy Area</th>
          <th class="focus">Focus</th>
          <th class="country-coverage">Country Coverage</th>
          <th class="time-coverage">Time Coverage</th>
          <th class="data-collection-interval">Interval of Data Collection</th>
          <th class="individual-level-data">Individual Level Data from Pre-COVID</th>
          <th class="micro-data-availability">Micro Data Availablity</th>
          <th class="authors">Authors</th>
        </tr>
      </thead>
      <tbody>
      {% else %}
        {%- assign rownumber = rownumber | plus: 1 -%}
        <tr>
          <td class="sampling-method">
            <a>
              {{ row['Sampling'] }}
            </a>
          </td>
          <td>
            <a href="{{ row['Link'] }}">
              {{ row['Title'] }}
            </a>
          </td>
          <td class="policy-area">
            {{ row['Policy Area'] }}
          </td>
          <td class="focus">
            {{ row['Focus'] }}
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
          <td class="data-collection-interval">
            {{ row['Interval of Data Collection'] }}
          </td>
          <td class="individual-level-data">
            {{ row['Availability of Individual Level Data from Pre-COVID'] }}
          </td>
          <td class="micro-data-availability">
            {{ row['Micro Data Availablity'] }}
          </td>
          <td class="authors">
            {{ row['Authors'] | markdownify }}
          </td>
        </tr>
      {% endif %}
    {% endfor %}
    </tbody>
  </table>
</div>