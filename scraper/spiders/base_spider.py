"""
Base Spider Class for Job Scraping.
Provides common functionality for all job spiders.
"""
import scrapy
from scrapy.loader import ItemLoader
from scraper.items import JobItem
from datetime import datetime
import re


class BaseJobSpider(scrapy.Spider):
    """Base class for job scraping spiders."""
    
    name = 'base_job'
    source = 'unknown'
    
    # Override in subclasses
    allowed_domains = []
    start_urls = []
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.jobs_scraped = 0
    
    def create_loader(self, response=None, selector=None):
        """Create an ItemLoader with default settings."""
        if selector:
            return ItemLoader(item=JobItem(), selector=selector)
        return ItemLoader(item=JobItem(), response=response)
    
    def parse_date(self, date_string):
        """Parse various date formats to datetime."""
        if not date_string:
            return None
        
        # Common date patterns
        patterns = [
            r'%Y-%m-%d',
            r'%Y-%m-%dT%H:%M:%S',
            r'%Y-%m-%dT%H:%M:%SZ',
            r'%B %d, %Y',
            r'%b %d, %Y',
            r'%m/%d/%Y',
            r'%d/%m/%Y',
        ]
        
        for pattern in patterns:
            try:
                return datetime.strptime(date_string.strip(), pattern)
            except ValueError:
                continue
        
        # Handle relative dates
        relative_patterns = {
            r'(\d+)\s*hour': lambda m: datetime.utcnow(),
            r'(\d+)\s*day': lambda m: datetime.utcnow(),
            r'today': lambda m: datetime.utcnow(),
            r'yesterday': lambda m: datetime.utcnow(),
        }
        
        for pattern, handler in relative_patterns.items():
            match = re.search(pattern, date_string.lower())
            if match:
                return handler(match)
        
        return None
    
    def parse_salary_range(self, salary_text):
        """Extract salary min and max from text."""
        if not salary_text:
            return None, None
        
        # Find all numbers
        numbers = re.findall(r'[\d,]+(?:\.\d+)?', salary_text.replace(',', ''))
        numbers = [float(n) for n in numbers]
        
        if len(numbers) >= 2:
            return min(numbers), max(numbers)
        elif len(numbers) == 1:
            return numbers[0], numbers[0]
        
        return None, None
    
    def detect_remote(self, text):
        """Detect if job is remote from text."""
        if not text:
            return False
        
        remote_keywords = [
            'remote', 'work from home', 'wfh', 'telecommute',
            'distributed', 'anywhere', 'virtual'
        ]
        
        text_lower = text.lower()
        return any(keyword in text_lower for keyword in remote_keywords)
    
    def extract_skills(self, text):
        """Extract skills from job description."""
        if not text:
            return []
        
        # Common tech skills (extend this list)
        common_skills = [
            'python', 'javascript', 'java', 'c++', 'c#', 'ruby', 'go', 'rust',
            'react', 'angular', 'vue', 'node.js', 'django', 'flask', 'fastapi',
            'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch',
            'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
            'git', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql',
            'machine learning', 'data science', 'ai', 'nlp',
            'html', 'css', 'sass', 'typescript', 'webpack',
        ]
        
        text_lower = text.lower()
        found_skills = []
        
        for skill in common_skills:
            if skill in text_lower:
                found_skills.append(skill.title())
        
        return list(set(found_skills))
    
    def closed(self, reason):
        """Called when spider closes."""
        self.logger.info(f"Spider closed: {reason}")
        self.logger.info(f"Total jobs scraped: {self.jobs_scraped}")
