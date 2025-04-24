export function getErrorMessage(err: any): string {
  if (!err) return "Unknown error occurred.";
  if (err.response) {
    // Backend returned a response (error)
    if (err.response.data?.errors) {
      // Validation errors (array)
      if (Array.isArray(err.response.data.errors)) {
        return `Validation error: ${err.response.data.errors.join(", ")}`;
      }
      // Validation error (string)
      if (typeof err.response.data.errors === "string") {
        return `Validation error: ${err.response.data.errors}`;
      }
    }
    // backend message
    if (err.response.data?.message) {
      return `Server error: ${err.response.data.message}`;
    }
    // HTTP status code handling
    switch (err.response.status) {
      case 400:
        return "Bad request. Please check your input.";
      case 401:
        return "You are not authorized. Please log in.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 409:
        return "Conflict: Resource already exists.";
      case 500:
        return "Internal server error. Please try again later.";
      default:
        return `Server error: ${err.response.statusText || "Unknown error"}`;
    }
  }
  if (err.request) {
    return "Network error: No response from server. Please check your connection.";
  }
  if (err.message) {
    return `Unexpected error: ${err.message}`;
  }

  return "An unexpected error occurred.";
}

export function logError(err: any) {
  if (process.env.NODE_ENV === "development") {
    console.error("[ErrorHandler]", err);
  }
}
