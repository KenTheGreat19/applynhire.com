"""
Indeed Job Spider - Example implementation.
Scrapes job listings from Indeed.
Note: Always respect robots.txt and terms of service.
"""
import scrapy
from scrapy.loader import ItemLoader
from scraper.items import JobItem
from .base_spider import BaseJobSpider
import json


class IndeedSpider(BaseJobSpider):
    """Spider for scraping Indeed job listings."""
    
    name = 'indeed'
    source = 'indeed'
    allowed_domains = ['indeed.com']
    
    # Search parameters
    default_query = 'software engineer'
    default_location = 'United States'
    
    def __init__(self, query=None, location=None, pages=5, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.search_query = query or self.default_query
        self.search_location = location or self.default_location
        self.max_pages = int(pages)
    
    def start_requests(self):
        """Generate initial search requests."""
        for page in range(self.max_pages):
            start = page * 10
            url = (
                f"https://www.indeed.com/jobs"
                f"?q={self.search_query}"
                f"&l={self.search_location}"
                f"&start={start}"
            )
            yield scrapy.Request(
                url=url,
                callback=self.parse_search_results,
                meta={'page': page}
            )
    
    def parse_search_results(self, response):
        """Parse search results page."""
        # Find job cards
        job_cards = response.css('div.job_seen_beacon')
        
        for card in job_cards:
            job_link = card.css('h2.jobTitle a::attr(href)').get()
            if job_link:
                yield response.follow(
                    job_link,
                    callback=self.parse_job_detail,
                    meta={'card_data': self.extract_card_data(card)}
                )
    
    def extract_card_data(self, card):
        """Extract basic data from job card."""
        return {
            'title': card.css('h2.jobTitle span::text').get(),
            'company': card.css('span.companyName::text').get(),
            'location': card.css('div.companyLocation::text').get(),
            'salary': card.css('div.salary-snippet-container::text').get(),
        }
    
    def parse_job_detail(self, response):
        """Parse individual job listing page."""
        card_data = response.meta.get('card_data', {})
        
        loader = self.create_loader(response=response)
        
        # Title
        loader.add_css('title', 'h1.jobsearch-JobInfoHeader-title::text')
        loader.add_value('title', card_data.get('title'))
        
        # Company
        loader.add_css('company_name', 'div[data-company-name] a::text')
        loader.add_value('company_name', card_data.get('company'))
        
        # Location
        location_text = response.css('div[data-testid="job-location"]::text').get()
        if location_text:
            self.parse_location(loader, location_text)
        loader.add_value('city', card_data.get('location'))
        
        # Description
        loader.add_css('description', '#jobDescriptionText')
        loader.add_css('description_html', '#jobDescriptionText')
        
        # Job Type
        job_type = response.css('div[aria-label*="Job type"] span::text').get()
        loader.add_value('job_type', job_type)
        
        # Salary
        salary_text = response.css('#salaryInfoAndJobType span::text').get()
        if salary_text:
            salary_min, salary_max = self.parse_salary_range(salary_text)
            loader.add_value('salary_min', salary_min)
            loader.add_value('salary_max', salary_max)
            loader.add_value('salary_currency', 'USD')
        
        # Remote detection
        full_text = response.text
        loader.add_value('is_remote', self.detect_remote(full_text))
        
        # Skills extraction
        description = response.css('#jobDescriptionText::text').getall()
        description_text = ' '.join(description)
        loader.add_value('skills', self.extract_skills(description_text))
        
        # Source info
        loader.add_value('source', self.source)
        loader.add_value('source_url', response.url)
        
        # Extract job ID from URL
        job_id = response.url.split('jk=')[-1].split('&')[0] if 'jk=' in response.url else None
        loader.add_value('source_job_id', job_id)
        
        # Apply URL
        apply_link = response.css('button#indeedApplyButton::attr(href)').get()
        loader.add_value('apply_url', apply_link or response.url)
        
        # Raw data for debugging
        loader.add_value('raw_data', {
            'url': response.url,
            'card_data': card_data,
        })
        
        self.jobs_scraped += 1
        yield loader.load_item()
    
    def parse_location(self, loader, location_text):
        """Parse location string into components."""
        if not location_text:
            return
        
        parts = [p.strip() for p in location_text.split(',')]
        
        if len(parts) >= 1:
            loader.add_value('city', parts[0])
        if len(parts) >= 2:
            loader.add_value('state', parts[1])
        if len(parts) >= 3:
            loader.add_value('country', parts[2])
