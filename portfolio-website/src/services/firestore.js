import {
  arrayUnion,
  collection,
  doc,
  arrayRemove,
  deleteDoc,
  getDocs,
  getDoc,
  increment,
  addDoc,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { slugify } from "../utils/helpers";

export const likeProjectRemote = async (slug, userId) => {
  if (!slug || !userId) return;
  const ref = doc(db, "projects", slug);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    if (data?.likedBy?.includes(userId)) return;
    // Only touch allowed fields for non-admin users per security rules.
    tx.update(ref, {
      likes: increment(1),
      likedBy: arrayUnion(userId),
    });
  });
};

export const unlikeProjectRemote = async (slug, userId) => {
  if (!slug || !userId) return;
  const ref = doc(db, "projects", slug);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    if (!data?.likedBy?.includes(userId)) return;
    tx.update(ref, {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    });
  });
};

export const upsertExperienceRemote = async (exp) => {
  if (!exp?.company || !exp?.position) return;
  const id = exp.id || slugify(`${exp.company}-${exp.position}`);
  const ref = doc(db, "experiences", id);
  await setDoc(
    ref,
    {
      ...exp,
      id,
      updatedAt: serverTimestamp(),
      createdAt: exp.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteExperienceRemote = async (id) => {
  if (!id) return;
  const ref = doc(db, "experiences", id);
  await deleteDoc(ref);
};

export const upsertEducationRemote = async (edu) => {
  if (!edu?.institution || !edu?.degree) return;
  const id = edu.id || slugify(`${edu.institution}-${edu.degree}`);
  const ref = doc(db, "education", id);
  await setDoc(
    ref,
    {
      ...edu,
      id,
      updatedAt: serverTimestamp(),
      createdAt: edu.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteEducationRemote = async (id) => {
  if (!id) return;
  const ref = doc(db, "education", id);
  await deleteDoc(ref);
};

export const upsertBlogRemote = async (blog) => {
  if (!blog?.title) return;
  const slug = blog.slug || slugify(blog.title);
  const ref = doc(db, "blogs", slug);
  await setDoc(
    ref,
    {
      ...blog,
      slug,
      likes: blog.likes || 0,
      likedBy: blog.likedBy || [],
      readCount: blog.readCount || 0,
      status: blog.status || "draft",
      updatedAt: serverTimestamp(),
      createdAt: blog.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteBlogRemote = async (slug) => {
  if (!slug) return;
  const ref = doc(db, "blogs", slug);
  await deleteDoc(ref);
};

export const fetchProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchBlogs = async () => {
  const snapshot = await getDocs(collection(db, "blogs"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const saveContactMessage = async (payload) => {
  if (!payload?.email || !payload?.message) return;
  const now = serverTimestamp();
  await addDoc(collection(db, "contactMessages"), {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });
};

export const fetchContactMessages = async () => {
  const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchStudyRoadmap = async () => {
  const snapshot = await getDocs(collection(db, "studyRoadmap"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const upsertStudyRoadmapRemote = async (entry) => {
  if (!entry?.title) return;
  const id = slugify(entry.id?.toString() || entry.title);
  const ref = doc(db, "studyRoadmap", id);
  await setDoc(
    ref,
    {
      ...entry,
      id,
      updatedAt: serverTimestamp(),
      createdAt: entry.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteStudyRoadmapRemote = async (id) => {
  if (!id) return;
  const ref = doc(db, "studyRoadmap", id);
  await deleteDoc(ref);
};

export const likeBlogRemote = async (docId, userId) => {
  if (!docId || !userId) return;
  const ref = doc(db, "blogs", docId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data() || {};
    const likedBy = data.likedBy || [];
    const dislikedBy = data.dislikedBy || [];
    if (likedBy.includes(userId)) return;
    tx.set(
      ref,
      {
        likes: increment(1),
        likedBy: arrayUnion(userId),
        // remove dislike if present
        dislikes: dislikedBy.includes(userId) ? increment(-1) : increment(0),
        dislikedBy: arrayRemove(userId),
      },
      { merge: true }
    );
  });
};

export const dislikeBlogRemote = async (docId, userId) => {
  if (!docId || !userId) return;
  const ref = doc(db, "blogs", docId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data() || {};
    const likedBy = data.likedBy || [];
    const dislikedBy = data.dislikedBy || [];
    if (dislikedBy.includes(userId)) return;
    tx.set(
      ref,
      {
        dislikes: increment(1),
        dislikedBy: arrayUnion(userId),
        // remove like if present
        likes: likedBy.includes(userId) ? increment(-1) : increment(0),
        likedBy: arrayRemove(userId),
      },
      { merge: true }
    );
  });
};

export const unlikeBlogRemote = async (docId, userId) => {
  if (!docId || !userId) return;
  const ref = doc(db, "blogs", docId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data() || {};
    const likedBy = data.likedBy || [];
    if (!likedBy.includes(userId)) return;
    tx.set(
      ref,
      {
        likes: increment(-1),
        likedBy: arrayRemove(userId),
      },
      { merge: true }
    );
  });
};

export const reactBlogRemote = async (slug, prevReaction, nextReaction) => {
  if (!slug || !nextReaction) return;
  const ref = doc(db, "blogs", slug);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const updates = {
      [`reactions.${nextReaction}`]: increment(1),
    };
    if (prevReaction && prevReaction !== nextReaction) {
      updates[`reactions.${prevReaction}`] = increment(-1);
    }
    tx.set(
      ref,
      updates,
      { merge: true }
    );
  });
};

const seedDocs = async (collectionName, items, idFactory) => {
  if (!Array.isArray(items) || !items.length) return;
  const ops = items.map((item) => {
    const id = idFactory(item);
    const ref = doc(db, collectionName, id);
    return setDoc(ref, { ...item, createdAt: item.createdAt || serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
  });
  await Promise.all(ops);
};

export const syncSeedProjects = async (items) =>
  seedDocs("projects", items, (proj) => proj.slug || slugify(proj.title));

export const syncSeedExperiences = async (items) =>
  seedDocs("experiences", items, (exp) => slugify(`${exp.company}-${exp.position}`));

export const syncSeedEducation = async (items) =>
  seedDocs("education", items, (edu) => slugify(`${edu.institution}-${edu.degree || ""}`));

export const syncSeedExperienceRoadmap = async (items) =>
  seedDocs("experienceRoadmap", items, (item) => `${item.id || slugify(item.title)}`);

export const syncSeedStudyRoadmap = async (items) =>
  seedDocs("studyRoadmap", items, (item) => `${item.id || slugify(item.title)}`);

export const syncSeedSkills = async (items) =>
  seedDocs("skills", items, (item) => slugify(`${item.category || "skill"}-${item.name || item}`));

export const syncSeedSettings = async (item) => {
  if (!item) return;
  const ref = doc(db, "settings", item.id || "site-config");
  await setDoc(ref, { ...item, updatedAt: serverTimestamp() }, { merge: true });
};

export const fetchSettings = async () => {
  const ref = doc(db, "settings", "site-config");
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
};

export const upsertSettingsRemote = async (item) => {
  if (!item) return;
  const ref = doc(db, "settings", item.id || "site-config");
  await setDoc(
    ref,
    {
      ...item,
      id: item.id || "site-config",
      updatedAt: serverTimestamp(),
      createdAt: item.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const upsertProjectRemote = async (project) => {
  if (!project?.title) return;
  const slug = project.slug || slugify(project.title);
  const ref = doc(db, "projects", slug);
  await setDoc(
    ref,
    {
      ...project,
      slug,
      likes: project.likes || 0,
      views: project.views || 0,
      likedBy: project.likedBy || [],
      updatedAt: serverTimestamp(),
      createdAt: project.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteProjectRemote = async (slug) => {
  if (!slug) return;
  const ref = doc(db, "projects", slug);
  await deleteDoc(ref);
};

export const syncAllSeeds = async (seedData) => {
  const {
    projects = [],
    experiences = [],
    education = [],
    experienceRoadmap = [],
    studyRoadmap = [],
    skills = [],
    settings,
  } = seedData || {};

  await Promise.all([
    syncSeedProjects(projects),
    syncSeedExperiences(experiences),
    syncSeedEducation(education),
    syncSeedExperienceRoadmap(experienceRoadmap),
    syncSeedStudyRoadmap(studyRoadmap),
    syncSeedSkills(
      Array.isArray(skills)
        ? skills
        : Object.entries(skills || {}).flatMap(([category, values]) =>
            values.map((name) => ({ name, category }))
          )
    ),
    syncSeedSettings(settings),
  ]);
};
