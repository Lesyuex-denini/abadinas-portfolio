export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  role: string;
  challenge: string;
  solution: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projectArchive: Project[] = [
  {
    id: "businessflow-lite",
    title: "BusinessFlow Lite",
    subtitle:
      "A full-stack business management platform for small business owners to manage inventory, record sales, and track revenue.",
    description:
      "Full-stack business management app with real-time dashboards, inventory tracking, and secure multi-tenant auth — built on Next.js 16 and PostgreSQL.",
    image: "/projects/businessflow-lite.jpg", // TODO: replace with a real dashboard screenshot
    role: "Full-Stack Developer · Solo Project",
    challenge:
      "Small business owners often track inventory and sales across disconnected spreadsheets, with no real-time visibility into revenue or stock levels — and no secure way to keep each owner's data isolated on a shared platform.",
    solution:
      "Built a complete authentication system supporting email/password and social login (Google, GitHub), with every record scoped to its owning business. Core features include full inventory management, multi-item sales recording with automatic stock deduction via atomic database transactions, exportable transaction history, and low-stock alerts — all surfaced through a real-time dashboard with a 30-day revenue trend chart.",
    outcome:
      "Shipped a production-grade full-stack application demonstrating modern engineering practices: Server Actions, Suspense boundaries, and URL-based search and pagination — with a fully responsive UI supporting light and dark mode.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Prisma ORM",
      "PostgreSQL (Neon)",
      "Auth.js v5",
      "Vercel",
    ],
    liveUrl: "https://businessflow-lite.vercel.app/",
    repoUrl: "https://github.com/Lesyuex-denini/businessflow-lite.git",
  },
  {
    id: "solenne",
    title: "Solenne",
    subtitle:
      "A premium frontend and UI/UX showcase featuring immersive storytelling, refined interactions, and modern responsive design.",
    description:
      "A fictional luxury hospitality brand built to showcase advanced frontend craft — cohesive design system, refined motion, and immersive storytelling.",
    image: "/projects/solenne.jpg", // TODO: replace with a real homepage screenshot
    role: "Frontend Developer & UI/UX Designer · Concept Project",
    challenge:
      "Most developer portfolios prove you can build features — far fewer prove you can design and execute a cohesive brand experience end to end. The challenge was creating a fictional luxury brand convincing enough to demonstrate that capability on its own.",
    solution:
      "Designed and built Solenne as a complete digital experience for a fictional coastal hospitality brand: a unified design system, refined motion choreography using Framer Motion and GSAP, smooth-scroll interactions via Lenis, and a reusable component architecture — every page built to reflect a philosophy of quiet luxury and effortless usability.",
    outcome:
      "Demonstrated the ability to transform a brand concept into a polished, immersive, production-quality frontend — a portfolio piece built specifically to showcase visual and interaction design judgment, not just technical implementation.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Shadcn UI",
    ],
    liveUrl: "", // TODO: add your deployed URL
    repoUrl: "", // TODO: add your GitHub repo URL
  },
  {
    id: "wastewise",
    title: "WasteWise",
    subtitle:
      "A modern web platform that promotes sustainable recycling through project awareness, real-time community impact analytics, and seamless access to the WasteWise ecosystem.",
    description:
      "Web companion platform for the WasteWise recycling app, featuring a live Impact Dashboard tracking community participation and environmental impact.",
    image: "/projects/wastewise.jpg", // TODO: replace with a real Impact Dashboard screenshot
    role: "Full-Stack Developer · Web Platform",
    challenge:
      "WasteWise needed a public-facing home that could explain the project's mission and recycling process, direct users to the mobile app, and — critically — make community impact visible and credible to partner outlets and local government units, not just app users.",
    solution:
      "Built the official WasteWise website with an interactive Impact Dashboard that visualizes community recycling participation, EcoQuest gamified activity, material collection trends, and environmental impact through real-time analytics, backed by Firebase/Firestore for live data and Django for core backend services, with Google Maps API integration and Chart.js visualizations.",
    outcome:
      "Increased transparency around the platform's real-world effect, giving communities, partner outlets, and LGUs a clear, data-backed view of recycling impact — strengthening the case for broader participation.",
    stack: [
      "React",
      "Django",
      "Firebase",
      "Firestore",
      "Chart.js",
      "Google Maps API",
      "Tailwind CSS",
    ],
    liveUrl: "https://wastewise-website.onrender.com/",
    repoUrl: "https://github.com/Lesyuex-denini/wastewise-website.git",
  },
];
