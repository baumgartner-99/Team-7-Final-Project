# Team-7-Final-Project

## Tools Used:
- Pandas
- Glob
- CFBD (College Football Database)
- SQLAlchemy
- psycopg2

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

For our dashboard, we have decided to use plotly and ajax scripts with html to host a webpage. There will be interactive elements so that the user can filter information by team. A mockup of the dashboard is shown below:

![](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Visualizations/images/Dashboard%20Mockup.jpg) 

#cleaned data from api call
![1st_Dataframe](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/cleaned_dataframe.png)

-Good old-fashioned data cleaning

#Database
![Database_sent](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/DatabaseData.png)

- one of the imported datasets

# SQL Query
![Sql_Code](https://github.com/baumgartner-99/Team-7-Final-Project/blob/Ace-database/Images/SQL_code.png)

- These Queries seperate the data I added to the database into seperate tables to be studied further.
- One of our goals was to see if home field had an advantage. I made the data easier to determine that.
- I also had to find a way to get rid of the duplicates.

Contributors:

**Rina Baumgartner**

**Alex Edwards**

**Devon McGibbeny**