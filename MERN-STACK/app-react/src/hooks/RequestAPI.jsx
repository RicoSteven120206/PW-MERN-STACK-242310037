import axios from "axios";

const RequestAPI = async (method, url, headers = {}, data = undefined) => {
  try {
    const config = {
      method,
      url,
      maxBodyLength: Infinity,
      headers,
      data,
    };

    const response = await axios(config);
    const result = response.data || {};

    return {
      loading: false,
      success: result?.success !== undefined ? result.success : true,
      message: result?.message || "Request completed successfully",
      statusCode: response.status,
      ...result,
      data: result?.data !== undefined ? result.data : [],
      errors: result?.errors || null,
    };
  } catch (error) {
    const backendMessage = error.response?.data?.message;
    const validationErrors = error.response?.data?.errors;
    const statusCode = error.response?.status;

    return {
      loading: false,
      success: false,
      message:
        backendMessage ||
        error.message ||
        "Failed to connect to server. Please try again.",
      data: [],
      statusCode: statusCode || 500,
      errors: validationErrors || null,
    };
  }
};

export { RequestAPI };