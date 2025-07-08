import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import AmazonWebScrape from '../components/workflows/AmazonWebScrape';

const AmazonWebScrapePage = () => (
  <PageRevealWrapper
    heading="Amazon Product Scraper"
    description="Extract product details from any Amazon product or search URL. Instantly get name, description, rating, reviews, and price. Useful for market research, price tracking, and product analysis."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-yellow-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Scrapes product name, description, rating, reviews, and price from Amazon URLs.</li>
            <li>Works with both product and search result pages.</li>
            <li>Simple, fast, and no browser extension required.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-yellow-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Market research and competitor analysis.</li>
            <li>Price tracking and deal finding.</li>
            <li>Product data extraction for e-commerce tools.</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <AmazonWebScrape />
    </div>
  </PageRevealWrapper>
);

export default AmazonWebScrapePage; 