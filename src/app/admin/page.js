"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddForm from "@/components/AddForm";
import EditForm from "@/components/EditForm";

export default function AdminDashboard() {
  const { user, isAdmin, loading  } = useAuth();
  const [articles, setArticles] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "https://pid-korkom-api.onrender.com/api/articles"
        );
        const data = await res.json();
        setArticles(data.reverse());
      } catch (error) {
        console.error("Помилка завантаження статей", error);
      }
    };

    if (isAdmin) fetchArticles();
  }, [isAdmin]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://pid-korkom-api.onrender.com/api/articles/${id}`, {
        method: "DELETE",
      });
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Помилка видалення", err);
    }
  };

  const handleEditButton = (id) => {
    setEditForm(true);
    setItemId(id);
  };

  if (loading) return <p>Завантаження...</p>;
  if (!isAdmin) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="md:w-1/3 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button
            onClick={() => setAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Додати
          </button>
        </div>
        <ul className="space-y-4">
          {articles.map((item) => (
            <li
              key={item._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h5 className="text-lg font-bold mb-2">{item.title}</h5>
              <div className="flex gap-6 mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Видалити
                </button>
                <button
                  onClick={() => handleEditButton(item._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Редагувати
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2 w-full">
        {/* <p>addForm: {addForm ? 'TRUE' : 'FALSE'}</p> */}
        {addForm && <AddForm collapseForm={setAddForm} />}
        {editForm && itemId && (
          <EditForm id={itemId} collapseForm={setEditForm} />
        )}
      </div>
    </div>
  );
}
