import styles from "./NoTask.module.css";

import clipboard from "../assets/clipboard.svg";

export function NoTask() {
  return (
    <div className={styles.toDoNoTask}>
      <img src={clipboard} />
      <strong>Você ainda não tem tarefas cadastradas </strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}
