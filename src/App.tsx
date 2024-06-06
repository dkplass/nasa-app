import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { IApodData } from "./types";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Nullable<IApodData>>(null);
  // const [loading, setLoading] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchApiData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const ls = localStorage.getItem(localKey);
        const apiData = ls ? JSON.parse(ls) : null;
        setData(apiData);
        return;
      }

      localStorage.clear();

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
      } catch (err: unknown) {
        const error = err as Error;
        console.log(error.message);
      }
    }

    fetchApiData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
