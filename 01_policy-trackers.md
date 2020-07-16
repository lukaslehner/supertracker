---
layout: datatable
title: Policy tracker collection
permalink: /policy-trackers/
order: 1
bodyclass: page-datatable
---

<table>
  
  {%- assign rownumber = 0 -%}
  {% for row in site.data.trackers %}
    {% if forloop.first %}
    <thead>
      <tr>
        <th class="title">Title</th>
        <th class="policy-area">Policy Area</th>
        <th class="focus">Focus</th>
        <th class="country-coverage">Country Coverage</th>
        <th class="data-format">Data Format</th>
        <th class="authors">Authors</th>       
        <th class="type">Type</th>
      </tr>
    </thead>
    <tbody>
    {% else %}
      {%- assign rownumber = rownumber | plus: 1 -%}
      <tr>
        <td class="title">
          <a href="{{row['Link']}}">
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
              <!-- <br><a class="btn btn-sm btn-secondary font-weight-bold" data-toggle="collapse" href="#row_{{rownumber}}"> show {{ country_codes.size | minus: 10 }} more countries... </a> -->
              <div class="more collapse" id="row_{{rownumber}}">
            {%- endif -%}
            {{'; '}}
            {%- if forloop.last == true and i >= 10 -%}
              </div>
              {%- if too_many_countries -%}
                <br><a class="show-more btn btn-sm btn-secondary" data-toggle="collapse" href="#row_{{rownumber}}" data-content="show {{ country_codes.size | minus: 10 }} more countries..."></a>
              {%- endif -%}
            {%- endif -%}



          {% endfor %}
        </td>
        <td class="data-format">
          {{ row['Data Format'] }}
        </td>
        <td class="authors">
          {{ row['Authors'] | markdownify }}
        </td>
        <td class="type">
          {{ row['Type'] }}
        </td>
      </tr>
    {% endif %}
  {% endfor %}
  </tbody>
</table>