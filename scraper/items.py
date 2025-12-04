"""
Scrapy Items for Job Scraping.
Defines the structure of scraped job data.
"""
import scrapy
from itemloaders.processors import TakeFirst, MapCompose, Join
from w3lib.html import remove_tags


def clean_text(text):
    """Clean and normalize text."""
    if text:
        return ' '.join(text.split())
    return text


def parse_salary(salary_text):
    """Parse salary string to extract min/max values."""
    # Basic implementation - extend based on actual formats
    return salary_text


class JobItem(scrapy.Item):
    """Job listing item."""
    
    # Core fields
    title = scrapy.Field(
        input_processor=MapCompose(remove_tags, clean_text),
        output_processor=TakeFirst()
    )
    description = scrapy.Field(
        input_processor=MapCompose(clean_text),
        output_processor=TakeFirst()
    )
    description_html = scrapy.Field(
        output_processor=TakeFirst()
    )
    
    # Company info
    company_name = scrapy.Field(
        input_processor=MapCompose(remove_tags, clean_text),
        output_processor=TakeFirst()
    )
    company_logo = scrapy.Field(output_processor=TakeFirst())
    company_website = scrapy.Field(output_processor=TakeFirst())
    company_description = scrapy.Field(output_processor=TakeFirst())
    company_size = scrapy.Field(output_processor=TakeFirst())
    company_industry = scrapy.Field(output_processor=TakeFirst())
    
    # Location
    city = scrapy.Field(
        input_processor=MapCompose(remove_tags, clean_text),
        output_processor=TakeFirst()
    )
    state = scrapy.Field(output_processor=TakeFirst())
    country = scrapy.Field(output_processor=TakeFirst())
    postal_code = scrapy.Field(output_processor=TakeFirst())
    is_remote = scrapy.Field(output_processor=TakeFirst())
    remote_type = scrapy.Field(output_processor=TakeFirst())
    
    # Job details
    job_type = scrapy.Field(output_processor=TakeFirst())
    experience_level = scrapy.Field(output_processor=TakeFirst())
    
    # Compensation
    salary_min = scrapy.Field(output_processor=TakeFirst())
    salary_max = scrapy.Field(output_processor=TakeFirst())
    salary_currency = scrapy.Field(output_processor=TakeFirst())
    salary_period = scrapy.Field(output_processor=TakeFirst())
    benefits = scrapy.Field()  # List
    
    # Requirements
    skills = scrapy.Field()  # List
    requirements = scrapy.Field()  # List
    qualifications = scrapy.Field()  # List
    
    # Categorization
    category = scrapy.Field(output_processor=TakeFirst())
    industry = scrapy.Field(output_processor=TakeFirst())
    tags = scrapy.Field()  # List
    
    # Source tracking
    source = scrapy.Field(output_processor=TakeFirst())
    source_url = scrapy.Field(output_processor=TakeFirst())
    source_job_id = scrapy.Field(output_processor=TakeFirst())
    
    # Application info
    apply_url = scrapy.Field(output_processor=TakeFirst())
    apply_email = scrapy.Field(output_processor=TakeFirst())
    application_deadline = scrapy.Field(output_processor=TakeFirst())
    
    # Timestamps
    posted_at = scrapy.Field(output_processor=TakeFirst())
    expires_at = scrapy.Field(output_processor=TakeFirst())
    
    # Raw data
    raw_data = scrapy.Field()
