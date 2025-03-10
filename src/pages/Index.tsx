
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./HomePage";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // We're just rendering the HomePage directly,
    // but we could add logic here for redirects, etc.
  }, [navigate]);

  return <HomePage />;
}
