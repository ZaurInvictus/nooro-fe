"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/utils/types";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

interface TaskFormProps {
  task?: Task;
  onTaskUpdated?: (task: Partial<Task>) => void;
  onTaskAdded?: (task: { title: string; color: string }) => void;
}

export default function TaskForm({
  task,
  onTaskUpdated,
  onTaskAdded,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [color, setColor] = useState(task?.color || "#ffffff");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setColor(task.color);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (title.trim() === "") {
      setError("Title cannot be empty");
      setIsSubmitting(false);
      return;
    }
    if (!color) {
      setError("Color cannot be empty");
      setIsSubmitting(false);
      return;
    }

    try {
      if (task && onTaskUpdated) {
        const updatedFields: Partial<Task> = {};
        if (title !== task.title) updatedFields.title = title;
        if (color !== task.color) updatedFields.color = color;

        if (Object.keys(updatedFields).length > 0) {
          await onTaskUpdated(updatedFields);
        }
      } else if (onTaskAdded) {
        await onTaskAdded({ title, color });
      }
    } catch {
      setError("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = [
    "#FF3B2F",
    "#FD9400",
    "#FFCC02",
    "#34C759",
    "#027AFF",
    "#5856D5",
    "#AF52DE",
    "#FF2E55",
    "#A1835E",
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Link href={"/"}>
        <ArrowLeft className="cursor-pointer" />
      </Link>
      <div className="mt-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-blue-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter your title"
          className="mt-2 block w-full rounded-md 0 text-sm px-3 bg-[#262626] h-[40px] shadow-sm "
        />
      </div>
      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-blue-600"
        >
          Color
        </label>
        <div className="flex items-center mt-2 gap-2 justify-start">
          {colors?.map((Incolor, i) => {
            return (
              <div
                className={`size-[35px] md:size-[45px] cursor-pointer rounded-full relative ${
                  color === Incolor && "opacity-70"
                }`}
                onClick={() => setColor(Incolor)}
                style={{ backgroundColor: Incolor }}
                key={i}
              >
                {color === Incolor && (
                  <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                    <Check className="text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <input
          type="color"
          id="color"
          value={color}
          onChange={() => {}}
          required
          className="sr-only"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 !mt-4 gap-2 text-center text-sm flex items-center justify-center w-full text-white px-4 py-3.5 rounded hover:bg-blue-600 mb-4 "
      >
        <p className="text-[14px] leading-[1]">
          {" "}
          {isSubmitting ? "Saving..." : task ? "Update Task" : "Create Task"}
        </p>{" "}
      </button>
    </form>
  );
}
