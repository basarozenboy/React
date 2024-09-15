import styles from "./page.module.css";
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';
import { TasksProvider } from './TasksContext.jsx';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TasksProvider>
          <h1>İstanbul'da bir gün</h1>
          <AddTask />
          <TaskList />
        </TasksProvider>      
      </main>
    </div>
  );
}