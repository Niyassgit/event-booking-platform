import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="bg-slate-950 text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
