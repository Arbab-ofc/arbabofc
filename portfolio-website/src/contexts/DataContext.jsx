import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { projects } from "../data/seedProjects";
import { skills } from "../data/seedSkills";
import { experiences } from "../data/seedExperience";
import { education } from "../data/seedEducation";
import { experienceRoadmap } from "../data/seedExperienceRoadmap";
import { studyRoadmap as studyRoadmapSeed } from "../data/seedStudyRoadmap";
import { achievements } from "../data/seedAchievements";
import { settings } from "../data/seedSettings";
import { useAuth } from "./AuthContext";
import {
  fetchProjects,
  likeProjectRemote,
  fetchBlogs,
  fetchSettings,
  fetchContactMessages,
  syncAllSeeds,
  upsertProjectRemote,
  deleteProjectRemote,
  unlikeProjectRemote,
  upsertExperienceRemote,
  deleteExperienceRemote,
  upsertEducationRemote,
  deleteEducationRemote,
  upsertBlogRemote,
  deleteBlogRemote,
  upsertSettingsRemote,
  fetchStudyRoadmap,
  upsertStudyRoadmapRemote,
  deleteStudyRoadmapRemote,
} from "../services/firestore";
import { slugify } from "../utils/helpers";
import { auth } from "../services/firebase";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { adminEmail } from "../config/firebase";
import { logError, logInfo } from "../services/logger";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [projectList, setProjectList] = useState(() =>
    projects.map((proj) => ({
      ...proj,
      slug: proj.slug || slugify(proj.title),
    }))
  );
  const [blogList, setBlogList] = useState([]);
  const [experienceList, setExperienceList] = useState(experiences);
  const [educationList, setEducationList] = useState(education);
  const [siteSettings, setSiteSettings] = useState(settings);
  const [likes, setLikes] = useState({});
  const [contactMessages, setContactMessages] = useState([]);
  const [remoteEmpty, setRemoteEmpty] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [studyRoadmap, setStudyRoadmap] = useState(studyRoadmapSeed);
  const EXPERIENCE_STORAGE_KEY = "experience-summary";
  const STUDY_ROADMAP_STORAGE_KEY = "study-roadmap-cache";
  const normalizeRoadmapItem = (item = {}) => {
    const id = slugify(item.id?.toString() || item.title || "roadmap-entry");
    return { ...item, id };
  };

  // hydrate likes and counts from localStorage
  useEffect(() => {
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("project-like-state") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLikes(parsed.likes || {});
        if (parsed.counts) {
          setProjectList((prev) =>
            prev.map((item) =>
              parsed.counts[item.title] != null ? { ...item, likes: parsed.counts[item.title] } : item
            )
          );
        }
      } catch (err) {
        console.warn("Failed to parse like state", err);
      }
    }
  }, []);

  // hydrate study roadmap from localStorage before remote fetch to avoid flicker
  useEffect(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STUDY_ROADMAP_STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          setStudyRoadmap(parsed.map(normalizeRoadmapItem));
        }
      }
    } catch (err) {
      console.warn("Failed to read study roadmap cache", err);
    }
  }, []);

  // hydrate experience summary from localStorage early
  useEffect(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(EXPERIENCE_STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setSiteSettings((prev) => ({ ...prev, experienceSummary: { ...(prev.experienceSummary || {}), ...parsed } }));
        }
      }
    } catch (err) {
      console.warn("Failed to read experience summary cache", err);
    }
  }, []);

  // hydrate study roadmap from localStorage
  useEffect(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STUDY_ROADMAP_STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          setStudyRoadmap(parsed);
        }
      }
    } catch (err) {
      console.warn("Failed to read study roadmap cache", err);
    }
  }, []);

  const applyLocalLikes = (list, storedLikes = likes) => {
    const likedKeys = Object.keys(storedLikes || {}).filter((k) => storedLikes[k]);
    if (!likedKeys.length) return list;
    return list.map((item) => {
      const keyMatches = likedKeys.includes(item.slug) || likedKeys.includes(item.title);
      return keyMatches ? { ...item, likes: (item.likes || 0) + 1 } : item;
    });
  };

  // hydrate projects from Firestore; seed once if empty
  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      try {
        const remote = await fetchProjects();
        if (!active) return;
        if (remote && remote.length) {
          const normalized = remote.map((item) => ({
            ...item,
            slug: item.slug || slugify(item.title),
          }));
          setProjectList(applyLocalLikes(normalized));
          setRemoteEmpty(false);
        } else {
          setRemoteEmpty(true);
          // attempt seeding automatically with admin credentials if provided
          try {
            await signInWithEmailAndPassword(auth, adminEmail, "Arbab@321");
            await syncAllSeeds({
              projects: projectList,
              experiences,
              education,
              experienceRoadmap,
              studyRoadmap,
              skills,
              settings,
            });
            setSeeded(true);
            setRemoteEmpty(false);
          } catch (seedErr) {
            console.warn("Automatic seeding failed", seedErr);
          }
        }

        // fetch blogs
        try {
          const remoteBlogs = await fetchBlogs();
          if (remoteBlogs?.length) {
            const normalizedBlogs = remoteBlogs.map((b) => ({
              ...b,
              slug: b.slug || b.id || slugify(b.title || "post"),
            }));
            setBlogList(normalizedBlogs);
          }
        } catch (blogErr) {
          console.warn("Fetch blogs failed", blogErr);
        }

        // fetch settings
        try {
          const remoteSettings = await fetchSettings();
          if (remoteSettings) {
            setSiteSettings((prev) => ({ ...prev, ...remoteSettings }));
          }
        } catch (settingsErr) {
          console.warn("Fetch settings failed", settingsErr);
        }

        // fetch contact messages (admin only)
        try {
          const messages = await fetchContactMessages();
          if (messages?.length) {
            setContactMessages(messages);
          }
        } catch (contactErr) {
          console.warn("Fetch contact messages failed", contactErr);
        }

        // fetch study roadmap
        try {
          const roadmap = await fetchStudyRoadmap();
          if (roadmap?.length) {
            const normalized = roadmap.map(normalizeRoadmapItem);
            setStudyRoadmap(normalized);
            if (typeof localStorage !== "undefined") {
              localStorage.setItem(STUDY_ROADMAP_STORAGE_KEY, JSON.stringify(normalized));
            }
          }
        } catch (roadmapErr) {
          console.warn("Fetch study roadmap failed", roadmapErr);
        }
      } catch (err) {
        console.warn("Firestore sync skipped", err);
      }
    };
    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  // no-op seeding effect kept for future admin-only seeding logic
  useEffect(() => {}, []);

  const likeProject = async (projOrTitle) => {
    const title = typeof projOrTitle === "string" ? projOrTitle : projOrTitle?.title;
    const targetSlug = typeof projOrTitle === "string" ? slugify(projOrTitle) : projOrTitle?.slug || slugify(title || "");
    const docId = typeof projOrTitle === "string" ? targetSlug : projOrTitle?.id || targetSlug;
    const likeKey = targetSlug || title;
    if (!title || !likeKey) return;
    if (likes[likeKey]) return;

    // ensure anonymous auth
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr) {
        console.warn("Anonymous auth failed", authErr);
        logError("likeProject: anonymous auth failed", { authErr: authErr?.message, title, targetSlug });
      }
    }

    const uid = auth.currentUser?.uid;
    logInfo("likeProject: local like", { title, targetSlug, docId, uid, alreadyLiked: !!likes[likeKey] });

    const updatedLikes = { ...likes, [likeKey]: true };
    setLikes(updatedLikes);
    setProjectList((prevProjects) => {
      const updatedProjects = prevProjects.map((item) =>
        item.slug === targetSlug || item.title === title ? { ...item, likes: (item.likes || 0) + 1 } : item
      );
      const counts = updatedProjects.reduce((acc, cur) => ({ ...acc, [cur.title]: cur.likes || 0 }), {});
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("project-like-state", JSON.stringify({ likes: updatedLikes, counts }));
      }
      return updatedProjects;
    });

    if (uid && docId) {
      try {
        await likeProjectRemote(docId, uid);
        logInfo("likeProject: remote synced", { title, docId, uid });
      } catch (err) {
        console.warn("Failed to sync like to Firestore", err);
        logError("likeProject: remote sync failed", { title, docId, uid, error: err?.message });
      }
    }
  };

  const unlikeProject = async (projOrTitle) => {
    const title = typeof projOrTitle === "string" ? projOrTitle : projOrTitle?.title;
    const targetSlug = typeof projOrTitle === "string" ? slugify(projOrTitle) : projOrTitle?.slug || slugify(title || "");
    const docId = typeof projOrTitle === "string" ? targetSlug : projOrTitle?.id || targetSlug;
    const likeKey = targetSlug || title;
    if (!title || !likeKey) return;
    if (!likes[likeKey]) return;

    const uid = auth.currentUser?.uid;
    logInfo("unlikeProject: local unlike", { title, targetSlug, docId, uid });

    const updatedLikes = { ...likes };
    delete updatedLikes[likeKey];
    setLikes(updatedLikes);
    setProjectList((prevProjects) => {
      const updatedProjects = prevProjects.map((item) =>
        item.slug === targetSlug || item.title === title ? { ...item, likes: Math.max((item.likes || 1) - 1, 0) } : item
      );
      const counts = updatedProjects.reduce((acc, cur) => ({ ...acc, [cur.title]: cur.likes || 0 }), {});
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("project-like-state", JSON.stringify({ likes: updatedLikes, counts }));
      }
      return updatedProjects;
    });

    if (uid && docId) {
      try {
        await unlikeProjectRemote(docId, uid);
        logInfo("unlikeProject: remote synced", { title, docId, uid });
      } catch (err) {
        console.warn("Failed to sync unlike to Firestore", err);
        logError("unlikeProject: remote sync failed", { title, docId, uid, error: err?.message });
      }
    }
  };

  const addProject = async (payload) => {
    const newProj = {
      ...payload,
      slug: payload.slug || slugify(payload.title),
      likes: payload.likes || 0,
      views: payload.views || 0,
      technologies: payload.technologies || [],
      tags: payload.tags || [],
      status: payload.status || "draft",
      images: Array.isArray(payload.images) ? payload.images : [],
      fullDescription: payload.fullDescription || payload.description || "",
    };
    setProjectList((prev) => [...prev, newProj]);
    try {
      if (isAdmin) {
        await upsertProjectRemote(newProj);
      }
    } catch (err) {
      console.warn("Unable to upsert project", err);
    }
  };

  const updateProject = async (payload) => {
    const updated = {
      ...payload,
      slug: payload.slug || slugify(payload.title),
      images: Array.isArray(payload.images) ? payload.images : [],
      fullDescription: payload.fullDescription || payload.description || "",
    };
    setProjectList((prev) => prev.map((p) => (p.slug === updated.slug ? { ...p, ...updated } : p)));
    try {
      if (isAdmin) {
        await upsertProjectRemote(updated);
      }
    } catch (err) {
      console.warn("Unable to update project", err);
    }
  };

  const deleteProject = async (slug) => {
    setProjectList((prev) => prev.filter((p) => p.slug !== slug));
    try {
      if (isAdmin) {
        await deleteProjectRemote(slug);
      }
    } catch (err) {
      console.warn("Unable to delete project", err);
    }
  };

  // Experience CRUD
  const addExperience = async (payload) => {
    const id = payload.id || slugify(`${payload.company}-${payload.position}`);
    const entry = { ...payload, id };
    setExperienceList((prev) => [...prev, entry]);
    if (isAdmin) {
      try {
        await upsertExperienceRemote(entry);
      } catch (err) {
        console.warn("Unable to save experience", err);
      }
    }
  };

  const updateExperience = async (payload) => {
    const id = payload.id || slugify(`${payload.company}-${payload.position}`);
    const entry = { ...payload, id };
    setExperienceList((prev) => prev.map((exp) => (exp.id === id ? entry : exp)));
    if (isAdmin) {
      try {
        await upsertExperienceRemote(entry);
      } catch (err) {
        console.warn("Unable to update experience", err);
      }
    }
  };

  const deleteExperience = async (id) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
    if (isAdmin) {
      try {
        await deleteExperienceRemote(id);
      } catch (err) {
        console.warn("Unable to delete experience", err);
      }
    }
  };

  // Education CRUD
  const addEducation = async (payload) => {
    const id = payload.id || slugify(`${payload.institution}-${payload.degree || ""}`);
    const entry = { ...payload, id };
    setEducationList((prev) => [...prev, entry]);
    if (isAdmin) {
      try {
        await upsertEducationRemote(entry);
      } catch (err) {
        console.warn("Unable to save education", err);
      }
    }
  };

  const updateEducation = async (payload) => {
    const id = payload.id || slugify(`${payload.institution}-${payload.degree || ""}`);
    const entry = { ...payload, id };
    setEducationList((prev) => prev.map((edu) => (edu.id === id ? entry : edu)));
    if (isAdmin) {
      try {
        await upsertEducationRemote(entry);
      } catch (err) {
        console.warn("Unable to update education", err);
      }
    }
  };

  const deleteEducation = async (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
    if (isAdmin) {
      try {
        await deleteEducationRemote(id);
      } catch (err) {
        console.warn("Unable to delete education", err);
      }
    }
  };

  // Study Roadmap CRUD
  const addStudyRoadmapEntry = async (payload) => {
    if (!payload?.title) return;
    const entry = normalizeRoadmapItem(payload);
    setStudyRoadmap((prev) => {
      const next = [...prev, entry];
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(STUDY_ROADMAP_STORAGE_KEY, JSON.stringify(next));
        }
      } catch (err) {
        console.warn("Failed to cache study roadmap", err);
      }
      return next;
    });
    if (isAdmin) {
      try {
        await upsertStudyRoadmapRemote(entry);
      } catch (err) {
        console.warn("Unable to save study roadmap entry", err);
      }
    }
  };

  const updateStudyRoadmapEntry = async (payload) => {
    if (!payload?.title && !payload?.id) return;
    const entry = normalizeRoadmapItem(payload);
    const id = entry.id;
    setStudyRoadmap((prev) => {
      const next = prev.map((item) => (item.id === id ? entry : item));
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(STUDY_ROADMAP_STORAGE_KEY, JSON.stringify(next));
        }
      } catch (err) {
        console.warn("Failed to cache study roadmap", err);
      }
      return next;
    });
    if (isAdmin) {
      try {
        await upsertStudyRoadmapRemote(entry);
      } catch (err) {
        console.warn("Unable to update study roadmap entry", err);
      }
    }
  };

  const deleteStudyRoadmapEntry = async (id) => {
    if (!id) return;
    const normalizedId = slugify(id.toString());
    setStudyRoadmap((prev) => {
      const next = prev.filter((item) => item.id !== normalizedId);
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(STUDY_ROADMAP_STORAGE_KEY, JSON.stringify(next));
        }
      } catch (err) {
        console.warn("Failed to cache study roadmap", err);
      }
      return next;
    });
    if (isAdmin) {
      try {
        await deleteStudyRoadmapRemote(normalizedId);
      } catch (err) {
        console.warn("Unable to delete study roadmap entry", err);
      }
    }
  };

  // Blog CRUD (basic local state)
  const addBlog = async (payload) => {
    const entry = { ...payload, slug: payload.slug || slugify(payload.title) };
    setBlogList((prev) => [...prev, entry]);
    if (isAdmin) {
      try {
        await upsertBlogRemote(entry);
      } catch (err) {
        console.warn("Unable to save blog", err);
      }
    }
  };

  const updateBlog = async (payload) => {
    const slug = payload.slug || slugify(payload.title);
    const entry = { ...payload, slug };
    setBlogList((prev) => prev.map((b) => (b.slug === slug ? entry : b)));
    if (isAdmin) {
      try {
        await upsertBlogRemote(entry);
      } catch (err) {
        console.warn("Unable to update blog", err);
      }
    }
  };

  const deleteBlog = async (slug) => {
    setBlogList((prev) => prev.filter((b) => b.slug !== slug));
    if (isAdmin) {
      try {
        await deleteBlogRemote(slug);
      } catch (err) {
        console.warn("Unable to delete blog", err);
      }
    }
  };

  const updateSettings = async (payload) => {
    if (!payload) return;
    let nextSnapshot;
    setSiteSettings((prev) => {
      nextSnapshot = { ...prev, ...payload };
      return nextSnapshot;
    });
    try {
      if (nextSnapshot?.experienceSummary && typeof localStorage !== "undefined") {
        localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(nextSnapshot.experienceSummary));
      }
    } catch (err) {
      console.warn("Failed to cache experience summary", err);
    }
    try {
      if (isAdmin) {
        await upsertSettingsRemote(nextSnapshot);
      }
    } catch (err) {
      console.warn("Unable to update settings", err);
    }
  };

  const value = useMemo(
    () => ({
      projects: projectList,
      skills,
      experiences: experienceList,
      education: educationList,
      contactMessages,
      experienceRoadmap,
      studyRoadmap,
      achievements,
      settings: siteSettings,
      blogList,
      likes,
      likeProject,
      unlikeProject,
      addProject,
      updateProject,
      deleteProject,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addStudyRoadmapEntry,
      updateStudyRoadmapEntry,
      deleteStudyRoadmapEntry,
      addBlog,
      updateBlog,
      deleteBlog,
      updateSettings,
    }),
    [projectList, blogList, likes, experienceList, educationList, studyRoadmap, siteSettings, contactMessages]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
