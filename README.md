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
- Scikit-Learn

## College Football 2022 Predictions

## Overview

For this assignment, we have chosen to analyze college football data from the past 7 years (2015 to current season) to predict the outcomes of the games in Week 11 (Nov. 12) 
for the 2022 season. We chose this topic, because all three of us are interested in college football and are interested to see how the rest of this season plays out.
During our analysis, we hope to answer a few other questions, such as the validity of a “home team advantage” and if they win more frequently as well as how outcomes
vary based on conference.

Our presentation is in Google slides: https://docs.google.com/presentation/d/1-i7EGTC6oRfCs9RbeHb-cJfZfSILhLGk2Yr58klKukc/edit?usp=sharing

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
## Data Exploration

Using our machine learning model, we hope to predict the outcomes of games in Week 11. We are using a Random Forest Regression for our model due to the need for predicting continuous values and to mitigate overfitting.

Our outcome is the prediction of whether the home team is favored with the bonus prediction of monitoring the margin of points favored. A negative margin denotes the home team is favorited.  

The final features choosen for the model include: (neutral_site, home_conference, home_pregame_elo, away_conference, away_pregame_elo, spread, margin)

- neutral_site: Whether the game was played with a home field advantage

- home_conference: Conference of the the home team

- home_pregame_elo: A ranking established for the home team based on opponents and past performance used for comparison against teams in separate conferences and divisions

- away_conference: Conference of the the visiting team

- away_pregame_elo: A ranking established for the visiting team based on opponents and past performance used for comparison against teams in separate conferences and divisions

- spread: Prediciton provided from sports betting agencies on the predicted difference between home and away team scores

- margin: Actual score difference provided following the game (Home Points - Away Points)

The team names and points were removed due to the bias given and redundancy as features in the model where value is provided with elo and conference name.

The training and testing sets were established with Train_test_split() in the sklearn.model_selection library. The Training Size was set to 70% and Test Size to 30%, seed set to 1 for repeatability and stratified based on the dependant variable, "margin". Independant variables had 26 features. 

## Machine Learning Models

#### First Attempt: Random Forest Classification

The first attempt at modeling the data was to use a Random Forest Classification to predict if the home team was favored to win by creating a calculated binary column looking at the Points scored in the game and if the Home Team won then return a 1. 

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/2021_Classification_results.png" width="60%"/>
</p>

This prediction out put favorable results with a Random forest predictive accuracy: 59.3% on the test set. When predicted over the entire season the Random forest predictive accuracy: 89.8%.
The increase in the accuracy justified that the model was possibly overfit.

Initially, more features were included to try and figure out any underlying relationships. Due to the transformation and encoding of categorical varibles, this created a very wide dataset of 988 features. Duplicate values were seen when the team names were represented with a home team feature and a away team feature. 
When reviewing the feature importance after the prediction model was created it was discovered that many of the top features were those that should not be weighted so high.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Classifier_Importance.png" width="75%"/>
</p>

#### Second Attempt: Neural Network

In the second attempt, a Neural Network model was created to attempt to find the underlying relationships and handle the complexity between what causes a team to win or lose based on the supplied data. The features were reduced to handle the redundancy by dropping the time and team names. Within the investigation of redundancy it was found that many of the Non-FBS conference teams did not have the majority of the data and were being dropped in the preprocessing many times. 
The analysis then shifted to only predict FBS vs FBS teams. This reduction in features brought the model feature count down to 30.

The outputs were inconsistent with the expected output of a continuous variable and accuracy trending at a 71.1% loss over 100 epochs with 1 hidden layer with relu activation.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/NN%20loss%20chart.png" width="30%"/>
</p>

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/NN%20accuracy%20chart.png" width="30%"/>
</p>

The results created a difficulty in relating them back to the specified team with a determination of probability of the prediction. 

#### Third Attempt: Random Forest Regression

To better associate the predictions with the actual games and a related confidence behind the prediction. the dependant variable was shifted from the calculated field "home_win" to "margin"

The prior two attempts used data from a single season to test the capabilities. The Random Forest Regression used data from the API calls from the database that produced cleaned data from the last 7 years (2015 to 2022)

The data was split into multiple dataframes to preprocess the data easier and to reference later on for the predictions of week 11 that had missing values due to the games not happening yet.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/dataframe%20split.png" width="60%"/>
</p>

The 2022 season up to week 10 was plotted to visualize the relationship of elo to margin.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Elo_vs_Margin_scatter.png" width="40%"/>
</p>

In the shift from preprocessing a classification model to producing continuous variable predictions, the dependant variable, "margin" needed to be clipped due to some outlier games with only one occurance. These instances were modified and adjusted to the closest boundary, either upper or lower limit, depending on which side of the distribution they were on.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/UL%20LL%20code.png" width="50%"/>
</p>

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Distribution%20of%20UL%20LL.png" width="30%"/>
</p>

The training and testing sets were established with Train_test_split() in the sklearn.model_selection library. The Training Size was set to 70% and Test Size to 30%, seed set to 1 for repeatability and stratified based on the dependant variable, "margin". Independant variables had 26 features. The model was created using with (n_estimators=512). 

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Prediction%20data%20output%20and%20r2.png" width="80%"/>
</p>

The output was predicted along the entire dataset and then visualized with the actual prediction of the team based on the prediction value (negative=Home_team, positive=Away_team).

Week 11 was predicted based in this fashion with the addition of categorical columns to validate the predictions.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Week11Predictions.png" width="90%"/>
</p>

From the categorical columns of Home_Win and Predicted_Win, the accuracy was able to be calculated following the completion of the games.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Confusion%20Matrix.png" width="50%"/>
</p>

## Summary and Results

The outcome from the Week 11 predictions: the model accurately predicted 52 out of the 64 games (81.25% accuracy).

Expanding this analysis over the previous weeks in 2022 you can see the fluctuation in the prediciton accuracy.

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Correct%20Picks%202022.png" width="60%"/>
</p>

#### Discussion and Future Analysis

The model preformed as expected but with further investigation it is possible the model is overfit. 

Improvements to be made:
1) When validating the test set, the oob score was 39.2% due to the hyper parameters not being fine tuned. Use a GridSearch to find the best parameters for the model
2) When running a Feature importance, of the 26 features used in the model the Feature Importance looks only at spread and slightly at elo. Add additional features that provide relevance to the model (offense and defense metrics)

<p align="center">
  <img src="https://github.com/baumgartner-99/Team-7-Final-Project/blob/main/images/Freature%20import%20final.png" width="55%"/>
</p>

#### **Overall, we were able to predict games for a week that had not been played yet. The model does have room for improvement though.**

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
