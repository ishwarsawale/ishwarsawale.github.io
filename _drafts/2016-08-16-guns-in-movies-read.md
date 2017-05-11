---
title: This is why guns are an inherent part of the movie industry
header:
  teaser: 'https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg'
categories:
  - Data analysis
tags:
  - update
---

**Guns are as much part of the american film indsutry, as cool cars or good looking people. But a closer look at scraped date reveals important insights on the close relationship between a gun manufactioring indstry and their lobby, their company brandings and the collabroation with the film indsutry.**

![alt text](/images/guns/header.png)

Coming across this Internet Movie Firearms Database, I was eager to explore the data. To fetch data for a basic overview of actors and gun appearances, I wrote the following script in R:

```r
# Required packages:
library(xml2)
library(rvest)
library(dplyr)
library(tidyr)
############# 1\. Go thru the next200 button we get all the URLs we need:
get_200_link <- function (url) {
  get <- read_html(url)
  link_200 <- get %>%
    html_node("#mw-pages a:nth-child(4)") %>%
    html_attr("href")
  return(link_200)
}

# Calculate how many times the loop has to run:
ntimes <- round(11182/200)
# get all the 200_link links:
df_200 <- NULL
ink <- "http://www.imfdb.org/index.php?title=Category:Actor&pagefrom=A.+Russell+Andrews#mw-pages"
for (sub in 1:ntimes) {
  df_200 <- rbind(df_200, as.data.frame(ink))
  ink <- paste("http://www.imfdb.org/", get_200_link(ink), sep = "")
  print(ink)
  }

########## 2\. Function to scrape links from "next200" links on each page:
get_200_each <- function (url) {
  get_sub <- read_html(url)
  link_200_sub <- get_sub %>%
    html_nodes("#mw-pages .mw-content-ltr a") %>%
    html_attr("href")
  return(link_200_sub)
}
# test: get_200_each("http://www.imfdb.org//index.php?title=Category:Actor&pagefrom=Xavier+Hosten#mw-pages")
sub_sub_200 <- NULL
for (sub_sub in 1:nrow(df_200)) {
  url_sub <- as.character(df_200[sub_sub, 1])
  print(url_sub)
  sub_sub_200 <- rbind(sub_sub_200, as.data.frame(get_200_each(url_sub)))
}

######## 3\. get all the individual information on each actors page:
get_info <- function (actor_url) {
  ac <- read_html(actor_url)
  gun <- ac %>%
    html_nodes('#mw-content-text td:nth-child(1)') %>%
    html_text()
  gun_link <- ac %>%
    html_nodes('#mw-content-text td:nth-child(1) a') %>%
    html_attr("href")
  gun_final <- paste("http://www.imfdb.org" , gun_link, sep = "")
  character <- ac %>%
    html_nodes('#mw-content-text td:nth-child(2)') %>%
    html_text()
  movie <- ac %>%
    html_nodes('#mw-content-text td:nth-child(3)') %>%
    html_text()
  movie_link <- ac %>%
    html_nodes('#mw-content-text td:nth-child(3) a') %>%
    html_attr("href")
  movie_final <- paste("http://www.imfdb.org" , movie_link, sep = "")
  note <- ac %>%
    html_nodes('#mw-content-text td:nth-child(4)') %>%
    html_text()
  ###
  date <- ac %>%
    html_nodes('#mw-content-text td:nth-child(5)') %>%
    html_text()
  name<- ac %>%
    html_node("#firstHeading span") %>%
    html_text()
  all_return <- cbind(data_frame(name), data_frame(gun), data_frame(gun_final), data_frame(character), data_frame(note), data_frame(movie), data_frame(movie_final), data_frame(date))
  return(all_return)
}
#(get_info("http://www.imfdb.org/wiki/Al_Shannon"))

require(plyr)
final_data_guns <- NULL
for (t in 2:nrow(sub_sub_200)) {
  tryCatch({
    link <- paste("http://www.imfdb.org", sub_sub_200[t, 1], sep = "")
        print(link)
        final_data_guns <- rbind.fill(final_data_guns, as.data.frame(get_info(link)))
  }, error=function(e){cat("ERROR :",conditionMessage(e), "\n")})
}
```

Above we created the crawling functions, and several looping functions that apply them to scrape data from each sub-page. To get access to all the links for each movie, we used the "next200" link buttons on the page, which always contains another link to more sublinks.

Next, we are interested in each movie, its directors, distributors and release years. As we have now access to all these links, we can once more go through all the links and scrape the information from each movie page, and later use inner join to connect the data via the line id we arrange for.

```r
g_new <- g %>%
  mutate(id = rownames(g))  # creates a simple id
library(rvest)
library(dplyr)
library(tidyr)
library(xml2)
get_info <- function (url) {
  r <- read_html(url)
  des0 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(1) th:nth-child(1)") %>%
    html_text()
  data0 <- r %>%
    html_nodes("td tr:nth-child(1) th+ th") %>%
    html_text()
  zero <- (paste0(des0, data0, sep = "_"))
  des1 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(5) th:nth-child(1)") %>%
    html_text()
  data1 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(5) th+ th") %>%
    html_text()
  one <- (paste0(des1, data1, sep = "_"))
  des2 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(2) th:nth-child(1)") %>%
    html_text()
  data2 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(2) th+ th") %>%
    html_text()
  two <- (paste0(des2, data2, sep = "_"))
  des3 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(3) th:nth-child(1)") %>%
    html_text()
  data3 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(3) th+ th") %>%
    html_text()
  three <- (paste0(des3, data3, sep = "_"))
  des4 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(4) th:nth-child(1)") %>%
    html_text()
  data4 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(4) th+ th") %>%
    html_text()
  four <- (paste0(des4, data4, sep = "_"))
  des5 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(6) th:nth-child(1)") %>%
    html_text()
  data5 <- r %>%
    html_nodes("td td table:nth-child(1) tr:nth-child(6) th+ th") %>%
    html_text()
  five <- (paste0(des5, data5, sep = "_"))
  info <- cbind((zero), (one), (two), (three), (four), (five))
  return(info)
}
df_guns2 <- NULL
### scrape data for movies specifically
for (m in 1:nrow(g_new)) {
  tryCatch({
    linkss <- as.data.frame(get_info(g_new[m, 8]))
    id <- g_new[m, 10]
    #bounds <- cbind(bounds, linkss, as.data.frame(ids))
    df_guns2 <- rbind(df_guns2, cbind(linkss, as.data.frame(id)))
    print(m)
  }, error=function(e){cat("ERROR :",conditionMessage(e), "\n")})
}
```

As the features in the tables on each movie page may not always comes in the same order, we can push all features into a single column, and extract it via some simple regex. Next we join our previous dataset. Voila! We have our final dir_join dataframe, and can start with the analysis.

```r
dir_all <- dir %>%
  distinct(id, .keep_all = TRUE) %>%  # get distinct lines from id column, but keeps all of them.
# remove duplicate rows  
  mutate(all = paste0(V1, V2, V3, V4, V5, V6, sep = "_")) %>%  # collects all in one row, as character string
  mutate(studio = str_extract(all, "Studio\\W([a-zA-Z W])+")) %>%
  mutate(studio = str_replace(studio, "Studio", "")) %>% # Which studio was it filmed in?
  mutate(directed = str_extract(all, "Directed by\\W([a-zA-Z. W])+")) %>% # Which director?
  mutate(directed = str_replace(directed, "Directed by", "")) %>%
  mutate(Release = str_extract(all, "Release Date\\W([a-zA-Z.\\d W])+")) %>% # Release Date
  mutate(Release = str_replace(Release, "Release Date", "")) %>%
  mutate(distributor = str_extract(all, "Distributor\\W([a-zA-Z.\\d W])+")) %>% # Distributor
  mutate(distributor = str_replace(distributor, "Distributor", ""))  
dir_join <- g_new %>%
  inner_join(dir_all)
```

# Could more different guns in movies mean a response to a more gun loving audience?

First off, I am interested in how many movies per year with gun appearances are listed in the dataset. I also want to know the average variety of guns for each year. Guns with a high average variety may indicate that the industry paid more attention to detail when it comes to the different type. Could mean a response to a more gun loving audience? A hyperthesis that should be further investigated.

![pic1]({{ site.url }}/images/guns/plots/years_number.svg)

We can see that movies produced in the periods of 1967 and 1969 feature many different gun types, and a spike in gun featuring movies. The industry produced a range of anti war movies such as "How I Won the War" from 1967\. The spike in the 60ties comes at no surprise. On the contrary, the spike between 2010 and 2014 is truly surprising, and an average of gun diversity in 2015 of 5.32 has not bees as high since 1970\. Is the gun featuring movie having a revival?

# Whose fault is that: Producers and Studios?

Who put the guns into movies? Script writers, producers and the film production as a whole assume are responsible for the diecisions related to what guns appear in the movie. Lets have a look at studios, that produced a big junk of gun featuring movies: Warner Bros. is one example. The date features 50 movies by Warner.

![pic1]({{ site.url }}/images/guns/plots/Warnerfilms.svg)

While there are a few outliers, Warner bro. doesn't seem to follow a specific strategy. However, plotted against their biggest rivals, the studio doesnt seem to feature a greater variety of guns in their film over the past decades. Other major studios however seem to have changed their strategies however.

![pic1]({{ site.url }}/images/guns/plots/warner_competition.svg)

While Disney seems to have increasingly featuring a larger variety of gun types on their movies, other studios seem to do so less so.

# How does this connect to ratings?

While it is interesting to look at this data on its own, it is worthwhile to consider what the movies industry really cares about today: money and ratings. While ratings are relatively easy to obtain (from IMDB), it wasnt easy to match them with the movie titles we have scraped.

ratings

# Gun types:

![pic1]({{ site.url }}/images/guns/plots/pistols.png) In order to connect this analysis back to the real word, we want to look product placement and gun/weapon types appearing in movies. We want to know if certain guns types appeared more frequently in the past years, which companies are behind, and whether we can project gun type appearances for the next five years. However, lets first which gun appeared most frequently:

```r
# Cleaning function:
library(stringr)
library(ggplot2)
library(directlabels)
library(forcats)

nrow(dir_join_gun_clean)
dir_join_gun_clean_group <- dir_join %>%  # dir_join == our scraped dataframe
  mutate(gun = str_replace(gun, '"', "")) %>%
  mutate(gun = str_replace(gun, '.', "")) %>%
  mutate(gun = str_replace(gun, '-', "")) %>%
  mutate(gun = tolower(gun)) %>% # some cleaning for clean grouping
  group_by(gun) %>%
  filter(n() >= 100) %>%
  ungroup() %>%
  mutate(date_full = str_replace(as.character(date), "-.*", "")) %>%
  mutate(date_full = as.character(str_replace(as.character(date_full), ",.*", "")))

# Filter:
dir_join_gun_clean_group_year_top_5 <- dir_join_gun_clean_group %>%
  mutate(date_full = as.numeric(date_full)) %>%
  filter(date_full <= 2016) %>%
  filter(!is.na(date_full)) %>%
  group_by(gun, date_full) %>%
  summarise(appearances = n()) %>%
  group_by(gun) %>%
  filter(sum(appearances) > 300, date_full < 2016, date_full > 1960) %>% # filter
  ungroup()

ggplot(dir_join_gun_clean_group_year_top_5, aes(as.Date(as.character(date_full), "%Y"), appearances, group = gun, color = fct_reorder2(gun, as.Date(as.character(date_full), "%Y"), appearances), alpha = appearances)) +
  geom_line(show.legend = F) + theme_bw() + ggtitle("Gun types most often on scren") + scale_colour_brewer(palette = "Set1") +
  geom_dl(aes(label = gun), method = list(dl.combine("first.points", "last.points"), cex = 1)) + xlim(as.Date(as.character(1960), "%Y"), as.Date(as.character(2025), "%Y")) +
  xlab("Years") +
  ylab("Count of movies gun type appeared in")
```

![pic1]({{ site.url }}/images/guns/plots/Gun_types.jpg)

The data tells us that the gun that most often appeared over past recent years is a Glock 17 by Austrian based Glock Ges.m.b.H. The Gun was first featured in movies such as Die Hard 2, despite the fear and bias against polymer guns not be detected in metal detectors. Surprisingly, the gun is in essence a plastic gun, or in more glamorously expressed "polymer-framed". The pistol type rules 65% of the market share of handguns for US law enforcement agencies, while many police forces use this type around the world. Why does it appear in so many movies in recent years? Since the 80, this gun has not only been booming on the market but also in movies.

This is how a Glock 17 looks like, produced since 1982\. It is no big surprise if you have spotted it in a number of movies. ![pic1]({{ site.url }}/images/guns/g19_gen4_45.jpg)

Lets also find out who sticked out in terms of increase of appearances to previous year:

```r
# claculate average increase rate, year on year:
year_on_year_increase_top_5 <- dir_join_gun_clean_group_year %>%
  group_by(date_full) %>%
  mutate(yearOverYear=appearances/lag(appearances,1)) %>%  # over the past 5 years
  filter(!is.na(yearOverYear)) %>%
  group_by(gun) %>%
  mutate(meanincrease = mean(yearOverYear)) %>%
  filter(meanincrease > 2) %>%
  ungroup()

# Increase over the past year, grouped by gun type (mean_increase over previous year > 2)
ggplot(year_on_year_increase_top_5, aes(as.Date(as.character(date_full), "%Y"), yearOverYear, group = gun, alpha = meanincrease, color = fct_reorder2(gun, as.Date(as.character(date_full), "%Y"), yearOverYear))) +
  geom_line(show.legend = F) + theme_bw() + ggtitle("Gun types most often on scren") + scale_colour_brewer(palette = "Set1") +  geom_dl(aes(label = gun), method = list(dl.combine("first.points", "last.points"), cex = 1)) + xlim(as.Date(as.character(1960), "%Y"), as.Date(as.character(2025), "%Y")) +
  xlab("Years") +
  ylab("Increase of movies gun appeared in compared to previous year")
```

![pic1]({{ site.url }}/images/guns/plots/Gun_increase_previous_year.jpg)

Now let us do a prediction expperiment:

```r
##### predicting appearances of GLOCK and others:
View(dir_join_gun_clean_group_year_prediction)
dir_join_gun_clean_group_year_prediction <- dir_join_gun_clean_group_year %>%
  group_by(gun) %>%
  #summarise(swf = mean(appearances))
  filter(mean(appearances) > 15) %>%
  ungroup()

#!training data:
dir_join_gun_clean_group_year_prediction_glock <- dir_join_gun_clean_group_year_prediction %>%
  filter(str_detect(gun, "glock 17"), date_full <2016)

  View(dir_join_gun_clean_group_year_prediction_glock)

model<- lm(appearances ~ log(date_full) + date_full, data = dir_join_gun_clean_group_year_prediction_glock)
summary(model)
# test data:
date_full <- c(seq(2017, 2030))
test_data <- data.frame(date_full)
prediction <- predict(model, test_data)
View(prediction)
class(prediction)
prediction <- as.data.frame(prediction)
#names(prediction)[1] <- "date_full"

prediction <- cbind(prediction, test_data)

library(broom)
tidy(model)

td <- tidy(model, conf.int = TRUE)

ggplot(dir_join_gun_clean_group_year_prediction_glock, aes(date_full, appearances, col = "blue")) +
  geom_smooth(method = "lm") +
  geom_point(aes(date_full, appearances)) +
  geom_point(data = prediction, inherit.aes = F, aes(date_full, prediction, col = "red")) + theme_bw() + ggtitle("forcasting Glock gun number of Glock gun appearance")
```

![pic1]({{ site.url }}/images/guns/plots/forcase_glock.jpg)

We can predict future values, in this case the count of future movies Glock 17 might appear in, until 2013\. The blue dots represent the projection by a non-linear model (as introduced log(date_full)), which gives us a slightly curved line, if we connected the predicted dots.

# Relationship between guns in movies and production by manufacturers

Can we establish some evidence that production levels and appearances in movies are linked. For that we need data on firearms production levels. It is surprisingly hard to get this kind of date for each brand. International companies do not report their fgiures, and according to the "The US Firearms Industry: Production and Supply" [report](http://www.smallarmssurvey.org/fileadmin/docs/F-Working-papers/SAS-WP14-US-Firearms-Industry.pdf), some public figures are not reliable either. For the production levels of Glock for instance, which imported firearms into the United States before 2005, the AFMER reports do not capture imports, only US-based production. We use the report to match brands to appearances and plot it with ggplot2\. ![pic1]({{ site.url }}/images/guns/plots/production_firearms.jpg)

We can do the same for pistol production:

![pic1]({{ site.url }}/images/guns/plots/production_pistols.jpg)

Do we spot a trend here? Let's ask the correlation oracle:

```r
cor(dir_join_gun_clean_manufact_sum$appeared, dir_join_gun_clean_manufact_sum$Pistols)                                                                              
[1] 0.4815494
```

With this coefficient, we learn that there might be a relationship. However, this is hard to judge as we have to question the reliability of the production data.
