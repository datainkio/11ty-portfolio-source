---
layout: "gallery/page.html"
title: "{{ gallery.Title }}"
pagination:
  data: galleries
  size: 1
  alias: gallery
permalink: "galleries/{{ gallery.Title | slugify }}/"
---