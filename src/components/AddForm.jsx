"use client";

import { useState } from "react";

const AddForm = ({ collapseForm }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("title", form.elements.title.value);
    formData.append("text", form.elements.text.value);
    formData.append("category", form.elements.category.value);
    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("https://pid-korkom-api.onrender.com/api/admin", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      form.reset();
      setImage(null);
      collapseForm();
    } else {
      alert("Помилка при додаванні статті");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <input
        type="text"
        name="title"
        placeholder="Заголовок"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        name="category"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="whisky">whisky</option>
        <option value="rum">rum</option>
        <option value="tequila">tequila</option>
        <option value="gin">gin</option>
        <option value="wine">wine</option>
        <option value="other">other</option>
      </select>
      <textarea
        name="text"
        placeholder="Основний текст"
        rows="10"
        className="w-full min-w-[600px] border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y min-h-[250px]"
      />
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      <div className="flex gap-4 justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Додати
        </button>
        <button
          onClick={() => collapseForm()}
          type="button"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Закрити
        </button>
      </div>
    </form>
  );
};

export default AddForm;
