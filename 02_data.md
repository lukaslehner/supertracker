---
layout: datatable
title: Data
permalink: /data/
order: 2
bodyclass: page-datatable
---

The criteria for inclusion into the supertracker are explained in the **[documentation](../documentation/)**.

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
        <th>By</th>
        <th>Target Population and Sampling</th>
        <th>Time</th>
        <th>Interval of data collection</th>
        <th>Availability of individual level data from pre-CoVID</th>
        <th>Number of observations</th>
        <th>Micro data availablity</th>
        <th>Type</th>
        <th>Level of Observation</th>
      </tr>
    </thead>
    {% else %}
    <tbody>
      <tr>
        <td>
          <a href="{{row['link']}}">
            {{ row['title'] }}
          </a>
        </td>
        <td class="category">
          {{ row['category'] }}
        </td>
        <td class="focus">
          {{ row['Focus'] }}
        </td>
        <td class="coverage">
          {{ row['Coverage'] }}
        </td>
        <td class="data-format">
          {{ row['Data format'] }}
        </td>
        <td class="by">
          {{ row['By'] }}
        </td>
        <td class="target_population">
          {{ row['Target population and sampling'] }}
        </td>
        <td class="time">
          {{ row['Time'] }}
        </td>
        <td class="data_collection_interval">
          {{ row['Interval of data collection'] }}
        </td>
        <td class="individual_level_data">
          {{ row['Availability of individual level data from pre-COVID'] }}
        </td>
        <td class="number_of_observations">
          {{ row['Number of observations'] }}
        </td>
        <td class="micro_data_availability">
          {{ row['Micro data availablity'] }}
        </td>
        <td class="type">
          {{ row['Type'] }}
        </td>
        <td class="level_of_observation">
          {{ row['Level of observation'] }}
        </td>
      </tr>
    </tbody>
    {% endif %}
  {% endfor %}
</table>