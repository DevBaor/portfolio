import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  User,
  FolderKanban,
  Settings,
  Code,
  Sun,
  Moon,
  ArrowRight,
  ArrowDown,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  X,
  Menu as MenuIcon,
  FileText,
  Folder,
  Send,
  Terminal,
  ExternalLink,
  Facebook,
  Copy,
  Check,
  Sparkles,
  MessageSquareMore,
  Briefcase
} from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const HERO_WORDS = ["HI, I'M", "HELLO, I'M", "DUY BẢO • DEVBAOR"];

// --- ANIMATED TYPEWRITER COMPONENT ---
function Typewriter({ words = ["HI, I'M", "HELLO, I'M", "DUY BẢO • DEVBAOR"], delay = 100, pause = 2000 }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx];
    let timer;

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, isDeleting ? delay / 2 : delay);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx, words, delay, pause]);

  return (
    <div className="hero-greeting-line">
      <span className="typewriter-text">{text}</span>
      <span className="blink-cursor" />
    </div>
  );
}

// --- ANIMATED CYBER CANVAS HOLOGRAM COMPONENT ---
function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    const width = 360;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const cols = 18;
    const drops = Array(cols).fill(0);

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Dark glowing background with pulsing effect
      const bgPulse = Math.sin(frame * 0.02) * 0.1 + 0.9;
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20 * bgPulse,
        width / 2,
        height / 2,
        180
      );
      bgGrad.addColorStop(0, "#0c1d35");
      bgGrad.addColorStop(0.55, "#06101d");
      bgGrad.addColorStop(1, "#020509");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Enhanced Matrix rain with varying speeds and characters
      ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
      ctx.font = "10px JetBrains Mono, monospace";
      for (let i = 0; i < cols; i++) {
        // More varied characters
        const charSet = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const char = charSet[Math.floor(Math.random() * charSet.length)];
        const x = i * 20 + 10;
        // Varying drop speeds
        const speed = 0.5 + Math.sin(i * 0.5) * 0.5;
        drops[i] += speed;
        const y = drops[i] * 16;
        ctx.fillText(char, x, y);
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      // 3. Enhanced cyber silhouette with more complex animations
      const floatY = Math.sin(frame * 0.04) * 6 + Math.sin(frame * 0.07) * 3;
      const scale = 1 + Math.sin(frame * 0.03) * 0.05;
      const isGlitch = Math.random() > 0.9;
      const glitchOffset = isGlitch ? (Math.random() - 0.5) * 20 : 0;
      const glitchIntensity = Math.random() > 0.95 ? 2 : 1;

      const drawSilhouette = (offsetX, fillColor, alpha) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = fillColor;
        ctx.translate(width / 2 + offsetX, height / 2 + 30 + floatY);
        ctx.scale(scale, scale);

        ctx.beginPath();
        // Head / Hood with antenna
        ctx.arc(0, -60, 42, Math.PI, 0, false);
        ctx.moveTo(-15, -102);
        ctx.lineTo(-20, -115);
        ctx.moveTo(15, -102);
        ctx.lineTo(20, -115);
        // Shoulders & Chest with more detail
        ctx.bezierCurveTo(45, -30, 95, 20, 110, 110);
        ctx.lineTo(-110, 110);
        ctx.bezierCurveTo(-95, 20, -45, -30, 0, -60);
        ctx.closePath();
        ctx.fill();

        // Visor slit with glow
        ctx.fillStyle = "#00f0ff";
        ctx.fillRect(-28, -64, 56, 7);
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;

        ctx.restore();
      };

      // Chromatic aberration with multiple offsets
      if (isGlitch) {
        for (let i = 0; i < glitchIntensity; i++) {
          const offset = (Math.random() - 0.5) * 30;
          drawSilhouette(offset - 6, "rgba(255, 50, 100, 0.5)", 0.6);
          drawSilhouette(offset + 6, "rgba(50, 255, 255, 0.6)", 0.7);
        }
      }

      // Main silhouette body with animated gradient
      const figureGrad = ctx.createLinearGradient(0, 50, 0, 320);
      figureGrad.addColorStop(0, "#00e5ff");
      figureGrad.addColorStop(0.3, "#00bcd4");
      figureGrad.addColorStop(0.6, "#0077cc");
      figureGrad.addColorStop(1, "#03172e");
      drawSilhouette(0, figureGrad, 0.95);

      // 4. More frequent and varied glitch effects
      if (Math.random() > 0.98) {
        const sliceY = Math.floor(Math.random() * (height - 20));
        const sliceH = Math.floor(Math.random() * 30) + 5;
        const sliceData = ctx.getImageData(0, sliceY, width, sliceH);
        const sliceOffset = (Math.random() - 0.5) * 40;
        ctx.putImageData(sliceData, sliceOffset, sliceY);

        // Color shift glitch
        ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
        ctx.fillRect(0, sliceY, width, sliceH);
      }

      // 5. Enhanced target crosshairs with pulsing rings
      ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
      ctx.lineWidth = 1;
      const pulseRadius = 70 + Math.sin(frame * 0.05) * 5;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Additional concentric rings
      for (let i = 1; i <= 3; i++) {
        const ringRadius = 50 + i * 15 + Math.sin(frame * 0.03 + i) * 3;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (4 - i)})`;
        ctx.stroke();
      }

      // Horizontal and vertical scan lines
      ctx.beginPath();
      ctx.moveTo(20, height / 2);
      ctx.lineTo(width - 20, height / 2);
      ctx.moveTo(width / 2, 20);
      ctx.lineTo(width / 2, height - 20);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.2)";
      ctx.stroke();

      // 6. Floating particles
      ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
      for (let i = 0; i < 8; i++) {
        const angle = frame * 0.01 + i * Math.PI * 0.25;
        const radius = 100 + Math.sin(frame * 0.02 + i) * 20;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="cyber-canvas-element" />;
}

// --- USER PROFILE CONSTANTS ---
const USER_INFO = {
  name: "Bảo Trần Duy",
  displayName: "DUY BẢO",
  handle: "DevBaor",
  brandName: "CODE BY DUYBAO",
  githubUrl: "https://github.com/DevBaor",
  linkedinUrl: "https://www.linkedin.com/in/duybaot105/",
  facebookUrl: "https://www.facebook.com/duybao105",
  email: "baotranduy666666@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/114490996?v=4",
  location: "Ho Chi Minh City, Vietnam",
  coordinates: "10.8231° N, 106.6297° E",
  timezone: "UTC+7 (Indochina Time)",
  publicRepos: 19
};

// --- AUTHENTIC PROJECTS OF DUY BAO ---
const PROJECTS = [
  {
    id: "graduation-thesis",
    title: "Smart Boarding House",
    subtitle: "Graduation Thesis — Reinforcement Learning-Driven Room Allocation (Dueling DQN)",
    category: "GRADUATION THESIS",
    repoUrl: "https://github.com/DevBaor/Graduation-Thesis",
    image: "/thesis_preview.jpg",
    stack: ["Laravel (PHP)", "Python", "PyTorch (DQN)", "Flutter", "MySQL", "VietQR"],
    desc: "Comprehensive intelligent boarding house management platform integrating Deep Reinforcement Learning (Dueling DQN) to automatically optimize tenant room allocation based on multi-variable preferences and budget constraints.",
    features: [
      "AI-Driven Room Allocation: Optimizes tenant-to-room matching using custom Dueling Deep Q-Networks based on multi-variable criteria",
      "Cross-Platform Ecosystem: Fullstack Laravel 9+ Web Administration portal paired with Flutter mobile clients for landlords and tenants",
      "Automated Payment Gateway: Integrated VietQR webhooks for real-time payment reconciliation and instant room activation",
      "Complete Lifecycle Management: Digital contracts, utility meter calculation, automated periodic billing, and instant push alerts"
    ],
    mockupType: "thesis"
  },
  {
    id: "baotools",
    title: "BaoTools",
    subtitle: "Windows Desktop Client for Steam Manifest & Configuration Management",
    category: "DESKTOP APPLICATION",
    repoUrl: "https://github.com/DevBaor/BaoTools_1005",
    image: "/baotools_preview.png",
    stack: [".NET 8", "C#", "WPF", "Velopack", "Lua API"],
    desc: "Professional Windows desktop client engineered with .NET 8 WPF for managing Steam manifests and Lua configurations, featuring automated depot mounting, Lua plugin editing, Steam store companion integration, auto-updates, and 29 localized languages.",
    features: [
      "Modern Desktop Architecture: Built with WPF on .NET 8 with high-performance memory management and responsive async processing",
      "Steam Manifest Management: Browse, verify, and mount depot manifests with automated Lua stplug-in configuration editing",
      "Auto-Update Pipeline: Seamless delta updates and background package distribution powered by Velopack",
      "Global Localization: Complete multilingual support across 29 languages with active global user base"
    ],
    mockupType: "baotools"
  },
  {
    id: "expense-app",
    title: "Expense Management App",
    subtitle: "Cross-Platform Smart Personal Finance Tracker with Cloud Sync",
    category: "MOBILE APPLICATION",
    repoUrl: "https://github.com/DevBaor/Expense-Management-App",
    image: "/expense_preview.jpg",
    stack: ["Flutter", "Dart", "Firebase", "Python", "REST API"],
    desc: "Cross-platform personal finance and expense tracking application (Android & iOS) featuring real-time data sync, interactive visual analytics, AI category recommendations, and proactive budget threshold management.",
    features: [
      "Smooth 60FPS Mobile UI: Fluid Flutter user experience with adaptive cyberpunk theme and micro-interactions",
      "Real-Time Cloud Synchronization: Instant cloud sync across devices using Firebase Firestore and secure authentication",
      "Visual Analytics & Breakdown: Dynamic weekly and monthly spending charts with intelligent financial health indicators",
      "Smart Budgeting & Alerts: Custom category threshold limits with proactive warning notifications when limits are approached"
    ],
    mockupType: "expense"
  }
];

// --- SERVICES DATA (TAILORED TO DUY BAO'S SOFTWARE ENGINEERING EXPERTISE) ---
const SERVICES = [
  {
    id: "04",
    num: "04",
    category: "APPLIED AI & ALGORITHMS",
    title: "Applied AI & Optimization",
    desc: "Intelligent decision algorithms and deep reinforcement learning (Dueling DQN) to solve complex multi-variable resource allocation problems.",
    theme: "gold",
    hasBox: false,
    deliverables: [
      "Custom Deep Reinforcement Learning modeling (Dueling DQN) with PyTorch",
      "Multi-constraint resource, room, and scheduling optimization algorithms",
      "Heuristic algorithms for rapid near-optimal solution convergence",
      "Python microservices & REST APIs for serving intelligent model inference",
      "Simulation, performance benchmarking, and training reward convergence analysis"
    ]
  },
  {
    id: "01",
    num: "01",
    category: "BACKEND & API ARCHITECTURE",
    title: "Backend & Web Systems",
    desc: "Robust, high-performance server architectures, RESTful APIs, and relational databases built with PHP/Laravel and .NET.",
    theme: "cyan",
    hasBox: true,
    deliverables: [
      "High-throughput RESTful API engineering with input validation and rate limiting",
      "Relational database modeling & optimization (MySQL, SQL Server, PostgreSQL)",
      "Secure authentication flows (JWT, OAuth2, and session-based authentication)",
      "Payment gateway & webhook integration (real-time VietQR reconciliation)",
      "Modular MVC architecture and clean domain-driven backend logic"
    ]
  },
  {
    id: "02",
    num: "02",
    category: "DESKTOP & SYSTEM ENGINEERING",
    title: "Windows Desktop Applications",
    desc: "High-performance, modern native Windows desktop clients engineered with .NET 8, C#, and WPF with responsive asynchronous processing.",
    theme: "cyan",
    hasBox: true,
    deliverables: [
      "Modern Windows desktop user interface crafted with WPF and XAML",
      "Asynchronous multithreaded processing with low memory footprint",
      "Automated delta background updates & package distribution via Velopack",
      "Process management, depot file verification, and Lua configuration scripting",
      "Multilingual software localization architecture (29+ languages)"
    ]
  },
  {
    id: "03",
    num: "03",
    category: "MOBILE ARCHITECTURE",
    title: "Cross-Platform Mobile Apps",
    desc: "Fluid, native-speed cross-platform mobile apps (Android & iOS) built with Flutter and Dart, backed by real-time cloud data sync.",
    theme: "gold",
    hasBox: false,
    deliverables: [
      "Smooth 60FPS responsive UI with adaptive dark mode and micro-interactions",
      "Real-time cloud database synchronization & user authentication with Firebase",
      "Interactive data analytics, weekly spending charts, and telemetry indicators",
      "Proactive push notifications, offline data caching, and secure local storage",
      "Clean architectural separation using Bloc/Provider state management"
    ]
  }
];

// --- AUTHENTIC TECH STACK OF DUY BAO (100% OFFICIAL DEVICONS & SIMPLE ICONS) ---
const SKILLS_CATEGORIES = {
  languages: {
    label: "Languages",
    count: 7,
    items: [
      {
        name: "C#",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
            <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
            <path fill="#ffffff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z" />
          </svg>
        )
      },
      {
        name: "PHP",
        icon: (
          <svg viewBox="0 0 32 32">
            <ellipse cx="16" cy="16" rx="15" ry="10" fill="#777BB4" />
            <path fill="#ffffff" d="M6 13h2.8c1.5 0 2.4.6 2.4 1.7 0 1.3-1.1 2-2.6 2H7.2l-.7 3.3H5.1L6 13zm2.4 2.3h.8c.7 0 1.1-.3 1.1-.7 0-.4-.4-.6-1-.6H8.2l-.2 1.3zm5.6-2.3h1.4l-.7 3.2h2.2l.7-3.2h1.4l-1.8 8h-1.4l.8-3.4h-2.2l-.8 3.4H14l1.8-8zm7.5 0h2.8c1.5 0 2.4.6 2.4 1.7 0 1.3-1.1 2-2.6 2h-1.4l-.7 3.3h-1.4l1.6-7zm2.4 2.3h.8c.7 0 1.1-.3 1.1-.7 0-.4-.4-.6-1-.6h-1.1l-.2 1.3z" />
          </svg>
        )
      },
      {
        name: "Python",
        icon: (
          <svg viewBox="0 0 32 32">
            <path fill="#3776AB" d="M15.8 4c-5.2 0-4.9 2.3-4.9 2.3l.1 2.4h5v.7h-7s-3.3.4-3.3 5c0 4.6 2.9 4.4 2.9 4.4h1.7v-2.4s-.1-2.9 2.8-2.9h4.9s2.7.1 2.7-2.6V6.7S21.2 4 15.8 4zm-2.7 1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            <path fill="#FFD43B" d="M16.2 28c5.2 0 4.9-2.3 4.9-2.3l-.1-2.4h-5v-.7h7s3.3-.4 3.3-5c0-4.6-2.9-4.4-2.9-4.4h-1.7v2.4s.1 2.9-2.8 2.9h-4.9s-2.7-.1-2.7 2.6v4.2s-.5 2.7 4.9 2.7zm2.7-1.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        )
      },
      {
        name: "Dart",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#00c4b3" d="M35.2 34.9l-8.3-8.3v59.7l.1 2.8c0 1.3.2 2.8.7 4.3l65.6 23.1 16.3-7.2-74.4-74.4z" />
            <path fill="#22d3c5" d="M109.6 109.3l-16.3 7.2-65.4-23.1c1.3 4.8 4 10.1 7 13.2l21.3 21.2 47.6.1 5.8-18.6z" />
            <path fill="#0075c9" d="M1.7 65.1C-.4 67.3.7 72 4 75.5l14.7 14.8 9.2 3.3c-.3-1.5-.7-3-.7-4.3l-.1-2.8-.2-59.8m82.7 82.6l7.2-16.4-23-65.6c-1.5-.3-3-.6-4.3-.7l-2.9-.1-59.6.1" />
            <path fill="#00a8e1" d="M109.6 109.3l17.7-5.8V54.8l-20.4-20.5c-3-3-8.3-5.8-13.2-7l23.1 65.6" />
            <path fill="#00c4b3" d="M90.5 18.2L75.7 3.5c-3.4-3.4-8-4.4-10.4-2.3L26.9 26.6h59.5l2.9.1c1.3 0 2.8.2 4.3.7l-3.1-9.2z" />
          </svg>
        )
      },
      {
        name: "C / C++",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#00599c" d="M118.766 95.82c.89-1.543 1.441-3.28 1.441-4.843V36.78c0-1.558-.55-3.297-1.441-4.84l-55.32 31.94Zm0 0" />
            <path fill="#004482" d="m68.36 126.586 46.933-27.094c1.352-.781 2.582-2.129 3.473-3.672l-55.32-31.94L8.12 95.82c.89 1.543 2.121 2.89 3.473 3.672l46.933 27.094c2.703 1.562 7.13 1.562 9.832 0Zm0 0" />
            <path fill="#659ad2" d="M118.766 31.941c-.891-1.546-2.121-2.894-3.473-3.671L68.359 1.172c-2.703-1.563-7.129-1.563-9.832 0L11.594 28.27C8.89 29.828 6.68 33.66 6.68 36.78v54.196c0 1.562.55 3.3 1.441 4.843L63.445 63.88Zm0 0" />
            <path fill="#ffffff" d="M63.445 26.035c-20.867 0-37.843 16.977-37.843 37.844s16.976 37.844 37.843 37.844c13.465 0 26.024-7.247 32.77-18.91L79.84 73.335c-3.38 5.84-9.66 9.465-16.395 9.465-10.433 0-18.922-8.488-18.922-18.922 0-10.434 8.49-18.922 18.922-18.922 6.73 0 13.017 3.629 16.39 9.465l16.38-9.477c-6.75-11.664-19.305-18.91-32.77-18.91zM92.88 57.57v4.207h-4.207v4.203h4.207v4.207h4.203V65.98h4.203v-4.203h-4.203V57.57H92.88zm15.766 0v4.207h-4.204v4.203h4.204v4.207h4.207V65.98h4.203v-4.203h-4.203V57.57h-4.207z" />
          </svg>
        )
      },
      {
        name: "JavaScript",
        icon: (
          <svg viewBox="0 0 100 100">
            <rect width="100" height="100" rx="16" fill="#F7DF1E" />
            <text
              x="50"
              y="53"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#000000"
              fontFamily="'JetBrains Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="46"
              letterSpacing="0.5"
            >
              JS
            </text>
          </svg>
        )
      },
      {
        name: "TypeScript",
        icon: (
          <svg viewBox="0 0 100 100">
            <rect width="100" height="100" rx="16" fill="#3178C6" />
            <text
              x="50"
              y="53"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontFamily="'JetBrains Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="46"
              letterSpacing="0.5"
            >
              TS
            </text>
          </svg>
        )
      }
    ]
  },
  frameworks: {
    label: "Frameworks & Tech",
    count: 6,
    items: [
      {
        name: ".NET 8 / WPF",
        icon: (
          <svg viewBox="0 0 128 128">
            <g fill="#623697">
              <path d="M61.195 0h4.953c12.918.535 25.688 4.89 36.043 12.676 9.809 7.289 17.473 17.437 21.727 28.906 2.441 6.387 3.664 13.18 4.082 19.992v4.211c-.414 11.293-3.664 22.52-9.73 32.082-6.801 10.895-16.922 19.73-28.727 24.828A64.399 64.399 0 0165.082 128h-2.144c-11.735-.191-23.41-3.66-33.297-9.992-11.196-7.113-20.114-17.785-25.028-30.117C1.891 81.19.441 74.02 0 66.812v-4.957c.504-14.39 5.953-28.609 15.41-39.496C23.168 13.31 33.5 6.48 44.887 2.937 50.172 1.27 55.676.41 61.195 0M25.191 37.523c-.03 12.153-.011 24.305-.011 36.454 1.43.011 2.86.011 4.293.011-.075-10.433.101-20.863-.106-31.293.48.907.918 1.84 1.465 2.707C37.035 54.91 43.105 64.5 49.309 74c1.738-.023 3.476-.023 5.214.004-.003-12.16-.007-24.32.004-36.48a308.076 308.076 0 00-4.25-.012c.075 10.32-.136 20.64.125 30.949-6.507-10.352-13.101-20.645-19.695-30.945a370.85 370.85 0 00-5.516.007m38.844-.011c-.129 12.16-.004 24.32-.047 36.476 6.469-.015 12.938.024 19.41-.02a83.36 83.36 0 01.024-3.952c-5.012-.016-10.027.007-15.043-.02-.074-4.21-.004-8.426-.04-12.637 4.395-.078 8.79.012 13.18-.047-.011-1.277-.011-2.554-.019-3.832-4.387.141-8.773-.054-13.164.012.012-4.023.02-8.05.02-12.078 4.699 0 9.398-.02 14.093.012-.008-1.301 0-2.606.016-3.906-6.145-.016-12.29-.008-18.43-.008m22.602.054c.004 1.266.004 2.528.008 3.79 3.488-.04 6.972.109 10.46.035-.023 10.863.004 21.718-.011 32.574 1.46.043 2.93.035 4.39-.09-.12-5.992.118-11.988-.156-17.977.067-2.699-.07-5.394.117-8.09.106-2.14-.277-4.277-.035-6.417 3.516.047 7.035.015 10.55.015a59.774 59.774 0 01.075-3.832c-8.469-.105-16.937-.094-25.398-.008M13.55 69.094c-1.977.91-2.106 4.023-.149 5.027 1.72 1.18 4.305-.371 4.227-2.41.133-2.004-2.29-3.688-4.078-2.617" />
            </g>
          </svg>
        )
      },
      {
        name: "Laravel",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#f0513f" d="M27.271.11c-.2.078-5.82 3.28-12.487 7.112-8.078 4.644-12.227 7.09-12.449 7.32-.19.225-.34.482-.438.76-.167.564-.179 82.985-.01 83.578.061.23.26.568.44.754.436.46 48.664 28.19 49.25 28.324.272.065.577.054.88-.03.658-.165 48.76-27.834 49.188-28.286.175-.195.375-.532.44-.761.084-.273.115-4.58.115-13.655v-13.26l11.726-6.735c11.056-6.357 11.733-6.755 12.017-7.191l.29-.47V43.287c0-15.548.03-14.673-.585-15.235-.165-.146-5.798-3.433-12.53-7.31L100.89 13.71h-1.359l-11.963 6.87c-6.586 3.788-12.184 7.027-12.457 7.203-.272.18-.597.512-.73.753l-.242.417-.054 13.455-.048 13.46-9.879 5.69c-5.434 3.124-9.957 5.71-10.053 5.734-.175.049-.187-1.232-.187-25.966V15.293l-.26-.447c-.326-.545 1.136.324-13.544-8.114C27.803-.348 28.098-.2 27.27.11zm11.317 10.307c5.15 2.955 9.364 5.4 9.364 5.43 0 .031-4.516 2.641-10.035 5.813l-10.041 5.765-10.023-5.764c-5.507-3.173-10.02-5.783-10.02-5.814 0-.03 4.505-2.64 10.013-5.805l9.999-5.752.69.376c3.357 1.907 6.708 3.824 10.053 5.751zm71.668 13.261c5.422 3.122 9.908 5.702 9.95 5.744.114.103-19.774 11.535-20.046 11.523-.272-.008-19.915-11.335-19.907-11.473.01-.157 19.773-11.527 19.973-11.496.091.022 4.607 2.59 10.03 5.702zM16.3 25.328l9.558 5.503.055 27.247.05 27.252.233.368c.122.194.352.459.52.581.158.115 5.477 3.146 11.818 6.724l11.52 6.506v11.527c0 6.326-.043 11.516-.097 11.516-.041 0-10-5.699-22.124-12.676L5.793 97.201l-.03-38.966-.019-38.954.49.271c.283.15 4.807 2.748 10.065 5.775zm33.754 19.18v25.109l-.387.253c-.525.332-19.667 11.335-19.732 11.335-.03 0-.054-11.336-.054-25.193l.012-25.182 10-5.752c5.499-3.165 10.034-5.733 10.088-5.714.039.024.073 11.34.073 25.144zm38.15-5.775 10.023 5.763V55.92c0 10.838-.011 11.42-.176 11.357-.107-.041-4.642-2.64-10.083-5.774l-9.91-5.69v-11.42c0-6.287.032-11.424.062-11.424.043 0 4.577 2.592 10.084 5.764zm34.164 5.587c0 6.254-.042 11.412-.084 11.462-.072.115-19.896 11.538-20.022 11.538-.031 0-.062-5.135-.062-11.423v-11.42l10-5.756c5.507-3.16 10.042-5.752 10.084-5.752.053 0 .084 5.105.084 11.351zM95.993 70.933 52.005 96.04 32.056 84.693S76 59.277 76.176 59.343zm2.215 14.827-.034 11.442-22.028 12.676c-12.12 6.976-22.082 12.675-22.132 12.675-.053 0-.095-4.658-.095-11.516V99.51l22.08-12.592c12.132-6.923 22.101-12.59 22.154-12.602.043 0 .062 5.148.054 11.443z" />
          </svg>
        )
      },
      {
        name: "Flutter",
        icon: (
          <svg viewBox="0 0 128 128">
            <g fill="#3FB6D3">
              <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z" />
            </g>
            <path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />
            <path fill="#19599A" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z" />
          </svg>
        )
      },
      {
        name: "PyTorch (AI)",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#EE4C2C" d="M100.1 38.3l-9.2 9.2c15.1 15.1 15.1 39.4 0 54.3-15.1 15.1-39.4 15.1-54.3 0-15.1-15.1-15.1-39.4 0-54.3l24-24 3.4-3.4V2L27.8 38.2C7.7 58.3 7.7 90.8 27.8 111s52.6 20.1 72.4 0c20.1-20.2 20.1-52.5-.1-72.7z" />
            <circle fill="#EE4C2C" cx="82.1" cy="29.4" r="6.7" />
          </svg>
        )
      },
      {
        name: "React.js",
        icon: (
          <svg viewBox="0 0 128 128">
            <g fill="#00D8FF">
              <circle cx="64" cy="64" r="11.4" />
              <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
            </g>
          </svg>
        )
      },
      {
        name: "ASP.NET Core",
        icon: (
          <svg viewBox="0 0 128 128">
            <rect width="128" height="128" rx="20" fill="#512BD4" />
            <path fill="#ffffff" d="M64 16c26.5 0 48 21.5 48 48s-21.5 48-48 48S16 90.5 16 64s21.5-48 48-48zm-19.5 28c-.02 8.5-.01 17-.01 25.5 1.2 0 2.4.01 3.6.01 0-7.3.08-14.6-.08-21.9.34.64.65 1.3 1.03 1.9 4.14 7.2 8.4 13.9 12.75 20.6 1.22-.02 2.44-.02 3.66.01 0-8.5 0-17 .01-25.5-1.2 0-2.4 0-3.6-.01.05 7.2-.09 14.4.09 21.6-4.56-7.2-9.17-14.4-13.78-21.6-1.22-.01-2.45-.01-3.67 0zm27.2 0c-.1 8.5 0 17-.03 25.5 4.53-.01 9.06.02 13.59-.02 0-.92 0-1.84.02-2.76-3.51-.01-7.02 0-10.53-.02-.05-2.95 0-5.9-.03-8.84 3.08-.06 6.15.01 9.23-.04 0-.9 0-1.79-.01-2.68-3.07.1-6.14-.04-9.21.01 0-2.82.01-5.63.01-8.45 3.29 0 6.58-.02 9.87.01 0-.91 0-1.82.01-2.73-4.3-.01-8.6 0-12.92 0zm15.8.04c0 .88 0 1.77.01 2.65 2.44-.03 4.88.08 7.32.03 0 7.6.01 15.2-.01 22.8 1.02.03 2.05.02 3.07-.06-.08-4.2.08-8.4-.1-12.6.05-1.89-.05-3.77.08-5.66.07-1.5-.19-3-.03-4.5 2.46.03 4.93.01 7.39.01 0-.91 0-1.81.05-2.68-5.93-.07-11.85-.07-17.78 0z" />
          </svg>
        )
      }
    ]
  },
  databases: {
    label: "Databases",
    count: 4,
    items: [
      {
        name: "MySQL",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#00618A" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957z" />
          </svg>
        )
      },
      {
        name: "SQL Server",
        icon: (
          <svg viewBox="0 0 128 128">
            <rect width="128" height="128" rx="16" fill="#CC292B" />
            <ellipse cx="64" cy="38" rx="42" ry="15" fill="#ffffff" />
            <path fill="#ffffff" d="M22 38v24c0 8.3 18.8 15 42 15s42-6.7 42-15V38c0 8.3-18.8 15-42 15S22 46.3 22 38z" />
            <path fill="#ffffff" d="M22 66v24c0 8.3 18.8 15 42 15s42-6.7 42-15V66c0 8.3-18.8 15-42 15S22 74.3 22 66z" />
          </svg>
        )
      },
      {
        name: "Firebase",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#ffa000" d="M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z" />
            <path fill="#f57c00" d="M71.903 64.005 54.955 31.913l-37.481 71.363Z" />
            <path fill="#ffca28" d="M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z" />
          </svg>
        )
      },
      {
        name: "MongoDB",
        icon: (
          <svg viewBox="0 0 24 24">
            <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
          </svg>
        )
      }
    ]
  },
  embedded: {
    label: "IoT & Systems",
    count: 4,
    items: [
      {
        name: "ESP32-C3",
        icon: (
          <svg viewBox="0 0 24 24">
            <path fill="#E7352C" d="M12.926 19.324a7.6 7.6 0 00-2.983-6.754 7.44 7.44 0 00-3.828-1.554.697.697 0 01-.606-.731.674.674 0 01.743-.617 8.97 8.97 0 018 9.805 7.828 7.828 0 01-.298 1.542l1.989.56a11.039 11.039 0 001.714-.651 12.159 12.159 0 00.217-2.343A12.57 12.57 0 007.212 6.171a5.53 5.53 0 00-2 0 4.354 4.354 0 00-2.16 1.337 4.274 4.274 0 001.909 6.856 9.896 9.896 0 001.074.195 4.011 4.011 0 013.337 3.954 3.965 3.965 0 01-.64 2.16l1.371.88a10.182 10.182 0 002.057.342 7.52 7.52 0 00.754-2.628m.16 4.73A13.073 13.073 0 01.001 10.983 12.982 12.982 0 013.83 1.737l.743.697a12.067 12.067 0 000 17.141 12.067 12.067 0 0017.141 0l.697.697a12.97 12.97 0 01-9.336 3.726M24 10.993A10.993 10.993 0 0012.949 0c-.389 0-.766 0-1.143.057l-.252.732a18.912 18.912 0 0111.588 11.576l.731-.263c0-.366.069-.732.069-1.143m-1.269 5.165A17.53 17.53 0 007.818 1.27a11.119 11.119 0 00-2.457 1.77v1.635A13.919 13.919 0 0119.268 18.57h1.634a11.713 11.713 0 001.771-2.446M7.92 17.884a1.691 1.691 0 11-1.69-1.691 1.691 1.691 0 011.69 1.691" />
          </svg>
        )
      },
      {
        name: "RESTful API",
        icon: (
          <svg viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#0284C7" />
            <circle cx="9" cy="16" r="3" fill="#ffffff" />
            <circle cx="23" cy="10" r="3" fill="#38BDF8" />
            <circle cx="23" cy="22" r="3" fill="#38BDF8" />
            <path stroke="#ffffff" strokeWidth="2" strokeLinecap="round" d="M12 16h3m3-3.5L15 15m3 4.5L15 17" fill="none" />
          </svg>
        )
      },
      {
        name: "Windows Desktop",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#0078d4" d="M67.328 67.331h60.669V128H67.328zm-67.325 0h60.669V128H.003zM67.328 0h60.669v60.669H67.328zM.003 0h60.669v60.669H.003z" />
          </svg>
        )
      },
      {
        name: "VietQR Payment",
        icon: (
          <svg viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#005BAA" />
            <rect x="7" y="7" width="7" height="7" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
            <rect x="9.5" y="9.5" width="2" height="2" fill="#E11D48" />
            <rect x="18" y="7" width="7" height="7" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
            <rect x="20.5" y="9.5" width="2" height="2" fill="#E11D48" />
            <rect x="7" y="18" width="7" height="7" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
            <rect x="9.5" y="20.5" width="2" height="2" fill="#E11D48" />
            <path fill="#ffffff" d="M18 18h3v3h-3zm4 0h3v3h-3zm0 4h3v3h-3zm-4 3h3v-2h-3z" />
          </svg>
        )
      }
    ]
  },
  tools: {
    label: "Tools & DevOps",
    count: 5,
    items: [
      {
        name: "Git",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z" />
          </svg>
        )
      },
      {
        name: "GitHub",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
          </svg>
        )
      },
      {
        name: "Visual Studio",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#52218a" d="M14.39 26.295a5.333 5.333 0 0 0-1.417.373l-9.694 4A5.333 5.333 0 0 0 0 35.561v56.88a5.333 5.333 0 0 0 3.28 4.893l9.693 4.066a5.333 5.333 0 0 0 5.521-.865l2.172-1.867a2.947 2.947 0 0 1-4.666-2.4V31.734a2.947 2.947 0 0 1 4.666-2.4l-2.172-1.799a5.333 5.333 0 0 0-4.103-1.24z" />
            <path fill="#6c33af" d="M94.75.416A8 8 0 0 0 88 2.668l-82.666 91.4A3.08 3.08 0 0 1 0 92.002v.44a5.333 5.333 0 0 0 3.28 4.892l9.693 4.066a5.333 5.333 0 0 0 5.521-.865l2.172-1.867 99.08-81.24A5.053 5.053 0 0 1 128 21.334v-.307a8 8 0 0 0-4.533-7.213L97.094 1.121A8 8 0 0 0 94.75.416Z" />
            <path fill="#854cc7" d="M14.871 26.238a5.333 5.333 0 0 0-1.898.43l-9.694 4A5.333 5.333 0 0 0 0 35.561v.441a3.08 3.08 0 0 1 5.334-2.066L88 125.334a8 8 0 0 0 9.094 1.547l26.373-12.694a8 8 0 0 0 4.533-7.212v-.307a5.053 5.053 0 0 1-8.254 3.906l-99.08-81.24-2.172-1.865a5.333 5.333 0 0 0-3.623-1.23z" />
            <path fill="#b179f1" d="M94.75.416a8 8 0 0 0-5.674 1.469A4.693 4.693 0 0 1 96 6.015v116a4.693 4.693 0 0 1-8 3.319 8 8 0 0 0 9.094 1.547l26.373-12.68a8 8 0 0 0 4.533-7.213V21.016a8 8 0 0 0-4.533-7.215L97.094 1.12A8 8 0 0 0 94.75.416Zm-5.674 1.469A4.693 4.693 0 0 0 88 2.668a8 8 0 0 1 1.076-.783Z" />
          </svg>
        )
      },
      {
        name: "VS Code",
        icon: (
          <svg viewBox="0 0 128 128">
            <path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z" />
            <path fill="#007ACC" d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z" />
            <path fill="#1F9CF0" d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z" />
          </svg>
        )
      },
      {
        name: "Velopack",
        icon: (
          <svg viewBox="0 0 32 32">
            <rect width="32" height="32" rx="4" fill="#6366F1" />
            <path fill="#ffffff" d="M16 6l9 5.2v9.6L16 26l-9-5.2V11.2L16 6zm0 3l-6.2 3.6 6.2 3.6 6.2-3.6L16 9zm-7 5.5v6.5l6 3.5v-6.5l-6-3.5zm14 0l-6 3.5v6.5l6-3.5v-6.5z" />
          </svg>
        )
      }
    ]
  }
};

// --- CYBER AUDIO FEEDBACK (OPTIONAL SUBTLE CLICK VIA WEB AUDIO API) ---
function playCyberClick(pitch = 850, duration = 0.02) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Fallback if audio autoplay is restricted
  }
}

// --- PROJECT MOCKUP 1: SMART BOARDING HOUSE (ĐỒ ÁN TỐT NGHIỆP) ---
function ThesisMockup() {
  return (
    <div className="mockup-window thesis-window">
      <div className="mockup-chrome">
        <div className="chrome-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <div className="chrome-url">
          <span>hostel.internal/ai-dqn-allocation</span>
        </div>
        <div className="chrome-status-badge">● DQN ACTIVE</div>
      </div>

      <div className="thesis-dash-body">
        <div className="thesis-kpi-row">
          <div className="thesis-kpi-pill">
            <span className="kpi-label">RL MATCH</span>
            <span className="kpi-val text-green">98.6%</span>
          </div>
          <div className="thesis-kpi-pill">
            <span className="kpi-label">OCCUPANCY</span>
            <span className="kpi-val text-cyan">48/50</span>
          </div>
          <div className="thesis-kpi-pill">
            <span className="kpi-label">VIETQR SYNC</span>
            <span className="kpi-val text-emerald">LIVE</span>
          </div>
        </div>

        <div className="thesis-matrix-box">
          <div className="matrix-header">
            <span>DUELING DQN ROOM MATRIX</span>
            <span className="matrix-legend">
              <span className="leg-dot occupied" /> Busy
              <span className="leg-dot optimal" /> AI Optimal
            </span>
          </div>
          <div className="rooms-grid">
            {[101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304].map((room, i) => {
              const isOptimal = i === 2 || i === 7;
              const isAvailable = i === 5 || i === 10;
              return (
                <div
                  key={room}
                  className={`room-tile ${isOptimal ? "optimal-match" : isAvailable ? "available" : "occupied"}`}
                >
                  <span className="room-no">{room}</span>
                  <span className="room-tag">{isOptimal ? "DQN" : isAvailable ? "FREE" : "BUSY"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="thesis-ticker">
          <span className="pulse-dot" />
          <span>VietQR Webhook: Contract #CTR-103 Auto-Reconciled (3.500.000 đ)</span>
        </div>
      </div>
    </div>
  );
}

// --- PROJECT MOCKUP 2: BAOTOOLS (WINDOWS DESKTOP CLIENT) ---
function BaoToolsMockup() {
  return (
    <div className="mockup-window baotools-window">
      <div className="baotools-titlebar">
        <div className="baotools-brand">
          <div className="baotools-app-icon" />
          <span>BaoTools v1.0.5 - Steam Manifest Manager [.NET 8 WPF]</span>
        </div>
        <div className="win-controls">
          <span>─</span>
          <span>□</span>
          <span className="win-close">✕</span>
        </div>
      </div>

      <div className="baotools-body">
        <div className="baotools-toolbar">
          <span className="tool-btn active">+ Add Depot</span>
          <span className="tool-btn">Sync Manifest</span>
          <span className="tool-btn">Lua Hook</span>
          <span className="tool-status-tag">Velopack: Active</span>
        </div>

        <div className="baotools-table">
          <div className="table-row table-head">
            <span>APPID</span>
            <span>DEPOT NAME</span>
            <span>MANIFEST HASH</span>
            <span>STATUS</span>
          </div>
          <div className="table-row">
            <span className="appid-pill">730</span>
            <span className="game-name">Counter-Strike 2</span>
            <span className="hash-text">849201847...</span>
            <span className="status-badge patched">● Patched</span>
          </div>
          <div className="table-row">
            <span className="appid-pill">570</span>
            <span className="game-name">Dota 2 Dedicated</span>
            <span className="hash-text">593021944...</span>
            <span className="status-badge synced">● Synced</span>
          </div>
          <div className="table-row">
            <span className="appid-pill">1091500</span>
            <span className="game-name">Cyberpunk 2077</span>
            <span className="hash-text">412093812...</span>
            <span className="status-badge lua">● Lua Active</span>
          </div>
        </div>

        <div className="baotools-footer-bar">
          <span>Velopack Auto-Update: Ready</span>
          <span>29 Languages</span>
          <span>RAM: 38.4 MB</span>
        </div>
      </div>
    </div>
  );
}

// --- PROJECT MOCKUP 3: EXPENSE MANAGEMENT APP (MOBILE FLUTTER) ---
function ExpenseMockup() {
  return (
    <div className="mockup-window expense-window">
      <div className="mobile-status-notch">
        <span className="mobile-time">09:41</span>
        <div className="mobile-island" />
        <div className="mobile-icons">
          <span>5G</span>
          <span className="battery-bar" />
        </div>
      </div>

      <div className="expense-mobile-body">
        <div className="expense-balance-card">
          <div className="balance-head">
            <span>Total Available Balance</span>
            <span className="wallet-chip">Smart Wallet</span>
          </div>
          <div className="balance-amount">28.450.000 đ</div>
          <div className="balance-growth">▲ +18.4% this month (Firebase Sync)</div>
        </div>

        <div className="expense-bars-row">
          {[
            { d: "M", h: 45 },
            { d: "T", h: 70 },
            { d: "W", h: 30 },
            { d: "T", h: 85, cur: true },
            { d: "F", h: 50 },
            { d: "S", h: 90 },
            { d: "S", h: 40 }
          ].map((bar, idx) => (
            <div key={idx} className="bar-col">
              <div className="bar-track">
                <div
                  className={`bar-fill ${bar.cur ? "current" : ""}`}
                  style={{ height: `${bar.h}%` }}
                />
              </div>
              <span className="bar-day">{bar.d}</span>
            </div>
          ))}
        </div>

        <div className="expense-tx-list">
          <div className="tx-item">
            <div className="tx-left">
              <div className="tx-icon">🏠</div>
              <div className="tx-meta">
                <span className="tx-title">Apartment Rent</span>
                <span className="tx-sub">Monthly Housing</span>
              </div>
            </div>
            <span className="tx-amount negative">-4.500.000 đ</span>
          </div>
          <div className="tx-item">
            <div className="tx-left">
              <div className="tx-icon">💼</div>
              <div className="tx-meta">
                <span className="tx-title">Freelance Payout</span>
                <span className="tx-sub">Direct Transfer</span>
              </div>
            </div>
            <span className="tx-amount positive">+15.000.000 đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- REAL-TIME VIETNAM CLOCK HOOK (UTC+7 / ICT) ---
function useVietnamClock() {
  const [time, setTime] = useState(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(new Date());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}

function App() {
  const appRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const vietnamTime = useVietnamClock();

  // Mouse spotlight state
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  // About Section: display the content for the selected profile panel only.
  const [openAboutFiles, setOpenAboutFiles] = useState(["bio.md"]);
  const ideContentRef = useRef(null);

  const handleToggleAboutFile = (fileName) => {
    playCyberClick(740, 0.03);
    setOpenAboutFiles([fileName]);
  };

  // Dedicated GSAP Animation on switching tabs in IDE Window
  useEffect(() => {
    if (!ideContentRef.current) return;
    const panel = ideContentRef.current.querySelector(".ide-file-panel");
    if (!panel) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Panel container slide up & fade
    tl.fromTo(
      panel,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.35, clearProps: "opacity,visibility,transform" }
    );

    // 2. Left side text elements
    const textElements = panel.querySelectorAll(
      ".active-file-tag, .content-heading, .content-paragraph"
    );
    if (textElements.length) {
      tl.fromTo(
        textElements,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.035, clearProps: "opacity,visibility,transform" },
        "-=0.25"
      );
    }

    // 3. Metadata rows stagger
    const metaRows = panel.querySelectorAll(".metadata-table .meta-row");
    if (metaRows.length) {
      tl.fromTo(
        metaRows,
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.24, stagger: 0.03, clearProps: "opacity,visibility,transform" },
        "-=0.2"
      );
    }

    // 4. Right side visual graphic frame
    const visualFrame = panel.querySelector(".about-graphic-frame");
    if (visualFrame) {
      tl.fromTo(
        visualFrame,
        { autoAlpha: 0, x: 20, scale: 0.98 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 0.38, ease: "back.out(1.3)", clearProps: "opacity,visibility,transform" },
        "-=0.25"
      );

      const subItems = visualFrame.querySelectorAll(
        ".coursework-tag, .telemetry-stat, .terminal-snippet, .geo-hud-header, .edu-huit-card"
      );
      if (subItems.length) {
        tl.fromTo(
          subItems,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.03, clearProps: "opacity,visibility,transform" },
          "-=0.2"
        );
      }
    }

    // 5. Path indicator subtle pulse
    const pathSpan = document.querySelector(".ide-path-bar span");
    if (pathSpan) {
      gsap.fromTo(
        pathSpan,
        { color: "#38bdf8" },
        { color: "var(--text)", duration: 0.45, ease: "power2.out" }
      );
    }

    return () => {
      tl.kill();
    };
  }, [openAboutFiles]);

  // Skills Section State
  const [activeSkillCategory, setActiveSkillCategory] = useState("languages");
  const skillsGridRef = useRef(null);

  // Staggered pop animation when switching skill categories
  useEffect(() => {
    if (!skillsGridRef.current) return;
    const cards = skillsGridRef.current.querySelectorAll(".tech-icon-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16, scale: 0.88 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.34,
        stagger: 0.045,
        ease: "back.out(1.5)",
        clearProps: "all"
      }
    );
  }, [activeSkillCategory]);

  // Modals State
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const handleNavClick = (sectionId, event) => {
    if (event?.currentTarget) {
      gsap.timeline()
        .to(event.currentTarget, { scale: 0.92, duration: 0.08, ease: "power2.in" })
        .to(event.currentTarget, { scale: 1, duration: 0.22, ease: "back.out(2.2)" });
    }
    scrollToSection(sectionId);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleThemeToggleWithAnimation = (e) => {
    playCyberClick(theme === "dark" ? 1150 : 750, 0.03);

    if (e?.currentTarget) {
      gsap.timeline()
        .to(e.currentTarget, { rotation: "+=180", scale: 0.78, duration: 0.16, ease: "power2.in" })
        .to(e.currentTarget, { scale: 1, duration: 0.24, ease: "back.out(2)" });
    }

    const nextTheme = theme === "dark" ? "light" : "dark";

    const x = e?.clientX ?? window.innerWidth - 50;
    const y = e?.clientY ?? 36;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const applyThemeSwitch = () => {
      document.documentElement.dataset.theme = nextTheme;
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
      flushSync(() => {
        setTheme(nextTheme);
      });

      // Animate BAO and ODE elements with elastic spring on theme toggle
      const baoEl = document.querySelector(".collage-boxed-word");
      if (baoEl) {
        gsap.fromTo(
          baoEl,
          { scale: 0.88, y: -4 },
          { scale: 1, y: 0, duration: 0.42, ease: "back.out(2.2)", clearProps: "transform" }
        );
      }
      const odeEl = document.querySelector(".collage-ode-box");
      if (odeEl) {
        gsap.fromTo(
          odeEl,
          { scale: 0.88, y: 4 },
          { scale: 1, y: 0, duration: 0.42, ease: "back.out(2.2)", clearProps: "transform" }
        );
      }
    };

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        applyThemeSwitch();
      });

      transition.ready.then(() => {
        try {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ];
          document.documentElement.animate(
            {
              clipPath
            },
            {
              duration: 480,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)"
            }
          );
        } catch {
          // Graceful fallback for older animation engines
        }
      }).catch(() => {});
    } else {
      applyThemeSwitch();
    }
  };

  const handleCopyEmail = (e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(USER_INFO.email);
    setCopiedEmail(true);
    playCyberClick(1200, 0.035);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  // Apply theme to document element and persist
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Track mouse coordinates for subtle grid spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setIsHeaderScrolled(winScroll > 30);

      const isBottom = window.innerHeight + winScroll >= document.documentElement.scrollHeight - 60;
      if (isBottom) {
        setActiveSection("skills");
        return;
      }

      const sections = ["hero", "about", "projects", "services", "skills"];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep GSAP ScrollTrigger synchronized when layout shifts (e.g., toggling about files or skill categories)
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);
    return () => clearTimeout(timer);
  }, [openAboutFiles, activeSkillCategory]);

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useLayoutEffect(() => {
    const root = appRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];
    const context = gsap.context(() => {
      const all = gsap.utils.toArray(".reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-fade, .hero-load-stats");

      if (reduceMotion) {
        gsap.set(all, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      // Defensive reset: elements must always remain visible even if a
      // ScrollTrigger is refreshed while the user is already down the page.
      gsap.set(
        root.querySelectorAll(
          ".file-item-btn, .ide-tab, .ide-sidebar, .ide-file-panel, .project-card, .service-cell, .tech-icon-card, .ide-window, .skills-wrapper-box, .footer-section, .footer-content, .footer-brand-title, .footer-tagline, .footer-avail-status, .footer-copyright, .footer-col-title, .footer-nav-link, .social-icon-btn, .get-in-touch-btn, .hero-cta-group, .btn-primary, .btn-outline, .hologram-card, .avatar-connect-card, .connect-pill"
        ),
        { autoAlpha: 1, clearProps: "opacity,visibility" }
      );

      const hero = root.querySelector(".hero-section");
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".header-wrap", { y: -24, autoAlpha: 0, duration: 0.45 })
        .from(hero?.querySelector(".hero-greeting-line"), { y: 12, autoAlpha: 0, duration: 0.35 }, "-=0.1")
        .from(hero?.querySelector(".hero-headline-wrap"), { clipPath: "inset(0 100% 0 0)", x: -28, duration: 0.62 }, "-=0.12")
        .from(hero?.querySelector(".hero-role-block"), { y: 20, autoAlpha: 0, duration: 0.38 }, "-=0.28")
        .from(hero?.querySelector(".hero-bio"), { y: 16, autoAlpha: 0, duration: 0.32 }, "-=0.22")
        .fromTo(
          hero?.querySelectorAll(".hero-cta-group .btn-primary, .hero-cta-group .btn-outline") || [],
          { y: 20, autoAlpha: 0, scale: 0.92 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.12,
            ease: "back.out(1.8)",
            clearProps: "opacity,visibility"
          },
          "-=0.18"
        )
        .fromTo(hero?.querySelector(".hero-load-stats") || [], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, "-=0.15")
        .fromTo(hero?.querySelectorAll(".stat-card") || [], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.28, stagger: 0.08 }, "<")
        // Card 1: Dedicated GSAP Entrance for Hero Photo Hologram Card
        .fromTo(
          hero?.querySelector(".hologram-card"),
          { scale: 0.88, autoAlpha: 0, y: 24 },
          { scale: 1, autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          hero?.querySelectorAll(".hologram-card .bracket-tl, .hologram-card .bracket-tr, .hologram-card .bracket-bl, .hologram-card .bracket-br") || [],
          { scale: 0.3, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.32, stagger: 0.04, ease: "back.out(2)" },
          "-=0.45"
        )
        .fromTo(
          hero?.querySelectorAll(".hologram-card .border-tick") || [],
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.25, stagger: 0.02, ease: "back.out(2)" },
          "-=0.35"
        )
        .fromTo(
          hero?.querySelector(".hero-avatar-photo"),
          { scale: 1.12, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.65, ease: "power2.out" },
          "-=0.45"
        )
        // Card 2: Dedicated GSAP Entrance for LET'S CONNECT Card
        .fromTo(
          hero?.querySelector(".avatar-connect-card"),
          { y: 22, autoAlpha: 0, scale: 0.94 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
          "-=0.35"
        )
        .fromTo(
          hero?.querySelectorAll(".avatar-connect-card .bracket-tl, .avatar-connect-card .bracket-tr, .avatar-connect-card .bracket-bl, .avatar-connect-card .bracket-br") || [],
          { scale: 0.3, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" },
          "-=0.38"
        )
        .fromTo(
          hero?.querySelector(".avatar-connect-header"),
          { x: -12, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
          "-=0.32"
        )
        .fromTo(
          hero?.querySelectorAll(".connect-buttons-row .connect-pill") || [],
          { scale: 0.84, y: 10, autoAlpha: 0 },
          { scale: 1, y: 0, autoAlpha: 1, duration: 0.38, stagger: 0.07, ease: "back.out(1.8)" },
          "-=0.28"
        );

      gsap.utils.toArray(".section-container:not(#projects):not(#about):not(#services):not(#skills)").forEach((section) => {
        gsap.from(section, {
          y: 42,
          autoAlpha: 0,
          duration: 0.56,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true }
        });

        const heading = section.querySelectorAll(".section-pretitle, .section-title");
        if (heading.length) {
          gsap.from(heading, {
            y: 26,
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.52,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true }
          });
        }

        gsap.from(section.querySelectorAll(".bracket-tl, .bracket-tr, .bracket-bl, .bracket-br"), {
          scale: 0.4,
          autoAlpha: 0,
          duration: 0.28,
          stagger: 0.035,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: section, start: "top 76%", once: true }
        });
      });

      // ============================================================
      // ABOUT SECTION ("IDE Window - About Me") DEDICATED GSAP SCROLLTRIGGER
      // ============================================================
      const aboutSection = root.querySelector("#about");
      const ideWindow = aboutSection?.querySelector(".ide-window");
      if (aboutSection && ideWindow) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 86%",
            once: true
          },
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(ideWindow.querySelectorAll(".file-item-btn, .ide-tab, .ide-sidebar, .ide-file-panel"), {
              clearProps: "all"
            });
          }
        });

        // 1. Whole IDE window container slides up & scales into perspective
        aboutTl.from(ideWindow, {
          y: 44,
          scale: 0.97,
          autoAlpha: 0,
          duration: 0.58,
          clearProps: "all"
        });

        // 2. Corner CAD registration brackets pop
        const brackets = ideWindow.querySelectorAll(":scope > .bracket-tl, :scope > .bracket-tr, :scope > .bracket-bl, :scope > .bracket-br");
        if (brackets.length) {
          aboutTl.fromTo(brackets, {
            scale: 0.2,
            autoAlpha: 0
          }, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.04,
            ease: "back.out(2)",
            clearProps: "all"
          }, "-=0.35");
        }

        // 3. Traffic light dots drop in
        const dots = ideWindow.querySelectorAll(".window-dots span");
        if (dots.length) {
          aboutTl.fromTo(dots, {
            scale: 0,
            autoAlpha: 0
          }, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.28,
            stagger: 0.05,
            ease: "back.out(2)",
            clearProps: "all"
          }, "-=0.25");
        }

        // 4. Centered title entrance
        const centerTitle = ideWindow.querySelector(".ide-center-title");
        if (centerTitle) {
          aboutTl.fromTo(centerTitle, {
            y: -8,
            autoAlpha: 0
          }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out",
            clearProps: "all"
          }, "-=0.2");
        }

        // 5. Path indicator bar slide down
        const pathBar = ideWindow.querySelector(".ide-path-bar");
        if (pathBar) {
          aboutTl.fromTo(pathBar, {
            y: -8,
            autoAlpha: 0
          }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.28,
            clearProps: "all"
          }, "-=0.2");
        }

        // 6. Left sidebar DIRECTORIES container and file buttons stagger from left
        const ideSidebar = ideWindow.querySelector(".ide-sidebar");
        if (ideSidebar) {
          aboutTl.fromTo(ideSidebar, {
            x: -18,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.38,
            ease: "power2.out",
            clearProps: "all"
          }, "-=0.2");
        }

        const fileBtns = ideWindow.querySelectorAll(".file-item-btn");
        if (fileBtns.length) {
          aboutTl.fromTo(fileBtns, {
            x: -14,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all"
          }, "-=0.25");
        }

        // 7. Active panel content text & metadata rows stagger
        const activePanel = ideWindow.querySelector(".ide-file-panel");
        if (activePanel) {
          const contentText = activePanel.querySelectorAll(
            ".active-file-tag, .content-heading, .content-paragraph"
          );
          if (contentText.length) {
            aboutTl.fromTo(contentText, {
              y: 10,
              autoAlpha: 0
            }, {
              y: 0,
              autoAlpha: 1,
              duration: 0.3,
              stagger: 0.035,
              ease: "power2.out",
              clearProps: "all"
            }, "-=0.2");
          }

          const metaRows = activePanel.querySelectorAll(".metadata-table .meta-row");
          if (metaRows.length) {
            aboutTl.fromTo(metaRows, {
              x: -12,
              autoAlpha: 0
            }, {
              x: 0,
              autoAlpha: 1,
              duration: 0.26,
              stagger: 0.03,
              ease: "power2.out",
              clearProps: "all"
            }, "-=0.2");
          }

          // 8. Right side visual frame (CRT Monitor / Terminal Snippet)
          const graphicFrame = activePanel.querySelector(".about-graphic-frame");
          if (graphicFrame) {
            aboutTl.fromTo(graphicFrame, {
              x: 24,
              scale: 0.97,
              autoAlpha: 0
            }, {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.42,
              ease: "back.out(1.3)",
              clearProps: "all"
            }, "-=0.25");

            const crtSnippet = graphicFrame.querySelector(".terminal-snippet, .academic-preview, .geo-preview");
            if (crtSnippet) {
              aboutTl.fromTo(crtSnippet, {
                autoAlpha: 0,
                y: 8
              }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                clearProps: "all"
              }, "-=0.2");
            }
          }
        }
      }

      // ============================================================
      // PROJECTS SECTION ("Selected Project") DEDICATED GSAP TIMELINE
      // ============================================================
      const projectsSection = root.querySelector("#projects");
      if (projectsSection) {
        const projTl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 85%",
            once: true
          },
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(
              projectsSection.querySelectorAll(
                ".view-all-link, .section-title, .section-pretitle, .project-card, .bracket-tl, .bracket-tr, .bracket-bl, .bracket-br"
              ),
              { clearProps: "all" }
            );
            gsap.set(projectsSection, { clearProps: "all" });
          }
        });

        // 1. Whole section container reveal
        projTl.fromTo(
          projectsSection,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, clearProps: "all" }
        );

        // 2. Pretitle with cyber tracking expansion
        const projPretitle = projectsSection.querySelector(".section-pretitle");
        if (projPretitle) {
          projTl.fromTo(
            projPretitle,
            { x: -18, letterSpacing: "0.25em", opacity: 0 },
            { x: 0, letterSpacing: "0.15em", opacity: 1, duration: 0.38, clearProps: "all" },
            "-=0.35"
          );
        }

        // 3. Section title cyber reveal
        const projTitle = projectsSection.querySelector(".section-title");
        if (projTitle) {
          projTl.fromTo(
            projTitle,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, clearProps: "all" },
            "-=0.25"
          );
        }

        // 4. View All Projects link slide-in
        const viewAllLink = projectsSection.querySelector(".view-all-link");
        if (viewAllLink) {
          projTl.fromTo(
            viewAllLink,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "all" },
            "-=0.35"
          );
        }

        // 5. Staggered 3D entrance for project cards
        const cards = projectsSection.querySelectorAll(".project-card");
        if (cards.length) {
          projTl.fromTo(
            cards,
            { y: 40, scale: 0.94, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.58,
              stagger: 0.12,
              ease: "back.out(1.4)",
              clearProps: "all"
            },
            "-=0.2"
          );

          // 6. Preview image subtle entrance
          const previewImgs = projectsSection.querySelectorAll(".project-preview-img");
          if (previewImgs.length) {
            projTl.fromTo(
              previewImgs,
              { scale: 1.04 },
              { scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", clearProps: "all" },
              "<"
            );
          }

          // 7. Corner registration brackets pop
          const brackets = projectsSection.querySelectorAll(".bracket-tl, .bracket-tr, .bracket-bl, .bracket-br");
          if (brackets.length) {
            projTl.fromTo(
              brackets,
              { scale: 0.2, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.35, stagger: 0.03, ease: "back.out(2)", clearProps: "all" },
              "-=0.4"
            );
          }
        }
      }

      // ============================================================
      // SERVICES SECTION ("What I Do") DEDICATED GSAP SCROLLTRIGGER
      // ============================================================
      const servicesSection = root.querySelector("#services");
      if (servicesSection) {
        const servTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
            once: true
          },
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(servicesSection.querySelectorAll(".service-cell, .service-cell-bracket"), { clearProps: "all" });
          }
        });

        // 1. Pretitle & Title cyber reveal
        const servPre = servicesSection.querySelector(".section-pretitle");
        const servTitle = servicesSection.querySelector(".section-title");
        if (servPre) {
          servTl.fromTo(servPre, { x: -16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.35 });
        }
        if (servTitle) {
          servTl.fromTo(
            servTitle,
            { y: 24, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.5 },
            "-=0.25"
          );
        }

        // 2. Staggered 3D entrance of all 4 service cells
        const serviceCells = servicesSection.querySelectorAll(".service-cell");
        if (serviceCells.length) {
          servTl.fromTo(
            serviceCells,
            { y: 46, scale: 0.94, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.58,
              stagger: 0.12,
              ease: "back.out(1.4)",
              clearProps: "all"
            },
            "-=0.2"
          );

          // 3. Numbers pop (04, 01, 02, 03)
          const nums = servicesSection.querySelectorAll(".service-num");
          if (nums.length) {
            servTl.fromTo(
              nums,
              { scale: 0.4, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2)", clearProps: "all" },
              "-=0.4"
            );
          }

          // 4. CAD Corner Brackets snap & lock-in animation
          const brackets = servicesSection.querySelectorAll(".service-cell-bracket");
          if (brackets.length) {
            servTl.fromTo(
              brackets,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                stagger: 0.02,
                ease: "back.out(2.5)",
                clearProps: "all"
              },
              "-=0.3"
            );
          }
        }
      }

      // ============================================================
      // SKILLS SECTION ("TECH STACK & TOOLS - My Expertise") DEDICATED GSAP
      // ============================================================
      const skillsSection = root.querySelector("#skills");
      if (skillsSection) {
        const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsSection,
            start: "top 82%",
            once: true
          },
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(skillsSection.querySelectorAll(".tech-icon-card, .cat-btn, .skills-wrapper-box"), {
              clearProps: "all"
            });
          }
        });

        // 1. Whole skills container slide up & fade in
        skillsTl.from(skillsSection, {
          y: 36,
          autoAlpha: 0,
          duration: 0.52
        });

        // 2. Pretitle with cyber tracking expansion
        const skillsPre = skillsSection.querySelector(".section-pretitle");
        if (skillsPre) {
          skillsTl.from(skillsPre, {
            x: -16,
            letterSpacing: "0.22em",
            autoAlpha: 0,
            duration: 0.35
          }, "-=0.35");
        }

        // 3. Title reveal with cyber clipPath
        const skillsTitle = skillsSection.querySelector(".section-title");
        if (skillsTitle) {
          skillsTl.from(skillsTitle, {
            y: 24,
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.48
          }, "-=0.25");
        }

        // 4. Skills wrapper box scale & entrance
        const wrapperBox = skillsSection.querySelector(".skills-wrapper-box");
        if (wrapperBox) {
          skillsTl.from(wrapperBox, {
            y: 28,
            scale: 0.98,
            autoAlpha: 0,
            duration: 0.45
          }, "-=0.2");
        }

        // 5. Corner CAD registration brackets pop
        const brackets = skillsSection.querySelectorAll(
          ".skills-wrapper-box > .bracket-tl, .skills-wrapper-box > .bracket-tr, .skills-wrapper-box > .bracket-bl, .skills-wrapper-box > .bracket-br"
        );
        if (brackets.length) {
          skillsTl.fromTo(brackets, {
            scale: 0.2,
            autoAlpha: 0
          }, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: "back.out(2)",
            clearProps: "all"
          }, "-=0.35");
        }

        // 6. Left category selector buttons stagger from left
        const catBtns = skillsSection.querySelectorAll(".skills-cat-list .cat-btn");
        if (catBtns.length) {
          skillsTl.fromTo(catBtns, {
            x: -20,
            autoAlpha: 0
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all"
          }, "-=0.25");
        }

        // 7. Initial Tech cards stagger pop
        const techCards = skillsSection.querySelectorAll(".tech-icon-card");
        if (techCards.length) {
          skillsTl.fromTo(techCards, {
            y: 22,
            scale: 0.88,
            autoAlpha: 0
          }, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.5)",
            clearProps: "all"
          }, "-=0.2");
        }
      }

      // ============================================================
      // FOOTER SECTION GSAP SCROLLTRIGGER SYNC & REVEAL
      // ============================================================
      const footer = root.querySelector(".footer-section");
      if (footer) {
        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 96%",
            once: true
          },
          defaults: { ease: "power3.out" }
        });

        // 1. Footer container slide-up & fade-in
        footerTl.from(footer, {
          y: 28,
          autoAlpha: 0,
          duration: 0.5
        });

        // 2. Top accent glow line expansion
        const accentLine = footer.querySelector(".footer-accent-line");
        if (accentLine) {
          footerTl.from(accentLine, {
            scaleX: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.35");
        }

        // 3. Title reveal
        const footerTitle = footer.querySelector(".footer-brand-title");
        if (footerTitle) {
          footerTl.from(footerTitle, {
            y: 20,
            autoAlpha: 0,
            duration: 0.4
          }, "-=0.3");
        }

        // 4. Staggered entrance for all 3 columns (Left, Mid, Right)
        const cols = footer.querySelectorAll(".footer-left, .footer-mid, .footer-right");
        if (cols.length) {
          footerTl.from(cols, {
            y: 18,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.1
          }, "-=0.25");
        }

        // 5. Corner brackets pop in
        const brackets = footer.querySelectorAll(".bracket-tl, .bracket-tr, .bracket-bl, .bracket-br");
        if (brackets.length) {
          footerTl.from(brackets, {
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.28,
            stagger: 0.03,
            ease: "back.out(1.7)"
          }, "-=0.2");
        }
      }

      gsap.to(root, {
        backgroundPosition: "0 76px",
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 }
      });

      root.querySelectorAll(".project-card").forEach((card) => {
        const previewImg = card.querySelector(".project-preview-img");
        const onMove = (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotationY: x * 8,
            rotationX: -y * 6,
            y: -8,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
          if (previewImg) {
            gsap.to(previewImg, {
              x: -x * 8,
              y: -y * 6,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };
        const onLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto"
          });
          if (previewImg) {
            gsap.to(previewImg, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto"
            });
          }
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      // Interactive 3D Perspective Tilt on Service Cells
      root.querySelectorAll(".service-cell").forEach((cell) => {
        const onMove = (event) => {
          const rect = cell.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(cell, {
            rotationY: x * 6,
            rotationX: -y * 5,
            y: -6,
            transformPerspective: 900,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        };
        const onLeave = () => {
          gsap.to(cell, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto"
          });
        };
        cell.addEventListener("pointermove", onMove);
        cell.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          cell.removeEventListener("pointermove", onMove);
          cell.removeEventListener("pointerleave", onLeave);
        });
      });

      // Dedicated GSAP Interactive Magnetic & Hover for Hero CTA Buttons ("View Projects" & "Download CV")
      root.querySelectorAll(".hero-cta-group .btn-primary, .hero-cta-group .btn-outline").forEach((button) => {
        const isPrimary = button.classList.contains("btn-primary");
        const icon = button.querySelector("svg");

        const onEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.24,
            ease: "power2.out"
          });
          if (icon) {
            gsap.to(icon, {
              x: isPrimary ? 5 : 0,
              y: isPrimary ? 0 : 4,
              duration: 0.22,
              ease: "power2.out"
            });
          }
        };

        const onMove = (event) => {
          const rect = button.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
          gsap.to(button, {
            x,
            y,
            duration: 0.24,
            ease: "power2.out"
          });
        };

        const onLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "elastic.out(1, 0.45)"
          });
          if (icon) {
            gsap.to(icon, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
          }
        };

        const onDown = () => {
          gsap.to(button, { scale: 0.94, duration: 0.1, ease: "power1.in" });
        };
        const onUp = () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: "elastic.out(1.2, 0.4)" });
        };

        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("pointermove", onMove);
        button.addEventListener("mouseleave", onLeave);
        button.addEventListener("mousedown", onDown);
        button.addEventListener("mouseup", onUp);

        cleanups.push(() => {
          button.removeEventListener("mouseenter", onEnter);
          button.removeEventListener("pointermove", onMove);
          button.removeEventListener("mouseleave", onLeave);
          button.removeEventListener("mousedown", onDown);
          button.removeEventListener("mouseup", onUp);
        });
      });

      // Footer magnetic buttons
      root.querySelectorAll(".footer-section .get-in-touch-btn, .footer-section .social-icon-btn").forEach((button) => {
        const factor = button.classList.contains("social-icon-btn") ? 0.22 : 0.12;
        const onMove = (event) => {
          const rect = button.getBoundingClientRect();
          gsap.to(button, {
            x: (event.clientX - rect.left - rect.width / 2) * factor,
            y: (event.clientY - rect.top - rect.height / 2) * factor,
            duration: 0.25,
            ease: "power2.out"
          });
        };
        const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.42, ease: "elastic.out(1, 0.45)" });
        button.addEventListener("pointermove", onMove);
        button.addEventListener("pointerleave", onLeave);
        cleanups.push(() => { button.removeEventListener("pointermove", onMove); button.removeEventListener("pointerleave", onLeave); });
      });

      // ============================================================
      // DEDICATED GSAP MICRO-INTERACTIONS FOR HERO CARDS
      // ============================================================

      // Card 1: 3D Perspective Tilt on Hologram Photo Card with image parallax
      const photoCard = root.querySelector(".hologram-card");
      const photoImg = photoCard?.querySelector(".hero-avatar-photo");
      if (photoCard) {
        const onPhotoMove = (event) => {
          const rect = photoCard.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(photoCard, {
            rotationY: x * 8,
            rotationX: -y * 8,
            y: -4,
            transformPerspective: 1000,
            duration: 0.28,
            ease: "power2.out"
          });
          if (photoImg) {
            gsap.to(photoImg, {
              x: -x * 12,
              y: -y * 12,
              duration: 0.35,
              ease: "power2.out"
            });
          }
        };
        const onPhotoLeave = () => {
          gsap.to(photoCard, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          });
          if (photoImg) {
            gsap.to(photoImg, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
          }
        };
        photoCard.addEventListener("pointermove", onPhotoMove);
        photoCard.addEventListener("pointerleave", onPhotoLeave);
        cleanups.push(() => {
          photoCard.removeEventListener("pointermove", onPhotoMove);
          photoCard.removeEventListener("pointerleave", onPhotoLeave);
        });
      }

      // Card 2: 3D Micro-tilt on LET'S CONNECT Card
      const connectCard = root.querySelector(".avatar-connect-card");
      if (connectCard) {
        const onConnectMove = (event) => {
          const rect = connectCard.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(connectCard, {
            rotationY: x * 5,
            rotationX: -y * 4,
            y: -3,
            transformPerspective: 1000,
            duration: 0.28,
            ease: "power2.out"
          });
        };
        const onConnectLeave = () => {
          gsap.to(connectCard, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
          });
        };
        connectCard.addEventListener("pointermove", onConnectMove);
        connectCard.addEventListener("pointerleave", onConnectLeave);
        cleanups.push(() => {
          connectCard.removeEventListener("pointermove", onConnectMove);
          connectCard.removeEventListener("pointerleave", onConnectLeave);
        });
      }

      // Connect Pills: Magnetic pull & tactile click animation
      root.querySelectorAll(".connect-pill").forEach((pill) => {
        const icon = pill.querySelector("svg");
        const onPillEnter = () => {
          gsap.to(pill, { scale: 1.06, duration: 0.2, ease: "power2.out" });
          if (icon) gsap.to(icon, { y: -2, duration: 0.2, ease: "power2.out" });
        };
        const onPillMove = (event) => {
          const rect = pill.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
          gsap.to(pill, { x, y, duration: 0.22, ease: "power2.out" });
        };
        const onPillLeave = () => {
          gsap.to(pill, { x: 0, y: 0, scale: 1, duration: 0.42, ease: "elastic.out(1, 0.45)" });
          if (icon) gsap.to(icon, { y: 0, duration: 0.3, ease: "power2.out" });
        };
        const onPillDown = () => {
          gsap.to(pill, { scale: 0.94, duration: 0.08, ease: "power1.in" });
        };
        const onPillUp = () => {
          gsap.to(pill, { scale: 1.06, duration: 0.25, ease: "elastic.out(1.2, 0.4)" });
        };

        pill.addEventListener("mouseenter", onPillEnter);
        pill.addEventListener("pointermove", onPillMove);
        pill.addEventListener("mouseleave", onPillLeave);
        pill.addEventListener("mousedown", onPillDown);
        pill.addEventListener("mouseup", onPillUp);

        cleanups.push(() => {
          pill.removeEventListener("mouseenter", onPillEnter);
          pill.removeEventListener("pointermove", onPillMove);
          pill.removeEventListener("mouseleave", onPillLeave);
          pill.removeEventListener("mousedown", onPillDown);
          pill.removeEventListener("mouseup", onPillUp);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  const scrollToSection = (id) => {
    playCyberClick(720, 0.015);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    }
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    playCyberClick(920, 0.025);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    playCyberClick(1100, 0.04);
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactModalOpen(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="site-wrapper" ref={appRef}>
      {/* Grid Wipe Transition on theme change or mount */}
      <div className="grid-wipe-overlay" key={theme} />

      {/* Interactive Mouse Spotlight */}
      <div
        className="mouse-spotlight"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* ============================================================
          HEADER / NAVBAR (WITH CORNER-BRACKETED ACTIVE NAV ITEMS)
          ============================================================ */}
      <header className={`header-wrap ${isHeaderScrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          {/* Brand Logo: Modern Cyber-Tech Developer Emblem */}
          <button className="brand-logo" onClick={(e) => handleNavClick("hero", e)} title="DevBaor — Return to Top">
            <div className="modern-logo-symbol">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="brand-symbol-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="logoBorderGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.6" stopColor="#0ea5e9" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="logoFillGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0a192f" />
                    <stop offset="1" stopColor="#030712" />
                  </linearGradient>
                  <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38bdf8" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Outer cyber hexagon badge */}
                <path
                  d="M17 2 L31 9.5 V24.5 L17 32 L3 24.5 V9.5 Z"
                  fill="url(#logoFillGrad)"
                  stroke="url(#logoBorderGrad)"
                  strokeWidth="1.8"
                  filter="url(#cyanGlow)"
                />

                {/* Inner geometric accent notches */}
                <path d="M17 5 L28 11" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
                <path d="M6 11 L17 5" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />

                {/* Stylized code terminal chevron: > */}
                <path
                  d="M10 13.5 L15 17 L10 20.5"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Terminal underline cursor: _ */}
                <line
                  x1="17.5"
                  y1="20.5"
                  x2="23.5"
                  y2="20.5"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Cyber micro-dot accent */}
                <circle cx="20.5" cy="13.5" r="1.5" fill="#38bdf8" />
              </svg>
            </div>
            <div className="logo-text-group">
              <div className="logo-title-row">
                <span className="logo-title-main">DEVBAOR</span>
                <span className="logo-tag-badge">.DEV</span>
              </div>
              <div className="logo-subtitle-row">
                <span className="logo-live-dot" />
                <span className="logo-sub-text">DUY BẢO // FULLSTACK</span>
              </div>
            </div>
          </button>

          {/* Navigation Links with Corner-Bracketed Active Frame */}
          <div className={`nav-center ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <button
              className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
              onClick={(e) => handleNavClick("hero", e)}
            >
              {activeSection === "hero" && (
                <>
                  <span className="nav-bracket-tl" />
                  <span className="nav-bracket-tr" />
                  <span className="nav-bracket-bl" />
                  <span className="nav-bracket-br" />
                </>
              )}
              <Home size={14} />
              <span>HOME</span>
            </button>
            <button
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={(e) => handleNavClick("about", e)}
            >
              {activeSection === "about" && (
                <>
                  <span className="nav-bracket-tl" />
                  <span className="nav-bracket-tr" />
                  <span className="nav-bracket-bl" />
                  <span className="nav-bracket-br" />
                </>
              )}
              <User size={14} />
              <span>ABOUT</span>
            </button>
            <button
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
              onClick={(e) => handleNavClick("projects", e)}
            >
              {activeSection === "projects" && (
                <>
                  <span className="nav-bracket-tl" />
                  <span className="nav-bracket-tr" />
                  <span className="nav-bracket-bl" />
                  <span className="nav-bracket-br" />
                </>
              )}
              <FolderKanban size={14} />
              <span>PROJECTS</span>
            </button>
            <button
              className={`nav-link ${activeSection === "services" ? "active" : ""}`}
              onClick={(e) => handleNavClick("services", e)}
            >
              {activeSection === "services" && (
                <>
                  <span className="nav-bracket-tl" />
                  <span className="nav-bracket-tr" />
                  <span className="nav-bracket-bl" />
                  <span className="nav-bracket-br" />
                </>
              )}
              <Settings size={14} />
              <span>SERVICES</span>
            </button>
            <button
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
              onClick={(e) => handleNavClick("skills", e)}
            >
              {activeSection === "skills" && (
                <>
                  <span className="nav-bracket-tl" />
                  <span className="nav-bracket-tr" />
                  <span className="nav-bracket-bl" />
                  <span className="nav-bracket-br" />
                </>
              )}
              <Code size={14} />
              <span>SKILLS</span>
            </button>
          </div>

          {/* Actions: Theme Toggle & Mobile Menu */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={handleThemeToggleWithAnimation}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>

        {/* Laser Scroll Progress Bar */}
        <div className="header-scroll-progress-track">
          <div
            className="header-scroll-progress-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}
      <main>
        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="hero-main-grid">
            {/* Left Content */}
            <div className="hero-left">
              {/* Typewriter Greeting */}
              <Typewriter words={HERO_WORDS} />

              {/* Ransom/Collage Sticker Art Headline (Fixed: CODE BY DUYBAO on a single line) */}
              <div className="hero-headline-wrap">
                <h1 className="hero-headline-collage" aria-label="CODE BY DUYBAO">
                  {/* WORD 1: CODE (Exact 1:1 Replica of User's Reference Image) */}
                  <div className="collage-word word-code" title="CODE">
                    {/* [C] Black Base with Blue Cyber Mechanical Sticker */}
                    <div className="collage-c-box">
                      <svg
                        viewBox="0 0 54 64"
                        fill="none"
                        className="c-sticker-svg"
                        aria-hidden="true"
                      >
                        {/* Black Outer Base */}
                        <rect className="c-base-rect" width="54" height="64" rx="1" />

                        {/* Blue Sticker Body with Top-Left Machine Tab */}
                        <path
                          d="M 3 14 L 1 10 V 4 L 4 1 H 13 L 15 3 H 48 L 51 6 V 58 L 48 61 H 5 L 2 58 Z"
                          fill="#4ba3e3"
                        />

                        {/* Central Chunky Dark Navy Mechanical C */}
                        <path
                          d="M 39 11 H 14 V 53 H 39 V 41 H 27 V 23 H 39 Z"
                          fill="#09182b"
                        />

                        {/* Left Outer Bracket Line */}
                        <path
                          d="M 10 8 H 6 V 56 H 10"
                          stroke="#09182b"
                          strokeWidth="2.5"
                          strokeLinecap="square"
                        />

                        {/* Chevrons on Left Spine */}
                        <path
                          d="M 7 17 L 12 21 L 7 25"
                          stroke="#09182b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 7 47 L 12 43 L 7 39"
                          stroke="#09182b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* 3 Tech Tick Marks on Spine */}
                        <line x1="7" y1="29" x2="11" y2="29" stroke="#09182b" strokeWidth="1.5" />
                        <line x1="7" y1="32" x2="11" y2="32" stroke="#09182b" strokeWidth="1.5" />
                        <line x1="7" y1="35" x2="11" y2="35" stroke="#09182b" strokeWidth="1.5" />

                        {/* Right Chevrons pointing into C mouth */}
                        <path
                          d="M 40 16 L 34 20 L 40 24"
                          stroke="#09182b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 40 48 L 34 44 L 40 40"
                          stroke="#09182b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Top and Bottom Stencil Gap Slits */}
                        <line x1="21" y1="5" x2="21" y2="18" stroke="#4ba3e3" strokeWidth="2.5" />
                        <line x1="21" y1="46" x2="21" y2="59" stroke="#4ba3e3" strokeWidth="2.5" />

                        {/* Inner Cyan Blueprint Wireframe Line */}
                        <path
                          d="M 36 17 H 19 V 47 H 36"
                          stroke="#4ba3e3"
                          strokeWidth="1.8"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* [ODE] Box with Industrial Letters (Theme-Reactive) */}
                    <div className="collage-ode-box">
                      {/* O with 3 dots on top bar */}
                      <svg viewBox="0 0 40 52" fill="none" className="ode-letter letter-o" aria-hidden="true">
                        <path
                          className="ode-glyph"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M 10 0 H 30 L 40 10 V 42 L 30 52 H 10 L 0 42 V 10 Z M 13 14 H 27 V 38 H 13 Z"
                        />
                        <circle cx="15" cy="7" r="2.2" className="ode-dot" />
                        <circle cx="20" cy="7" r="2.2" className="ode-dot" />
                        <circle cx="25" cy="7" r="2.2" className="ode-dot" />
                      </svg>

                      {/* D with chamfered right corners */}
                      <svg viewBox="0 0 40 52" fill="none" className="ode-letter letter-d" aria-hidden="true">
                        <path
                          className="ode-glyph"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M 0 0 H 26 L 40 14 V 38 L 26 52 H 0 Z M 13 13 H 20 L 27 20 V 32 L 20 39 H 13 Z"
                        />
                      </svg>

                      {/* E chunky block */}
                      <svg viewBox="0 0 38 52" fill="none" className="ode-letter letter-e" aria-hidden="true">
                        <path
                          className="ode-glyph"
                          d="M 0 0 H 38 V 13 H 13 V 20 H 33 V 32 H 13 V 39 H 38 V 52 H 0 Z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* WORD 2: BY */}
                  <div className="collage-by-wrap" title="BY">
                    <span className="text-by">BY</span>
                  </div>

                  {/* WORD 3: DUYBAO (Side-by-side with CODE BY on the same line) */}
                  <div className="collage-word word-duybao" title="DUYBAO">
                    {/* Giant Sky-Blue 3D Block Letters (DUY) */}
                    <div className="collage-duy-block">DUY</div>

                    {/* Boxed Word (BAO) - Street Graffiti Slap Tag */}
                    <div className="collage-boxed-word graffiti-badge" title="BAO">
                      {/* Graffiti Typography */}
                      <span className="char-graffiti-bao">BAO</span>

                      {/* Street Tag Spray Drip Underline */}
                      <svg
                        className="graffiti-drip-swoosh"
                        viewBox="0 0 68 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 2 3 Q 34 10 66 4"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <path d="M 20 6 Q 21 11 22 11 Q 23 11 24 6 Z" fill="currentColor" />
                        <path d="M 46 6.5 Q 47 11.5 48 11.5 Q 49 11.5 50 6.5 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </h1>
              </div>

              {/* Exact 1:1 Role Typography from Video:
                  Line 1: FULLSTACK (Fredoka Blue) DEVELOPER (Fredoka White)
                  Line 2: & SOFTWARE (Saira Stencil White) [ENGINEER] (Fredoka Blue in Figma vector box with 8 handles) */}
              <div className="hero-role-block">
                <div className="role-line-1">
                  <span className="role-fredoka-blue">FULLSTACK</span>
                  <span className="role-fredoka-white">DEVELOPER</span>
                </div>
                <div className="role-line-2">
                  <span className="role-amp">&amp;</span>
                  <span className="role-stencil-text">SOFTWARE</span>
                  <span className="role-fredoka-blue role-engineer-float">ENGINEER</span>
                </div>
              </div>

              <p className="hero-bio">
                I build exceptional, high-performing digital experiences, clean web interfaces,
                <br className="desktop-bio-break" />
                and robust backend systems with modern technologies.
              </p>

              <div className="hero-cta-group">
                <button
                  className="btn-primary"
                  onClick={() => scrollToSection("projects")}
                >
                  <span>View Projects</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  className="btn-outline"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playCyberClick(820, 0.02)}
                >
                  <span>Download CV</span>
                  <ArrowDown size={15} />
                </a>
              </div>

              {/* 3 Separate Stat Cards with Figma Selection Handles (Exact 1:1 Reference) */}
              <div className="hero-stats-cards-grid hero-load-stats">
                {/* Card 1: 5+ Satisfied Clients */}
                <div className="stat-card">
                  <span className="figma-handle handle-tl" aria-hidden="true" />
                  <span className="figma-handle handle-tc" aria-hidden="true" />
                  <span className="figma-handle handle-tr" aria-hidden="true" />
                  <span className="figma-handle handle-br" aria-hidden="true" />
                  <span className="figma-handle handle-bc" aria-hidden="true" />
                  <span className="figma-handle handle-bl" aria-hidden="true" />
                  <div className="stat-icon-wrap">
                    <Sparkles size={18} className="stat-icon-svg" />
                  </div>
                  <div className="stat-text-group">
                    <span className="stat-num">5+</span>
                    <span className="stat-label">SATISFIED CLIENTS</span>
                  </div>
                </div>

                {/* Card 2: 10+ Completed Projects */}
                <div className="stat-card">
                  <span className="figma-handle handle-tl" aria-hidden="true" />
                  <span className="figma-handle handle-tc" aria-hidden="true" />
                  <span className="figma-handle handle-tr" aria-hidden="true" />
                  <span className="figma-handle handle-br" aria-hidden="true" />
                  <span className="figma-handle handle-bc" aria-hidden="true" />
                  <span className="figma-handle handle-bl" aria-hidden="true" />
                  <div className="stat-icon-wrap">
                    <Briefcase size={18} className="stat-icon-svg" />
                  </div>
                  <div className="stat-text-group">
                    <span className="stat-num">10+</span>
                    <span className="stat-label">COMPLETED PROJECTS</span>
                  </div>
                </div>

                {/* Card 3: 20+ Technologies */}
                <div className="stat-card">
                  <span className="figma-handle handle-tl" aria-hidden="true" />
                  <span className="figma-handle handle-tc" aria-hidden="true" />
                  <span className="figma-handle handle-tr" aria-hidden="true" />
                  <span className="figma-handle handle-br" aria-hidden="true" />
                  <span className="figma-handle handle-bc" aria-hidden="true" />
                  <span className="figma-handle handle-bl" aria-hidden="true" />
                  <div className="stat-icon-wrap">
                    <Terminal size={18} className="stat-icon-svg" />
                  </div>
                  <div className="stat-text-group">
                    <span className="stat-num">20+</span>
                    <span className="stat-label">TECHNOLOGIES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual (Hero Portrait + LET'S CONNECT Combined) */}
            <div className="hero-right">
              <div className="avatar-panel-group">
                <div className="hologram-card tech-bracket-box">
                  <div className="bracket-tl" />
                  <div className="bracket-tr" />
                  <div className="bracket-bl" />
                  <div className="bracket-br" />

                  {/* 12 CAD Registration Tick Marks on Card Borders (Exact Video Replica) */}
                  <div className="border-tick tick-top-1" />
                  <div className="border-tick tick-top-2" />
                  <div className="border-tick tick-top-3" />
                  <div className="border-tick tick-bottom-1" />
                  <div className="border-tick tick-bottom-2" />
                  <div className="border-tick tick-bottom-3" />
                  <div className="border-tick tick-left-1" />
                  <div className="border-tick tick-left-2" />
                  <div className="border-tick tick-left-3" />
                  <div className="border-tick tick-right-1" />
                  <div className="border-tick tick-right-2" />
                  <div className="border-tick tick-right-3" />

                  <div className="avatar-screen-wrapper">
                    <div className="avatar-grid-overlay" />
                    <div className="avatar-photo-frame">
                      <img
                        src={USER_INFO.avatarUrl}
                        alt="Duy Bảo (DevBaor)"
                        className="hero-avatar-photo"
                      />
                    </div>
                  </div>
                </div>

                {/* Combined LET'S CONNECT Panel directly under Avatar */}
                <div className="avatar-connect-card tech-bracket-box">
                  <div className="bracket-tl" />
                  <div className="bracket-tr" />
                  <div className="bracket-bl" />
                  <div className="bracket-br" />

                  <div className="avatar-connect-header">
                    <span className="connect-title">
                      <MessageSquareMore size={14} className="connect-title-icon" />
                      LET'S CONNECT:
                    </span>
                  </div>

                  <div className="connect-buttons-row">
                    <a
                      className="connect-pill"
                      href={`mailto:${USER_INFO.email}`}
                      onClick={() => playCyberClick(700, 0.02)}
                    >
                      <Mail size={13} />
                      <span>Email</span>
                    </a>
                    <a
                      className="connect-pill"
                      href={USER_INFO.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playCyberClick(700, 0.02)}
                    >
                      <Linkedin size={13} />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      className="connect-pill"
                      href={USER_INFO.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playCyberClick(700, 0.02)}
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ABOUT SECTION
            ============================================================ */}
        <section id="about" className="section-container reveal" style={{ paddingTop: 30 }}>
          <div className="about-simple">
            <div className="about-simple-intro">
              <span className="section-pretitle">ABOUT ME</span>
              <h2 className="section-title">Building useful software with care.</h2>
              <p>
                I'm a Software Engineer focused on high-performing backend systems, modern web applications, and AI-driven solutions. I enjoy turning complex problems into clear, reliable products.
              </p>
              <p>
                Based in Ho Chi Minh City, I am available for full-time roles, freelance work, and collaboration on thoughtful software projects.
              </p>
              <a
                className="btn-outline about-contact-link"
                href={`mailto:${USER_INFO.email}`}
                onClick={() => playCyberClick(720, 0.015)}
              >
                <Mail size={15} />
                <span>Get in touch</span>
              </a>
            </div>

            <div className="about-simple-details">
              <article className="about-info-card">
                <h3>Profile</h3>
                <dl>
                  <div><dt>Role</dt><dd>Fullstack Developer &amp; Software Engineer</dd></div>
                  <div><dt>Location</dt><dd>{USER_INFO.location}</dd></div>
                  <div><dt>Email</dt><dd><a href={`mailto:${USER_INFO.email}`}>{USER_INFO.email}</a></dd></div>
                </dl>
              </article>
              <article className="about-info-card">
                <h3>Core skills</h3>
                <div className="about-skill-list">
                  <span>.NET / C#</span>
                  <span>React</span>
                  <span>Laravel</span>
                  <span>Python</span>
                  <span>Flutter</span>
                  <span>SQL</span>
                </div>
              </article>
              <article className="about-info-card about-education-card">
                <h3>Education</h3>
                <p>B.Sc. in Information Technology, Software Engineering — Ho Chi Minh City University of Industry and Trade (HUIT).</p>
              </article>
            </div>
          </div>

          <div className="ide-window tech-bracket-box about-legacy" aria-hidden="true">
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            {/* Window Titlebar */}
            <div className="ide-titlebar">
              <div className="window-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>

              <div className="ide-tabs">
                <div className="ide-tab ide-center-title">ABOUT_ME.EXE</div>
              </div>

              <div style={{ width: 47 }} />
            </div>

            {/* Path indicator */}
            <div className="ide-path-bar reveal-stagger">
              Path:{" "}
              <span>
                C:/portfolio/about_me/
                {openAboutFiles.length === 0
                  ? "(none open)"
                  : openAboutFiles.length === 1
                    ? openAboutFiles[0]
                    : `[${openAboutFiles.join(", ")}]`}
              </span>
            </div>

            {/* Window Body (Split Pane) */}
            <div className="ide-body">
              {/* Directories Sidebar */}
              <div className="ide-sidebar">
                <div className="sidebar-header-row">
                  <span className="sidebar-title">DIRECTORIES</span>
                </div>
                <button
                  className={`file-item-btn ${openAboutFiles.includes("bio.md") ? "active" : ""}`}
                  onClick={(e) => {
                    playCyberClick(740, 0.03);
                    gsap.timeline()
                      .to(e.currentTarget, { scale: 0.95, duration: 0.08, ease: "power2.in" })
                      .to(e.currentTarget, { scale: 1, duration: 0.16, ease: "back.out(2)" });
                    handleToggleAboutFile("bio.md");
                  }}
                >
                  {openAboutFiles.includes("bio.md") && (
                    <>
                      <span className="file-bracket-tl" />
                      <span className="file-bracket-tr" />
                      <span className="file-bracket-bl" />
                      <span className="file-bracket-br" />
                    </>
                  )}
                  <FileText size={15} />
                  <span>bio.md</span>
                  {openAboutFiles.includes("bio.md") && (
                    <span className="file-open-indicator">●</span>
                  )}
                </button>
                <button
                  className={`file-item-btn ${openAboutFiles.includes("education.md") ? "active" : ""}`}
                  onClick={(e) => {
                    playCyberClick(740, 0.03);
                    gsap.timeline()
                      .to(e.currentTarget, { scale: 0.95, duration: 0.08, ease: "power2.in" })
                      .to(e.currentTarget, { scale: 1, duration: 0.16, ease: "back.out(2)" });
                    handleToggleAboutFile("education.md");
                  }}
                >
                  {openAboutFiles.includes("education.md") && (
                    <>
                      <span className="file-bracket-tl" />
                      <span className="file-bracket-tr" />
                      <span className="file-bracket-bl" />
                      <span className="file-bracket-br" />
                    </>
                  )}
                  <FileText size={15} />
                  <span>education.md</span>
                  {openAboutFiles.includes("education.md") && (
                    <span className="file-open-indicator">●</span>
                  )}
                </button>
                <button
                  className={`file-item-btn ${openAboutFiles.includes("location.md") ? "active" : ""}`}
                  onClick={(e) => {
                    playCyberClick(740, 0.03);
                    gsap.timeline()
                      .to(e.currentTarget, { scale: 0.95, duration: 0.08, ease: "power2.in" })
                      .to(e.currentTarget, { scale: 1, duration: 0.16, ease: "back.out(2)" });
                    handleToggleAboutFile("location.md");
                  }}
                >
                  {openAboutFiles.includes("location.md") && (
                    <>
                      <span className="file-bracket-tl" />
                      <span className="file-bracket-tr" />
                      <span className="file-bracket-bl" />
                      <span className="file-bracket-br" />
                    </>
                  )}
                  <Folder size={15} />
                  <span>location.md</span>
                  {openAboutFiles.includes("location.md") && (
                    <span className="file-open-indicator">●</span>
                  )}
                </button>
              </div>

              {/* Multi-Open Content Area (Accordion / Multi-file view) */}
              <div className="ide-content-area" ref={ideContentRef}>
                {openAboutFiles.length === 0 ? (
                  <div className="ide-empty-pane reveal">
                    <Terminal size={36} style={{ color: "#38bdf8", opacity: 0.8 }} />
                    <div className="empty-title">// ALL FILES CLOSED</div>
                    <p className="empty-desc">
                      Select any file from DIRECTORIES on the left (bio.md, education.md, location.md) to inspect.
                    </p>
                    <button
                      className="btn-primary"
                      style={{ marginTop: 8, padding: "8px 18px", fontSize: 12 }}
                      onClick={() => handleToggleAboutFile("bio.md")}
                    >
                      <span>Open bio.md</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {openAboutFiles.includes("bio.md") && (
                      <div id="ide-file-bio-md" className="ide-file-panel reveal-stagger">
                        <div className="ide-content-pane">
                          <div className="ide-scanline-beam" />
                          <div className="content-left">
                            <div className="active-file-tag">// ACTIVE FILE: BIO.MD</div>
                            <h3 className="content-heading">Hello, World.</h3>
                            <p className="content-paragraph">
                              I’m a recent graduate passionate about software development and web technologies. I enjoy creating practical applications, exploring new technologies, and continuously improving my skills through real-world projects.

                            </p>

                            <div className="metadata-table">
                              <div className="meta-row">
                                <span className="meta-key">File type:</span>
                                <span className="meta-val">Markdown Document</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Role:</span>
                                <span className="meta-val">Fullstack Developer &amp; Software Engineer</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Developer:</span>
                                <span className="meta-val">
                                  <a
                                    href={USER_INFO.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "var(--text)", textDecoration: "underline" }}
                                  >
                                    {USER_INFO.name} (@{USER_INFO.handle})
                                  </a>
                                </span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Status:</span>
                                <span className="meta-val status-pill">
                                  <span className="pulse-dot" />
                                  <span>Available for hire / collaboration</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Retro CRT Terminal Monitor with prominent tech stack & CAD framing */}
                          <div className="about-graphic-frame tech-bracket-box">
                            <div className="bracket-tl" />
                            <div className="bracket-tr" />
                            <div className="bracket-bl" />
                            <div className="bracket-br" />

                            <div className="crt-monitor-shell">
                              <div className="crt-screen">
                                <div className="terminal-snippet">
                                  <span style={{ color: "#ff7b72" }}>const</span> <span style={{ color: "#79c0ff" }}>developer</span> = &#123;
                                  <br />
                                  &nbsp;&nbsp;<span style={{ color: "#79c0ff" }}>name</span>: <span style={{ color: "#a5d6ff" }}>"Bảo Trần Duy"</span>,
                                  <br />
                                  &nbsp;&nbsp;<span style={{ color: "#79c0ff" }}>handle</span>: <span style={{ color: "#a5d6ff" }}>"DevBaor"</span>,

                                  <br />
                                  &nbsp;&nbsp;<span style={{ color: "#79c0ff" }}>coreStack</span>: [
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#a5d6ff" }}>".NET 8 / C# (WPF)"</span>,
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#a5d6ff" }}>"PHP / Laravel 10"</span>,
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#a5d6ff" }}>"Python (AI / PyTorch)"</span>,
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#a5d6ff" }}>"Flutter / Dart"</span>,
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#a5d6ff" }}>"React / Next.js"</span>
                                  <br />
                                  &nbsp;&nbsp;],
                                  <br />
                                  &nbsp;&nbsp;<span style={{ color: "#79c0ff" }}>specialties</span>: [
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#7ee787" }}>"Deep RL (Dueling DQN)"</span>,
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#7ee787" }}>"Desktop Architecture"</span>
                                  <br />
                                  &nbsp;&nbsp;],
                                  <br />
                                  &nbsp;&nbsp;<span style={{ color: "#79c0ff" }}>available</span>: <span style={{ color: "#ff7b72" }}>true</span>
                                  <br />
                                  &#125;;
                                  <br />
                                  <br />
                                  <span style={{ color: "#79c0ff" }}>console</span>.<span style={{ color: "#ff7b72" }}>log</span>(<span style={{ color: "#a5d6ff" }}>"Ready to build high-performance software."</span>);
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {openAboutFiles.includes("education.md") && (
                      <div id="ide-file-education-md" className="ide-file-panel reveal-stagger">
                        <div className="ide-content-pane">
                          <div className="ide-scanline-beam" />
                          <div className="content-left">
                            <div className="active-file-tag">// ACTIVE FILE: EDUCATION.MD</div>
                            <h3 className="content-heading">Academic Credentials.</h3>
                            <p className="content-paragraph">
                              Graduated with a <strong>Bachelor of Science in Information Technology</strong>, specializing in <strong>Software Engineering</strong> from <strong>Ho Chi Minh City University of Industry and Trade (HUIT)</strong>. Passionate about object-oriented software architecture, distributed systems, and applied AI (Deep Reinforcement Learning).
                            </p>

                            <div className="metadata-table">
                              <div className="meta-row">
                                <span className="meta-key">Institution:</span>
                                <span className="meta-val">HCMC University of Industry and Trade (HUIT)</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Degree:</span>
                                <span className="meta-val">Bachelor of Science in IT (B.Sc. IT)</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Major:</span>
                                <span className="meta-val highlight-major">Software Engineering</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Graduation Thesis:</span>
                                <span className="meta-val">Smart Boarding House (Dueling DQN &amp; Laravel)</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Status:</span>
                                <span className="meta-val status-pill">
                                  <span className="pulse-dot" />
                                  <span>Graduated • Software Engineer</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="about-graphic-frame tech-bracket-box">
                            <div className="bracket-tl" />
                            <div className="bracket-tr" />
                            <div className="bracket-bl" />
                            <div className="bracket-br" />

                            <div className="academic-preview">
                              <div className="academic-badge-top">
                                <span className="huit-tag">HUIT // EST. 1982</span>
                              </div>

                              {/* Real HUIT Campus Photo Frame */}
                              <div className="academic-campus-frame">
                                <img
                                  src="/huit_campus.jpg"
                                  alt="Ho Chi Minh City University of Industry and Trade (HUIT)"
                                  className="academic-campus-img"
                                  loading="lazy"
                                />
                                <div className="academic-campus-overlay" />
                                <div className="academic-campus-hud">
                                  <span><span className="academic-campus-hud-dot" />HUIT MAIN CAMPUS</span>
                                  <span>TAN PHU, HCMC</span>
                                </div>
                              </div>

                              <h4>Ho Chi Minh City University of Industry and Trade</h4>
                              <div className="academic-degree-badge">B.Sc. in IT — Software Engineering</div>
                              <p className="academic-sub">
                                Rigorous curriculum focusing on software architecture, algorithms, database management, and hands-on system engineering.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {openAboutFiles.includes("location.md") && (
                      <div id="ide-file-location-md" className="ide-file-panel reveal-stagger">
                        <div className="ide-content-pane">
                          <div className="ide-scanline-beam" />
                          <div className="content-left">
                            <div className="active-file-tag">// ACTIVE FILE: LOCATION.MD</div>
                            <h3 className="content-heading">Geographic Node.</h3>
                            <p className="content-paragraph">
                              Operating from <strong>Ho Chi Minh City, Vietnam</strong>. With full availability for remote collaboration globally.
                            </p>

                            <div className="metadata-table">
                              <div className="meta-row">
                                <span className="meta-key">Base Station:</span>
                                <span className="meta-val">Ho Chi Minh City, Vietnam (SGN)</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Coordinates:</span>
                                <span className="meta-val highlight-major">10.8231° N, 106.6297° E</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Standard Time:</span>
                                <span className="meta-val">Indochina Time (UTC+07:00)</span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Live Node Clock:</span>
                                <span className="meta-val cyber-time-val">
                                  <span className="clock-sync-dot" />
                                  {vietnamTime} ICT
                                </span>
                              </div>
                              <div className="meta-row">
                                <span className="meta-key">Availability:</span>
                                <span className="meta-val status-pill">
                                  <span className="pulse-dot" />
                                  <span>Online • Remote &amp; Hybrid Ready</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Tactical Vietnam & Ho Chi Minh City Cyber Map HUD */}
                          <div className="about-graphic-frame tech-bracket-box">
                            <div className="bracket-tl" />
                            <div className="bracket-tr" />
                            <div className="bracket-bl" />
                            <div className="bracket-br" />

                            <div className="geo-preview">
                              {/* Header HUD Tag */}
                              <div className="geo-hud-header">
                                <div className="geo-hud-badge">
                                  <span className="geo-dot-live" />
                                  <span>NODE // VN-SGN-084</span>
                                </div>
                                {/* <span className="geo-hud-coords">10°49'N 106°37'E</span>*/}
                              </div>

                              {/* Vietnam & HCMC Cyber Vector Map */}
                              <div className="geo-map-viewport">
                                <svg className="hcmc-cyber-map" viewBox="0 0 240 220" fill="none">
                                  <defs>
                                    <pattern id="cyberGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
                                    </pattern>
                                    <radialGradient id="hcmcGlow" cx="50%" cy="50%" r="50%">
                                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                                      <stop offset="40%" stopColor="#00f0ff" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                                    </radialGradient>
                                  </defs>

                                  {/* Cyber Tech Grid */}
                                  <rect width="240" height="220" fill="url(#cyberGrid)" />

                                  {/* Coordinate Crosshair Gridlines */}
                                  <line x1="16" y1="152" x2="224" y2="152" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" strokeWidth="0.8" />
                                  <line x1="130" y1="14" x2="130" y2="206" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" strokeWidth="0.8" />
                                  <text x="20" y="148" fill="rgba(56, 189, 248, 0.55)" fontSize="6.5" fontFamily="JetBrains Mono">LAT 10°49'N</text>
                                  <text x="133" y="24" fill="rgba(56, 189, 248, 0.55)" fontSize="6.5" fontFamily="JetBrains Mono">LON 106°37'E</text>

                                  {/* Vietnam S-Shape Archipelago & Topology Dots */}
                                  {/* Northern Vietnam */}
                                  <g fill="#38bdf8" opacity="0.65">
                                    <circle cx="82" cy="36" r="2.5" />
                                    <circle cx="92" cy="32" r="3" />
                                    <circle cx="104" cy="34" r="3.5" />
                                    <circle cx="96" cy="42" r="3" />
                                    <circle cx="108" cy="42" r="3.5" />
                                    <circle cx="120" cy="45" r="2.8" />
                                    <circle cx="102" cy="52" r="3.5" />
                                    <circle cx="114" cy="54" r="3" />
                                    <circle cx="124" cy="76" r="3" />
                                    <circle cx="132" cy="86" r="3.2" />

                                    {/* Central Vietnam (Hue, Da Nang, Quang Nam) */}
                                    <circle cx="142" cy="96" r="3.5" />
                                    <circle cx="148" cy="107" r="3.5" />
                                    <circle cx="152" cy="118" r="3.5" />

                                    {/* South Central Coast & Highlands */}
                                    <circle cx="144" cy="129" r="3.5" />
                                    <circle cx="155" cy="134" r="3.2" />
                                    <circle cx="140" cy="142" r="3.8" />
                                    <circle cx="150" cy="146" r="3.5" />

                                    {/* Southeast & Mekong Delta */}
                                    <circle cx="118" cy="164" r="3.8" />
                                    <circle cx="110" cy="174" r="3.5" />
                                    <circle cx="114" cy="184" r="3.2" />
                                    <circle cx="102" cy="192" r="3" />

                                    {/* Paracel Islands (Hoàng Sa) */}
                                    <circle cx="190" cy="92" r="2" opacity="0.8" />
                                    <circle cx="196" cy="96" r="1.8" opacity="0.8" />
                                    <text x="178" y="86" fill="rgba(56, 189, 248, 0.55)" fontSize="5.5" fontFamily="JetBrains Mono">PARACEL</text>

                                    {/* Spratly Islands (Trường Sa) */}
                                    <circle cx="195" cy="165" r="2" opacity="0.8" />
                                    <circle cx="204" cy="174" r="2.2" opacity="0.8" />
                                    <circle cx="198" cy="182" r="1.8" opacity="0.8" />
                                    <text x="180" y="160" fill="rgba(56, 189, 248, 0.55)" fontSize="5.5" fontFamily="JetBrains Mono">SPRATLY</text>
                                  </g>

                                  {/* Spine Contour Connecting Line */}
                                  <path
                                    d="M 92 32 Q 108 42 102 52 T 124 76 T 142 96 T 152 118 T 130 152 T 114 184 T 102 192"
                                    fill="none"
                                    stroke="rgba(56, 189, 248, 0.25)"
                                    strokeWidth="1.2"
                                    strokeDasharray="2 2"
                                  />

                                  {/* HO CHI MINH CITY (SGN) - PROMINENT GLOWING BEACON */}
                                  <g transform="translate(130, 152)">
                                    {/* Glowing radial halo */}
                                    <circle cx="0" cy="0" r="16" fill="url(#hcmcGlow)" opacity="0.5" />
                                    {/* Expanding concentric pulse rings (no spinning sweep) */}
                                    <circle cx="0" cy="0" r="12" stroke="#00f0ff" strokeWidth="1" opacity="0.5">
                                      <animate attributeName="r" values="7;18;7" dur="2.8s" repeatCount="indefinite" />
                                      <animate attributeName="opacity" values="0.85;0;0.85" dur="2.8s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="0" cy="0" r="6" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2">
                                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Center core point */}
                                    <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
                                    <circle cx="0" cy="0" r="1.8" fill="#00f0ff" />

                                    {/* HUD Crosshairs */}
                                    <line x1="-11" y1="0" x2="-5" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
                                    <line x1="5" y1="0" x2="11" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
                                    <line x1="0" y1="-11" x2="0" y2="-5" stroke="#00f0ff" strokeWidth="1.2" />
                                    <line x1="0" y1="5" x2="0" y2="11" stroke="#00f0ff" strokeWidth="1.2" />

                                    {/* Callout Pointer Box */}
                                    <polyline points="4,-4 18,-18 76,-18" fill="none" stroke="#00f0ff" strokeWidth="1" />
                                    <rect x="18" y="-30" width="76" height="12" fill="rgba(2, 8, 22, 0.9)" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="0.8" rx="2" />
                                    <text x="22" y="-21" fill="#00f0ff" fontSize="7" fontFamily="JetBrains Mono" fontWeight="700">HO CHI MINH (SGN)</text>
                                  </g>
                                </svg>
                              </div>

                              {/* Bottom Telemetry HUD Matrix */}
                              <div className="geo-telemetry-hud">
                                <div className="telemetry-stat">
                                  <span className="stat-label">HUB</span>
                                  <span className="stat-value">SGN // VN</span>
                                </div>
                                <div className="telemetry-stat">
                                  <span className="stat-label">LOCAL TIME</span>
                                  <span className="stat-value text-cyan">{vietnamTime}</span>
                                </div>
                                <div className="telemetry-stat">
                                  <span className="stat-label">TIMEZONE</span>
                                  <span className="stat-value">UTC+7 ICT</span>
                                </div>
                                <div className="telemetry-stat">
                                  <span className="stat-label">STATUS</span>
                                  <span className="stat-value text-green">
                                    <span className="ping-dot" /> ACTIVE
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROJECTS SECTION ("Featured Projects" - DUY BAO'S TOP WORK)
            ============================================================ */}
        <section id="projects" className="section-container reveal">
          <div className="projects-topbar">
            <div>
              <span className="section-pretitle">FEATURED WORKS</span>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <a
              href={`${USER_INFO.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="view-all-link"
              onClick={() => playCyberClick(820, 0.02)}
            >
              <span>View All Projects →</span>
            </a>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="project-card tech-bracket-box"
                onClick={(e) => {
                  playCyberClick(760, 0.025);
                  gsap.timeline()
                    .to(e.currentTarget, { scale: 0.97, duration: 0.08, ease: "power2.in" })
                    .to(e.currentTarget, {
                      scale: 1,
                      duration: 0.16,
                      ease: "back.out(2)",
                      onComplete: () => setSelectedProject(proj)
                    });
                }}
              >
                <div className="bracket-tl" />
                <div className="bracket-tr" />
                <div className="bracket-bl" />
                <div className="bracket-br" />

                {/* Preview Graphic */}
                <div className="project-preview-wrap">
                  <div className="project-mockup-content">
                    {proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="project-preview-img"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        {proj.mockupType === "thesis" && <ThesisMockup />}
                        {proj.mockupType === "baotools" && <BaoToolsMockup />}
                        {proj.mockupType === "expense" && <ExpenseMockup />}
                      </>
                    )}
                  </div>
                  <div className="project-hover-overlay">
                    <span className="project-view-badge">CLICK FOR DETAILS ↗</span>
                  </div>
                </div>

                {/* Info Wrap */}
                <div className="project-info-wrap">
                  <h3 className="project-card-title">{proj.title}</h3>
                  <p className="project-card-desc">{proj.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SERVICES SECTION ("SERVICES OFFERED - Services & Solutions")
            ============================================================ */}
        <section id="services" className="section-container reveal">
          <div>
            <span className="section-pretitle">SERVICES OFFERED</span>
            <h2 className="section-title">Services &amp; Solutions</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((srv) => (
              <div key={srv.id} className={`service-cell theme-${srv.theme}`}>
                <div className="service-cell-bracket bracket-tl" />
                <div className="service-cell-bracket bracket-tr" />
                <div className="service-cell-bracket bracket-bl" />
                <div className="service-cell-bracket bracket-br" />

                <div className={`service-card-content ${srv.hasBox ? "has-box" : "is-flat"}`}>
                  <div className="service-card-body">
                    <div className="service-header">
                      <span className="service-category">{srv.category}</span>
                      <span className="service-num">{srv.num}</span>
                    </div>

                    <h3 className="service-title">{srv.title}</h3>
                    <p className="service-desc">{srv.desc}</p>
                  </div>

                  <button
                    className="service-details-btn"
                    onClick={(e) => {
                      playCyberClick(750, 0.025);
                      gsap.timeline()
                        .to(e.currentTarget, { scale: 0.94, duration: 0.08 })
                        .to(e.currentTarget, {
                          scale: 1,
                          duration: 0.16,
                          ease: "back.out(2)",
                          onComplete: () => setSelectedService(srv)
                        });
                    }}
                  >
                    [Click to view details]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SKILLS SECTION ("TECH STACK & TOOLS - My Expertise")
            ============================================================ */}
        <section id="skills" className="section-container reveal">
          <div>
            <span className="section-pretitle">TECH STACK &amp; TOOLS</span>
            <h2 className="section-title">My Expertise</h2>
          </div>

          <div className="skills-wrapper-box tech-bracket-box">
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            {/* Left Category Selector */}
            <div className="skills-cat-list">
              {Object.entries(SKILLS_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  className={`cat-btn ${activeSkillCategory === key ? "active" : ""}`}
                  onClick={() => {
                    playCyberClick(820, 0.02);
                    setActiveSkillCategory(key);
                  }}
                >
                  <div className="cat-left-group">
                    <Folder size={15} />
                    <span>{cat.label}</span>
                  </div>
                  <span className="cat-count-badge">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Right Tech Cards Grid with Corner Brackets ON EACH CARD */}
            <div ref={skillsGridRef} className="skills-grid-display" key={activeSkillCategory}>
              {SKILLS_CATEGORIES[activeSkillCategory].items.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-icon-card tech-bracket-box"
                  onMouseEnter={() => playCyberClick(940, 0.012)}
                >
                  <div className="bracket-tl" />
                  <div className="bracket-tr" />
                  <div className="bracket-bl" />
                  <div className="bracket-br" />

                  <div className="tech-icon-svg-box">{tech.icon}</div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER / CONTACT ("Let's Build Together")
          ============================================================ */}
      <footer id="contact" className="footer-section reveal">
        <div className="footer-accent-line" />
        <div className="footer-ambient-glow" />

        <div className="footer-content tech-bracket-box">
          <div className="bracket-tl" />
          <div className="bracket-tr" />
          <div className="bracket-bl" />
          <div className="bracket-br" />

          {/* Col 1: System Identity & Live Telemetry */}
          <div className="footer-left">
            <div className="footer-badge-line">
              <span className="footer-badge-dot" />
              <span className="footer-badge-sub">SYSTEM IDENTITY</span>
            </div>

            <h3 className="footer-brand-title">Let's Build Together.</h3>
            <p className="footer-tagline">
              Fresh Graduate | Aspiring Software Engineer | .NET &amp; Full‑Stack Enthusiast | AI Deep RL Learner | Based in Ho Chi Minh City
            </p>

            <div className="footer-status-pill">
              <span className="pulse-dot" />
              <span>STATUS: AVAILABLE FOR WORK &amp; COLLABORATION</span>
            </div>
          </div>

          {/* Col 2: Tactical Navigation - Synchronized 1:1 with Navbar */}
          <div className="footer-mid">
            <div className="footer-col-header">
              <span className="footer-badge-dot" />
              <h4 className="footer-col-title">DIRECTORIES</h4>
            </div>
            <div className="footer-nav-list">
              <button
                className="footer-nav-link"
                onClick={() => scrollToSection("hero")}
              >
                <span className="nav-code">01</span>
                <span className="nav-label">HOME</span>
                <span className="nav-bracket">›</span>
              </button>
              <button
                className="footer-nav-link"
                onClick={() => scrollToSection("about")}
              >
                <span className="nav-code">02</span>
                <span className="nav-label">ABOUT</span>
                <span className="nav-bracket">›</span>
              </button>
              <button
                className="footer-nav-link"
                onClick={() => scrollToSection("projects")}
              >
                <span className="nav-code">03</span>
                <span className="nav-label">PROJECTS</span>
                <span className="nav-bracket">›</span>
              </button>
              <button
                className="footer-nav-link"
                onClick={() => scrollToSection("services")}
              >
                <span className="nav-code">04</span>
                <span className="nav-label">SERVICES</span>
                <span className="nav-bracket">›</span>
              </button>
              <button
                className="footer-nav-link"
                onClick={() => scrollToSection("skills")}
              >
                <span className="nav-code">05</span>
                <span className="nav-label">SKILLS</span>
                <span className="nav-bracket">›</span>
              </button>
            </div>
          </div>

          {/* Col 3: Direct Transmission & Contact Hub */}
          <div className="footer-right">
            <div className="footer-col-header">
              <span className="footer-badge-dot" />
              <h4 className="footer-col-title">DIRECT TRANSMISSION</h4>
            </div>

            {/* Quick Copy Email Widget */}
            <div className="footer-email-widget" onClick={handleCopyEmail} title="Click to copy email address">
              <div className="email-widget-head">
                <span className="email-widget-tag">OFFICIAL INBOX</span>
                <span className={`email-widget-status ${copiedEmail ? "status-copied" : ""}`}>
                  {copiedEmail ? "COPIED! ✓" : " "}
                </span>
              </div>
              <div className="email-widget-body">
                <span className="email-address-text">{USER_INFO.email}</span>
                <button
                  type="button"
                  className={`email-copy-btn ${copiedEmail ? "copied" : ""}`}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Glowing Primary CTA */}
            <button
              className="get-in-touch-btn"
              onClick={() => {
                playCyberClick(880, 0.02);
                setContactModalOpen(true);
              }}
              title="Open Direct Transmission Channel"
            >
              <Mail size={15} />
              <span>CONNECT WITH ME</span>
              <ExternalLink size={13} className="cta-arrow" />
            </button>

            {/* Branded Socials Row (GitHub, LinkedIn, Facebook) */}
            <div className="social-icons-wrapper">
              <span className="social-label">SOCIAL NETWORKS:</span>
              <div className="social-icons-row">
                <a
                  className="social-icon-btn gh-glow"
                  href={USER_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile (@DevBaor)"
                  onClick={() => playCyberClick(900, 0.015)}
                >
                  <Github size={18} />
                </a>
                <a
                  className="social-icon-btn li-glow"
                  href={USER_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  onClick={() => playCyberClick(900, 0.015)}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  className="social-icon-btn fb-glow"
                  href={USER_INFO.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook Profile"
                  onClick={() => playCyberClick(900, 0.015)}
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered Copyright */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} {USER_INFO.name} ({USER_INFO.handle}) • All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================
          INTERACTIVE MODALS
          ============================================================ */}

      {/* 1. Service Detail Modal */}
      {selectedService && (
        <div className="modal-backdrop" onClick={() => setSelectedService(null)}>
          <div
            className="modal-card tech-bracket-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            <button
              className="modal-close-btn"
              onClick={() => setSelectedService(null)}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="modal-header-tag">
              SERVICE {selectedService.num} // {selectedService.category}
            </div>
            <h3 className="modal-title">{selectedService.title}</h3>
            <p className="modal-body-text">{selectedService.desc}</p>

            <h4 style={{ fontFamily: "Chakra Petch", fontSize: 16, marginBottom: 8 }}>
              KEY DELIVERABLES &amp; SPECS:
            </h4>
            <div className="modal-spec-list">
              {selectedService.deliverables.map((item, idx) => (
                <div key={idx} className="modal-spec-item">
                  <CheckCircle2 size={16} className="modal-spec-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setSelectedService(null);
                setContactModalOpen(true);
              }}
            >
              <span>Inquire About This Service</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Project Detail Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-card tech-bracket-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="modal-header-tag">PROJECT // {selectedProject.category}</div>
            <h3 className="modal-title">{selectedProject.title}</h3>
            <p className="modal-body-text">{selectedProject.desc}</p>

            {selectedProject.image && (
              <div className="modal-project-preview">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-project-img"
                  loading="lazy"
                />
              </div>
            )}

            <h4 style={{ fontFamily: "Chakra Petch", fontSize: 16, marginBottom: 8 }}>
              ARCHITECTURE &amp; FEATURES:
            </h4>
            <div className="modal-spec-list">
              {selectedProject.features.map((feat, idx) => (
                <div key={idx} className="modal-spec-item">
                  <CheckCircle2 size={16} className="modal-spec-icon" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                <span>View Source Code</span>
                <Github size={14} />
              </a>
              <button
                className="btn-outline"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setSelectedProject(null)}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Contact / Get In Touch Modal */}
      {contactModalOpen && (
        <div className="modal-backdrop" onClick={() => setContactModalOpen(false)}>
          <div
            className="modal-card tech-bracket-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            <button
              className="modal-close-btn"
              onClick={() => setContactModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="modal-header-tag">// COMMS LINK</div>
            <h3 className="modal-title">Get In Touch</h3>
            <p className="modal-body-text">
              Have a project, software inquiry, or just want to connect? Send a direct message
              or email directly to <strong>{USER_INFO.email}</strong>.
            </p>

            {contactSent ? (
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  background: "var(--surface-raised)",
                  borderRadius: 4,
                  border: "1px solid var(--accent-green)"
                }}
              >
                <CheckCircle2
                  size={36}
                  style={{ color: "var(--accent-green)", margin: "0 auto 8px" }}
                />
                <h4 style={{ fontFamily: "Chakra Petch", fontSize: 18, color: "var(--text)" }}>
                  TRANSMISSION SENT
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                  Thank you! I will respond to your message shortly.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="your-email@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">MESSAGE / BRIEF</label>
                  <textarea
                    required
                    className="form-textarea"
                    placeholder="Tell me about your project or inquiry..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                >
                  <span>Transmit Message</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
