---
layout: "role/page.html"
title: "{{ role.Name }}"
pagination:
  data: roles
  size: 1
  alias: role
permalink: "roles/{{ role.Name | slugify }}/"
---