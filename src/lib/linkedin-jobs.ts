import fallbackJobs from "../content/linkedin-jobs.fallback.json";

export type LinkedInJob = {
  id: string;
  title: string;
  location: string;
  href: string;
  posted?: string;
  department: string;
  description?: string;
};

export const LINKEDIN_JOBS_URL = "https://www.linkedin.com/company/osfin-ai/jobs/";
const COMPANY_ID = "90411097";
const LISTINGS_URL = `https://www.linkedin.com/jobs/osfin.ai-jobs-worldwide?f_C=${COMPANY_ID}`;
const GUEST_URL = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?f_C=${COMPANY_ID}&start=0`;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

function decode(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripLocationFromTitle(title: string) {
  return title
    .replace(
      /\s*\((?:bengaluru|bangalore|mumbai|pune|kochi|kolkata|mangalore|delhi|hyderabad|chennai|noida|gurgaon|gurugram|austin|new york|san francisco)\)\s*$/i,
      "",
    )
    .trim();
}

export function departmentFor(title: string) {
  const t = title.toLowerCase();
  if (/\bhr\b/.test(t)) return "People";
  if (/sales|growth/.test(t)) return "Sales";
  if (/product/.test(t)) return "Product";
  if (/engineer|sde|sdet|database|dba/.test(t)) return "Engineering";
  return "Operations";
}

function parseJobs(html: string): LinkedInJob[] {
  const chunks = html.split('data-entity-urn="urn:li:jobPosting:').slice(1);
  const jobs: LinkedInJob[] = [];
  const seen = new Set<string>();

  for (const chunk of chunks) {
    const id = chunk.slice(0, chunk.indexOf('"'));
    if (!id || seen.has(id)) continue;
    seen.add(id);

    const titleMatch = chunk.match(/base-search-card__title[^>]*>([\s\S]*?)</);
    const locationMatch = chunk.match(/job-search-card__location[^>]*>([\s\S]*?)</);
    const hrefMatch = chunk.match(
      /href="(https:\/\/(?:www|in)\.linkedin\.com\/jobs\/view\/[^"?]+)/,
    );
    const postedMatch = chunk.match(/datetime="([^"]+)"/);
    const title = titleMatch ? stripLocationFromTitle(decode(titleMatch[1])) : "";
    if (!title) continue;

    jobs.push({
      id,
      title,
      location: locationMatch ? decode(locationMatch[1]) : "",
      href: hrefMatch?.[1] ?? `https://www.linkedin.com/jobs/view/${id}`,
      posted: postedMatch?.[1],
      department: departmentFor(title),
    });
  }

  return jobs;
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  if (!response.ok) return "";
  return response.text();
}

const FALLBACK = fallbackJobs as LinkedInJob[];

function withDescriptions(jobs: LinkedInJob[]) {
  const byId = new Map(FALLBACK.map((job) => [job.id, job]));
  return jobs.map((job) => {
    const cached = byId.get(job.id);
    return {
      ...job,
      title: stripLocationFromTitle(job.title),
      location: "",
      description: job.description || cached?.description,
    };
  });
}

export async function getLinkedInJobs(): Promise<LinkedInJob[]> {
  try {
    const guest = await fetchHtml(GUEST_URL);
    const fromGuest = parseJobs(guest);
    if (fromGuest.length > 0) return withDescriptions(fromGuest);

    const listings = await fetchHtml(LISTINGS_URL);
    const fromListings = parseJobs(listings);
    if (fromListings.length > 0) return withDescriptions(fromListings);
  } catch {
    // LinkedIn often rate-limits server IPs; use the last successful snapshot.
  }

  return withDescriptions(FALLBACK);
}
