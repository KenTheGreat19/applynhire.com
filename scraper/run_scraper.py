"""
Scrapy Project Entry Point.
Run spiders from command line or programmatically.
"""
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def run_spider(spider_name, **kwargs):
    """Run a specific spider with given arguments."""
    process = CrawlerProcess(get_project_settings())
    process.crawl(spider_name, **kwargs)
    process.start()


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python run_scraper.py <spider_name> [options]")
        print("Available spiders: indeed, linkedin")
        sys.exit(1)
    
    spider = sys.argv[1]
    run_spider(spider)
