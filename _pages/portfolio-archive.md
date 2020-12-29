---
title: Portfolio
layout: collection
permalink: /portfolio/
collection: portfolio
entries_layout: grid
classes: wide
---

{% assign entries_layout = portfolio.entries_layout | default: 'list' %}
<section class="taxonomy__section">
  <div class="entries-{{ entries_layout }}">
    {% for post in site.porfolio %}
      {% include archive-single.html type=entries_layout %}
    {% endfor %}
  </div>
</section>
