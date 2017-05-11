---
title: Hillary Clinton and her strategy to speak
header:
  teaser: 'https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg'
categories:
  - data analysis
tags:
  - update
---

**Text analysis in R on speeches is one way to find some new untold stories in the presidential election discussion. In this post we will concentrate on Hillary Clinton and her strategy to speak**

![alt text](/images/strategy-to-speak/header2.png)

# "I'm in, and I'm in to win: 2008 vs. 2016

To compare Clinton's potential candidacy in 2008 with her current one, we scrape speech data from both campaigns. Her 2016 speeches are available on Hillary's campaign website, while speeches delivered 2007 and 2008 are to be found [here](http://www.presidency.ucsb.edu/2008_election_speeches.php?candidate=70&campaign=2008CLINTON&doctype=5000).

![alt text](/images/strategy-to-speak/plots/2008_speech_lines.jpg) To end up with a relative reliable sentiment line, we will use Julia and

```r
library(tidytext)
library(tidyr)
library(ggplot2)
library(viridis)
library(grid)
library(directlabels)

nullacht_speeches <- pr_2008_clean %>%
  mutate(linenumber = row_number()) %>%
  mutate(text = as.character(text))

tidy_nullacht_speeches <- nullacht_speeches %>%
  unnest_tokens(sentences, text, token = "sentences") %>%
  mutate(speech_08 = row_number())

tidy_nullacht_speeches <- tidy_nullacht_speeches %>%
  unnest_tokens(word, sentences) %>%
  group_by(speech_08) %>%
  mutate(linenumber_word = row_number()) %>%
  mutate(numberWords = n()) %>%
  ungroup()

# do more cleaning
data("stop_words")
tidy_nullacht_speeches <- tidy_nullacht_speeches %>%
  anti_join(stop_words)  # remove all the stop words

# counts the words
tidy_nullacht_speeches %>%
  count(word, sort = TRUE)

# sentiment lexicon:
bing <- sentiments %>%
  filter(lexicon == "bing") %>%
  select(-score)

# Calculate sentiment score
All_sentiment_All <- tidy_nullacht_speeches %>%
  inner_join(bing) %>%
  count(Dates, numberWords, index_word = linenumber_word %/% 1, sentiment) %>%
  spread(sentiment, n, fill = 0) %>%
  mutate(sentiment = positive - negative)
All_sentiment_standard_All <- All_sentiment_All %>%
  group_by(Dates) %>%
  mutate(Overall_sentiment = sum(sentiment)) %>%
  mutate(max = max(index_word))%>%
  mutate(min = 1)%>%
  ungroup() %>%
  mutate(index_stan = (100*index_word)/max)

# Plotting:
ggplot(All_sentiment_standard_All, aes(index_stan, sentiment, label = Dates)) +
  theme_bw() +
  #geom_jitter(height = 0.4, show.legend = F, alpha = 0.1) +
  ggtitle("Hillary's 2008 presidential election speeches") +
  geom_line(stat="smooth",method = "loess", size = 0.3, show.legend = F, aes(alpha = 0.1, group = Dates, col = sent)) +
  scale_colour_gradient(limits=c(-63, 83), low="navy blue", high = "red") +
  geom_smooth(method = "loess", show.legend = F, size =2) +
  xlab("Standardized sentence index") +
  ylab("Sentiment (+/-)") +
  ylim(-2, 2)
```

Now we can add also the individual sentence scores to the picture. We can do the same for her 2016 speeches and you may notice a difference:

![alt text](/images/strategy-to-speak/plots/2008_speech_points.jpg)

```r
ggplot(All_sentiment_standard_All, aes(index_stan, sentiment, label = Dates)) +
  theme_bw() +
  geom_jitter(height = 0.4, show.legend = F, alpha = 0.1) +
  geom_line(stat="smooth",method = "loess", size = 0.7, show.legend = F, aes(alpha = 0.1, group = Dates, col = Overall_sentiment)) +
  scale_colour_gradient(limits=c(-63, 83), low="navy blue", high = "red") +
  geom_smooth(method = "loess", show.legend = F, size =2) +
  xlab("Standardized sentence index") +
  ylab("Sentiment (+/-)")
```

![alt text](/images/strategy-to-speak/plots/20016_speech.jpg)

Can you see it? The dots in black show the sentiment scores for each sentence in her speeches (the positive score calculated against the negative). The red lines represent a weighted average loess line for each of Hillary's speeches. We can see that the distribution of the dots are slightly more spread out in 2016 than in 2007/08\. Clinton may have decided to introduce more color and judgement into her speeches, at least in the beginning. Is this good, or bad? I am not sure. The loess line tells us that her overall sentiment average was more positive in the beginning, than in 2008\. We can witness and compare more accurately in the following gif. ![alt text](/images/strategy-to-speak/plots/change.gif)

![alt text](/images/strategy-to-speak/plots/most_positive_speeches.jpg)

With a record sentiment score of +435, Hillary outdid herself with a speech delivered on the January 31, 2016.

# Convention speeches:

![alt text](/images/strategy-to-speak/hillary2.jpg) Great, so the convention is over. Clinton will go against Trump in the election finals. Now what? After Trump's and Clinton's speeches at the conventions, people are left with impressions. Listeners to conventional speeches noted how negative Trump's speech was. Clinton was generally said to be balanced, except at times when she discussed how truly unfit her opponent is for presidency.

![alt text](/images/strategy-to-speak/header2.gif)

To understand Hillary's sentiment in her speeches, we use [Julia Silge's and David Robinson's tidytext](https://www.r-bloggers.com/the-life-changing-magic-of-tidying-text/). First we load in the tidytext package, dplyr and stringr for some basic data wrangling. For the analysis of conventional speeches by democrate candidates, we set a linenumber bring the data into the format we need it in.

```r
library(tidytext)
library(dplyr)
library(stringr)
Speeches.19_clean_Democrats <- Speeches.19_clean %>%
   filter(party == "Democratic")
Speeches.19_clean_Republican <- Speeches.19_clean %>%
  filter(party == "Republican")
conv.all_Dem <- Speeches.19_clean_Democrats %>%
  group_by(title) %>%
  mutate(linenumber = row_number()) %>%
  ungroup() %>%
  separate(title, c("speaker", "Years"), sep = "_", remove=FALSE)
```

The next thing is to "untaken" the text into words that we can analyse it. We also load in stop words and use dplyr's "anti-join" to clean the data. Another thing we arrange is to involve the bing lexicon dataset, which will help us with the clarification of a word's sentiment.

```r
tidy_All_Dem <- conv.all_Dem %>%
  unnest_tokens(word, text)
data("stop_words")
tidy_All_Dem <- tidy_All_Dem %>%
  anti_join(stop_words)
tidy_All_Dem %>%
  count(word, sort = TRUE)
library(tidyr)
bing <- sentiments %>%
  filter(lexicon == "bing") %>%
  select(-score)
All_sentiment_Dem <- tidy_All_Dem %>%
  inner_join(bing) %>%
  count(title, index = linenumber %/% 1, sentiment) %>%
  spread(sentiment, n, fill = 0) %>%
  mutate(sentiment = positive - negative) %>%
  separate(title, c("speaker", "Years"), sep = "_", remove=FALSE)
```

Now we are good to go to plot (full code can be found in the data repo).

```r
library(ggplot2)
library(viridis)
library(grid)
library(directlabels)
All_sentiment_standard_Dem$title <- factor(All_sentiment_standard_Dem$title,
levels = (All_sentiment_standard_Dem$title[order(All_sentiment_standard_Dem$Years)]))
ggplot(All_sentiment_standard_Dem, aes(index_stan, sentiment, group = title)) +
  scale_colour_brewer(palette = "Set1") +
  geom_path(show.legend = F, alpha = 0.3, linejoin = "mitre", lineend = "butt", aes(col = if_else(hillaryClinton_line == 0, "red", "grey"))) +
  facet_wrap(Years~speaker, nrow = 2, scales = "free_x") +
  theme_minimal(base_size = 13) +
  labs(title = "Sentiment in democratic US presidential candidates convention speeches",
       y = "Sentiment") +
  geom_smooth(method = "loess", n = 50, show.legend = F, aes(col = if_else(hillaryClinton_line == 0, "red", "grey"))) +
  scale_fill_viridis(end = 0.75, discrete=TRUE, direction = -1) +
  scale_x_discrete(expand=c(0.02,0)) +
  theme(strip.text=element_text(hjust=0)) +
  theme(strip.text = element_text(face = "italic")) +
  theme(axis.title.x=element_blank()) +
  theme(axis.ticks.x=element_blank()) +
  theme(axis.text.x=element_blank()) +
  geom_dl(aes(label = toupper(Years)), method = list(dl.trans(x = x - 1.3), "last.points", cex = 0.5))
```

![pic1]({{ site.url }}/images/strategy-to-speak/plots/conventionsHillary.svg)

> The plot shows the sentiment analysis for democrate conventional speeches over the past years. A blue weighted loess line is introduced that shows a general trend over the course of each speech. Clearly Hillary's speech is rather balanced. We can do the same thing for the republican conventional speeches and witness one of the most negative talks over the past decades by candidate Trump.

![pic1]({{ site.url }}/images/strategy-to-speak/plots/conventionsTrump.svg)

> Length: Over the past three decades, conventional speeches significantly varied in their length and while Bill Clinton's conventional speech listeners in 1996 must have a hard time to stand his 7,000 words, other candidates such as Mondale kept it brief down to 2400.

# What are Hillary's 2016 campaing speeches are all about?

We want to find out the core topics Hillary Clinton spoke about in her campaign speeches. For this, we will use the tidytext by (Silge and Robinson 2016), and apply the bind_tf_idf() function in the package. From the scraping we received 96 speeches from Hillary's 2016 campaign website. Let's tidy up the dataset first, and then perform a term-frequency-inverse-document-frequency analysis of the text corpus, short ft-idf.

```r
library(dplyr)
library(tidytext)

# read in the data:
pr_2016 <- read.csv("clinton_2016.csv", header = T, stringsAsFactors = F)
pr_2016 <- pr_2016 %>% group_by(wann) %>% mutate(group_speech = n()) %>% ungroup() %>% select(-X)

speeches_2016 <- pr_2016 %>% group_by(wann) %>% unnest_tokens(word, speech1) %>% count(wann, word, sort = T)

speeches_2016_total <- speeches_2016 %>% group_by(wann) %>%summarise(all_speeches = sum(n))

speeches_2016 <- left_join(speeches_2016, speeches_2016_total)

speeches_2016 <- speeches_2016 %>% bind_tf_idf(word, wann, n)

## Plotting the highest frequency for each speech over time:
speeches_2016_termFr_plot <- speeches_2016 %>%
  group_by(wann) %>%
  filter(tf_idf == max(tf_idf))

speeches_2016_termFr_plot_dates <- speeches_2016_termFr_plot %>%
  mutate(dates = as.Date(as.character(wann), "%B%d,%Y")) %>%
  filter(dates != "2015-05-19") %>%
  filter(all_speeches < 50000) %>%
  mutate(word = toupper(word))

ggplot(speeches_2016_termFr_plot_dates, aes(dates, all_speeches, label = word)) +
  geom_point(alpha = 0.5) +  geom_line(alpha = 0.1, size = 3) +  theme_bw() + ggtitle("TF IDF analysis of Hillary Clinton speeches, 2016") +
  geom_text(check_overlap = T, size = 3, nudge_x = 6, aes(label = word)) + ylab("Number of words in speech") + xlab("2016, dates")
```

![pic1]({{ site.url }}/images/strategy-to-speak/plots/plot_speeches_tf_idf_2.jpg)

In this chart, we visualise [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) for Hillary's speeches over time. Y axis shows the number of words in each speech, x are the dates for the speeches (according to Hillary's blog), and the line shows the most frequent terms calculated against the most frequent terms across the entire set of speeches. This way you get speech specific terms, unique for each speech.

To make things more interesting, we can lay over Hillary's most frequent terms relative to the entire document from tf-idf, measure y axis in pure term frequency (tf), and compare it to the number of occasions when she mentioned Trump (also measure in term frequency).

```r
ggplot(speeches_2016_termFr_plot_dates, aes(dates, tf, label = word)) +
  geom_point(alpha = 0.5) + geom_line(alpha = 0.1, size = 3, aes(col = "tf")) +  theme_bw() + ggtitle("TF IDF analysis of Hillary Clinton speeches, 2016") +
  geom_text(check_overlap = T, size = 3, nudge_x = 6, aes(label = word)) + ylab("The number of times this word appears in the speech") + xlab("2016, dates") +
  geom_line(inherit.aes = F, alpha = 0.1, size = 3, data = speeches_2016_termFr_plot_trump_dates, aes(dates, tf)) +
  geom_point(inherit.aes = F, data = speeches_2016_termFr_plot_trump_dates, aes(dates, tf, color = "Trump mentioned")) +
  ggsave("/Users/BH/benheubl.github.io/images/strategy-to-speak/plots/plot_speeches_tf_idf_trump.jpg",
         height = 20, width = 30, units = "cm") + scale_colour_brewer(palette = "Set1")
```

![pic1]({{ site.url }}/images/strategy-to-speak/plots/plot_speeches_tf_idf_trump.jpg)

We see that she mentioned Trump's name more often over time, up to the point where she mentioned him on a regular basis.

# Who is Hillary's speeches most aligned with?

Politicians have their own style of course, but could we find out who Hillary's speeches is most aligned with. If we compare Hillary's speeches with campaign speeches by Barack Obama 2012, we see that both line up, and are pretty similar.

![pic1]({{ site.url }}/images/strategy-to-speak/plots/plot_speeches_Obama_vs_hillary.jpg)

# Who is Hillary Clinton?

Next, it was interesting to analyse Hillary's past speech records. It was easy to find her remarks from back when she served as US Secretary of State from 2009 to 2013.

![pic1]({{ site.url }}/images/strategy-to-speak/plots/plot.svg)

> Looking only at Hillary's remarks at the US state department from 2009 to 2013, she gave a lot more speeches in her first year as Secretary of State. While the word international appeared in titles of remarks which where was rated as more positive in 2009, she later must have talked about more serious subjects as the sentiment scores decline.

> As we also know Clinton is and was always a speaker for women's rights. It is not surprising that the word "Women" was part of many speeches she gave as Secretary of State.

hc, as the junior US Senator representing New York from 2001 to 2009, as First Lady Bill's presidency (1993 to 2001), and First Lady of Arkansas during her husband's governorship from 1979 to 1981/1983 to 1992\. So loads of data of speeches.

Turns out there is an R package to measure text sentument analysis as easy as stealing candy from a baby. What of the key questions that has tickled me to research this story was how does today's Hillary Clinton compares to her former self from years ago. To learn more about it, I first concentrated on her time at the US Department of State, from 2009 to 2013\. In the title of her speeches back then, the word "women" appeared many times. Clinton is know to fight for women's rights across the years:

She was also giving many speeches that contained the word "international", however the sentiment of her international speeches may have changed and became more series over the years. This could be due to the fact that Hillary became more confident in talking openly about problems with other countries.

Lastly, speeches that contained "with president" in the title were not given as often i i thought.

## Conventional speeches

If comparing the past years's conventional speeches, showing trump as a neagive outlier:

While the sentiment analysis on Hillary's speech showed evidence of an equilibrium in style for positive and negative sentiment, Trump's seemed to have presented one of the most negative talks across three decades of conventional speeches.

Although Trump started and ended on a high note, he quickly became negative after his initial "we will lead our country back to safety, prosperity, and peace". Negative scores started to appear when Trump discussed that this convention would occur at a moment of crisis, and how attacks on the police and how the terrorism in our cities would threaten people's lives.

Hillary, on the contrary was generally balanced. Her talk got a positive sentiment score when she explained how America would need everyone to lend their energy, talents, ambition to making the nation better and stronger. However, her sentiment score decreases significantly when she questioned Trump's temperament to be commander in chief. "Donald Trump can't even handle the rough and tumble of a presidential campaign", Clinton said.

conclusion? Overall, conventional speakers across the past conventions kept their speech rather positive than negative. To point out, that the status quo is bad, doesn't make a president. Instead, it should matter how good the solutions are the candidate proposes to fix problems. Trump's strategy was clearly to stand out, which he succeeded in. Clinton's talk on the other hand was to discuss facts, which may have made her speech's sentiment more dry and to less fluctuate across its length.

The graph intents to give an idea of the sentiment of Hillary Clinton speeches and her remarks for the time period when she was acted as secretary of state. The small dots represent speeches, the y values the sentiment score the remark was judged on across each corpus of speech text that was published by the US. department of state website. We can see that Hillary Clinton made many more speeches in the beginning of her secretary of state carreer in 2009 than later on. Her sentiment changes over the period of the time. Espicially around key topics such as ... when we encounter a spike in her sentiment.

For a short while i had the chance to be a speaker. I spoke on conferences and meetings, mainly as a journalist. Political leaders of the world use their speech as their core medium to deliver their point of view, their convinctions, and surely to justify topics and actions. The yield is an engaging audience.

Needless to say, that text one of the most exciting data sources, the so to speak upcoming new cool new kid on the blog among data sources, analysing speeches by politiciancs might be an obvious first choice, but can reveal a lot about their style and their intentions.

If you do or did any public speaking, you might find it interesting if and how your style changed over the year.
