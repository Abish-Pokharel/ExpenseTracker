export function getInitial(name = "") {
  const trimmedName = typeof name === "string" ? name.trim() : "";

  if (!trimmedName) {
    return "U";
  }

  const [firstPart] = trimmedName.split(/\s+/);
  return firstPart ? firstPart.charAt(0).toUpperCase() : "U";
}
