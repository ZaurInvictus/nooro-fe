"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import Header from "@/components/Header";
import { addTask } from "@/utils/api";
import { toast } from "sonner";

export default function CreateTask() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleTaskAdded = async (newTask: { title: string; color: string }) => {
    try {
      await addTask(newTask);
      toast.success("Task added successfully");
      router.push("/");
    } catch {
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <Header />
      <div className="w-full max-w-[600px] mt-10 lg:px-0 px-4">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>
    </div>
  );
}
