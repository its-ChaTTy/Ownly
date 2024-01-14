import { useState } from 'react';
import styles from './FAQ.scss';

const faqs = [
  {
    question: 'Question 1',
    answer: 'Answer 1',
  },
  {
    question: 'Question 2',
    answer: 'Answer 2',
  },
  // Add more FAQs as needed
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onQuestionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq">
      <h1 className="title">FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faqItem">
          <h3 onClick={() => onQuestionClick(index)} className="question">{faq.question}</h3>
          {activeIndex === index && <p className="answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}