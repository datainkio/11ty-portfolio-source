---
layout: "organization/page.html"
title: "{{ organization.Name }}"
pagination:
  data: organizations
  size: 1
  alias: organization
permalink: "organizations/{{ organization.Name | slugify }}/"
---