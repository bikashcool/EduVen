import toast from "react-hot-toast";
import { courseEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,
} = courseEndPoints;

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR.......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    console.log("COURSE_DETAILS_API RESPONSE.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR.....", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("COURSE_CATEGORIES_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_CATEGORIES_API ERROR........", error);
    toast.error(error.message);
  }
  return result;
};

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE_API RESPONSE......", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE_API ERROR..........", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_COURSE_API RESPONSE.........", response);
    if (!response?.data?.success) {
      throw new Error("Could not update course details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_COURSE_API ERROR........", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SECTION_API RESPONSE....", response);
    if (!response?.data?.success) {
      throw new Error("Could not Create Section");
    }
    toast.success("Course Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE_SECTION_API ERROR....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SUBSECTION_API RESPONSE....", response);
    if (!response?.data?.success) {
      throw new Error("Could not add lecture");
    }
    toast.success("Lecture Added");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_SUBSECTION_API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_SECTION_API RESPONSE....", response);
    if (!response?.data?.success) {
      throw new Error("Could not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR.........", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_SUB_SECTION API RESPONSE......", response);
    if (!response?.data?.success) {
      throw new Error("Could not Update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SUB_SECTION API ERROR.......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SECTION API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete section");
    }
    toast.success("Course Section Deleted");
    result = response?.data?.success;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_SUB_SECTION API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SUB_SECTION API ERROR....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_ALL_INSTRUCTOR_COURSES_API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_INSTRUCTOR_API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_COURSE_API RESPONSE.......", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR........", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "GET_FULL_COURSE_DETAILS_AUTHENTICATED API RESPONSE......",
      response
    );
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "GET_FULL_COURSE_DETAILS_AUTHENTICATED API ERROR..........",
      error
    );
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("LECTURE_COMPLETION_API RESPONSE......", response);
    if (!response?.data?.success) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("LECTURE_COMPLETION_API ERROR..........", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_RATING_API RESPONSE.....", response);
    if (!response?.data?.success) {
      throw new Error("Could not Create Rating");
    }
    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE_RATING_API ERROR......", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
