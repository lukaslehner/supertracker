---
layout: page
title: Data
permalink: /data/
order: 2
bodyclass: page-datatable
---

<!-- {{ site.data.trackers }} -->

<table>
  {% for row in site.data.trackers %}
    {% if forloop.first %}
    <tr>
      <td>Title</td>
      <td>Category</td>
      <td>Focus</td>
      <td>Coverage</td>
      <td>Data Format</td>
      <td>By</td>
    </tr>
    {% else %}
    <tr>
      <td>
        <a href="{{row['link']}}">
          {{ row['title'] }}
        </a>
      </td>
      <td>
        {{ row['category'] }}
      </td>
      <td>
        {{ row['Focus'] }}
      </td>
      <td>
        {{ row['Coverage'] }}
      </td>
      <td>
        {{ row['Data format'] }}
      </td>
      <td>
        {{ row['By'] }}
      </td>
    </tr>
    {% endif %}
  {% endfor %}
</table>