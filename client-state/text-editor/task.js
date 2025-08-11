// Получаем ссылку на текстовое поле
const editor = document.getElementById("editor");

// Проверяем, есть ли сохранённые данные в localStorage при загрузке страницы
window.addEventListener("load", () => {
  const savedText = localStorage.getItem("editorContent");
  if (savedText) {
    editor.value = savedText;
  }
});

// Сохраняем содержимое текстового поля в localStorage при каждом изменении
editor.addEventListener("input", () => {
  localStorage.setItem("editorContent", editor.value);
});
