import dayjs from "dayjs";
import { convert } from "html-to-text";

export const getKeyFromPath = (path: string) => {
  if (!path) return;

  const texts = path.split("/");
  const len = texts.length;

  return texts[len - 1];
};

export const formatToDate = (strDate: string) => {
  return dayjs(strDate).isValid() ? dayjs(strDate).format(formatDateShow) : "";
};

export const getLastPath = (path: string) => {
  return path.split("/")?.[path.split("/").length - 1];
};

export const handleHtmlToString = (html: string) => {
  return convert(html.replace(/<img[^>]*>/g, ""));
};

export const formatDateShow = "DD/MM/YYYY";
export const formatDatePost = "YYYY-MM-DD";

export const handleReplaceHostName = (url: string) => {
  const index = url.indexOf("/api/");

  const newUrl = url.substring(index + 5);
  console.log(newUrl);
};

export const extractVideoId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};
