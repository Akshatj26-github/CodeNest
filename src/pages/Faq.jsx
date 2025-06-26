import React from 'react';

const faqs = [
  {
    question: 'What is CodeNest?',
    answer: 'CodeNest is a platform where you can share your tech journey through blog posts and curated content.'
  },
  {
    question: 'How do I create a post?',
    answer: 'Log in to your account and click on the "Create Post" button on the navigation bar.'
  },
  {
    question: 'Is there a dark mode available?',
    answer: 'Yes! You can toggle dark mode using the switch in the top-right corner.'
  },
  {
    question: 'Can I edit my posts later?',
    answer: 'Absolutely. Navigate to your profile and click on the post you want to edit.'
  }
];

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-gray-100 dark:bg-[#1f2937] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
