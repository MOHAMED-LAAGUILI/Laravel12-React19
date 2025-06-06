/* eslint-disable no-undef */

// npm packages
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ReactTyped } from "react-typed";

// icons
import {
  X,
  Moon,
  Search,
  PanelLeftOpen,
  ChevronDown,
  ChevronLeft,
  ChevronFirst,
  Sun,
  ChevronUp,
  Home,
  ArrowLeftToLine,
  PanelRightOpen,
} from "lucide-react";

// Layout Components
import SEO from "@Layout/SEO";
import Header from "@Layout/Header";
import Breadcrumb from "@Layout/Breadcrumb";
import SearchModal from "@Layout/SearchModal";
import MaximizedAside from "@Layout/MaximizedAside";
import MinimizedAside from "@Layout/MinimizedAside";
import BackToTopBtn from "@Layout/Back2Top";
import Footer from "@Layout/Footer";

// list Items
import { useMenuItems } from "@Layout/data/Aside/AsideItems";
import { ProfileMenuItems } from "@Layout/data/Aside/profileMenuItems";
import { headerFlags } from "@Layout/data/Header/HeaderFlags";
import { strings } from "@Layout/data/Header/SearchTypingString";

//libs
import useRouteName from "@Lib/useRouteName";
import getInitialLanguage from "@Lib/getInitialLang";
import { handleLanguageChange } from "@Lib/handleLanguageChange";
import { useTheme } from "@Lib/useTheme";
import { cn } from "@/lib/utils";
import { useStateContext } from "@Context/ContextProvider";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();


 

  const navigate = useNavigate();

  // States
  const { pageName, route } = useRouteName();
  const { isDarkMode, toggleThemeHandler } = useTheme();
  const { i18n, t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage());
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    const savedState = localStorage.getItem("asideState");
    return savedState !== null ? savedState === "minimized" : true;
  });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const location = useLocation();
  const langDropdownRef = useRef(null);
  const formattedTime = currentTime.toLocaleTimeString();
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const profileRef = useRef(null);
  const profileMenuRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const threshold = 200;

  const development = import.meta.env.VITE_ENVIRONMENT === "development";
  const AppName = development ? "Inpact" : __APP_NAME__;
  const AppLogo = !development && "/images/vite.ico";
  const AppVersion = !development && __APP_VERSION__;
  const itemRefs = useRef({});
  const popupRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const userImage = !development && "https://randomuser.me/api/portraits/men/1.jpg";
  const menuItems = useMenuItems();

  // Function to register refs for menu items minimized
  const registerItemRef = (index, ref) => {
    if (ref) itemRefs.current[index] = ref;
  };


  // UseEffects
  useEffect(() => {
    // Ensure i18n is set on mount and whenever language changes
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Save aside state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("asideState", isMinimized ? "minimized" : "maximized");
  }, [isMinimized]);

  useEffect(() => {
    document.title = `${AppName} | ${t(pageName)}`;

    // Try to find the main scrollable container
    const main = document.querySelector("main.overflow-auto");
    if (main) scrollContainerRef.current = main;
    else scrollContainerRef.current = window;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleClickOutside = (event) => {
      if (
        !document.getElementById("sidebar")?.contains(event.target) &&
        !event.target.closest("#sidebar-toggle")
      ) {
        setTimeout(() => setIsSidebarOpen(false), 150);
      }
      if (!langDropdownRef.current?.contains(event.target))
        setIsLangOpen(false);

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(interval);
    };
  }, [i18n, isProfileOpen, pageName, AppName, t]);

  useEffect(() => {
    const onScroll = () => {
      const main = document.querySelector("main.overflow-auto");
      const scrollTop = main
        ? main.scrollTop
        : window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollTop > threshold);
    };
    const main = document.querySelector("main.overflow-auto");
    (main || window).addEventListener("scroll", onScroll);
    onScroll();
    return () => (main || window).removeEventListener("scroll", onScroll);
  }, [threshold]);

  // Restore handleScroll2Top (was removed in last edit)
  const handleScroll2Top = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTo) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const seoProps = {
    title: `${AppName} | ${t(pageName)}`,
    AppLogo,
  };
  const asideProps = {
    AppName,
    AppLogo,
    AppVersion,
    openDropdown,
    setOpenDropdown,
    motion,
    ArrowLeftToLine,
    asideMenuItems: menuItems,
    ChevronDown,
    ChevronLeft,
    translator: t,
    Link,
    isSidebarOpen,
    setIsSidebarOpen,
    ChevronFirst,
    twMerge: cn,
    PanelLeftOpen,
    PanelRightOpen,
    X,
    profileMenuRef,
    profileRef,
    setIsProfileOpen,
    isProfileOpen,
    sectionTitleVisible: false,
    profileMenuItems: ProfileMenuItems,
    isMinimized,
    setIsMinimized,
    registerItemRef,
    hoveredItem,
    setHoveredItem,
    isHoveringPopup,
    popupRef,
    hoverTimeoutRef,
    setIsHoveringPopup,
    itemRefs,
    userImage,
    navigate,
    currentUser : user,
    setUser,
    setToken,
    route,
    React,
  };
  const headerProps = {
    isSidebarOpen,
    setIsSidebarOpen,
    isDarkMode,
    toggleTheme: toggleThemeHandler,
    isLangOpen,
    setIsLangOpen,
    handleLanguageChange,
    language,
    motion,
    Sun,
    Moon,
    Search,
    flags: headerFlags,
    langDropdownRef,
    isSearchModalOpen,
    setIsSearchModalOpen,
    PanelLeftOpen,
    Link,
    SearchModal,
    menuItems,
    X,
    t,
    i18n,
    setLanguage,
    toast,
    ReactTyped,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    isMinimized,
    setIsMinimized,
    strings,
  };
  const breadcrumbProps = {
    t,
    location,
    Link,
    Home,
  };
  const footerProps = {
    AppName,
    formattedTime,
    development,
    day,
    month,
    year,
  };
  const backToTopProps = {
    handleClick: handleScroll2Top,
    visible,
    threshold,
    AnimatePresence,
    motion,
    ChevronUp,
  };
 

  const Aside = isMinimized ? MinimizedAside : MaximizedAside;

  
  if (!user && !token ) {
    navigate("/login");
  }
  return (
    <div className={"bg-light text-dark dark:bg-dark dark:text-light"}>
      <SEO {...seoProps} />

      <Toaster />

      <div className={`overflow-hidden flex h-screen`}>
        <Aside {...asideProps} />

        <div className={`flex-1 flex flex-col overflow-hidden`}>
          <Header {...headerProps} />
          <Breadcrumb {...breadcrumbProps} />

          <main className={`p-4 flex-1 overflow-auto`}>
            <div className="relative w-full h-full">
           
              <div className="relative z-10">
                <Outlet />
              </div>
            </div>
          </main>

          <Footer {...footerProps} />
        </div>

        <BackToTopBtn {...backToTopProps} />
      </div>
    </div>
  );
}
