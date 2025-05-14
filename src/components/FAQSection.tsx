import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does CulinAIry.io create personalized recipe suggestions?",
    answer: "CulinAIry.io uses AI to analyze your preferences, dietary restrictions, past recipe ratings, and available ingredients to suggest recipes you'll love. The more you use the app, the better it learns your taste preferences and meal planning habits."
  },
  {
    question: "Can I set dietary preferences or restrictions?",
    answer: "Yes! CulinAIry.io supports various dietary preferences and restrictions including vegetarian, vegan, gluten-free, keto, low-carb, dairy-free, nut-free, and more. You can also specify ingredients you want to avoid or include."
  },
  {
    question: "How does the shopping list feature work?",
    answer: "Our smart shopping list tool automatically creates well-structured grocery lists based on your meal plans. It optimizes by combining ingredients across recipes, organizing by store sections, and allowing easy manual adjustments. The system helps prevent unnecessary purchases and forgotten items so your shopping is more efficient."
  },
  {
    question: "How does the intelligent meal planning calendar work?",
    answer: "Our meal planning calendar syncs with your personal schedule to suggest optimal meal timing. It intelligently balances nutrition across your week, suggests creative ways to use leftovers to reduce food waste, and adapts to your time constraints by recommending quicker meals on busy days. You can easily drag and drop meals to different days as needed."
  },
  {
    question: "Can I import recipes from other websites?",
    answer: "Yes! You can import recipes from most popular recipe websites. Our AI will analyze the recipe, calculate nutrition information, suggest possible substitutions for dietary needs, and integrate it into your meal planning system."
  },
  {
    question: "How do the AI-generated food visuals work?",
    answer: "CulinAIry.io uses advanced AI to create beautiful, realistic images of completed recipes to inspire you. You can also upload your own step-by-step cooking photos to document your process and share with others. This visual approach makes meal planning more engaging and helps you better visualize the end result."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="w-full py-16 px-4 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 py-2 bg-white dark:bg-gray-900 shadow-sm">
              <AccordionTrigger className="text-lg font-medium text-left text-gray-900 dark:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
