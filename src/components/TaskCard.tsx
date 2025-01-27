import { Task } from "@/utils/types";
import { Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { markTaskAsCompleted, removeTask } from "../utils/api";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onRemove: (id: string) => void;
}

export default function TaskCard({ task, onUpdate, onRemove }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popUp, setPopUp] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    setError(null);
    try {
      const updatedTask = await markTaskAsCompleted(
        task.id,
        task?.completed ? false : true
      );
      toast.success("Task Updated successfully");
      onUpdate(updatedTask);
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
      setError("Failed to complete task. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleRemove = async () => {
    try {
      await removeTask(task.id);
      onRemove(task.id);
    } catch (error) {
      console.error("Failed to remove task:", error);
      setError("Failed to remove task. Please try again.");
    }
  };

  return (
    <>
      {popUp && (
        <div
          key={task.id}
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-[3px] transition-all"
        >
          <div className="w-full max-w-[350px] rounded-md bg-#0a0a0a; p-3">
            <p className="text-center text-sm text-white">
              Do you want to proceed with deleting this task?
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => setPopUp(false)}
                className="rounded-md bg-customBlue px-2 py-1 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRemove();
                  setPopUp(false);
                }}
                className="rounded-md bg-customPurple px-2 py-1 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`rounded-lg border border-white/5 bg-[#262626] px-4 py-4 shadow`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start justify-start gap-3">
            <div
              onClick={handleComplete}
              className={`border-[2px] cursor-pointer border-customBlue aspect-square mt-0.5 flex items-center justify-center size-[18px] rounded-full shrink-0 ${
                isCompleting && "pointer-events-none opacity-90"
              } ${task.completed && "border-customPurple bg-customPurple"}`}
            >
              {task.completed && <Check className="size-[10px] text-white" />}
            </div>
            <Link
              href={`/edit/${task.id}`}
              className={`w-full text-sm ${
                task.completed && "line-through opacity-50"
              }`}
            >
              <p style={{ color: task.color }}>{task.title}</p>
            </Link>
          </div>

          <button
            onClick={() => setPopUp(true)}
            className="rounded px-2 py-1 text-white"
          >
            <Trash2 className="size-[17px] transition-all hover:text-red-500" />
          </button>
        </div>
        {error && <p className="mb-2 text-red-500">{error}</p>}
      </div>
    </>
  );
}
