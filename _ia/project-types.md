---
layout: "project/type.html"
title: "{{ type.Slug }}"
pagination:
  data: ia
  size: 1
  alias: type
permalink: "projects/types/{{ type.Slug | slugify }}/"
eleventyNavigation:
  parent: Work
  key: "{{ type.Slug }}"
---