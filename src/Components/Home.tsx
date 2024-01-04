import React, { useEffect, useState } from "react";

type Props = {};

interface Stock {
  symbol: string;
  openPrice: number;
  refreshInterval: number;
}

const Home = (props: Props) => {
  const [data, setData] = useState<Stock[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res;
    try {
      res = await fetch("http://localhost:4000/");
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the offline API error here, e.g. display a message to the user
      return;
    }
    if (!res) return;
    const json = await res.json();
    setData(json);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen p-6 bg-black min-h-screen overflow-hidden">
      <h1 className="text-white text-5xl mb-5">Stocks List</h1>
      <div className="w-1/2">
        {data && data.length ? (
          data.map((stock, ind) => (
            <div
              key={ind}
              className="bg-gray-800 text-white rounded-lg p-6 mb-4 flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold mb-2">
                {" "}
                {ind + 1}. &nbsp;{" "}
                <span className="text-yellow-400">{stock.symbol}</span>
              </h2>
              <p className="text-xl mb-2">
                Price:{" "}
                <span className="text-green-500">${stock.openPrice}</span>
              </p>
              <p className="text-xl">
                Refresh Interval: {stock.refreshInterval} sec
              </p>
            </div>
          ))
        ) : (
          <div className="bg-gray-800 text-white rounded-lg p-6 mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">No data available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
