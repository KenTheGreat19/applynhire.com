const API_BASE = 'http://127.0.0.1:8000';

// Sample job data - In production, this would come from an API
let jobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$120k - $160k",
        posted: "2 days ago",
        description: "We're looking for an experienced Frontend Developer to join our dynamic team and help build cutting-edge web applications.",
        requirements: [
            "5+ years of experience with React.js",
            "Strong knowledge of HTML, CSS, and JavaScript",
            "Experience with modern frontend tools and workflows",
            "Excellent problem-solving skills"
        ],
        responsibilities: [
            "Develop and maintain web applications",
            "Collaborate with design and backend teams",
            "Write clean, maintainable code",
            "Optimize applications for maximum performance"
        ],
        tags: ["React", "JavaScript", "CSS", "TypeScript"]
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "DesignHub",
        location: "Remote",
        type: "full-time",
        category: "design",
        salary: "$90k - $130k",
        posted: "1 day ago",
        description: "Join our creative team to design beautiful and intuitive user experiences for web and mobile applications.",
        requirements: [
            "3+ years of UX/UI design experience",
            "Proficiency in Figma, Sketch, or Adobe XD",
            "Strong portfolio demonstrating design skills",
            "Understanding of user-centered design principles"
        ],
        responsibilities: [
            "Create wireframes and prototypes",
            "Conduct user research and usability testing",
            "Design user interfaces for web and mobile",
            "Collaborate with developers and stakeholders"
        ],
        tags: ["Figma", "UI Design", "UX Research", "Prototyping"]
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "New York",
        type: "full-time",
        category: "technology",
        salary: "$100k - $150k",
        posted: "3 days ago",
        description: "Exciting opportunity to work on innovative products using modern technologies in a fast-paced startup environment.",
        requirements: [
            "Experience with Node.js and React",
            "Knowledge of databases (SQL and NoSQL)",
            "Understanding of RESTful APIs",
            "Strong communication skills"
        ],
        responsibilities: [
            "Build and maintain full-stack applications",
            "Design and implement APIs",
            "Work with database design and optimization",
            "Participate in agile development processes"
        ],
        tags: ["Node.js", "React", "MongoDB", "Express"]
    },
    {
        id: 4,
        title: "Marketing Manager",
        company: "GrowthCo",
        location: "London",
        type: "full-time",
        category: "marketing",
        salary: "£60k - £80k",
        posted: "5 days ago",
        description: "Lead our marketing efforts and help drive growth through innovative campaigns and strategies.",
        requirements: [
            "5+ years of marketing experience",
            "Experience with digital marketing channels",
            "Strong analytical and strategic thinking",
            "Excellent written and verbal communication"
        ],
        responsibilities: [
            "Develop and execute marketing strategies",
            "Manage marketing campaigns across channels",
            "Analyze campaign performance and ROI",
            "Lead and mentor marketing team members"
        ],
        tags: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudSystems",
        location: "Remote",
        type: "contract",
        category: "technology",
        salary: "$130k - $170k",
        posted: "1 week ago",
        description: "Help us build and maintain scalable cloud infrastructure using modern DevOps practices.",
        requirements: [
            "Experience with AWS, Azure, or GCP",
            "Strong knowledge of Docker and Kubernetes",
            "Experience with CI/CD pipelines",
            "Scripting skills (Python, Bash, etc.)"
        ],
        responsibilities: [
            "Design and maintain cloud infrastructure",
            "Implement CI/CD pipelines",
            "Monitor system performance and reliability",
            "Automate deployment processes"
        ],
        tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    },
    {
        id: 6,
        title: "Data Analyst",
        company: "DataInsights",
        location: "Berlin",
        type: "full-time",
        category: "technology",
        salary: "€50k - €70k",
        posted: "4 days ago",
        description: "Analyze data to provide actionable insights and support data-driven decision making.",
        requirements: [
            "Strong SQL and data analysis skills",
            "Experience with Python or R",
            "Knowledge of data visualization tools",
            "Statistical analysis background"
        ],
        responsibilities: [
            "Analyze complex datasets",
            "Create reports and dashboards",
            "Collaborate with stakeholders",
            "Identify trends and patterns in data"
        ],
        tags: ["SQL", "Python", "Tableau", "Statistics"]
    },
    {
        id: 7,
        title: "Product Manager",
        company: "InnovateTech",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$140k - $180k",
        posted: "2 days ago",
        description: "Drive product strategy and execution for our flagship products.",
        requirements: [
            "5+ years of product management experience",
            "Strong technical background",
            "Experience with agile methodologies",
            "Excellent stakeholder management skills"
        ],
        responsibilities: [
            "Define product vision and roadmap",
            "Prioritize features and requirements",
            "Work with engineering and design teams",
            "Analyze market trends and competition"
        ],
        tags: ["Product Strategy", "Agile", "Roadmap", "Analytics"]
    },
    {
        id: 8,
        title: "Junior Web Developer",
        company: "WebAgency",
        location: "Remote",
        type: "full-time",
        category: "technology",
        salary: "$50k - $70k",
        posted: "1 day ago",
        description: "Great opportunity for a junior developer to grow their skills in a supportive environment.",
        requirements: [
            "1-2 years of web development experience",
            "Knowledge of HTML, CSS, and JavaScript",
            "Eagerness to learn new technologies",
            "Good communication skills"
        ],
        responsibilities: [
            "Build responsive websites",
            "Maintain existing web applications",
            "Work with senior developers",
            "Learn best practices and modern tools"
        ],
        tags: ["HTML", "CSS", "JavaScript", "Git"]
    },
    {
        id: 9,
        title: "Sales Executive",
        company: "SalesPro",
        location: "New York",
        type: "full-time",
        category: "sales",
        salary: "$70k - $100k + Commission",
        posted: "3 days ago",
        description: "Drive sales growth and build lasting relationships with clients.",
        requirements: [
            "3+ years of B2B sales experience",
            "Proven track record of meeting targets",
            "Excellent negotiation skills",
            "CRM experience (Salesforce preferred)"
        ],
        responsibilities: [
            "Generate new business opportunities",
            "Manage sales pipeline",
            "Present product demos to clients",
            "Close deals and meet sales quotas"
        ],
        tags: ["B2B Sales", "Salesforce", "Lead Generation", "Negotiation"]
    },
    {
        id: 10,
        title: "Content Writer",
        company: "ContentCreators",
        location: "Remote",
        type: "part-time",
        category: "marketing",
        salary: "$30k - $45k",
        posted: "6 days ago",
        description: "Create engaging content for various digital platforms and audiences.",
        requirements: [
            "2+ years of content writing experience",
            "Excellent writing and editing skills",
            "SEO knowledge",
            "Ability to work independently"
        ],
        responsibilities: [
            "Write blog posts and articles",
            "Create social media content",
            "Optimize content for SEO",
            "Collaborate with marketing team"
        ],
        tags: ["Content Writing", "SEO", "Blogging", "Social Media"]
    },
    {
        id: 11,
        title: "Mobile App Developer",
        company: "AppStudio",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$110k - $150k",
        posted: "2 days ago",
        description: "Build innovative mobile applications for iOS and Android platforms.",
        requirements: [
            "Experience with React Native or Flutter",
            "Understanding of mobile UI/UX principles",
            "Knowledge of mobile app deployment",
            "Strong problem-solving skills"
        ],
        responsibilities: [
            "Develop cross-platform mobile apps",
            "Optimize app performance",
            "Work with APIs and backend services",
            "Test and debug applications"
        ],
        tags: ["React Native", "Flutter", "Mobile Development", "iOS"]
    },
    {
        id: 12,
        title: "Financial Analyst",
        company: "FinanceGroup",
        location: "London",
        type: "full-time",
        category: "finance",
        salary: "£55k - £75k",
        posted: "1 week ago",
        description: "Provide financial analysis and support strategic business decisions.",
        requirements: [
            "Bachelor's degree in Finance or related field",
            "3+ years of financial analysis experience",
            "Advanced Excel skills",
            "Strong analytical thinking"
        ],
        responsibilities: [
            "Perform financial modeling and analysis",
            "Prepare financial reports",
            "Support budgeting and forecasting",
            "Present findings to management"
        ],
        tags: ["Financial Modeling", "Excel", "Forecasting", "Analysis"]
    }
];

// The rest of the script includes page behaviors and render functions. Copy that from the original site/script.js if you prefer to keep all features.
/* Demo site script: moved into site/js for organization. */
const API_BASE = 'http://127.0.0.1:8000';

// Sample job data - In production, this would come from an API
let jobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$120k - $160k",
        posted: "2 days ago",
        description: "We're looking for an experienced Frontend Developer to join our dynamic team and help build cutting-edge web applications.",
        requirements: [
            "5+ years of experience with React.js",
            "Strong knowledge of HTML, CSS, and JavaScript",
            "Experience with modern frontend tools and workflows",
            "Excellent problem-solving skills"
        ],
        responsibilities: [
            "Develop and maintain web applications",
            "Collaborate with design and backend teams",
            "Write clean, maintainable code",
            "Optimize applications for maximum performance"
        ],
        tags: ["React", "JavaScript", "CSS", "TypeScript"]
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "DesignHub",
        location: "Remote",
        type: "full-time",
        category: "design",
        salary: "$90k - $130k",
        posted: "1 day ago",
        description: "Join our creative team to design beautiful and intuitive user experiences for web and mobile applications.",
        requirements: [
            "3+ years of UX/UI design experience",
            "Proficiency in Figma, Sketch, or Adobe XD",
            "Strong portfolio demonstrating design skills",
            "Understanding of user-centered design principles"
        ],
        responsibilities: [
            "Create wireframes and prototypes",
            "Conduct user research and usability testing",
            "Design user interfaces for web and mobile",
            "Collaborate with developers and stakeholders"
        ],
        tags: ["Figma", "UI Design", "UX Research", "Prototyping"]
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "New York",
        type: "full-time",
        category: "technology",
        salary: "$100k - $150k",
        posted: "3 days ago",
        description: "Exciting opportunity to work on innovative products using modern technologies in a fast-paced startup environment.",
        requirements: [
            "Experience with Node.js and React",
            "Knowledge of databases (SQL and NoSQL)",
            "Understanding of RESTful APIs",
            "Strong communication skills"
        ],
        responsibilities: [
            "Build and maintain full-stack applications",
            "Design and implement APIs",
            "Work with database design and optimization",
            "Participate in agile development processes"
        ],
        tags: ["Node.js", "React", "MongoDB", "Express"]
    },
    {
        id: 4,
        title: "Marketing Manager",
        company: "GrowthCo",
        location: "London",
        type: "full-time",
        category: "marketing",
        salary: "£60k - £80k",
        posted: "5 days ago",
        description: "Lead our marketing efforts and help drive growth through innovative campaigns and strategies.",
        requirements: [
            "5+ years of marketing experience",
            "Experience with digital marketing channels",
            "Strong analytical and strategic thinking",
            "Excellent written and verbal communication"
        ],
        responsibilities: [
            "Develop and execute marketing strategies",
            "Manage marketing campaigns across channels",
            "Analyze campaign performance and ROI",
            "Lead and mentor marketing team members"
        ],
        tags: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudSystems",
        location: "Remote",
        type: "contract",
        category: "technology",
        salary: "$130k - $170k",
        posted: "1 week ago",
        description: "Help us build and maintain scalable cloud infrastructure using modern DevOps practices.",
        requirements: [
            "Experience with AWS, Azure, or GCP",
            "Strong knowledge of Docker and Kubernetes",
            "Experience with CI/CD pipelines",
            "Scripting skills (Python, Bash, etc.)"
        ],
        responsibilities: [
            "Design and maintain cloud infrastructure",
            "Implement CI/CD pipelines",
            "Monitor system performance and reliability",
            "Automate deployment processes"
        ],
        tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    },
    {
        id: 6,
        title: "Data Analyst",
        company: "DataInsights",
        location: "Berlin",
        type: "full-time",
        category: "technology",
        salary: "€50k - €70k",
        posted: "4 days ago",
        description: "Analyze data to provide actionable insights and support data-driven decision making.",
        requirements: [
            "Strong SQL and data analysis skills",
            "Experience with Python or R",
            "Knowledge of data visualization tools",
            "Statistical analysis background"
        ],
        responsibilities: [
            "Analyze complex datasets",
            "Create reports and dashboards",
            "Collaborate with stakeholders",
            "Identify trends and patterns in data"
        ],
        tags: ["SQL", "Python", "Tableau", "Statistics"]
    },
    {
        id: 7,
        title: "Product Manager",
        company: "InnovateTech",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$140k - $180k",
        posted: "2 days ago",
        description: "Drive product strategy and execution for our flagship products.",
        requirements: [
            "5+ years of product management experience",
            "Strong technical background",
            "Experience with agile methodologies",
            "Excellent stakeholder management skills"
        ],
        responsibilities: [
            "Define product vision and roadmap",
            "Prioritize features and requirements",
            "Work with engineering and design teams",
            "Analyze market trends and competition"
        ],
        tags: ["Product Strategy", "Agile", "Roadmap", "Analytics"]
    },
    {
        id: 8,
        title: "Junior Web Developer",
        company: "WebAgency",
        location: "Remote",
        type: "full-time",
        category: "technology",
        salary: "$50k - $70k",
        posted: "1 day ago",
        description: "Great opportunity for a junior developer to grow their skills in a supportive environment.",
        requirements: [
            "1-2 years of web development experience",
            "Knowledge of HTML, CSS, and JavaScript",
            "Eagerness to learn new technologies",
            "Good communication skills"
        ],
        responsibilities: [
            "Build responsive websites",
            "Maintain existing web applications",
            "Work with senior developers",
            "Learn best practices and modern tools"
        ],
        tags: ["HTML", "CSS", "JavaScript", "Git"]
    },
    {
        id: 9,
        title: "Sales Executive",
        company: "SalesPro",
        location: "New York",
        type: "full-time",
        category: "sales",
        salary: "$70k - $100k + Commission",
        posted: "3 days ago",
        description: "Drive sales growth and build lasting relationships with clients.",
        requirements: [
            "3+ years of B2B sales experience",
            "Proven track record of meeting targets",
            "Excellent negotiation skills",
            "CRM experience (Salesforce preferred)"
        ],
        responsibilities: [
            "Generate new business opportunities",
            "Manage sales pipeline",
            "Present product demos to clients",
            "Close deals and meet sales quotas"
        ],
        tags: ["B2B Sales", "Salesforce", "Lead Generation", "Negotiation"]
    },
    {
        id: 10,
        title: "Content Writer",
        company: "ContentCreators",
        location: "Remote",
        type: "part-time",
        category: "marketing",
        salary: "$30k - $45k",
        posted: "6 days ago",
        description: "Create engaging content for various digital platforms and audiences.",
        requirements: [
            "2+ years of content writing experience",
            "Excellent writing and editing skills",
            "SEO knowledge",
            "Ability to work independently"
        ],
        responsibilities: [
            "Write blog posts and articles",
            "Create social media content",
            "Optimize content for SEO",
            "Collaborate with marketing team"
        ],
        tags: ["Content Writing", "SEO", "Blogging", "Social Media"]
    },
    {
        id: 11,
        title: "Mobile App Developer",
        company: "AppStudio",
        location: "San Francisco",
        type: "full-time",
        category: "technology",
        salary: "$110k - $150k",
        posted: "2 days ago",
        description: "Build innovative mobile applications for iOS and Android platforms.",
        requirements: [
            "Experience with React Native or Flutter",
            "Understanding of mobile UI/UX principles",
            "Knowledge of mobile app deployment",
            "Strong problem-solving skills"
        ],
        responsibilities: [
            "Develop cross-platform mobile apps",
            "Optimize app performance",
            "Work with APIs and backend services",
            "Test and debug applications"
        ],
        tags: ["React Native", "Flutter", "Mobile Development", "iOS"]
    },
    {
        id: 12,
        title: "Financial Analyst",
        company: "FinanceGroup",
        location: "London",
        type: "full-time",
        category: "finance",
        salary: "£55k - £75k",
        posted: "1 week ago",
        description: "Provide financial analysis and support strategic business decisions.",
        requirements: [
            "Bachelor's degree in Finance or related field",
            "3+ years of financial analysis experience",
            "Advanced Excel skills",
            "Strong analytical thinking"
        ],
        responsibilities: [
            "Perform financial modeling and analysis",
            "Prepare financial reports",
            "Support budgeting and forecasting",
            "Present findings to management"
        ],
        tags: ["Financial Modeling", "Excel", "Forecasting", "Analysis"]
    }
];

// The rest of the script includes page behaviors and render functions
// For brevity we will continue to use the original site/script.js implementation if needed

document.addEventListener('DOMContentLoaded', () => {
    // TODO: restore interactivity from site/script.js; kept minimal for now
});
