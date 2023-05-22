import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import css from './App.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
 const countTotalFeedback = () => {
    return good + neutral + bad;
  };
     
  const handleIncrement = (option) => {
    if (option === 'good') setGood(prev => prev + 1);
    if (option === 'neutral') setNeutral(prev => prev + 1);
    if (option === 'bad') setBad(prev => prev + 1);
  }

   const countPositiveFeedbackPercentage = () => {
      return Math.floor(
      (good / (good + neutral + bad)) * 100 || 0 
    );
  };

      return (
      <div className={css.container}>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            options={Object.keys({ good, neutral, bad })}
            handleIncrement={handleIncrement}
          />
        </Section>

        <Section title="Statistics">
            {countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback yet..." />
          ) : (
            <Statistics
              options={Object.keys({ good, neutral, bad })}
              statistic={{ good, neutral, bad }}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </div>
    );
  }
