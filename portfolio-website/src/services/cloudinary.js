import axios from "axios";
import { cloudinaryConfig, cloudinaryFolders } from "../config/cloudinary";

export const uploadToCloudinary = async (file, folder = "misc") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  formData.append("folder", cloudinaryFolders[folder] || folder);

  const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`;
  const { data } = await axios.post(url, formData);
  return data;
};
