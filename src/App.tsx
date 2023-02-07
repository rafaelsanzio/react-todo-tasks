import { Header } from "./components/Header";

import styles from "./App.module.css";

import "./global.css";
import { ToDo } from "./components/ToDo";

export function App() {
  return (
    <div>
      <Header />
      <ToDo />
    </div>
  );
}
