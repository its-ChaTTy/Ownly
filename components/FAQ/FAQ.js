import { useState } from 'react';
import styles from './FAQ.scss';

const faqs = [
  {
    question: 'What is my liability as a renter?',
    answer: '-Renters are fully liable for any loss or damage caused to the item. \n -Renters must therefore make sure they have the necessary funds available to replace or repair the item if you are unable to return it in the condition it was rented in. \n -Renters are fully responsible for a rented item while it is in their possession. In the event of theft, loss, confiscation, or damage, you are liable for the cost of rectifying the problem.',
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
          {activeIndex === index && faq.answer.split('\n').map((line, i) => (
            <p key={i} className="answer">{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
}