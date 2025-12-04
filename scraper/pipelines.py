"""
Scrapy Pipelines for Job Processing.
Handles cleaning, deduplication, and MongoDB storage.
"""
import logging
from datetime import datetime
from pymongo import MongoClient
from scrapy.exceptions import DropItem

logger = logging.getLogger(__name__)


class CleaningPipeline:
    """Clean and validate scraped job data."""
    
    def process_item(self, item, spider):
        # Validate required fields
        if not item.get('title'):
            raise DropItem("Missing title")
        if not item.get('company_name'):
            raise DropItem("Missing company name")
        
        # Normalize job type
        job_type_mapping = {
            'full-time': 'full_time',
            'fulltime': 'full_time',
            'full time': 'full_time',
            'part-time': 'part_time',
            'parttime': 'part_time',
            'part time': 'part_time',
            'contract': 'contract',
            'contractor': 'contract',
            'temporary': 'temporary',
            'temp': 'temporary',
            'internship': 'internship',
            'intern': 'internship',
            'freelance': 'freelance',
        }
        
        if item.get('job_type'):
            job_type = item['job_type'].lower().strip()
            item['job_type'] = job_type_mapping.get(job_type, job_type)
        
        # Normalize experience level
        exp_mapping = {
            'entry level': 'entry',
            'entry-level': 'entry',
            'junior': 'entry',
            'mid level': 'mid',
            'mid-level': 'mid',
            'intermediate': 'mid',
            'senior level': 'senior',
            'senior-level': 'senior',
            'lead': 'lead',
            'principal': 'lead',
            'executive': 'executive',
            'director': 'executive',
            'c-level': 'executive',
        }
        
        if item.get('experience_level'):
            exp = item['experience_level'].lower().strip()
            item['experience_level'] = exp_mapping.get(exp, exp)
        
        # Parse boolean for is_remote
        if item.get('is_remote'):
            remote_val = str(item['is_remote']).lower()
            item['is_remote'] = remote_val in ['true', '1', 'yes', 'remote']
        
        # Ensure lists are actually lists
        list_fields = ['skills', 'requirements', 'qualifications', 'benefits', 'tags']
        for field in list_fields:
            if item.get(field) and not isinstance(item[field], list):
                item[field] = [item[field]]
        
        return item


class DuplicatesPipeline:
    """Filter out duplicate jobs based on source and source_job_id."""
    
    def __init__(self):
        self.seen = set()
    
    def process_item(self, item, spider):
        # Create unique identifier
        identifier = f"{item.get('source', '')}:{item.get('source_job_id', '')}"
        
        if not item.get('source_job_id'):
            # Use URL as fallback identifier
            identifier = item.get('source_url', '')
        
        if identifier in self.seen:
            raise DropItem(f"Duplicate job: {identifier}")
        
        self.seen.add(identifier)
        return item


class MongoPipeline:
    """Store jobs in MongoDB."""
    
    collection_name = 'jobs'
    
    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.client = None
        self.db = None
    
    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )
    
    def open_spider(self, spider):
        self.client = MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        logger.info(f"Connected to MongoDB: {self.mongo_db}")
    
    def close_spider(self, spider):
        if self.client:
            self.client.close()
    
    def process_item(self, item, spider):
        # Transform item to MongoDB document format
        doc = {
            'title': item.get('title'),
            'description': item.get('description'),
            'description_html': item.get('description_html'),
            'company': {
                'name': item.get('company_name'),
                'logo': item.get('company_logo'),
                'website': item.get('company_website'),
                'description': item.get('company_description'),
                'size': item.get('company_size'),
                'industry': item.get('company_industry'),
            },
            'location': {
                'city': item.get('city'),
                'state': item.get('state'),
                'country': item.get('country'),
                'postal_code': item.get('postal_code'),
                'is_remote': item.get('is_remote', False),
                'remote_type': item.get('remote_type'),
            },
            'job_type': item.get('job_type'),
            'experience_level': item.get('experience_level'),
            'salary': {
                'min_amount': item.get('salary_min'),
                'max_amount': item.get('salary_max'),
                'currency': item.get('salary_currency', 'USD'),
                'period': item.get('salary_period'),
            },
            'benefits': item.get('benefits', []),
            'skills': item.get('skills', []),
            'requirements': item.get('requirements', []),
            'qualifications': item.get('qualifications', []),
            'category': item.get('category'),
            'industry': item.get('industry'),
            'tags': item.get('tags', []),
            'source': item.get('source'),
            'source_url': item.get('source_url'),
            'source_job_id': item.get('source_job_id'),
            'apply_url': item.get('apply_url'),
            'apply_email': item.get('apply_email'),
            'application_deadline': item.get('application_deadline'),
            'is_active': True,
            'is_featured': False,
            'views_count': 0,
            'applications_count': 0,
            'posted_at': item.get('posted_at'),
            'expires_at': item.get('expires_at'),
            'scraped_at': datetime.utcnow(),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
            'raw_data': item.get('raw_data'),
        }
        
        # Upsert based on source and source_job_id
        self.db[self.collection_name].update_one(
            {
                'source': doc['source'],
                'source_job_id': doc['source_job_id']
            },
            {'$set': doc},
            upsert=True
        )
        
        logger.debug(f"Saved job: {doc['title']} at {doc['company']['name']}")
        return item
