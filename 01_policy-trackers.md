---
layout: datatable
title: Policy trackers
permalink: /policy-trackers/
order: 1
bodyclass: page-datatable
---

<table>
  {% for row in site.data.trackers %}
    {% if forloop.first %}
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Focus</th>
        <th>Coverage</th>
        <th>Data Format</th>
        <th>Author</th>
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
        <td class="category">
          {{ row['Category'] }}
        </td>
        <td class="focus">
          {{ row['Focus'] }}
        </td>
        <td class="coverage">
          {{ row['Coverage'] }}
        </td>
        <td class="data-format">
          {{ row['Data Format'] }}
        </td>
        <td class="author">
          {{ row['By'] }}
        </td>
        <td class="target_population">
          {{ row['Target Population'] }}
        </td>
        <td class="target_population">
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