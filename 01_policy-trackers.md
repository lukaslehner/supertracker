---
layout: datatable
title: Policy tracker collection
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
        <th>Policy Area</th>
        <th>Focus</th>
        <th>Country Coverage</th>
        <th>Data Format</th>
        <th>Authors</th>       
        <th class="type">Type</th>
      </tr>
    </thead>
    <tbody>
    {% else %}
      <tr>
        <td>
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
          {{ row['Country Coverage'] }}
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