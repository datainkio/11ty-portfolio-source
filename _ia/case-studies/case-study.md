---
layout: "project/page.html"
title: "{{ project.Title }}"
pagination:
  data: projects
  size: 1
  alias: project
permalink: "case-studies/{{ project.Name | slugify }}/"
eleventyNavigation:
  key: {{ title }}
  parent: Case Studies
---

<!-- @format -->
