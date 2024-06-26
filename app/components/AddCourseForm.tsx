"use client";

import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { FormEvent } from "react";

interface FormData {
  title: string;
  subtitle: string;
  description: string;
  prerequisites: string;
  fees: string;
}

interface FormDisplayProp {
  formDisplayHandle: () => void;
}

const AddCourseForm: React.FC<FormDisplayProp> = ({ formDisplayHandle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const addCourseHandle = async (
    data: FormData,
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(data);
    try {
      const res: AxiosResponse = await axios.post(
        "http://localhost:5002/courses/add",
        data
      );
      if (!res) {
        console.log("Something went wrong!");
        alert("Something went wrong!");
        return;
      }
      console.log(res);
      alert("Course was added!");
      formDisplayHandle();
    } catch (error) {
      // console.log(error);
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="card mt-4">
      <h4>Add a course</h4>
      <form
        className="w-full mt-8 mb-8"
        onSubmit={handleSubmit(addCourseHandle)}
      >
        <div className="form-group add-course-form">
          <div className="form-control w-full flex-row">
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 15,
                  message: "Title must be at least 15 characters long",
                },
                maxLength: {
                  value: 80,
                  message: "Title must not be more than 80 characters long",
                },
              })}
              type="text"
              id="title"
              autoComplete="off"
              placeholder="Enter course title"
              className="w-5/6 p-1 mb-2"
            />
            {errors.title && (
              <p className="form-error-msg">{errors.title.message}</p>
            )}
          </div>
          <div className="form-control flex-row">
            <input
              {...register("subtitle", {
                required: "Sub-title is required",
                minLength: {
                  value: 15,
                  message: "Sub-title must be at least 15 characters long",
                },
                maxLength: {
                  value: 80,
                  message: "Sub-title must not be more than 80 characters long",
                },
              })}
              type="text"
              id="subtitle"
              autoComplete="off"
              placeholder="Enter course sub title"
              className="w-5/6 p-1 mb-2"
            />

            {errors.subtitle && (
              <p className="form-error-msg">{errors.subtitle.message}</p>
            )}
          </div>
          <div className="form-control flex-row">
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 200,
                  message: "Description must be at least 200 characters long",
                },
                maxLength: {
                  value: 800,
                  message:
                    "Description must not be more than 800 characters long",
                },
              })}
              id="description"
              rows={4}
              placeholder="Enter course description"
              className="w-5/6 p-1 mb-2 custom-text-area"
            />
            {errors.description && (
              <p className="form-error-msg">{errors.description.message}</p>
            )}
          </div>
          <div className="form-control">
            <textarea
              {...register("prerequisites", {
                required: "Description is required",
                minLength: {
                  value: 200,
                  message: "Description must be at least 200 characters long",
                },
                maxLength: {
                  value: 800,
                  message:
                    "Description must not be more than 800 characters long",
                },
              })}
              id="prerequisites"
              rows={4}
              placeholder="Enter course prerequisites"
              className="w-5/6 p-1 mb-2 custom-text-area"
            />
            {errors.prerequisites && (
              <p className="form-error-msg">{errors.prerequisites.message}</p>
            )}
          </div>
          <div className="form-control">
            <input
              {...register("fees", {
                required: "Fees is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter numbers only",
                },
              })}
              type="number"
              id="fees"
              autoComplete="off"
              placeholder="Enter course fees"
              className="w-5/6 p-1 mb-2"
            />
            {errors.fees && (
              <p className="form-error-msg">{errors.fees.message}</p>
            )}
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-blue mt-2">
              Submit
            </button>
            <button
              className="btn btn-red mt-2 ml-2"
              onClick={formDisplayHandle}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
