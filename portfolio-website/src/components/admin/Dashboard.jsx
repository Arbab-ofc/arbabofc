import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { slugify } from "../../utils/helpers";
import { uploadToCloudinary } from "../../services/cloudinary";
import ChatPanel from "./ChatPanel";

const StatPill = ({ label, value }) => (
  <div className="rounded-2xl px-4 py-3 text-center border min-w-[120px] bg-gradient-to-br from-white/10 via-white/5 to-white/0 border-white/15 shadow-2xl shadow-blue-500/10 dark:from-white/10 dark:to-white/0 dark:border-white/15 dark:shadow-blue-500/10 bg-white/80 text-slate-900 border-black/5 shadow-black/5 dark:bg-transparent dark:text-white">
    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-200 whitespace-nowrap leading-tight">{label}</p>
    <p className="text-xl font-semibold text-slate-900 dark:text-white leading-tight whitespace-nowrap">{value}</p>
  </div>
);

const SectionHeader = ({ eyebrow, title, helper }) => (
  <div className="space-y-1">
    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{eyebrow}</p>
    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
    {helper && <p className="text-sm text-gray-500 dark:text-gray-400">{helper}</p>}
  </div>
);

const fieldTone =
  "bg-white/80 text-slate-900 placeholder:text-gray-500 border border-black/10 dark:bg-white/5 dark:text-white dark:border-white/10";

const Dashboard = () => {
  const {
    projects,
    blogList,
    experiences,
    education,
    studyRoadmap,
    settings,
    achievements,
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
    addAchievement,
    updateAchievement,
    deleteAchievement,
  } = useData();
  const { isAdmin, user, resetPassword } = useAuth();

  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    fullDescription: "",
    category: "Web Development",
    technologies: "",
    tags: "",
    status: "draft",
    slug: "",
    liveUrl: "",
    githubUrl: "",
    images: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectUploadLoading, setProjectUploadLoading] = useState(false);
  const [projectUploadError, setProjectUploadError] = useState("");

  const [expForm, setExpForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    duration: "",
    location: "",
    type: "Internship",
    description: "",
    technologies: "",
    certificateUrl: "",
  });
  const [editingExp, setEditingExp] = useState(null);

  const [eduForm, setEduForm] = useState({
    institution: "",
    degree: "",
    duration: "",
    grade: "",
    status: "completed",
    location: "",
  });
  const [editingEdu, setEditingEdu] = useState(null);

  const [studyForm, setStudyForm] = useState({
    title: "",
    subtitle: "",
    phase: "planned",
    date: "",
    duration: "",
    description: "",
    topics: "",
    resources: "",
    proficiency: 0,
  });
  const [editingStudy, setEditingStudy] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
  });
  const [editingBlog, setEditingBlog] = useState(null);

  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    date: "",
    icon: "Trophy",
    color: "#D4AF37",
  });
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [experienceSummaryForm, setExperienceSummaryForm] = useState({
    years: settings.experienceSummary?.years || 0,
    months: settings.experienceSummary?.months || 0,
  });
  const [cgpaForm, setCgpaForm] = useState(settings.educationCgpa || "");
  const [internshipsForm, setInternshipsForm] = useState(settings.internshipsCount ?? 0);
  const [resumeForm, setResumeForm] = useState({
    resumeUrl: settings.personalInfo?.resumeUrl || "",
    resumeVersion: settings.personalInfo?.resumeVersion || "",
  });
  const [resumeUploadLoading, setResumeUploadLoading] = useState(false);
  const [resumeUploadError, setResumeUploadError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSending, setResetSending] = useState(false);

  useEffect(() => {
    setExperienceSummaryForm({
      years: settings.experienceSummary?.years || 0,
      months: settings.experienceSummary?.months || 0,
    });
  }, [settings.experienceSummary?.years, settings.experienceSummary?.months]);

  useEffect(() => {
    setCgpaForm(settings.educationCgpa || "");
  }, [settings.educationCgpa]);

  useEffect(() => {
    setInternshipsForm(settings.internshipsCount ?? 0);
  }, [settings.internshipsCount]);

  useEffect(() => {
    setResumeForm({
      resumeUrl: settings.personalInfo?.resumeUrl || "",
      resumeVersion: settings.personalInfo?.resumeVersion || "",
    });
  }, [settings.personalInfo?.resumeUrl, settings.personalInfo?.resumeVersion]);

  const experienceStatValue = useMemo(() => {
    const years = Number(settings.experienceSummary?.years) || 0;
    const months = Number(settings.experienceSummary?.months) || 0;
    if (!years && !months) return "0 m";
    const parts = [];
    if (years) parts.push(`${years} y`);
    if (months) parts.push(`${months} m`);
    return parts.join(" ");
  }, [settings.experienceSummary?.years, settings.experienceSummary?.months]);

  const stats = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      { label: "Blogs", value: blogList.length },
      { label: "Experience", value: experienceStatValue },
      { label: "Internships", value: Number(settings.internshipsCount) || 0 },
      { label: "Study Steps", value: studyRoadmap.length },
    ],
    [projects.length, blogList.length, experienceStatValue, settings.internshipsCount, studyRoadmap.length]
  );

  const filteredProjects = useMemo(() => {
    const base = projectSearch
      ? projects.filter((p) => `${p.title} ${p.subtitle} ${p.category}`.toLowerCase().includes(projectSearch.toLowerCase()))
      : projects;
    return base.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }, [projects, projectSearch]);

  const resetProject = () =>
    setProjectForm({
      title: "",
      subtitle: "",
      description: "",
      fullDescription: "",
      category: "Web Development",
      technologies: "",
      tags: "",
      status: "draft",
      slug: "",
      liveUrl: "",
      githubUrl: "",
      images: "",
    });

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = {
      ...projectForm,
      slug: projectForm.slug || slugify(projectForm.title),
      fullDescription: projectForm.fullDescription,
      technologies: projectForm.technologies ? projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean) : [],
      tags: projectForm.tags ? projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      images: projectForm.images ? projectForm.images.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    if (editingProject) {
      await updateProject({ ...payload, slug: editingProject });
    } else {
      await addProject(payload);
    }
    setEditingProject(null);
    resetProject();
  };

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;
    setProjectUploadError("");
    setProjectUploadLoading(true);
    try {
      const res = await uploadToCloudinary(file, "projects");
      const url = res.secure_url || res.url;
      if (url) {
        const existing = projectForm.images ? projectForm.images.split(",").map((t) => t.trim()).filter(Boolean) : [];
        const next = [...existing, url];
        setProjectForm((prev) => ({ ...prev, images: next.join(", ") }));
      }
    } catch (err) {
      console.warn("Cloudinary upload failed", err);
      setProjectUploadError("Upload failed. Please retry or use a direct URL.");
    } finally {
      setProjectUploadLoading(false);
      e.target.value = "";
    }
  };

  const handleCgpaSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const trimmed = cgpaForm.toString().trim();
    await updateSettings({ educationCgpa: trimmed });
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const trimmedUrl = resumeForm.resumeUrl.trim();
    const trimmedVersion = resumeForm.resumeVersion.trim();
    await updateSettings({
      personalInfo: {
        ...(settings.personalInfo || {}),
        resumeUrl: trimmedUrl,
        resumeVersion: trimmedVersion || settings.personalInfo?.resumeVersion || "v1.0",
        resumeUpdatedAt: new Date().toISOString(),
      },
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;
    setResumeUploadError("");
    setResumeUploadLoading(true);
    try {
      const res = await uploadToCloudinary(file, "resumes");
      const url = res.secure_url || res.url;
      if (url) {
        setResumeForm((prev) => ({ ...prev, resumeUrl: url }));
      }
    } catch (err) {
      console.warn("Resume upload failed", err);
      setResumeUploadError("Upload failed. Please retry or paste a direct link.");
    } finally {
      setResumeUploadLoading(false);
      e.target.value = "";
    }
  };

  const handlePasswordReset = async () => {
    if (!isAdmin) return;
    const email = (user?.email || settings.adminEmail || "").trim();
    if (!email) {
      setResetError("No admin email available.");
      return;
    }
    setResetError("");
    setResetSending(true);
    try {
      await resetPassword(email);
      toast.success(`Password reset email sent to ${email}.`);
    } catch (err) {
      console.warn("Password reset failed", err);
      setResetError("Failed to send reset email. Please try again.");
      toast.error("Password reset failed.");
    } finally {
      setResetSending(false);
    }
  };

  const handleProjectEdit = (proj) => {
    setEditingProject(proj.slug || slugify(proj.title));
    setProjectForm({
      title: proj.title || "",
      subtitle: proj.subtitle || "",
      description: proj.description || "",
      fullDescription: proj.fullDescription || "",
      category: proj.category || "Web Development",
      technologies: (proj.technologies || []).join(", "),
      tags: (proj.tags || []).join(", "),
      status: proj.status || "draft",
      slug: proj.slug || slugify(proj.title),
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      images: (proj.images || []).join(", "),
    });
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const formatDate = (value) => {
      if (!value) return "";
      return new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };
    const computedDuration =
      expForm.startDate && (expForm.endDate || expForm.current)
        ? `${formatDate(expForm.startDate)} – ${expForm.current ? "Present" : formatDate(expForm.endDate)}`
        : expForm.duration || "";

    const payload = {
      ...expForm,
      duration: computedDuration,
      id: editingExp || undefined,
      technologies: expForm.technologies ? expForm.technologies.split(",").map((t) => t.trim()).filter(Boolean) : [],
      certificateUrl: expForm.certificateUrl || "",
    };
    if (editingExp) {
      await updateExperience(payload);
    } else {
      await addExperience(payload);
    }
    setEditingExp(null);
    setExpForm({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      duration: "",
      location: "",
      type: "Internship",
      description: "",
      technologies: "",
      certificateUrl: "",
    });
  };

  const handleExpEdit = (exp) => {
    setEditingExp(exp.id || slugify(`${exp.company}-${exp.position}`));
    setExpForm({
      company: exp.company || "",
      position: exp.position || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      current: !!exp.current,
      duration: exp.duration || "",
      location: exp.location || "",
      type: exp.type || "Internship",
      description: exp.description || "",
      technologies: (exp.technologies || []).join(", "),
      certificateUrl: exp.certificateUrl || "",
    });
  };

  const handleEduSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = { ...eduForm, id: editingEdu || undefined };
    if (editingEdu) {
      await updateEducation(payload);
    } else {
      await addEducation(payload);
    }
    setEditingEdu(null);
    setEduForm({ institution: "", degree: "", duration: "", grade: "", status: "completed", location: "" });
  };

  const handleEduEdit = (edu) => {
    setEditingEdu(edu.id || slugify(`${edu.institution}-${edu.degree || ""}`));
    setEduForm({
      institution: edu.institution || "",
      degree: edu.degree || "",
      duration: edu.duration || "",
      grade: edu.grade || "",
      status: edu.status || "completed",
      location: edu.location || "",
    });
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = { ...achievementForm, id: editingAchievement || slugify(achievementForm.title || "") };
    if (editingAchievement) {
      await updateAchievement(payload);
    } else {
      await addAchievement(payload);
    }
    setEditingAchievement(null);
    setAchievementForm({ title: "", description: "", date: "", icon: "Trophy", color: "#D4AF37" });
  };

  const handleAchievementEdit = (ach) => {
    setEditingAchievement(ach.id || slugify(ach.title || ""));
    setAchievementForm({
      title: ach.title || "",
      description: ach.description || "",
      date: ach.date || "",
      icon: ach.icon || "Trophy",
      color: ach.color || "#D4AF37",
    });
  };

  const handleStudySubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = {
      ...studyForm,
      id: editingStudy || undefined,
      topics: studyForm.topics ? studyForm.topics.split(",").map((t) => t.trim()).filter(Boolean) : [],
      resources: studyForm.resources ? studyForm.resources.split(",").map((t) => t.trim()).filter(Boolean) : [],
      proficiency: Number(studyForm.proficiency || 0),
    };
    if (editingStudy) {
      await updateStudyRoadmapEntry(payload);
    } else {
      await addStudyRoadmapEntry(payload);
    }
    setEditingStudy(null);
    setStudyForm({
      title: "",
      subtitle: "",
      phase: "planned",
      date: "",
      duration: "",
      description: "",
      topics: "",
      resources: "",
      proficiency: 0,
    });
  };

  const handleStudyEdit = (entry) => {
    setEditingStudy(entry.id || slugify(entry.title));
    setStudyForm({
      title: entry.title || "",
      subtitle: entry.subtitle || "",
      phase: entry.phase || "planned",
      date: entry.date || "",
      duration: entry.duration || "",
      description: entry.description || "",
      topics: (entry.topics || []).join(", "),
      resources: (entry.resources || []).join(", "),
      proficiency: entry.proficiency || 0,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = {
      ...blogForm,
      slug: blogForm.slug || slugify(blogForm.title),
      tags: blogForm.tags ? blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    if (editingBlog) {
      await updateBlog(payload);
    } else {
      await addBlog(payload);
    }
    setEditingBlog(null);
    setBlogForm({ title: "", slug: "", excerpt: "", content: "", category: "", tags: "", status: "draft" });
  };

  const handleBlogEdit = (blog) => {
    setEditingBlog(blog.slug || slugify(blog.title));
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "",
      tags: (blog.tags || []).join(", "),
      status: blog.status || "draft",
    });
  };

  const handleExperienceSummarySubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const years = Math.max(0, Math.round(Number(experienceSummaryForm.years) || 0));
    const months = Math.max(0, Math.round(Number(experienceSummaryForm.months) || 0));
    await updateSettings({
      experienceSummary: {
        ...(settings.experienceSummary || {}),
        years,
        months,
      },
    });
    setExperienceSummaryForm({ years, months });
  };

  const handleInternshipsSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const value = Math.max(0, Math.round(Number(internshipsForm) || 0));
    setInternshipsForm(value);
    await updateSettings({ internshipsCount: value });
  };

  return (
    <div className="space-y-10 relative overflow-hidden rounded-[28px]">
      <div className="admin-grid-overlay absolute inset-0" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-[#f8f5ef] via-[#eef3ff] to-[#f6e9d6] dark:from-[#0b1020] dark:via-[#0d1428] dark:to-[#121628] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] mb-10">
          <div className="absolute inset-0 admin-hero-overlay" aria-hidden />
        <div className="relative grid gap-8 items-start xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gray-600 dark:text-gray-300">Admin Console</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">Luxury Control Room</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Curate projects, journeys, and stories with real-time Firebase sync. Likes, views, and reactions persist for guests via anonymous auth.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/70 text-slate-800 border border-black/10 text-xs dark:bg-white/10 dark:text-white dark:border-white/20">Admin: arbabprvt@gmail.com</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 text-xs dark:text-emerald-100">Guest likes saved</span>
              {!isAdmin && <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-700 border border-red-500/30 text-xs dark:text-red-100">Sign in to edit</span>}
            </div>
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:gap-4">
            {stats.map((s, idx) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <StatPill label={s.label} value={s.value} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.9fr] items-start">
        <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)] xl:col-span-2">
          <SectionHeader eyebrow="Inbox" title="Contact messages" helper="Messages submitted from the contact form." />
          <ChatPanel />
        </Card>
        <div className="space-y-6">
          <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <SectionHeader eyebrow={editingProject ? "Edit Project" : "Create Project"} title={editingProject ? "Update showcase" : "Quick create"} helper="Add live/github links so they render on cards." />
              {editingProject && (
                <Button variant="ghost" className="!px-3 !py-1 text-xs" onClick={() => { setEditingProject(null); resetProject(); }}>
                  Cancel
                </Button>
              )}
            </div>
            <form onSubmit={handleProjectSubmit} className="grid md:grid-cols-2 gap-3">
              <Input name="title" placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required className={fieldTone} />
              <Input name="subtitle" placeholder="Subtitle" value={projectForm.subtitle} onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })} required className={fieldTone} />
              <Input name="description" placeholder="Short description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required className={`md:col-span-2 ${fieldTone}`} />
              <textarea
                name="fullDescription"
                placeholder="Full description (Markdown supported)"
                value={projectForm.fullDescription}
                onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                className={`md:col-span-2 min-h-[140px] rounded-lg px-3 py-2 text-sm ${fieldTone}`}
              />
              <Input name="category" placeholder="Category" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} className={fieldTone} />
              <Input name="status" placeholder="Status (draft/completed)" value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} className={fieldTone} />
              <Input name="technologies" placeholder="Technologies (comma separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} className={fieldTone} />
              <Input name="tags" placeholder="Tags (comma separated)" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className={fieldTone} />
              <Input name="slug" placeholder="Slug (optional)" value={projectForm.slug || ""} onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })} className={fieldTone} />
              <Input name="liveUrl" placeholder="Live URL" value={projectForm.liveUrl} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} className={fieldTone} />
              <Input name="githubUrl" placeholder="GitHub URL" value={projectForm.githubUrl} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} className={fieldTone} />
              <Input
                name="images"
                placeholder="Image URLs (comma separated, Cloudinary preferred)"
                value={projectForm.images}
                onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                className={`md:col-span-2 ${fieldTone}`}
              />
              <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white shadow-sm cursor-pointer hover:border-amber-400/60">
                  <input type="file" accept="image/*" className="hidden" onChange={handleProjectImageUpload} disabled={projectUploadLoading || !isAdmin} />
                  {projectUploadLoading ? "Uploading..." : "Upload to Cloudinary"}
                </label>
                {projectUploadError && <span className="text-xs text-red-600 dark:text-red-400">{projectUploadError}</span>}
                {projectForm.images && (
                  <span className="text-xs text-gray-600 dark:text-gray-300">Saved: {projectForm.images.split(",").filter(Boolean).length} image(s)</span>
                )}
              </div>
              <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
                {editingProject ? "Update Project" : "Save Project"}
              </Button>
            </form>
          </Card>

          <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <SectionHeader
                eyebrow={editingStudy ? "Edit Study Step" : "Add Study Step"}
                title="Study Roadmap"
                helper="Manage learning journey entries."
              />
              {editingStudy && (
                <Button
                  variant="ghost"
                  className="!px-3 !py-1 text-xs"
                  onClick={() => {
                    setEditingStudy(null);
                    setStudyForm({
                      title: "",
                      subtitle: "",
                      phase: "planned",
                      date: "",
                      duration: "",
                      description: "",
                      topics: "",
                      resources: "",
                      proficiency: 0,
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
            <form onSubmit={handleStudySubmit} className="grid md:grid-cols-2 gap-3">
              <Input name="title" placeholder="Title" value={studyForm.title} onChange={(e) => setStudyForm({ ...studyForm, title: e.target.value })} required className={fieldTone} />
              <Input name="subtitle" placeholder="Subtitle" value={studyForm.subtitle} onChange={(e) => setStudyForm({ ...studyForm, subtitle: e.target.value })} className={fieldTone} />
              <Input name="phase" placeholder="Phase (planned/completed/in-progress)" value={studyForm.phase} onChange={(e) => setStudyForm({ ...studyForm, phase: e.target.value })} className={fieldTone} />
              <Input name="date" placeholder="Date" value={studyForm.date} onChange={(e) => setStudyForm({ ...studyForm, date: e.target.value })} className={fieldTone} />
              <Input name="duration" placeholder="Duration" value={studyForm.duration} onChange={(e) => setStudyForm({ ...studyForm, duration: e.target.value })} className={fieldTone} />
              <Input
                name="proficiency"
                type="number"
                min="0"
                max="100"
                placeholder="Proficiency %"
                value={studyForm.proficiency}
                onChange={(e) => setStudyForm({ ...studyForm, proficiency: e.target.value })}
                className={fieldTone}
              />
              <Input name="topics" placeholder="Topics (comma separated)" value={studyForm.topics} onChange={(e) => setStudyForm({ ...studyForm, topics: e.target.value })} className={`md:col-span-2 ${fieldTone}`} />
              <Input name="resources" placeholder="Resources (comma separated)" value={studyForm.resources} onChange={(e) => setStudyForm({ ...studyForm, resources: e.target.value })} className={`md:col-span-2 ${fieldTone}`} />
              <Input name="description" placeholder="Description" value={studyForm.description} onChange={(e) => setStudyForm({ ...studyForm, description: e.target.value })} className={`md:col-span-2 ${fieldTone}`} />
              <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
                {editingStudy ? "Update Study Step" : "Save Study Step"}
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(120deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[size:110px_110px]" aria-hidden />
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SectionHeader eyebrow="Projects" title="Review & edit" helper="Tap to edit or delete." />
              <Input
                name="search"
                placeholder="Search projects"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className={`h-10 text-xs ${fieldTone}`}
              />
            </div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.slug || proj.title}
                  className="flex items-start justify-between gap-3 rounded-xl p-3 border border-black/10 dark:border-white/10 bg-gradient-to-r from-white via-slate-50 to-white dark:from-white/5 dark:via-white/10 dark:to-white/5"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{proj.title}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-100 dark:border-blue-500/30">
                        {proj.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-500/30">
                        {proj.status || "draft"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 dark:bg-pink-500/15 dark:text-pink-100 dark:border-pink-500/30">
                        ❤️ {proj.likes || 0}
                      </span>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleProjectEdit(proj)}>
                        Edit
                      </Button>
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteProject(proj.slug || slugify(proj.title))}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4 bg-gradient-to-br from-white via-slate-50 to-white dark:from[#0f172a] dark:via[#0b1224] dark:to[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(120deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[size:110px_110px]" aria-hidden />
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SectionHeader eyebrow="Study roadmap" title="Planned & done" helper="Quickly review learning steps." />
            </div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {studyRoadmap.map((step) => (
                <div
                  key={step.id || slugify(step.title)}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-gradient-to-r from-white via-slate-50 to-white dark:from-white/5 dark:via-white/10 dark:to-white/5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{step.subtitle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{step.phase}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleStudyEdit(step)}>
                        Edit
                      </Button>
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteStudyRoadmapEntry(step.id || slugify(step.title))}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow={editingExp ? "Edit Experience" : "Add Experience"} title="Career timeline" helper="Highlight roles, durations, stacks." />
            {editingExp && (
              <Button
                variant="ghost"
                className="!px-3 !py-1 text-xs"
                onClick={() => {
                  setEditingExp(null);
                  setExpForm({
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    duration: "",
                    location: "",
                    type: "Internship",
                    description: "",
                    technologies: "",
                    certificateUrl: "",
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
          <form onSubmit={handleExpSubmit} className="grid md:grid-cols-2 gap-3">
            <Input name="company" placeholder="Company" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} required className={fieldTone} />
            <Input name="position" placeholder="Position" value={expForm.position} onChange={(e) => setExpForm({ ...expForm, position: e.target.value })} required className={fieldTone} />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 dark:text-gray-400">Start</label>
              <input
                type="date"
                value={expForm.startDate}
                onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                className={`h-11 rounded-xl border px-3 text-sm ${fieldTone}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-500 dark:text-gray-400">End</label>
                <label className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={expForm.current}
                    onChange={(e) => setExpForm({ ...expForm, current: e.target.checked, endDate: e.target.checked ? "" : expForm.endDate })}
                    className="rounded border-gray-300"
                  />
                  Current
                </label>
              </div>
              <input
                type="date"
                value={expForm.endDate}
                onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                disabled={expForm.current}
                className={`h-11 rounded-xl border px-3 text-sm ${fieldTone} ${expForm.current ? "opacity-60 cursor-not-allowed" : ""}`}
              />
            </div>
            <Input name="location" placeholder="Location" value={expForm.location} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} className={fieldTone} />
            <Input name="type" placeholder="Type" value={expForm.type} onChange={(e) => setExpForm({ ...expForm, type: e.target.value })} className={fieldTone} />
            <Input name="technologies" placeholder="Technologies (comma separated)" value={expForm.technologies} onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })} className={fieldTone} />
            <Input name="certificateUrl" placeholder="Certificate / document link" value={expForm.certificateUrl} onChange={(e) => setExpForm({ ...expForm, certificateUrl: e.target.value })} className={fieldTone} />
            <Input name="description" placeholder="Description" value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} className={`md:col-span-2 ${fieldTone}`} />
            <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
              {editingExp ? "Update Experience" : "Save Experience"}
            </Button>
          </form>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {experiences.map((exp) => (
              <div
                key={exp.id || slugify(`${exp.company}-${exp.position}`)}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-gradient-to-r from-white via-slate-50 to-white dark:from-white/5 dark:via-white/10 dark:to-white/5 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{exp.position}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{exp.duration}</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleExpEdit(exp)}>
                      Edit
                    </Button>
                    <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteExperience(exp.id || slugify(`${exp.company}-${exp.position}`))}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <SectionHeader eyebrow={editingEdu ? "Edit Education" : "Add Education"} title="Academics" helper="Highlight degree, duration, grade." />
              {editingEdu && (
                <Button
                  variant="ghost"
                  className="!px-3 !py-1 text-xs"
                  onClick={() => {
                    setEditingEdu(null);
                    setEduForm({ institution: "", degree: "", duration: "", grade: "", status: "completed", location: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
            <form onSubmit={handleEduSubmit} className="grid md:grid-cols-2 gap-3">
              <Input name="institution" placeholder="Institution" value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} required className={fieldTone} />
              <Input name="degree" placeholder="Degree" value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} required className={fieldTone} />
              <Input name="duration" placeholder="Duration" value={eduForm.duration} onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })} className={fieldTone} />
              <Input name="grade" placeholder="Grade" value={eduForm.grade} onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })} className={fieldTone} />
              <Input name="status" placeholder="Status" value={eduForm.status} onChange={(e) => setEduForm({ ...eduForm, status: e.target.value })} className={fieldTone} />
              <Input name="location" placeholder="Location" value={eduForm.location} onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })} className={fieldTone} />
              <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
                {editingEdu ? "Update Education" : "Save Education"}
              </Button>
            </form>
            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {education.map((edu) => (
                <div
                  key={edu.id || slugify(`${edu.institution}-${edu.degree || ""}`)}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-gradient-to-r from-white via-slate-50 to-white dark:from-white/5 dark:via-white/10 dark:to-white/5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{edu.institution}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{edu.degree}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{edu.duration}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleEduEdit(edu)}>
                        Edit
                      </Button>
                      <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteEducation(edu.id || slugify(`${edu.institution}-${edu.degree || ""}`))}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="space-y-4 rounded-2xl border border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#0b1224]/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 admin-grid-overlay rounded-2xl opacity-30" aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow="Experience Stat" title="Hero badge" helper="Control the years and months shown on the hero stat pill." />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Live on hero</span>
          </div>
          <form onSubmit={handleExperienceSummarySubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="years"
                type="number"
                min="0"
                placeholder="Years"
                value={experienceSummaryForm.years}
                onChange={(e) => setExperienceSummaryForm({ ...experienceSummaryForm, years: e.target.value })}
                className={fieldTone}
              />
              <Input
                name="months"
                type="number"
                min="0"
                placeholder="Months"
                value={experienceSummaryForm.months}
                onChange={(e) => setExperienceSummaryForm({ ...experienceSummaryForm, months: e.target.value })}
                className={fieldTone}
              />
            </div>
            <Button type="submit" className="w-full" disabled={!isAdmin}>
              Save Experience Stat
            </Button>
          </form>
        </Card>

        <Card className="space-y-4 rounded-2xl border border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#0b1224]/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 admin-grid-overlay rounded-2xl opacity-30" aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow="Academic Stat" title="CGPA" helper="Shown in the About education highlight." />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Live on About</span>
          </div>
          <form onSubmit={handleCgpaSubmit} className="space-y-3">
            <Input
              name="cgpa"
              placeholder="CGPA (e.g. 8.32)"
              value={cgpaForm}
              onChange={(e) => setCgpaForm(e.target.value)}
              className={fieldTone}
            />
            <Button type="submit" className="w-full" disabled={!isAdmin}>
              Save CGPA
            </Button>
          </form>
        </Card>

        <Card className="space-y-4 rounded-2xl border border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#0b1224]/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 admin-grid-overlay rounded-2xl opacity-30" aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow="Career Stat" title="Internships" helper="Shown in the hero stats row." />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Live on hero</span>
          </div>
          <form onSubmit={handleInternshipsSubmit} className="space-y-3">
            <Input
              name="internships"
              type="number"
              min="0"
              placeholder="Internships count"
              value={internshipsForm}
              onChange={(e) => setInternshipsForm(e.target.value)}
              className={fieldTone}
            />
            <Button type="submit" className="w-full" disabled={!isAdmin}>
              Save Internships Count
            </Button>
          </form>
        </Card>

        <Card className="space-y-4 rounded-2xl border border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#0b1224]/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 admin-grid-overlay rounded-2xl opacity-30" aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow="Resume" title="Upload & link" helper="Update the resume shown on the hero section." />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Live on hero</span>
          </div>
          <form onSubmit={handleResumeSubmit} className="space-y-3">
            <Input
              name="resumeUrl"
              placeholder="Resume URL"
              value={resumeForm.resumeUrl}
              onChange={(e) => setResumeForm({ ...resumeForm, resumeUrl: e.target.value })}
              className={fieldTone}
            />
            <Input
              name="resumeVersion"
              placeholder="Version (e.g. v2.1)"
              value={resumeForm.resumeVersion}
              onChange={(e) => setResumeForm({ ...resumeForm, resumeVersion: e.target.value })}
              className={fieldTone}
            />
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white shadow-sm cursor-pointer hover:border-emerald-400/60">
                <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} disabled={resumeUploadLoading || !isAdmin} />
                {resumeUploadLoading ? "Uploading..." : "Upload PDF"}
              </label>
              {resumeUploadError && <span className="text-xs text-red-600 dark:text-red-400">{resumeUploadError}</span>}
              {resumeForm.resumeUrl && (
                <a className="text-xs text-blue-600 dark:text-blue-300 underline" href={resumeForm.resumeUrl} target="_blank" rel="noreferrer">
                  Preview current resume
                </a>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={!isAdmin}>
              Save Resume Link
            </Button>
          </form>
        </Card>

        <Card className="space-y-4 rounded-2xl border border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#0b1224]/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 admin-grid-overlay rounded-2xl opacity-30" aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <SectionHeader eyebrow="Security" title="Password reset" helper="Sends a reset link to the admin email." />
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Reset email will be sent to <span className="font-semibold">{user?.email || settings.adminEmail || "admin email"}</span>.
            </p>
            {resetError && <p className="text-xs text-red-600 dark:text-red-400">{resetError}</p>}
            <Button type="button" className="w-full" disabled={!isAdmin || resetSending} onClick={handlePasswordReset}>
              {resetSending ? "Sending..." : "Send Password Reset Email"}
            </Button>
          </div>
        </Card>
      </div>

      <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(120deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[size:110px_110px]" aria-hidden />
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <SectionHeader
            eyebrow={editingAchievement ? "Edit Achievement" : "Add Achievement"}
            title="Achievements"
            helper="Showcase awards and milestones."
          />
          {editingAchievement && (
            <Button
              variant="ghost"
              className="!px-3 !py-1 text-xs"
              onClick={() => {
                setEditingAchievement(null);
                setAchievementForm({ title: "", description: "", date: "", icon: "Trophy", color: "#D4AF37" });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        <form onSubmit={handleAchievementSubmit} className="grid md:grid-cols-2 gap-3">
          <Input name="title" placeholder="Title" value={achievementForm.title} onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })} required className={fieldTone} />
          <Input name="date" placeholder="Year or date" value={achievementForm.date} onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })} className={fieldTone} />
          <Input name="icon" placeholder="Icon (lucide name)" value={achievementForm.icon} onChange={(e) => setAchievementForm({ ...achievementForm, icon: e.target.value })} className={fieldTone} />
          <Input name="color" placeholder="Accent color (#hex)" value={achievementForm.color} onChange={(e) => setAchievementForm({ ...achievementForm, color: e.target.value })} className={fieldTone} />
          <Input
            name="description"
            placeholder="Description"
            value={achievementForm.description}
            onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
            className={`md:col-span-2 ${fieldTone}`}
          />
          <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
            {editingAchievement ? "Update Achievement" : "Save Achievement"}
          </Button>
        </form>
        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
          {achievements.map((ach) => (
            <div
              key={ach.id || slugify(ach.title)}
              className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-gradient-to-r from-white via-slate-50 to-white dark:from-white/5 dark:via-white/10 dark:to-white/5 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ach.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{ach.date}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{ach.description}</p>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleAchievementEdit(ach)}>
                    Edit
                  </Button>
                  <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteAchievement(ach.id || slugify(ach.title))}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0f172a] dark:via-[#0b1224] dark:to-[#0b1020] border border-black/5 dark:border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(120deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[size:110px_110px]" aria-hidden />
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <SectionHeader eyebrow={editingBlog ? "Edit Blog" : "Add Blog"} title="Blogs & reactions" helper="Supports Markdown and reactions in detail view." />
          {editingBlog && (
            <Button
              variant="ghost"
              className="!px-3 !py-1 text-xs"
              onClick={() => {
                setEditingBlog(null);
                setBlogForm({ title: "", slug: "", excerpt: "", content: "", category: "", tags: "", status: "draft" });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        <form onSubmit={handleBlogSubmit} className="grid md:grid-cols-2 gap-3">
          <Input name="title" placeholder="Title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required className={fieldTone} />
          <Input name="slug" placeholder="Slug" value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} className={fieldTone} />
          <Input name="category" placeholder="Category" value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} className={fieldTone} />
          <Input name="status" placeholder="Status" value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })} className={fieldTone} />
          <Input name="tags" placeholder="Tags (comma separated)" value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} className={fieldTone} />
          <Input name="excerpt" placeholder="Excerpt" value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} className={fieldTone} />
          <textarea
            name="content"
            placeholder="Content / Markdown"
            value={blogForm.content}
            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
            className={`md:col-span-2 min-h-[240px] rounded-lg px-3 py-2 text-sm ${fieldTone}`}
          />
          <Button type="submit" className="w-full md:col-span-2" disabled={!isAdmin}>
            {editingBlog ? "Update Blog" : "Save Blog"}
          </Button>
        </form>
        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
          {blogList.map((blog) => (
              <div
              key={blog.slug || slugify(blog.title)}
              className="flex items-start justify-between gap-3 rounded-xl p-4 min-h-[110px] border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white py-0.5 pr-3 pb-7">{blog.title}</p>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.15em] text-gray-600 dark:text-gray-400">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-100 dark:border-indigo-500/30">
                    {blog.status || "draft"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:border-amber-500/30">
                    {blog.category || "blog"}
                  </span>
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => handleBlogEdit(blog)}>
                    Edit
                  </Button>
                  <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => deleteBlog(blog.slug || slugify(blog.title))}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;
