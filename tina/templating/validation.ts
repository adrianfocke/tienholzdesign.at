export const sanitizeFilenameForURL = (filename: string) =>
  filename
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replaceAll(" ", "-");

export const checkForPositveNumber = (value: number) => {
  if (value !== undefined && value !== null) {
    if (value <= 0) {
      return "Must be a positive number";
    }
    if (!Number.isInteger(value)) {
      return "Must be a whole number";
    }
  }
};
