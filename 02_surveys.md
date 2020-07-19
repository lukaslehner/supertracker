---
layout: datatable
title: Survey collection
permalink: /surveys/
order: 2
bodyclass: page-datatable surveys
---

<table>
  {% for row in site.data.surveys %}
    {% if forloop.first %}
    <thead>
      <tr>
        <th class="title">Title</th>
        <th class="policy-area">Policy Area</th>
        <th class="focus">Focus</th>
        <th class="country-coverage">Country Coverage</th>
        <th class="data-format">Data Format</th>
        <th class="authors">Authors</th>
        <th class="target-population">Target Population</th>
        <th class="sampling-method">Sampling Method</th>
        <th class="time">Time</th>
        <th class="data-collection-interval">Interval of Data Collection</th>
        <th class="individual-level-data">Individual Level Data from Pre-COVID</th>
        <th class="number-of-observations">Number of Observations</th>
        <th class="micro-data-availability">Micro Data Availablity</th>
        <th class="type">Type</th>
        <th class="level-of-observation">Level of Observation</th>
      </tr>
    </thead>
    <tbody>
    {% else %}
      <tr>
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
          {{ row['Country Coverage'] }}
        </td>
        <td class="data-format">
          {{ row['Data Format'] }}
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
        <td class="level-of-observation">
          {{ row['Level of Observation'] }}
        </td>
      </tr>
    {% endif %}
  {% endfor %}
  </tbody>
</table>