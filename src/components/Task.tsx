import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  content: string;
  onDeleteTask: (taskID: string) => void;
  onTaskDone: (taskID: string) => void;
}

export function Task({ id, content, onDeleteTask, onTaskDone }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleTaskDone() {
    onTaskDone(id);
  }

  return (
    <div className={styles.toDoTask}>
      <input type="checkbox" onClick={handleTaskDone} />
      <p>{content}</p>
      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={20} />
      </button>
    </div>
  );
}
