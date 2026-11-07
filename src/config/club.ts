function recruitmentUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const isGoogleForm =
      url.hostname === "forms.gle" ||
      (url.hostname === "docs.google.com" && url.pathname.startsWith("/forms/"));
    return url.protocol === "https:" && isGoogleForm ? url.href : null;
  } catch {
    return null;
  }
}

export const clubContact = {
  email: "hansung.dcnm@gmail.com",
  recruitmentFormUrl: recruitmentUrl(import.meta.env.VITE_RECRUITMENT_FORM_URL),
};
