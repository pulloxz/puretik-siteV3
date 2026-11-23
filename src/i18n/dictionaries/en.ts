import type { Dictionary } from "./ar";

export const en: Dictionary = {
  meta: {
    title: "PureTik | Technology that keeps pace with your ambition",
    description:
      "PureTik is an Iraqi software company building web and mobile apps, cybersecurity and data analytics.",
  },
  nav: {
    services: "Services",
    process: "How we work",
    projects: "Our work",
    contact: "Contact",
    cta: "Start your project",
    langLabel: "عربي",
    menu: "Menu",
  },
  hero: {
    titleLead: "Technology that keeps pace with",
    titleAccent: "your ambition",
    subtitle: "We design and build websites, apps and systems for your business.",
    rotatingPrefix: "We build",
    rotatingWords: ["websites", "mobile apps", "custom systems", "online stores"],
    ctaPrimary: "Talk to us",
    ctaSecondary: "See our work",
  },
  stats: {
    items: [
      { key: "apps", label: "Apps on the App Store and Google Play" },
      { key: "platforms", label: "Digital platforms live in Iraq" },
      { key: "since", label: "Building digital products since" },
    ],
  },
  services: {
    eyebrow: "Our services",
    title: "Software solutions designed for your business",
    subtitle:
      "Our skilled team takes the time to understand your business needs in detail, then designs custom software solutions that precisely meet your requirements.",
    items: [
      {
        key: "web",
        title: "Web development",
        description:
          "Building websites and web applications for the internet or intranet, with modern interactive design.",
      },
      {
        key: "mobile",
        title: "Mobile app development",
        description:
          "Creating and delivering apps designed for mobile devices, on a single platform or across several.",
      },
      {
        key: "security",
        title: "Cybersecurity",
        description:
          "Protecting computer systems, networks and data from theft, damage or unauthorized access.",
      },
      {
        key: "data",
        title: "Data analytics",
        description:
          "Examining and interpreting large datasets to extract results and draw conclusions.",
      },
      {
        key: "software",
        title: "Software development",
        description:
          "Custom systems and software that fit your unique needs and grow with you.",
      },
    ],
  },
  terminal: {
    eyebrow: "How we build",
    title: "From the first line",
    steps: [
      "Understanding your needs",
      "Designing the interface",
      "Building and testing",
      "Launching online",
    ],
    ready: "Ready in 4.8s",
    live: "Live now",
  },
  process: {
    eyebrow: "How we work",
    title: "From idea to launch",
    subtitle:
      "We start by understanding your business through deep, collaborative discussions, so our solutions are technically strong and aligned with your strategic goals.",
    steps: [
      {
        title: "We understand your business",
        description:
          "We discuss your goals, challenges and ambitions in depth before writing a single line.",
      },
      {
        title: "We design the solution",
        description:
          "Interfaces that are easy on the eye and easy to use, built around the user experience.",
      },
      {
        title: "We build and test",
        description:
          "High-quality, reliable development with continuous testing at every stage.",
      },
      {
        title: "We launch and support",
        description:
          "We launch your project and stay with you through support and updates afterwards.",
      },
    ],
  },
  projects: {
    eyebrow: "Our work",
    title: "Real products people use today",
    subtitle: "Three systems we built that are live in the Iraqi market.",
    visit: "Visit site",
    getItOn: "Get the app on",
    items: [
      {
        slug: "drlab",
        name: "Dr.Lab",
        category: "Medical laboratory management",
        summary:
          "A complete lab management system: barcode generation, PDF result printing, patient visit history, and one-click result sending over WhatsApp.",
      },
      {
        slug: "karadastore",
        name: "Karada Store",
        category: "E-commerce store",
        summary:
          "An online store for devices and electronics with categories, brands, offers and discounts, and a smooth shopping and delivery experience.",
      },
      {
        slug: "puretik-store",
        name: "PureTik Store",
        category: "E-commerce platform",
        summary:
          "A platform that gives Iraqi brands their own online store and app: delivery to 18 governorates, cash on delivery, and Meta Pixel integration.",
      },
    ],
  },
  apps: {
    eyebrow: "Our apps",
    title: "Our apps on the stores",
    items: [
      {
        slug: "karadastore",
        name: "Karada Store",
        description: "Shop electronics easily, with fast delivery across Iraq.",
      },
      {
        slug: "baitalnono",
        name: "Bait Al-Nono",
        description: "Everything a child needs.",
      },
      {
        slug: "platinum",
        name: "Platinum Store",
        description: "High-quality products at competitive prices.",
      },
      {
        slug: "drnote",
        name: "Dr Note",
        description: "Everything you need in one app to manage your medical practice with ease.",
      },
      {
        slug: "litecashier",
        name: "Lite Cashier",
        description:
          "A simple, fast app for small shops to create invoices and print thermal receipts with ease.",
      },
      {
        slug: "alsafigroup",
        name: "Al-Safi Group",
        description:
          "Earn loyalty points when you buy from authorized dealers, level up, then redeem your points for rewards.",
      },
      {
        slug: "otie",
        name: "Otie",
        description: "Laundry and ironing, picked up from and delivered to your home.",
      },
      {
        slug: "otiedriver",
        name: "Otie Driver",
        description: "The driver app for Otie: pick up and deliver clean, pressed clothes.",
      },
      {
        slug: "fazaa",
        name: "Fazaa Maintenance",
        description:
          "Every maintenance request tracked step by step, connecting site owners, management and technicians in one place.",
      },
      {
        slug: "abualwahsh",
        name: "Abu Al-Wahsh Driver",
        description:
          "For approved delivery drivers: receive orders, navigate to pickup and drop-off, and update the status in one tap.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "Let's work together!",
    subtitle:
      "Ready to take the next step toward your digital goals? We're here to help. Get in touch and let's start the conversation that could turn your ideas into reality.",
    formTitle: "Get a free consultation",
    addressLabel: "Address",
    address: "Karada - Al-Sinaa Street - Al-Masar Mall - Office 42",
    phoneLabel: "Call us any time",
    emailLabel: "Send an email",
    requiredNote: "Fields marked * are required",
    form: {
      firstName: "First name",
      lastName: "Last name",
      company: "Company / organization",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send",
      success: "Thank you! We received your message and will be in touch soon.",
    },
    errors: {
      required: "This field is required",
      invalidEmail: "Enter a valid email address",
      invalidPhone: "Enter a valid phone number",
    },
  },
  footer: {
    tagline: "Creative IT & Software Solutions",
    servicesTitle: "Services",
    companyTitle: "Company",
    rights: "© 2026 PureTik. All rights reserved.",
  },
};
