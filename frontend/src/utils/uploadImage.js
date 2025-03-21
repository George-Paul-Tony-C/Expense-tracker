import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

export const uploadImage = async (imageFile) => {
  try {
    if (!imageFile) {
      throw new Error("No image file provided.");
    }

    console.log("Image File:", imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);

    // Debugging FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`FormData Key: ${key}, Value:`, value);
    }

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload Successful:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
};
