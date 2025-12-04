"""
LinkedIn Job Spider - Example implementation.
Note: LinkedIn has strict scraping policies. This is for educational purposes.
Consider using LinkedIn's official API for production.
"""
import scrapy
from scrapy.loader import ItemLoader
from scraper.items import JobItem
from .base_spider import BaseJobSpider
import json


class LinkedInSpider(BaseJobSpider):
    """Spider for LinkedIn jobs (educational example)."""
    
    name = 'linkedin'
    source = 'linkedin'
    allowed_domains = ['linkedin.com']
    
    # Note: LinkedIn's public job API
    api_base = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'
    
    def __init__(self, keywords=None, location=None, pages=5, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.keywords = keywords or 'software engineer'
        self.location = location or 'United States'
        self.max_pages = int(pages)
    
    def start_requests(self):
        """Generate requests to LinkedIn's public job search."""
        for page in range(self.max_pages):
            start = page * 25
            url = (
                f"{self.api_base}"
                f"?keywords={self.keywords}"
                f"&location={self.location}"
                f"&start={start}"
            )
            yield scrapy.Request(
                url=url,
                callback=self.parse_job_list,
                headers={
                    'Accept': 'text/html',
                }
            )
    
    def parse_job_list(self, response):
        """Parse job listing results."""
        jobs = response.css('li')
        
        for job in jobs:
            job_link = job.css('a.base-card__full-link::attr(href)').get()
            
            if job_link:
                # Extract basic info from card
                card_data = {
                    'title': job.css('h3.base-search-card__title::text').get(),
                    'company': job.css('h4.base-search-card__subtitle a::text').get(),
                    'location': job.css('span.job-search-card__location::text').get(),
                    'posted': job.css('time::attr(datetime)').get(),
                }
                
                yield scrapy.Request(
                    url=job_link,
                    callback=self.parse_job_detail,
                    meta={'card_data': card_data}
                )
    
    def parse_job_detail(self, response):
        """Parse individual job page."""
        card_data = response.meta.get('card_data', {})
        
        loader = self.create_loader(response=response)
        
        # Core info
        loader.add_css('title', 'h1.top-card-layout__title::text')
        loader.add_value('title', card_data.get('title'))
        
        loader.add_css('company_name', 'a.topcard__org-name-link::text')
        loader.add_value('company_name', card_data.get('company'))
        
        # Location
        location = response.css('span.topcard__flavor--bullet::text').get()
        if location:
            self.parse_location(loader, location)
        loader.add_value('city', card_data.get('location'))
        
        # Description
        loader.add_css('description', 'div.description__text')
        loader.add_css('description_html', 'div.description__text')
        
        # Job criteria
        criteria = response.css('li.description__job-criteria-item')
        for item in criteria:
            label = item.css('h3::text').get()
            value = item.css('span::text').get()
            
            if label and value:
                label = label.strip().lower()
                value = value.strip()
                
                if 'seniority' in label or 'level' in label:
                    loader.add_value('experience_level', value)
                elif 'type' in label:
                    loader.add_value('job_type', value)
                elif 'industry' in label:
                    loader.add_value('industry', value)
        
        # Remote detection
        loader.add_value('is_remote', self.detect_remote(response.text))
        
        # Skills
        description = response.css('div.description__text::text').getall()
        loader.add_value('skills', self.extract_skills(' '.join(description)))
        
        # Source info
        loader.add_value('source', self.source)
        loader.add_value('source_url', response.url)
        
        # Job ID from URL
        job_id = response.url.split('-')[-1].split('?')[0] if '-' in response.url else None
        loader.add_value('source_job_id', job_id)
        
        # Posted date
        loader.add_value('posted_at', self.parse_date(card_data.get('posted')))
        
        # Apply URL
        loader.add_value('apply_url', response.url)
        
        self.jobs_scraped += 1
        yield loader.load_item()
    
    def parse_location(self, loader, location_text):
        """Parse location string."""
        if not location_text:
            return
        
        parts = [p.strip() for p in location_text.split(',')]
        if len(parts) >= 1:
            loader.add_value('city', parts[0])
        if len(parts) >= 2:
            loader.add_value('state', parts[1])
        if len(parts) >= 3:
            loader.add_value('country', parts[2])
