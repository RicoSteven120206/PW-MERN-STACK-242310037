"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [info, setInfo] = useState<any>(null);

  const getAPIInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/info");
      setInfo(response.data);
    } catch (error: any) {
      console.error("Error fetching API data:", error);
      setInfo(error?.message);
    }
  };

  useEffect(() => {
    getAPIInfo();
  }, []);

  return (
    <div>
      <h1>Hello World!!</h1>

      {info && (
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            overflow: "auto",
          }}
        >
          {JSON.stringify(info, null, 2)}
        </pre>
      )}
    </div>
  );
}