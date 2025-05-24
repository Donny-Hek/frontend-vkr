import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// useEffect
const DashboardPage = () => {
  const [examTypes, setExamTypes] = useState([]);
  // const [selectedExam, setSelectedExam] = useState("");
  const [answerFile, setAnswerFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  // const [isReady, setIsReady] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchExamTypes = async () => {
      const dbSubjects = [
        {
          id: 1,
          name: "Математика",
          templatePath: "/templates/math_template.xlsx",
        },
        {
          id: 2,
          name: "Русский язык",
          templatePath: "/templates/russian_template.xlsx",
        },
        {
          id: 3,
          name: "Физика",
          templatePath: "/templates/physics_template.xlsx",
        },
      ];
      setSubjects(dbSubjects);
      // setExamTypes(dbSubjects);
      // try {
      //   // const response = await axios.get('/api/exams');
      //   // setExamTypes(response.data);
      //   setExamTypes("экзамен 1", "экзамен 2");
      // } catch (error) {
      //   console.error("Ошибка загрузки экзаменов:", error);
      //   alert("Не удалось загрузить список экзаменов");
      // }
    };

    fetchExamTypes();
  }, []);

  // const handleDownloadTemplate = () => {
  //   window.open("/api/template", "_blank");
  // };

  // const handleAnswerFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.includes("excel")) {
  //     setAnswerFile(file);
  //     setIsReady(selectedExam !== "" && photoFiles.length > 0);
  //   } else {
  //     alert("Пожалуйста, загрузите файл в формате Excel (.xls, .xlsx)");
  //   }
  // };

  // const handlePhotoUploadChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length > 10) {
  //     alert("Можно загрузить максимум 10 фото.");
  //     return;
  //   }
  //   setPhotoFiles(files);
  //   setIsReady(selectedExam !== "" && answerFile !== null);
  // };

  // const handleExamSelect = (e) => {
  //   setSelectedExam(e.target.value);
  //   setIsReady(answerFile !== null && photoFiles.length > 0);
  // };

  // const handleSubmit = async () => {
  //   if (!selectedExam || !answerFile || photoFiles.length === 0) {
  //     alert("Пожалуйста, заполните все поля.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("examType", selectedExam);
  //   formData.append("answerFile", answerFile);
  //   // photoFiles.forEach((file, index) => {
  //   //   formData.append(`photos`, file); // Лучше использовать одно имя для массива
  //   // });

  //   setIsLoading(true);

  //   // try {
  //   //   await axios.post("/api/submit", formData, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //     },
  //   //   });
  //   //   alert("Проверка успешно отправлена!");
  //   //   // Сброс формы после успешной отправки
  //   //   setSelectedExam("");
  //   //   setAnswerFile(null);
  //   //   setPhotoFiles([]);
  //   //   setIsReady(false);
  //   // } catch (error) {
  //   //   console.error("Ошибка отправки:", error);
  //   //   alert(
  //   //     `Ошибка при отправке на проверку: ${
  //   //       error.response?.data?.message || error.message
  //   //     }`
  //   //   );
  //   // } finally {
  //   //   setIsLoading(false);
  //   // }
  // };
  const handleAnswersUpload = (e) => {
    setAnswerFile(e.target.files[0]);
  };

  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setPhotoFiles(files);
  };

  const handleSubmit = () => {
    if (!examTypes || !answerFile || photoFiles.length === 0) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }
    setError("");
    console.log("Submitted", { examTypes, answerFile, photoFiles });
  };

  const selectedSubject = subjects.find((s) => s.name === examTypes);
  const templatePath = selectedSubject?.templatePath;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="gia-header">
        <div className="gia-square"></div>
        <div className="gia-logo-block">
          <h1 className="gia-title">Проверь ГИА</h1>
        </div>
        <nav className="gia-nav">
          <Link to="/profile">Кабинет</Link>
        </nav>
        <div className="gia-square"></div>
      </header>

      {/* Info */}
      <div className="gia-section">
        <p>У вас осталось проверок в этом месяце: &lt;число&gt;</p>
      </div>

      {/* Main form */}

      <div className="gia-list">
        <h2 className="gia-hero">Начать проверку</h2>
        <div className="mb-4">
          <label className="block mb-1">
            1: Выберите тип и предмет экзамена{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={examTypes}
            onChange={(e) => setExamTypes(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">-- Выберите экзамен --</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            2: Скачайте и заполните шаблон с ответами
          </label>
          {templatePath && (
            <a
              href={templatePath}
              download
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Шаблон
            </a>
          )}
          <span className="text-red-500 ml-2">* Обязательно</span>
        </div>

        <div className="mb-4">
          <label className="block mb-1">3: Загрузите ответы</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleAnswersUpload}
            className="block"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">4: Загрузите фото бланков</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotosUpload}
            className="block"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-gray-400 text-white px-6 py-2 rounded"
        >
          Отправить на проверку
        </button>
      </div>
    </div>
    // <div className="p-4 max-w-xl mx-auto border border-gray-300 rounded-lg shadow-md">
    //   <h2 className="text-2xl font-bold mb-6 text-center">Начать проверку</h2>

    //   <div className="mb-6">
    //     <label className="block font-medium mb-2">
    //       1. Выберите тип и предмет экзамена
    //     </label>
    //     <select
    //       className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //       value={selectedExam}
    //       onChange={handleExamSelect}
    //       disabled={isLoading}
    //     >
    //       <option value="">-- Выберите экзамен --</option>
    //       {examTypes.map((exam, idx) => (
    //         <option key={idx} value={exam.id}>
    //           {exam.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div className="mb-6">
    //     <label className="block font-medium mb-2">
    //       2. Скачайте и заполните шаблон с ответами
    //     </label>
    //     <button
    //       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
    //       onClick={handleDownloadTemplate}
    //       disabled={isLoading}
    //     >
    //       Скачать шаблон
    //     </button>
    //   </div>

    //   <div className="mb-6">
    //     <label className="block font-medium mb-2">
    //       3. Загрузите файл с ответами (Excel)
    //     </label>
    //     <div className="flex items-center gap-4">
    //       <label className="flex-1">
    //         <input
    //           type="file"
    //           accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //           onChange={handleAnswerFileChange}
    //           className="hidden"
    //           id="answer-file-input"
    //           disabled={isLoading}
    //         />
    //         <div className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 text-center">
    //           {answerFile ? answerFile.name : "Выберите файл..."}
    //         </div>
    //       </label>
    //       {answerFile && (
    //         <span className="text-green-600 flex items-center">
    //           <svg
    //             className="w-5 h-5 mr-1"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M5 13l4 4L19 7"
    //             />
    //           </svg>
    //           Загружено
    //         </span>
    //       )}
    //     </div>
    //   </div>

    //   <div className="mb-6">
    //     <label className="block font-medium mb-2">
    //       4. Загрузите фото бланков (до 10)
    //     </label>
    //     <div className="flex items-center gap-4">
    //       <label className="flex-1">
    //         <input
    //           type="file"
    //           accept="image/*"
    //           multiple
    //           onChange={handlePhotoUploadChange}
    //           className="hidden"
    //           id="photo-files-input"
    //           disabled={isLoading}
    //         />
    //         <div className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 text-center">
    //           {photoFiles.length > 0
    //             ? `Выбрано ${photoFiles.length} файлов`
    //             : "Выберите файлы..."}
    //         </div>
    //       </label>
    //       {photoFiles.length > 0 && (
    //         <span className="text-green-600 flex items-center">
    //           <svg
    //             className="w-5 h-5 mr-1"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M5 13l4 4L19 7"
    //             />
    //           </svg>
    //           {photoFiles.length} фото
    //         </span>
    //       )}
    //     </div>
    //   </div>

    //   <button
    //     className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
    //       isReady && !isLoading
    //         ? "bg-green-600 hover:bg-green-700"
    //         : "bg-gray-400 cursor-not-allowed"
    //     }`}
    //     onClick={handleSubmit}
    //     disabled={!isReady || isLoading}
    //   >
    //     {isLoading ? (
    //       <span className="flex items-center justify-center">
    //         <svg
    //           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //         >
    //           <circle
    //             className="opacity-25"
    //             cx="12"
    //             cy="12"
    //             r="10"
    //             stroke="currentColor"
    //             strokeWidth="4"
    //           ></circle>
    //           <path
    //             className="opacity-75"
    //             fill="currentColor"
    //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //           ></path>
    //         </svg>
    //         Отправка...
    //       </span>
    //     ) : (
    //       "Отправить на проверку"
    //     )}
    //   </button>
    // </div>
  );
};

export default DashboardPage;
