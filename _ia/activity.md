---
layout: "activity/page.html"
title: "{{ activity.Name }}"
pagination:
  data: activities
  size: 1
  alias: activity
permalink: "activities/{{ activity.Name | slugify }}/"
---