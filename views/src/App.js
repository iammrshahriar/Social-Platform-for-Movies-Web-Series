import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

function App() {
  useEffect(() => {}, []);
  return <RouterProvider router={router} />;
}

export default App;
