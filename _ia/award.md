---
layout: "award/page.html"
title: "Russell S. Lebo: {{ award.Organization }}: {{ award.Title }}"
pagination:
  data: awards
  size: 1
  alias: award
permalink: "recognition/{{ award.Organization | slugify }}/{{ award.Title | slugify }}/"
---