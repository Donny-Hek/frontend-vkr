import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// useEffect
const DashboardPage = () => {
  const [examTypes, setExamTypes] = useState(null);
  // const [selectedExam, setSelectedExam] = useState("");
  const [answerFile, setAnswerFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState(null);
  // const [isReady, setIsReady] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchExamTypes = async () => {
      const dbSubjects = [
        {
          id: 1,
          type: "ОГЭ",
          name: "Математика",
          templatePath: "/templates/math_template.xlsx",
        },
        {
          id: 2,
          type: "ОГЭ",
          name: "Русский язык",
          templatePath: "/templates/russian_template.xlsx",
        },
        {
          id: 3,
          type: "ОГЭ",
          name: "Физика",
          templatePath: "/templates/physics_template.xlsx",
        },
      ];
      setSubjects(dbSubjects);
      // setExamTypes(null);
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
      setError("* Обязательно");
      return;
    }
    // setError("");
    console.log("Submitted", { examTypes, answerFile, photoFiles });
  };

  const selectedSubject = subjects.find((s) => s.name === examTypes);
  const templatePath = selectedSubject?.templatePath;

  return (
    <div className="">
      {/* Header */}
      <header className="gia-header">
        <div className="gia-square"></div>
        <div className="gia-logo-block">
          <h1 className="gia-title">Проверь ГИА</h1>
        </div>

        <nav className="gia-nav">
          <Link to="/profile">Кабинет</Link>
        </nav>
        <nav className="gia-nav">
          <a href="/">Выйти</a>
          {/* <Link to="/dashboard">Проверить бланк</Link> */}
        </nav>
        <div className="gia-square"></div>
      </header>

      {/* Info */}
      <div>
        <p style={{ "text-align": "center" }}>
          У вас осталось проверок в этом месяце: 4
        </p>
      </div>

      {/* Main form */}
      <hr />

      <div className="form-file">
        <h2 className="form-file">Начать проверку</h2>
        <div className="form-fild">
          <select
            value={examTypes}
            onChange={(e) => setExamTypes(e.target.value)}
            className="form-fild"
            required
          >
            <option value="">1: Выберите тип и предмет экзамена</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject}>
                {subject.type} {subject.name}
              </option>
            ))}
          </select>
        </div>
        {!examTypes && error && <div className="invalid-feedback">{error}</div>}
        <div className="form-fild">
          <label className="">2: Скачайте и заполните шаблон с ответами</label>

          <a href={templatePath} download className="upload-button">
            Шаблон
          </a>
        </div>

        <div className="form-fild">
          <label className="">3: Загрузите ответы</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleAnswersUpload}
            id="file-upload"
          />
          <label for="file-upload" className="upload-button">
            Загрузить
          </label>
        </div>
        {!answerFile && error && (
          <div className="invalid-feedback">{error}</div>
        )}

        <div className="form-fild ">
          <label className="">4: Загрузите фото бланков</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotosUpload}
            id="img-upload"
            // className="file:bg-gray-400 file:text-white file:px-4 file:py-2 file:rounded"
          />
          <label for="img-upload" className="upload-button">
            Загрузить
          </label>
        </div>
        {!photoFiles && error && (
          <div className="invalid-feedback">{error}</div>
        )}

        <button onClick={handleSubmit} className="gia-start-button">
          Отправить на проверку
        </button>
      </div>
      <footer className="gia-footer">
        <div className="gia-square"></div>
        <div className="gia-square"></div>
      </footer>
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
