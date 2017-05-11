---
title: Data page
layout: splash
permalink: /data/
date: 2016-08-23T15:48:41.000Z
header:
  overlay_color: '#000'
  overlay_filter: '0.5'
  overlay_image: data.jpg
  cta_label: Github
  cta_url: 'https://github.com/mmistakes/minimal-mistakes/'
  caption: 'Photo credit: [**Unsplash**](https://unsplash.com)'
excerpt: I make some of the data available that I use in my posts
intro:
  - excerpt: >-
      Nullam suscipit et nam, tellus velit pellentesque at malesuada, enim
      eaque. Quis nulla, netus tempor in diam gravida tincidunt, *proin
      faucibus* voluptate felis id sollicitudin. Centered with `type="center"`
feature_row:
  - image_path: /images/data.jpg
    alt: placeholder image 1
    title: Placeholder 1
    excerpt: This is some sample content that goes here with **Markdown** formatting.
  - image_path: data.jpg
    alt: placeholder image 2
    title: Placeholder 2
    excerpt: This is some sample content that goes here with **Markdown** formatting.
    url: '#test-link'
    btn_label: Read More
    btn_class: btn--inverse
  - image_path: unsplash-gallery-image-3-th.jpg
    title: Placeholder 3
    excerpt: This is some sample content that goes here with **Markdown** formatting.
feature_row2:
  - image_path: unsplash-gallery-image-2-th.jpg
    alt: placeholder image 2
    title: Placeholder Image Left Aligned
    excerpt: >-
      This is some sample content that goes here with **Markdown** formatting.
      Left aligned with `type="left"`
    url: '#test-link'
    btn_label: Read More
    btn_class: btn--inverse
feature_row3:
  - image_path: unsplash-gallery-image-2-th.jpg
    alt: placeholder image 2
    title: Placeholder Image Right Aligned
    excerpt: >-
      This is some sample content that goes here with **Markdown** formatting.
      Right aligned with `type="right"`
    url: '#test-link'
    btn_label: Read More
    btn_class: btn--inverse
feature_row4:
  - image_path: unsplash-gallery-image-2-th.jpg
    alt: placeholder image 2
    title: Placeholder Image Center Aligned
    excerpt: >-
      This is some sample content that goes here with **Markdown** formatting.
      Centered with `type="center"`
    url: '#test-link'
    btn_label: Read More
    btn_class: btn--inverse
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row3" type="right" %}

{% include feature_row id="feature_row4" type="center" %}
