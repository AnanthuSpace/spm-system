import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster  richColors/>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
