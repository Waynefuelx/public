// Helper function to extract error message from API error response
export const extractErrorMessage = (error: any): string => {
  // First, try to extract from errors object (validation errors are more specific)
  // Check for originalError property first (stored in ApiError)
  if (error?.originalError?.errors && typeof error.originalError.errors === 'object') {
    const errorFields = Object.keys(error.originalError.errors);
    if (errorFields.length > 0) {
      const firstField = errorFields[0];
      const fieldErrors = error.originalError.errors[firstField];
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && fieldErrors[0]) {
        return String(fieldErrors[0]);
      }
    }
  }
  
  // Also check if errors is directly on error (ApiError instance property)
  // The ApiError class has errors as a property, so check it directly
  if (error.errors && typeof error.errors === 'object' && !Array.isArray(error.errors)) {
    const errorFields = Object.keys(error.errors);
    if (errorFields.length > 0) {
      const firstField = errorFields[0];
      const fieldErrors = error.errors[firstField];
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && fieldErrors[0]) {
        return String(fieldErrors[0]);
      }
    }
  }

  // Check the errors property directly on the error object (ApiError instance property)
  // Try both error.errors and error?.errors to handle different cases
  const errorsObj = error.errors || error?.errors;
  if (errorsObj && typeof errorsObj === 'object' && !Array.isArray(errorsObj) && errorsObj !== null) {
    const errorFields = Object.keys(errorsObj);
    if (errorFields.length > 0) {
      const firstField = errorFields[0];
      const fieldErrors = errorsObj[firstField];
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && fieldErrors[0]) {
        return String(fieldErrors[0]);
      }
    }
  }

  // Check if error has a message property (before title, as message might be more specific)
  if (error?.message && typeof error.message === 'string') {
    // Only use message if it's not the generic validation error title
    if (!error.message.includes('One or more validation errors occurred')) {
      return error.message;
    }
  }

  // Check if error has a title property (but prefer specific error messages)
  if (error?.title && typeof error.title === 'string') {
    // Only use title if it's not the generic validation error message
    if (!error.title.includes('One or more validation errors occurred')) {
      return error.title;
    }
  }

  // Check originalError.title (but prefer specific error messages)
  if (error?.originalError?.title && typeof error.originalError.title === 'string') {
    if (!error.originalError.title.includes('One or more validation errors occurred')) {
      return error.originalError.title;
    }
  }

  // Fallback - if we have a generic validation error message, try one more time to get specific errors
  // This handles the case where the error structure might be nested differently
  if (error && typeof error === 'object') {
    // Try to find any errors property recursively
    for (const key in error) {
      if ((key === 'errors' || key.includes('error')) && error[key] && typeof error[key] === 'object') {
        const errorObj = error[key];
        if (errorObj && typeof errorObj === 'object' && !Array.isArray(errorObj)) {
          const fields = Object.keys(errorObj);
          if (fields.length > 0) {
            const firstField = fields[0];
            const fieldErrors = errorObj[firstField];
            if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && fieldErrors[0]) {
              return String(fieldErrors[0]);
            }
          }
        }
      }
    }
  }

  // Fallback to default message
  return "An error occurred. Please try again.";
};

