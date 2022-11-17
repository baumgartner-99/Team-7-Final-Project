# Team-7-Final-Project

## Tools Used:
- Pandas
- Glob
- CFBD (College Football Database)
- SQLAlchemy
- psycopg2
- JavaScript
- Bootstrap
- Plotly

## College Football 2022 Predictions
For this assignment, we have chosen to analyze college football data from the past twenty years to predict the outcomes of the games in Week 11 (Nov. 12) 
for the 2022 season. We chose this topic, because all three of us are interested in college football and are interested to see how the rest of this season plays out.
During our analysis, we hope to answer a few other questions, such as the validity of a “home team advantage” and if they win more frequently as well as how outcomes
vary based on conference.

Using our machine learning model, we hope to predict the outcomes of games in Week 11. We hope to also review less frequented predictors such as elevation, field type, 
and historical rolling dominance. We are using a Random Forest Classification for our model due to the size and complexity of our dataset but with a binary prediction as 
our outcome of whether ther was a win or loss. 

In the first attempt we were able to predict the games from 2021 against the test set, 59.6% correct. The model was slightly 
overfit, validated by comparing a prediction over the entire dataset. 

Next step to tweak the model will be to determine the more relevant variables and reduce the number of 
features to reduce the overfitting.

Our presentation is drafted in Google slides: https://docs.google.com/presentation/d/1-i7EGTC6oRfCs9RbeHb-cJfZfSILhLGk2Yr58klKukc/edit?usp=sharing

# Cleaned data from api call
![1st_Dataframe](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/cleaned_dataframe.png)

- Good old-fashioned data cleaning

# Database
![Database_sent](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/DatabaseData.png)

- one of the imported datasets

# Database Connections
![connection](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/Database_Connection.png)

- We used SQLAlchemy to connect to PGAdmin4

# SQL Query
![Sql_Code](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/SQL_code.png)

- These Queries seperate the data I added to the database into seperate tables to be studied further.
- One of our goals was to see if home field had an advantage. I made the data easier to determine that.
- I added a home win column. 1 for true. 0 for false.
- I also had to find a way to get rid of the duplicates.

# Dashboard
For our dashboard, we decided to use Javascript and Plotly to create interactive charts and tables. We are hosting the page using GitHub pages: https://baumgartner-99.github.io/Team-7-Final-Project/. 

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Screenshot%202022-11-16%20at%209.29.09%20PM.png)

There are several charts on the Dashboard, with two additional pages displaying more data.

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/average_home_vs_away.png)

The above graph shows the average points scored for each team. The two bars in the middle are average scores across every team taken over the time period we analyzed: 2015 to 2022. There is one for home average and one for away average. The bars on the end represent each team’s average score based on whether or not they were the home or away team.

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/single_home_vs_away.png)

This graph represents the scores for a single game (chosen by the user) and overall average scores across all teams from 2015 to 2022. In this instance, South Carolina scored greater points in this single game than North Carolina. Both teams scored far less than the average points generally earned in a game.

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/scoring_over_time.png)

This graph shows scoring over time for each team versus league averages.

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/predictions_table.png)

Finally, this is the table showing our machine learning predictions versus the actual outcome of Week 11 games.

Contributors:

**Rina Baumgartner**

**Alex Edwards**

**Devon McGibbeny**
