export  const vacancies = [
    {
      id: 1,
      link_vacancy: 'https://linkedin.com/jobs/1',
      description: 'Frontend Developer',
      resume_used: 'resume_1.pdf',
      vacancy_level: 'Junior',
      status: 'Open',
      plataform: 'LinkedIn',
    },
    {
      id: 2,
      link_vacancy: 'https://github.com/jobs/2',
      description: 'Backend Developer',
      resume_used: 'resume_2.pdf',
      vacancy_level: 'Mid',
      status: 'Closed',
      plataform: 'GitHub',
    },
    {
      id: 3,
      link_vacancy: 'https://aubert.dev/jobs/3',
      description: 'Fullstack Developer',
      resume_used: 'resume_3.pdf',
      vacancy_level: 'Senior',
      status: 'Open',
      plataform: 'Website',
    },
  ];

export const accessedLinks = [
  {
    id: 1,
    vacancy_id: 1,
    accessed_at: "2025-10-20T10:00:00Z",
    source: "linkedin",
  },
  {
    id: 2,
    vacancy_id: 1,
    accessed_at: "2025-10-19T14:22:00Z",
    source: "github",
  },
  {
    id: 3,
    vacancy_id: 2,
    accessed_at: "2025-10-17T09:00:00Z",
    source: "portfolio",
  },
  {
    id: 4,
    vacancy_id: 3,
    accessed_at: "2025-10-25T16:30:00Z",
    source: "direct",
  },
  {
    id: 5,
    vacancy_id: null,
    accessed_at: "2025-10-30T18:45:00Z",
    source: "unknown",
  },
];

export const linksMock = [
  {
    id:1,
    vacancy_id: 1,
    link_label: "LinkedIn",
    original_link: "https://www.linkedin.com/jobs/view/123456",
    code: "abc123",
    created_at: "2025-10-20T10:00:00Z",
  },
  {
    id:2,
    vacancy_id: 1,
    link_label: "Indeed",
    original_link: "https://www.indeed.com/viewjob?jk=789xyz",
    code: "xyz789",
    created_at: "2025-10-21T15:30:00Z",
  },
  {
    id:3,
    vacancy_id: 2,
    link_label: "Company Site",
    original_link: "https://empresa.com/carreiras/dev-fullstack",
    code: "fullstack2025",
    created_at: "2025-10-22T09:45:00Z",
  },
  {
    id:4,
    vacancy_id: 2,
    link_label: "Glassdoor",
    original_link: "https://www.glassdoor.com/job-listing/devops-engineer",
    code: "devops777",
    created_at: "2025-10-23T11:10:00Z",
  },
  {
    id:6,
    vacancy_id: 3,
    link_label: "GitHub Jobs",
    original_link: "https://jobs.github.com/positions/backend-engineer",
    code: "gitback2025",
    created_at: "2025-10-24T13:20:00Z",
  },
  {
    id:5,
    vacancy_id: 3,
    link_label: "Twitter",
    original_link: "https://twitter.com/jobpost/frontend",
    code: "twfront888",
    created_at: "2025-10-25T17:05:00Z",
  },
];
