#!/usr/bin/env python3
"""
bigO Lead Finder - Automated Client Discovery System
Finds potential clients using LEGAL public APIs and data sources
"""

import requests
import json
import csv
from datetime import datetime
import time

# ============================================
# CONFIGURATION - ADD YOUR API KEYS
# ============================================

# Free API Keys (Get from these sites):
APOLLO_API_KEY = "mn8srpxkQ9Asg4p3y9pmGw"  # Get from: https://apollo.io (50 free searches/month)
HUNTER_API_KEY = "a1a790aa34f1099a17f2e7a185f017e7a9c4031f"  # Get from: https://hunter.io (25 free searches/month)
GOOGLE_PLACES_API_KEY = ""  # Get from: https://console.cloud.google.com

# Target criteria - EXPANDED FOR MAXIMUM REACH
SEARCH_CRITERIA = {
    # Global targeting - 15 major markets
    "countries": [
        "India", "United States", "United Kingdom", "Canada", "Australia",
        "Singapore", "UAE", "Germany", "France", "Netherlands",
        "Hong Kong", "New Zealand", "Ireland", "Switzerland", "Sweden"
    ],

    # 30+ Industries - bigO can serve almost ANY business!
    "industries": [
        # Tech & Digital
        "SaaS", "Software Development", "IT Services", "Cybersecurity",
        "Artificial Intelligence", "Mobile Apps", "Cloud Computing",

        # E-commerce & Retail
        "E-commerce", "Retail", "Fashion & Apparel", "Beauty & Cosmetics",
        "Food & Beverage", "Consumer Goods", "Wholesale",

        # B2B Services
        "Professional Services", "Business Consulting", "Marketing Agency",
        "Accounting", "Legal Services", "HR Consulting", "Recruiting",

        # Finance & Real Estate
        "Financial Services", "FinTech", "Insurance", "Real Estate",
        "Property Management", "Investment Management",

        # Health & Wellness
        "Healthcare", "Fitness & Wellness", "Medical Devices", "Telemedicine",
        "Mental Health", "Nutrition", "Pharmaceuticals",

        # Education & Training
        "Education", "E-learning", "Coaching/Consulting", "Training & Development",
        "EdTech", "Online Courses",

        # Creative & Media
        "Media & Entertainment", "Design Agency", "Photography", "Video Production",
        "Advertising", "Publishing", "Events",

        # Manufacturing & Logistics
        "Manufacturing", "Supply Chain", "Logistics", "Transportation",
        "Warehousing", "Import/Export",

        # Hospitality & Travel
        "Travel & Tourism", "Hotels & Resorts", "Restaurants", "Catering",
        "Event Management", "Hospitality",

        # Other High-Value
        "Construction", "Architecture", "Engineering", "Automotive",
        "Telecommunications", "Energy", "Agriculture", "Non-Profit"
    ],

    # Company sizes - from small startups to mid-size enterprises
    "company_sizes": [
        "1-10",      # Solo founders & micro startups (₹20k-₹1L projects)
        "11-50",     # Small businesses (₹50k-₹3L projects)
        "51-200",    # Growing companies (₹2L-₹10L projects)
        "201-500",   # Mid-size companies (₹5L-₹20L projects)
        "501-1000",  # Larger companies (₹10L-₹50L projects)
    ],

    # Decision makers - expanded list
    "job_titles": [
        # C-Level
        "CEO", "Founder", "Co-Founder", "Owner", "Managing Director",
        "Chief Executive Officer", "President",

        # Marketing & Growth
        "CMO", "Chief Marketing Officer", "Marketing Director", "VP Marketing",
        "Head of Marketing", "Marketing Manager", "Growth Lead",
        "Head of Digital", "Digital Marketing Manager",

        # Operations & Business
        "COO", "Chief Operating Officer", "Operations Director",
        "Business Development Manager", "VP Business Development",

        # Product & Tech (for SaaS/tech companies)
        "CTO", "Chief Technology Officer", "VP Product",
        "Head of Product", "Product Manager",

        # Sales (they understand ROI)
        "VP Sales", "Sales Director", "Head of Sales",
    ],

    # Technologies they use (opportunities for upgrades!)
    "technologies": [
        # Website builders (easy to upgrade from)
        "WordPress", "Wix", "Squarespace", "Weebly", "GoDaddy Website Builder",
        "Shopify", "WooCommerce", "BigCommerce", "Magento",

        # Old tech (outdated = opportunity)
        "Joomla", "Drupal", "HTML", "PHP",

        # Modern but could be better
        "React", "Vue", "Angular", "Next.js"
    ],
}

# ============================================
# LEAD SOURCES
# ============================================

def search_apollo_contacts(industry, country):
    """
    Search Apollo.io for decision makers
    FREE: 50 searches/month
    """
    if not APOLLO_API_KEY:
        print("⚠️  Apollo API key not set. Get free key from https://apollo.io")
        return []

    url = "https://api.apollo.io/v1/mixed_people/search"

    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": APOLLO_API_KEY
    }

    payload = {
        "q_organization_domains": "",
        "page": 1,
        "per_page": 25,
        "organization_locations": [country],
        "organization_industry_tag_ids": [industry],
        "person_titles": SEARCH_CRITERIA["job_titles"],
        "organization_num_employees_ranges": [SEARCH_CRITERIA["company_size"]]
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            return data.get("people", [])
        else:
            print(f"❌ Apollo API error: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Apollo error: {e}")
        return []


def find_email_with_hunter(company_domain):
    """
    Find email addresses using Hunter.io
    FREE: 25 searches/month
    """
    if not HUNTER_API_KEY:
        return None

    url = f"https://api.hunter.io/v2/domain-search"
    params = {
        "domain": company_domain,
        "api_key": HUNTER_API_KEY,
        "limit": 10
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            emails = data.get("data", {}).get("emails", [])
            # Return decision maker emails only
            for email in emails:
                if any(title in email.get("position", "").lower()
                       for title in ["ceo", "founder", "director", "head"]):
                    return email.get("value")
        return None
    except Exception as e:
        print(f"❌ Hunter error: {e}")
        return None


def search_google_places(query, location):
    """
    Find businesses using Google Places API
    FREE: $200 credit/month (about 40,000 requests)
    """
    if not GOOGLE_PLACES_API_KEY:
        print("⚠️  Google API key not set. Get free key from https://console.cloud.google.com")
        return []

    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "location": location,
        "key": GOOGLE_PLACES_API_KEY
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json().get("results", [])
        return []
    except Exception as e:
        print(f"❌ Google Places error: {e}")
        return []


def check_website_quality(url):
    """
    Check if website exists and basic quality metrics
    Identifies opportunities (bad/no website)
    """
    if not url:
        return {
            "has_website": False,
            "opportunity_score": "VERY HIGH",
            "reason": "No website"
        }

    try:
        response = requests.get(url, timeout=5)

        # Check if it's a common website builder (opportunity!)
        website_builders = ["wix.com", "wordpress.com", "squarespace.com", "weebly.com"]
        is_basic_builder = any(builder in url.lower() for builder in website_builders)

        score = {
            "has_website": True,
            "status_code": response.status_code,
            "is_basic_builder": is_basic_builder,
            "response_time": response.elapsed.total_seconds(),
        }

        # Calculate opportunity score
        if is_basic_builder:
            score["opportunity_score"] = "HIGH"
            score["reason"] = "Using basic website builder"
        elif response.elapsed.total_seconds() > 3:
            score["opportunity_score"] = "MEDIUM"
            score["reason"] = "Slow website"
        else:
            score["opportunity_score"] = "LOW"
            score["reason"] = "Decent website"

        return score

    except Exception as e:
        return {
            "has_website": False,
            "opportunity_score": "VERY HIGH",
            "reason": f"Website error: {str(e)[:50]}"
        }


# ============================================
# LEAD PROCESSING & SCORING
# ============================================

def score_lead(lead_data):
    """
    Score lead quality based on multiple factors
    Returns 0-100 score
    """
    score = 0

    # Company size (ideal: 10-500 employees)
    employees = lead_data.get("employees", 0)
    if 10 <= employees <= 500:
        score += 30
    elif employees > 500:
        score += 10

    # Decision maker level
    title = lead_data.get("title", "").lower()
    if any(x in title for x in ["ceo", "founder", "owner"]):
        score += 30
    elif any(x in title for x in ["director", "head", "vp", "cmo"]):
        score += 20

    # Website quality (bad = opportunity)
    website_score = lead_data.get("website_quality", {}).get("opportunity_score", "LOW")
    if website_score == "VERY HIGH":
        score += 40
    elif website_score == "HIGH":
        score += 25
    elif website_score == "MEDIUM":
        score += 15

    return min(score, 100)


def save_leads_to_csv(leads, filename="bigO_leads.csv"):
    """Save leads to CSV file"""
    if not leads:
        print("❌ No leads to save")
        return

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=leads[0].keys())
        writer.writeheader()
        writer.writerows(leads)

    print(f"✅ Saved {len(leads)} leads to {filename}")


# ============================================
# MAIN EXECUTION
# ============================================

def main():
    """
    Main lead finding routine
    """
    print("=" * 60)
    print("🚀 bigO Lead Finder - Starting...")
    print("=" * 60)

    all_leads = []

    # Check API keys
    apis_configured = 0
    if APOLLO_API_KEY:
        apis_configured += 1
    if HUNTER_API_KEY:
        apis_configured += 1
    if GOOGLE_PLACES_API_KEY:
        apis_configured += 1

    print(f"\n📊 APIs Configured: {apis_configured}/3")
    if apis_configured == 0:
        print("\n⚠️  NO API KEYS CONFIGURED!")
        print("\nTo use this tool, get FREE API keys from:")
        print("1. Apollo.io - https://apollo.io (50 searches/month)")
        print("2. Hunter.io - https://hunter.io (25 searches/month)")
        print("3. Google Cloud - https://console.cloud.google.com ($200 free credit)")
        print("\nAdd them to the top of this file and run again.")
        return

    # Search for leads - EXPANDED SEARCH!
    print("\n🔍 Searching for leads...\n")
    print("🌍 Targeting: 15 countries, 70+ industries, 5 company sizes")
    print("🎯 Searching for CEOs, Founders, CMOs, CTOs, and VPs\n")

    # FREE TIER: Search 5 countries × 10 industries = 50 searches (Apollo limit)
    # PAID TIER: Uncomment to search ALL countries and industries

    countries_to_search = SEARCH_CRITERIA["countries"][:5]  # Top 5 markets
    industries_to_search = SEARCH_CRITERIA["industries"][:10]  # Top 10 industries

    # To search MORE, get paid Apollo plan ($49/month for 1000 searches)
    # Then change to: SEARCH_CRITERIA["countries"] and SEARCH_CRITERIA["industries"]

    for country in countries_to_search:
        for industry in industries_to_search:
            print(f"Searching: {industry} in {country}...")

            # Get contacts from Apollo
            contacts = search_apollo_contacts(industry, country)

            for contact in contacts[:10]:  # Get 10 per search (more leads!)
                lead = {
                    "name": contact.get("name", ""),
                    "title": contact.get("title", ""),
                    "company": contact.get("organization", {}).get("name", ""),
                    "country": country,
                    "industry": industry,
                    "employees": contact.get("organization", {}).get("estimated_num_employees", 0),
                    "website": contact.get("organization", {}).get("website_url", ""),
                    "linkedin": contact.get("linkedin_url", ""),
                    "email": contact.get("email", ""),
                }

                # If no email, try to find it
                if not lead["email"] and lead["website"]:
                    domain = lead["website"].replace("https://", "").replace("http://", "").split("/")[0]
                    email = find_email_with_hunter(domain)
                    if email:
                        lead["email"] = email

                # Check website quality
                if lead["website"]:
                    lead["website_quality"] = check_website_quality(lead["website"])
                    lead["opportunity_score"] = lead["website_quality"]["opportunity_score"]
                    lead["opportunity_reason"] = lead["website_quality"]["reason"]

                # Calculate lead score
                lead["lead_score"] = score_lead(lead)
                lead["found_date"] = datetime.now().strftime("%Y-%m-%d")

                all_leads.append(lead)

            time.sleep(1)  # Rate limiting

    # Sort by lead score
    all_leads.sort(key=lambda x: x.get("lead_score", 0), reverse=True)

    # Save results
    if all_leads:
        filename = f"bigO_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        save_leads_to_csv(all_leads, filename)

        print("\n" + "=" * 60)
        print(f"✅ COMPLETE! Found {len(all_leads)} leads")
        print("=" * 60)
        print(f"\n📊 Lead Quality Breakdown:")
        hot_leads = [l for l in all_leads if l.get("lead_score", 0) >= 70]
        warm_leads = [l for l in all_leads if 40 <= l.get("lead_score", 0) < 70]
        cold_leads = [l for l in all_leads if l.get("lead_score", 0) < 40]

        print(f"🔥 Hot leads (70+ score): {len(hot_leads)}")
        print(f"🌤️  Warm leads (40-70): {len(warm_leads)}")
        print(f"❄️  Cold leads (<40): {len(cold_leads)}")

        if hot_leads:
            print(f"\n🎯 Top 3 Hot Leads:")
            for i, lead in enumerate(hot_leads[:3], 1):
                print(f"\n{i}. {lead['name']} - {lead['title']}")
                print(f"   Company: {lead['company']}")
                print(f"   Email: {lead['email']}")
                print(f"   Score: {lead['lead_score']}/100")
                print(f"   Opportunity: {lead.get('opportunity_reason', 'N/A')}")
    else:
        print("\n❌ No leads found. Check your API keys and try again.")


if __name__ == "__main__":
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║              bigO LEAD FINDER v1.0                        ║
    ║         Automated Legal Client Discovery                  ║
    ║                                                           ║
    ║  This tool uses LEGAL public APIs to find qualified      ║
    ║  leads for your web development business.                 ║
    ║                                                           ║
    ║  All data sources respect ToS and privacy laws.          ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    """)

    main()
