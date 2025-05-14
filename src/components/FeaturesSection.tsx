import React from 'react';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

const RecipeCard = ({ title, content, tags }: { title: string, content: string, tags: {text: string, color: string}[] }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800">
      <div className="flex items-start mb-4">
        <div className="text-lg font-medium text-white mr-3">{title}</div>
      </div>
      <p className="text-sm text-gray-300 mb-3">{content}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${tag.color}`}
          >
            {tag.text}
          </span>
        ))}
      </div>
    </div>
  );
};

const ShoppingListItem = ({ item, isOnSale = false, isChecked = false }: { item: string, isOnSale?: boolean, isChecked?: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-3 h-3 mr-2 rounded-sm ${isChecked ? 'bg-culinairy-teal' : 'border border-gray-400'} flex-shrink-0`}>
          {isChecked && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className={`text-xs ${isChecked ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{item}</span>
        {isOnSale && (
          <span className="ml-2 text-[10px] bg-culinairy-teal/30 text-culinairy-teal px-1.5 py-0.5 rounded-sm">
            SALE
          </span>
        )}
      </div>
    </div>
  );
};

const CalendarDay = ({ day, recipe, highlight = false, leftover = false }: { day: string, recipe: string, highlight?: boolean, leftover?: boolean }) => {
  return (
    <div className={`${highlight ? 'bg-culinairy-teal/20 border-culinairy-teal' : 'bg-gray-700'} p-2 rounded border border-opacity-40`}>
      <div className="text-gray-300 mb-1 text-xs">{day}</div>
      <div className="text-white text-xs font-medium">{recipe}</div>
      {leftover && (
        <div className="mt-1 flex items-center">
          <div className="w-2 h-2 bg-culinairy-teal/60 rounded-full mr-1"></div>
          <span className="text-[10px] text-culinairy-teal">Leftover</span>
        </div>
      )}
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-16 px-4 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Smart Recipe Recommendations */}
        <FeatureCard
          title="Smart Recipe Recommendations"
          description="Our AI analyzes your preferences, dietary needs, and ingredient availability to suggest personalized recipes you'll love."
          imageComponent={
            <div className="space-y-3">
              <RecipeCard
                title="Creamy Pasta Primavera"
                content="A light and creamy vegetable pasta perfect for using seasonal produce"
                tags={[
                  {text: 'Vegetarian', color: 'bg-green-800/50 text-green-300'},
                  {text: 'Quick (25 min)', color: 'bg-orange-800/50 text-orange-300'}
                ]}
              />
            </div>
          }
        />

        {/* Smart Shopping Lists */}
        <FeatureCard
          title="Smart Shopping Lists"
          description="Streamline your shopping experience with automated, well-structured grocery lists that combine ingredients and prevent unnecessary purchases."
          imageComponent={
            <div className="bg-gray-800 rounded-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-white font-medium">This Week's Shopping List</div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-xs">
                    <span className="text-culinairy-teal mr-1">●</span>
                    <span className="text-gray-300">Loblaws</span>
                  </div>
                  <div className="text-xs px-2 py-0.5 bg-culinairy-teal/20 text-culinairy-teal rounded">8 items</div>
                </div>
              </div>

              <div className="space-y-4 mb-3">
                <div>
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <div className="w-4 h-4 mr-1">🥬</div>
                    <div>Fresh Produce</div>
                  </div>
                  <div className="space-y-2 pl-6">
                    <ShoppingListItem item="Bell Peppers (3)" isChecked={true} />
                    <ShoppingListItem item="Spinach (1 bunch)" isOnSale={true} />
                    <ShoppingListItem item="Avocados (2)" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <div className="w-4 h-4 mr-1">🥩</div>
                    <div>Proteins</div>
                  </div>
                  <div className="space-y-2 pl-6">
                    <ShoppingListItem item="Chicken Breast (2 lbs)" />
                    <ShoppingListItem item="Tofu, Extra Firm" isOnSale={true} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-gray-700 pt-2">
                <div>
                  <span className="text-gray-400">Auto-optimized for 3 recipes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-culinairy-teal/10 text-culinairy-teal rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                      <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                    </svg>
                    <span>Add Item</span>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* Intelligent Meal Planning Calendar */}
        <FeatureCard
          title="Intelligent Meal Planning Calendar"
          description="Plan your week with a visual meal planning calendar that balances nutrition, adapts to your schedule, and helps reduce food waste by suggesting smart use of leftovers."
          imageComponent={
            <div className="bg-gray-800 rounded-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-white font-medium">Weekly Meal Plan</div>
                <div className="flex items-center space-x-1">
                  <div className="text-xs px-2 py-0.5 bg-culinairy-teal/20 text-culinairy-teal rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                    </svg>
                    <span>August 14-20</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                <CalendarDay day="Mon" recipe="Stir Fry" highlight={true} />
                <CalendarDay day="Tue" recipe="Tacos" />
                <CalendarDay day="Wed" recipe="Pasta" />
                <CalendarDay day="Thu" recipe="Stir Fry Bowl" leftover={true} />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <CalendarDay day="Fri" recipe="Grilled Salmon" />
                <CalendarDay day="Sat" recipe="Pizza Night" />
                <CalendarDay day="Sun" recipe="Meal Prep" />
                <div className="bg-gray-700/50 p-2 rounded border border-gray-700 border-dashed flex items-center justify-center">
                  <div className="text-gray-500 text-xs flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                      <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                    </svg>
                    <span>Add</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-xs mt-3 border-t border-gray-700 pt-2">
                <div className="flex items-center mr-3 text-gray-400">
                  <div className="w-3 h-3 bg-culinairy-teal/20 mr-1 border border-culinairy-teal border-opacity-40 rounded"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-culinairy-teal/60 rounded-full mr-1"></div>
                  <span>Uses leftovers</span>
                </div>
              </div>
            </div>
          }
        />

        {/* Stunning Food Inspiration */}
        <FeatureCard
          title="Stunning Food Inspiration"
          description="Bring your meals to life with AI-generated food visuals and the ability to upload your own step-by-step cooking images for a more interactive experience."
          imageComponent={
            <div className="bg-gray-800 rounded-lg p-4 mb-2">
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-2">AI-Generated Food Photography</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-md overflow-hidden relative">
                    <Image
                      src="/images/chicken-chow-mein.jpg"
                      alt="AI Generated Chicken Chow Mein"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">AI</div>
                  </div>
                  <div className="aspect-square rounded-md overflow-hidden relative">
                    <Image
                      src="/images/lemony-beef-orzo.jpg"
                      alt="AI Generated Lemony Beef Orzo"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">AI</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2">Step-by-Step Cooking Process</div>
                <div className="flex space-x-2">
                  <div className="w-1/3 aspect-square rounded-md overflow-hidden relative">
                    <Image
                      src="/images/mango-glazed-chicken.jpg"
                      alt="Step 1: Preparation"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">1</div>
                  </div>
                  <div className="w-1/3 aspect-square rounded-md overflow-hidden relative">
                    <Image
                      src="/images/pork-burgers.jpg"
                      alt="Step 2: Cooking"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">2</div>
                  </div>
                  <div className="w-1/3 aspect-square rounded-md overflow-hidden relative">
                    <Image
                      src="/images/smothered-pork-chops.jpg"
                      alt="Step 3: Plating"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">3</div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
