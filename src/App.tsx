import AppRouter from "./router";
import KeyboardManager from "./managers/KeyboardManager";
import { useToastStore } from "./stores/toast.store";
import Toast from "./components/Toast";

import "./App.css";

export default function App() {
  const toast = useToastStore();
  return (
    <>
      <KeyboardManager />
      <AppRouter />
      <Toast
        open={toast.open}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </>
  );
}
