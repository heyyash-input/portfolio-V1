/* ============================================================================
   data.js: ALL THE CONTENT OF YOUR PORTFOLIO LIVES HERE
   ----------------------------------------------------------------------------
   To update your site, edit the text in this file, save it, and refresh the
   browser. You never need to touch index.html, style.css or main.js for
   content changes.

   4 RULES SO NOTHING BREAKS
   1. Text goes inside double quotes:            "like this"
   2. Every item in a list ends with a comma:     { ... },   "Java",
   3. Don't delete any { } [ ] brackets.
   4. If you don't have a link, leave it empty:   live: "",
      The button for that link then hides itself.

   If the page shows a red "data.js has an error" bar, you broke rule 1–3.
   Press F12 → Console to see which line.
   ============================================================================ */

const PORTFOLIO = {

  /* ─────────────────────────── 1. BASIC INFO ─────────────────────────── */
  name: "Yash Patil",
  initials: "YP",                                   // shown in the logo box
  greeting: "Hi, I'm Yash, a CSE student in Pune.",
  headline: "Java backend developer building [AI-powered] systems.",   // [words] get the lime highlight
  about: "B.Tech CSE at MIT ADT University. I design REST APIs with Spring Boot and connect them to models, from Gemini-powered insights to LiDAR point-cloud classifiers.",
  location: "Pune, India",
  timezone: "Asia/Kolkata",                          // used for the live clock in Contact
  photo: "assets/photo.jpg",
  lastUpdated: "September 2026",

  /* ── RÉSUMÉ ─────────────────────────────────────────────────────────────
     EASIEST WAY TO UPDATE: drag your new PDF onto  resume/update-resume.bat
     The PDF can have any name, and every Résumé button on the site uses it.

     OR use an online link instead of a file (Google Drive, Dropbox…):
       file: "https://drive.google.com/file/d/XXXX/view",
     Then you only update the file on Drive, and this site never changes.
     (On Drive: Share → "Anyone with the link" → Viewer.)                   */
  resume: {
    file: "resume/resume.pdf",
    downloadName: "Yash_Patil_Resume.pdf",   // the file name recruiters get when they download
  },

  status: {
    available: true,                                 // false = hides the blinking green dot
    title: "Open to work",
    detail: "SDE · Backend · AI roles",
  },

  /* ─────────────────────────── 2. LINKS ─────────────────────────── */
  links: {
    email:    "yashpatil8930@gmail.com",
    github:   "https://github.com/heyyash-input",
    linkedin: "https://www.linkedin.com/in/yash-patil-026aab28b",
    leetcode: "https://leetcode.com/u/input_yash/",
  },

  /* ──────────── GITHUB ACTIVITY (the green contribution graph) ────────────
     Updates by itself from your GitHub profile every time someone visits.
     show: false → hides it.
     Tip: to also count commits to PRIVATE repos, turn on GitHub → your
     profile → Contributions settings → "Private contributions".           */
  githubActivity: {
    show: true,
    username: "heyyash-input",
  },

  /* ─────────────── 3. STAT TILES (keep 3 for the best layout) ───────────────
     highlight: true  → makes that tile lime green                           */
  stats: [
    { label: "LeetCode",  value: "150+",   note: "DSA problems solved" },
    { label: "CGPA",      value: "8.33",   note: "B.Tech CSE · MIT ADT '27" },
    { label: "Hackathon", value: "Top 50", note: "SIH 2025 qualifier", highlight: true },
  ],

  /* ─────────────────────────── 4. PROJECTS ───────────────────────────
     ➕ TO ADD A PROJECT
        1. Copy one whole block, from its {  to its  },
        2. Paste it at the TOP of the list (newest first)
        3. Change the text

     featured: true  → also shown in the big dark tile on the home grid.
                       Only ONE project should be featured.
     category        → creates the filter buttons automatically
                       (e.g. "Backend", "AI / ML", "Web", "Mobile")
     image           → optional screenshot: put the file in assets/projects/
                       and write "assets/projects/your-file.png".
                       Leave "" to get an auto-generated cover.
     metric          → optional headline number, e.g. { value: "88.89%", label: "test accuracy" }
  */
  projects: [
    {
      title: "Tulip",
      subtitle: "Smart Childhood Development Tracker",
      category: ["Backend", "AI / ML"],
      featured: false,
      description: "AI-powered platform that tracks pediatric milestones and uses the Gemini API to generate structured observations and recommendations.",
      points: [
        "Built an AI-powered developmental tracking platform that monitors pediatric milestones and gives structured insights.",
        "Integrated the Google Gemini API to analyze developmental information and return AI-driven recommendations as JSON, using structured prompts.",
        "Designed RESTful APIs and JSON-based data processing for developmental records, milestone tracking and communication between components.",
      ],
      tech: ["Java", "Spring Boot", "Hibernate", "Gemini API", "REST"],
      github: "https://github.com/heyyash-input/Smart-Early-Tracker",
      live: "",
      image: "",
      metric: { value: "", label: "" },
    },
    {
      title: "LiDARNet",
      subtitle: "LiDAR Point Cloud Data Pipeline",
      category: ["AI / ML"],
      featured: true,
      description: "Deep-learning pipeline that classifies LiDAR point clouds with PointMLP, using coordinates, GPS time and reflectance.",
      points: [
        "Developed a PointMLP-based point-cloud classification pipeline over spatial and sensor attributes (coordinates, GPS time, reflectance).",
        "Used feature normalization, stratified splitting, BatchNorm, Dropout, AdamW, learning-rate scheduling and early stopping to improve generalization.",
        "Achieved 88.89% test accuracy on an HPC environment and added Open3D visualization of predicted classes.",
      ],
      tech: ["Python", "PyTorch", "PointMLP", "Open3D"],
      github: "https://github.com/heyyash-input/Data-Cloud-Point",
      live: "",
      image: "",
      metric: { value: "88.89%", label: "test accuracy" },
    },
    {
      title: "E-Khata",
      subtitle: "Console-Based Banking Application",
      category: ["Backend"],
      featured: false,
      description: "Console banking app for account creation, deposits, withdrawals and balance inquiries, backed by MySQL.",
      points: [
        "Built core banking operations: account creation, deposits, withdrawals and balance inquiries.",
        "Implemented CRUD operations, database connectivity, input validation and exception handling with Advanced Java and Spring JDBC.",
        "Designed MySQL persistence for customer, account and transaction data as a base for scalable banking workflows.",
      ],
      tech: ["Java", "Hibernate", "Spring JDBC", "MySQL"],
      github: "",
      live: "",
      image: "",
      metric: { value: "", label: "" },
    },
  ],

  /* ─────────────────────────── 5. EXPERIENCE ───────────────────────────
     Newest first. "summary" is the one-liner shown on the home grid.     */
  experience: [
    {
      role: "Java Developer Intern",
      company: "Prodigy Infotech",
      location: "Pune, India",
      start: "Jul 2025",
      end: "Aug 2025",
      summary: "Built REST APIs, tested with Postman.",
      points: [
        "Designed and built functional RESTful APIs that handle HTTP requests, process backend logic and manage data flow.",
        "Tested APIs with Postman and used Git for version control.",
      ],
      tech: ["Java", "REST APIs", "Postman", "Git"],
    },
  ],

  /* ─────────────────────────── 6. EDUCATION ─────────────────────────── */
  education: [
    { school: "MIT ADT University",   degree: "B.Tech, Computer Science & Engineering", start: "2023", end: "2027", location: "Pune",  grade: "CGPA 8.33" },
  ],

  /* ─────────────────────────── 7. SKILLS ───────────────────────────
     toolkit   → chips shown on the home grid (keep about 10)
     highlight → these skills get lime chips everywhere
     groups    → the Skills section. Add or remove groups freely.        */
  skills: {
    toolkit: ["Java", "Spring Boot", "Hibernate", "REST APIs", "MySQL", "Docker", "PyTorch", "Gemini API", "Git", "Postman"],
    highlight: ["Java", "Spring Boot", "PyTorch"],
    groups: [
      { title: "Backend",          items: ["Java", "Spring Boot", "Spring MVC", "Hibernate", "REST APIs", "Spring JDBC", "SQL / MySQL"] },
      { title: "AI / ML",          items: ["PyTorch", "Machine Learning", "Gemini API", "PointMLP", "Open3D", "Python (basics)"] },
      { title: "DevOps & Cloud",   items: ["Docker & Containers", "Git & GitHub", "CI/CD", "Cloud Computing", "Linux (basics)"] },
      { title: "Core CS & Web",    items: ["Data Structures & Algorithms", "OOP", "Operating Systems", "SDLC", "HTML", "CSS"] },
      { title: "Tools",            items: ["VS Code", "Postman", "Jupyter Notebook", "Eclipse IDE", "Figma"] },
      { title: "Soft skills",      items: ["Communication", "Problem Solving", "Analytical Thinking", "Team Collaboration", "Time Management"] },
    ],
  },

  /* ─────────────────────────── 8. ACHIEVEMENTS ─────────────────────────── */
  achievements: [
    { title: "Smart India Hackathon Qualifier", value: "Top 50", date: "2025", text: "Qualified in the top 50 candidates institute-wide for SIH 2025, competing across all engineering branches.", link: "" },
    { title: "LeetCode Problems Solved",        value: "150+",   date: "Ongoing", text: "Solved 150+ problems across data structures and algorithms, strengthening algorithmic thinking.", link: "https://leetcode.com/u/input_yash/" },
  ],

  /* ─────────────────────────── 9. CERTIFICATES ─────────────────────────── */
  certificates: [
    { title: "Advanced Java",                                  issuer: "LearnQuest · Coursera",            link: "https://www.coursera.org/account/accomplishments/verify/H07LCBPKSA21" },
    { title: "Database Structures and Management with MySQL",  issuer: "Meta · Coursera",                  link: "https://www.coursera.org/account/accomplishments/verify/FRD3YPMRXH2F" },
    { title: "Introduction to Big Data with Spark and Hadoop", issuer: "IBM · Coursera",                   link: "https://www.coursera.org/account/accomplishments/verify/8DRXJ9T8K44O" },
    { title: "Machine Learning",                               issuer: "Johns Hopkins University · Coursera", link: "https://www.coursera.org/account/accomplishments/verify/714EAUASZTHM" },
  ],

  /* ─────────────────────────── 10. CONTACT ─────────────────────────── */
  contact: {
    title: "Let's build something [together].",
    text: "I'm open to SDE, backend and AI roles and internships. Email is the fastest way to reach me, and I usually reply within a day.",
  },
};
