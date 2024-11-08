export interface GetPatentAndCompanyProps {
  patentId: string;
  companyName: string;
}

export interface Patent {
  id: number;
  publication_number: string;
  title: string;
  ai_summary: string;
  raw_source_url: string;
  assignee: string;
  inventors: string;
  priority_date: string;
  application_date: string;
  grant_date: string;
  abstract: string;
  description: string;
  claims: string;
  jurisdictions: string;
  classifications: string;
  application_events: string;
  citations: string;
  image_urls: string;
  landscapes: string;
  created_at: string;
  updated_at: string;
  publish_date: string;
  citations_non_patent: string;
  provenance: string;
  attachment_urls: string | null;
}

export interface Company {
  name: string;
  products: {
    name: string;
    description: string;
  }[];
}
