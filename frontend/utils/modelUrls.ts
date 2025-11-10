const BACKEND_URL =
  process.env.NEXT_PUBLIC_SPREE_API_URL || "http://localhost:3001";

export function getModelUrl(modelPath: string): string {
  if (!modelPath) return "";

  // If it's already a full URL, return as is
  if (modelPath.startsWith("http")) {
    return modelPath;
  }

  // If it starts with /, it's a local path
  if (modelPath.startsWith("/")) {
    return modelPath;
  }

  // Otherwise, assume it's a backend model
  return `${BACKEND_URL}/models/${modelPath}`;
}

export function getBackendModelUrl(filename: string): string {
  return `${BACKEND_URL}/models/${filename}`;
}
