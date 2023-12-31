import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import axios from "axios";
import MyTable from "./Components/Table";
import Statistics from "./Components/Statistics";
import BarChart from "./Components/Chart/BarChart";
import PieChart from "./Components/Chart/PieChart";
alert('The API has been hosted on Render, so it might take some time for the backend to reboot and display data.');
function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(3);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const URL = import.meta.env.VITE_URL;
    const params = {
      q: search ?? "",
      page: page,
      month: month,
    };
    axios
      .get(`${URL}/fetchBySearch`, {
        params: params,
      })
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, month]);
  return (
    <div className="app">
      <Header setSearch={setSearch} setMonth={setMonth} />
      <MyTable data={tableData} />
      <Statistics month={month} />
      <div className="charts">
        <BarChart month={month} />
        <PieChart month={month} />
      </div>
    </div>
  );
}

export default App;
