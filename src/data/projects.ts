export interface Project {
  title: string;
  type: string;
  summary: string;
  tags: string;
  details: string[];
  repo?: string;
}

export const joboard = {
  title: 'Joboard',
  since: 'Running every morning since September 2026',
  summary:
    'An agent that runs my job search. Each morning it finds roles, decides which ones fit, applies to them, and sends me a report over iMessage. A dashboard keeps the whole history.',
  steps: [
    {
      name: 'Search',
      text: 'A Deep Agents loop picks keywords from my resume and searches SEEK, LinkedIn and employer ATSs like Greenhouse, Lever and Workday, reading each full job description.',
    },
    {
      name: 'Judge',
      text: 'The model gathers evidence; code makes the call. TypeSafe Jev answers fixed questions (recruiter or employer, right seniority, matching stack) and written rules filter and score.',
    },
    {
      name: 'Apply',
      text: 'Browser Use Cloud agents fill in and submit forms using only my resume and facts I’ve confirmed. A question they can’t answer stops the form before submit and comes to me.',
    },
    {
      name: 'Record',
      text: 'Results go back to the dashboard through an MCP endpoint. Employer replies move each application forward: interview, rejected or offer.',
    },
  ],
  safeguards: [
    'A submitted application can’t be taken back, so the agent records the attempt before opening a browser, counts it only after seeing a confirmation page, and locks any job where it can’t tell.',
    'A rehearsal mode runs the full flow and stops on the final submit page.',
    'When an employer’s ATS needs an account, the agent signs up with its own mailbox, reads the verification code over IMAP and finishes in the same browser session.',
    'It stops when Browser Use credit runs low and leaves the remaining jobs for the next run.',
  ],
  stack: [
    { part: 'Dashboard', items: ['Next.js', 'Supabase', 'MCP server', 'Vercel'] },
    { part: 'Agent', items: ['Python', 'Deep Agents', 'TypeSafe Jev', 'Browser Use Cloud', 'Railway', 'iMessage', 'Gmail API'] },
  ],
  repo: 'https://github.com/EdwardZeed/JOBOARD',
};

export const projects: Project[] = [
  {
    title: 'Suncycle',
    type: 'Full-stack marketplace',
    summary: 'A marketplace for recycling solar panel boards across Australia, built to create a reliable secondary-materials market.',
    tags: 'Java · Spring Boot · MySQL (GCP) · JWT · Google Maps API',
    details: [
      'REST API backend built with Java Spring Boot, with JWT-based stateless authentication.',
      'CRUD operations against a MySQL database hosted on GCP.',
      'Google Maps API integration to geocode installation locations; Jackson for JSON serialization.',
    ],
  },
  {
    title: 'On Task Achiever',
    type: 'Cross-platform mobile app',
    summary: 'A task-management app for iOS and Android sharing one Kotlin Multiplatform codebase.',
    tags: 'Kotlin Multiplatform · Firebase · SwiftUI · Jetpack Compose · MVVM',
    details: [
      'Firebase backend with MVVM architecture; supports email, Apple, Google and Facebook sign-in.',
      'Native UI per platform: SwiftUI on iOS, Jetpack Compose on Android.',
      'Firestore data synced to the UI in real time, with optimistic loading while data streams in.',
    ],
    repo: 'https://github.com/EdwardZeed/FamilyChoreManager',
  },
  {
    title: 'Cafe App',
    type: 'Cloud infrastructure',
    summary: 'A cafe web app deployed on AWS with auto-scaling and a hardened network path for high availability.',
    tags: 'AWS EC2 · Auto Scaling · Load Balancer · RDS · CloudFormation',
    details: [
      'EC2 instances reachable only through a bastion host, protecting the rest of the network.',
      'Auto Scaling Group and Load Balancer across multiple availability zones to absorb traffic spikes and outages.',
      'RDS provisioned via a CloudFormation YAML template, making the architecture easy to reproduce.',
    ],
  },
  {
    title: 'Exchange Rate Desktop App',
    type: 'Desktop application',
    summary: 'A JavaFX desktop app for checking live exchange rates.',
    tags: 'Java · JavaFX · MVP · Concurrency',
    details: [
      'MVP architecture separating model and view; a stage-management layer prevented duplicate windows on reload.',
      'Real-time rate data pulled via API and rendered in the UI.',
      "Background API calls handled with JavaFX's Task class to keep the UI thread responsive.",
    ],
    repo: 'https://github.com/EdwardZeed/SOFT3202/tree/master/major_project',
  },
];
