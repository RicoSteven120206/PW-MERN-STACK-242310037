"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function BooksCRUDPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchBooks = async () => {
    setIsLoadingData(true);
    setFetchError("");

    // 1. Ambil accessToken yang disimpan saat login
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:3001/api/books", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // PERLU: Kirim Bearer Token
        },
      });

      const result = await response.json();

      if (response.ok) {
        // 2. Ekstrak data (Sesuaikan dengan bentuk JSON dari backend kamu)
        const dataList = Array.isArray(result) ? result : (result.data || result.books || []);
        setBooks(dataList);
      } else {
        setFetchError(result.message || "Gagal mengambil data buku.");
      }
    } catch (err) {
      console.error("Fetch CRUD Error:", err);
      setFetchError("Gagal terhubung ke server.");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: "20px", color: "var(--text-primary)" }}>
      <h2>Data Buku (CMS CRUD)</h2>
      <p>Selamat datang, <strong>{user?.username || user?.email}</strong></p>

      {fetchError && <div className="error-message">{fetchError}</div>}

      {isLoadingData ? (
        <p>Memuat data tabel...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--button-secondary-hover)" }}>
              <th>No</th>
              <th>Judul Buku</th>
              <th>Penulis</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book.id || index}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button style={{ marginRight: "8px" }}>Edit</button>
                    <button style={{ color: "red" }}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <BooksCRUDPage />
    </ProtectedRoute>
  );
}