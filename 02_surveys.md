---
layout: datatable
title: Surveys
permalink: /surveys/
order: 2
bodyclass: page-datatable surveys
---

<table>
  {%- assign rownumber = 0 -%}
  {% for row in site.data.surveys %}
    {% if forloop.first %}
    <thead>
      <tr>
        <th class="title">Title</th>
        <th class="focus">Focus</th>
        <th class="country-coverage">Country Coverage</th>
        <th class="authors">Authors</th>
        <th class="target-population">Target Population</th>
        <th class="sampling-method">Sampling Method</th>
        <th class="time">Time</th>
        <th class="data-collection-interval">Interval of Data Collection</th>
        <th class="individual-level-data">Individual Level Data from Pre-COVID</th>
        <th class="number-of-observations">Number of Observations</th>
        <th class="micro-data-availability">Micro Data Availablity</th>
        <th class="type">Type</th>
      </tr>
    </thead>
    <tbody>
    {% else %}
      {%- assign rownumber = rownumber | plus: 1 -%}
      <tr>
        <td>
          <a href="{{ row['Link'] }}">
            {{ row['Title'] }}
          </a>
        </td>
        <td class="focus">
          {{ row['Focus'] }}
        </td>
        <td class="country-coverage">
          {%- assign country_codes = row['Country Coverage'] | split: "; " -%}
          {%- assign i = 1 -%}
          
          {%- for code in country_codes -%}
            {%- assign i = i | plus: 1 -%}
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
        <td class="authors">
          {{ row['Authors'] | markdownify }}
        </td>
        <td class="target-population">
          {{ row['Target Population'] }}
        </td>
        <td class="sampling-method">
          {{ row['Sampling Method'] }}
        </td>
        <td class="time">
          {{ row['Time'] }}
        </td>
        <td class="data-collection-interval">
          {{ row['Interval of Data Collection'] }}
        </td>
        <td class="individual-level-data">
          {{ row['Availability of Individual Level Data from Pre-COVID'] }}
        </td>
        <td class="number-of-observations">
          {{ row['Number of Observations'] }}
        </td>
        <td class="micro-data-availability">
          {{ row['Micro Data Availablity'] }}
        </td>
        <td class="type">
          {{ row['Type'] }}
        </td>
      </tr>
    {% endif %}
  {% endfor %}
  </tbody>
</table>