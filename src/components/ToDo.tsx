import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { nanoid } from "nanoid";

import styles from "./ToDo.module.css";

import { Task } from "./Task";
import { NoTask } from "./NoTask";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function ToDo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTasks, setNewTasks] = useState("");
  const [counterTasks, setCounterTasks] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: nanoid(),
      title: newTasks,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTasks("");
    setCounterTasks(tasks.length + 1);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTasks(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleDeleteTask(taskID: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskID;
    });

    setTasks(tasksWithoutDeletedOne);
    setCounterTasks(tasksWithoutDeletedOne.length);
  }

  function handleTaskDone(taskID: string) {
    const tasksCompleted = tasks.map((task) => {
      if (task.id === taskID) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      } else {
        return task;
      }
    });

    setTasks(tasksCompleted);
  }

  const counterTasksDone = tasks.reduce(
    (total, task) => (total += task.isComplete ? 1 : 0),
    0
  );

  return (
    <article>
      <form onSubmit={handleCreateNewTask}>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTasks}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">
            Criar <PlusCircle size={20} />
          </button>
        </div>
      </form>

      <div className={styles.toDoBox}>
        <header>
          <strong>
            Tarefas criadas <label>{counterTasks}</label>
          </strong>
          <span>
            Concluidas{" "}
            <label>
              {counterTasksDone} de {counterTasks}
            </label>
          </span>
        </header>
      </div>

      {counterTasks > 0 ? (
        <div className={styles.toDoTasks}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              content={task.title}
              onDeleteTask={handleDeleteTask}
              onTaskDone={handleTaskDone}
            />
          ))}
        </div>
      ) : (
        <div className={styles.toDoTasks}>
          <NoTask />
        </div>
      )}
    </article>
  );
}
