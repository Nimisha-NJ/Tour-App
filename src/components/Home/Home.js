import React, { useState, useEffect } from "react";
import Tour from "../Tour/Tour";
import { apiFetch } from "../../ApiService/api";
import Loader from "../Loader/Loader";

function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTourData() {
    try {
      const response = await apiFetch();
      setTours(response);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      fetchTourData();
    }, 1000);
  }, []);

  const removeTour = (id) => {
    const newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour);
  };

  if (loading) {
    return (
      <main>
        <Loader />;
      </main>
    );
  }

  return (
    <section>
      {tours.length === 0 ? (
        <>
          <main>
            <div className="title">
              <h2>No tours left</h2>
              <button onClick={() => fetchTourData()}>Refresh</button>
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="title">
            <h2>Tour Application</h2>
            <div className="underline"></div>
          </div>
          <div>
            {tours.map((tour) => {
              return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
