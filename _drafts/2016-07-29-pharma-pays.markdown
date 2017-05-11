---
title: Pharma pays Doc -> Doc is happy -> Doc prescribes more
header:
  teaser: 'https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg'
categories:
  - machine learning
tags:
  - update
---

**We know that pharmaceutical companies find ways to give money to doctors, hoping to increase their sales. Now, the sector wants to change and publishes data on thesse payments. An analyis on pharmaceutical payments, and an application of machine learning in the context of data journalism.**

![alt text](/images/pharma/header.jpg)

As accessing payment data from pharmaceutical companies to doctors and healthcare professionals becomes easier due to [a general agreement by the lobby to become more transparent](https://www.ft.com/content/b3e42806-3ec7-11e6-8716-a4a71e8140b0), more people will analyse to find possibly filthy methods by big pharma to drive drug sales.

Admittingly, I got my hands on a really interesting dataset. It was shared with me by Correctiv.org and contains microdata on payments by German's top pharmaceutical companies to the nation's healthcare professionals and healthcare organisations. Only roughly about 30% of the micro data is available. The first step will be to find general trends in the data. Secondly, we will train and apply machine learning models on the data.

```r
# read in data, and clean it
```

# The devil in the detail:

The graphic tells a typcial story: Pharma generally pays small amounts (in large numbers) in form of covering travel and accomdation fees and sponsorships transactions, while committing larger payments under the umbrella of donations and grants.

```r
# read in data, and clean it
```

While Baxter-deutschland sticked out with a one-off donation/grant payment of 1,166,666 Euros which directly translated into the same median value, the graphic shows Novatis's strategy to pay out small amounts of fees and sponsorships but with a higth frequancy, resulting in an overall volume of more than 4 million Euros in 2015.

![alt text](/images/pharma/plots/one.svg)

The winner in paying the highest average amount is pharma company Baxalta. With more than 6.647 Euro in average payments (more than two third higher than the leading second and third company), the company stood out. It also apparently claims the title to be one of the leading biopharmaceutical company advancing innovative therapies in haematology, immunology, and oncology. How much its aggressive payment strategy has helped to its success is left to be evaluated.

![pic1]({{ site.url }}/images/pharma/plots/two.svg)

Donations and grants are not being paid to individual healthcare professionls (HCP). For this group, considerable payments were made via fees and related expenses. Lets take a closer look at these payments.

![pic1]({{ site.url }}/images/pharma/plots/four.svg) Here we see how doctors payments are distributed across the country.

<iframe width="100%" height="400px" src="{{ site.url }}/images/pharma/plots/map.html" frameborder="0" allowfullscreen="">
</iframe>

Here is another view on the data. Circle size measures the average payement for each location. The colors represent the quaters. Average payment size is equally distributed across Germany, However, if we look closedly, we can see that the circles are a bit more extreme the west and south, than in the north-east. Many large pharmaceitical comapnies are located in Bavaria and near the Swiss boarder, and this may affect how much money is regionally paid out.

<iframe width="100%" height="400px" src="{{ site.url }}/images/pharma/plots/map2.html" frameborder="0" allowfullscreen="">
</iframe>

We get an expected picture when we plot the sum for each location. Cities such as Berlin and Munich are considerable larger. Despite of having expected that, we see outliers. Heidelberg only has 150,335 inhabitants, yet its circle sticks out. The same is true for a few other places.

# NOTES

# Summary of explorative data analysis

- Looking at the largest payments, Baxter-Deutschland paid 1,166,666 Euros under the label "donations/grants" to a organisation called German association fighting malnutrition which is based in Bonn, last year. This is indeed an outlier.
- When looking at all payments, we can clearly see that some companies do pay aggressively more than others. Companies such as Boehringer Ingelheim, Astrazeneca and Novartis seem to have by far the widest spread.

# Building a predictive model:

- random forest

# General stuff:

- [here](https://correctiv.org/recherchen/euros-fuer-aerzte/artikel/2016/07/26/keiner-ist-so-nett-wie-der-pharmareferent/))

Data by the Association of the British Pharmaceutical Industry reveals that: <http://www.abpi.org.uk/our-work/disclosure/Pages/DocumentLibrary.aspx?Paged=TRUE&p_SortBehavior=0&p_FileLeafRef=Sobi_MethodologicalNotes_2015%2epdf&p_ID=209&PageFirstRow=101&&View={67D056CF-A553-4724-A9E6-230AE9681875}#>

ft piece: <https://www.ft.com/content/b3e42806-3ec7-11e6-8716-a4a71e8140b0> <https://correctiv.org/recherchen/euros-fuer-aerzte/artikel/2016/07/26/keiner-ist-so-nett-wie-der-pharmareferent/>
