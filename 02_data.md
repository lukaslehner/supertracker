---
layout: datatable
title: Data
permalink: /data/
order: 2
bodyclass: page-datatable
---

<table>
  {% for row in site.data.trackers %}
    {% if forloop.first %}
    <thead>
      <tr>
        <td>Title</td>
        <td>Category</td>
        <td>Focus</td>
        <td>Coverage</td>
        <td>Data Format</td>
        <td>By</td>
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
      </tr>
    </tbody>
    {% endif %}
  {% endfor %}
</table>