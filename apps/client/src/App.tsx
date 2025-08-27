import { AppLayout } from "@/layouts/app.layout";
import { AppRouter } from "@/routes/AppRouter";

function App() {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export default App;
