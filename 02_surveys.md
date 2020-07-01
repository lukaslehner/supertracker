---
layout: datatable
title: Survey collection
permalink: /surveys/
order: 2
bodyclass: page-datatable
---

<table>
  {% for row in site.data.surveys %}
    {% if forloop.first %}
    <thead>
      <tr>
        <th>Title</th>
        <th>Policy Area</th>
        <th>Focus</th>
        <th>Country Coverage</th>
        <th>Data Format</th>
        <th>Authors</th>
        <th>Target Population</th>
        <th>Sampling Method</th>
        <th>Time</th>
        <th>Interval of Data Collection</th>
        <th>Individual Level Data from Pre-COVID</th>
        <th>Number of Observations</th>
        <th>Micro Data Availablity</th>
        <th class="type">Type</th>
        <th>Level of Observation</th>
      </tr>
    </thead>
    {% else %}
    <tbody>
      <tr>
        <td>
          <a href="{{row['link']}}">
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
          {{ row['Country Coverage'] }}
        </td>
        <td class="data-format">
          {{ row['Data Format'] }}
        </td>
        <td class="authors">
          {{ row['Authors'] }}
        </td>
        <td class="target_population">
          {{ row['Target Population'] }}
        </td>
        <td class="sampling-method">
          {{ row['Sampling Method'] }}
        </td>
        <td class="time">
          {{ row['Time'] }}
        </td>
        <td class="data_collection_interval">
          {{ row['Interval of Data Collection'] }}
        </td>
        <td class="individual_level_data">
          {{ row['Availability of Individual Level Data from Pre-COVID'] }}
        </td>
        <td class="number_of_observations">
          {{ row['Number of Observations'] }}
        </td>
        <td class="micro_data_availability">
          {{ row['Micro Data Availablity'] }}
        </td>
        <td class="type">
          {{ row['Type'] }}
        </td>
        <td class="level_of_observation">
          {{ row['Level of Observation'] }}
        </td>
      </tr>
    </tbody>
    {% endif %}
  {% endfor %}
</table>