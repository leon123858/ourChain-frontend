import FloatButtonSet from "@/components/floatButtonSet";
import TodoList from "@/components/todoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <TodoList />
      <FloatButtonSet />
    </main>
  );
}
