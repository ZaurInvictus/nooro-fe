"use client";

import TaskForm from "@/components/TaskForm";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { editTask, getTasks } from "@/utils/api";
import { Task } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditComponent = ({ id }: { id: string }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTasks = await getTasks();
        const foundTask = fetchedTasks.find((t) => Number(t.id) === Number(id));
        if (foundTask) {
          setTask(foundTask);
        } else {
          setError("Task not found.");
        }
      } catch {
        setError("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTask();
  }, [id]);

  const handleTaskUpdated = async (updatedTask: Partial<Task>) => {
    if (task) {
      try {
        await editTask(task.id, updatedTask);
        router.push("/");
      } catch {
        setError("Failed to update task. Please try again.");
      }
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!task) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header />
      <div className="mt-10 w-full max-w-[600px] px-4 lg:px-0">
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        <TaskForm task={task} onTaskUpdated={handleTaskUpdated} />
      </div>
    </div>
  );
};

export default EditComponent;
