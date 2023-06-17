import axios from "axios";

const upload = async (file) => {
  const isImgOrVideo = file.type.split("/")[0];
  const fileSizeInMB = (file.size / 1024 / 1024).toFixed(4);

  const condition1 = isImgOrVideo === "image" && fileSizeInMB < 5.0;
  const condition2 = isImgOrVideo === "video" && fileSizeInMB < 10.0;

  if (condition1 || condition2) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "millennials"); // First set it on Cloudinary.

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqy9nudgb/upload",
        formData
      );

      const { url } = res.data;
      return url;
    } catch (error) {
      console.log(error);
      alert("Oops... Something went wrong.");
      return "error";
    }
  } else {
    isImgOrVideo === "image"
      ? alert("Image file size should be less than 5 MB.")
      : alert("Video file size should be less than 10 MB.");

    return "error";
  }
};

export default upload;
