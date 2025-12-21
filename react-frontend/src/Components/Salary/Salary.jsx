import React, { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";
import Header from "../Header/Header";

const Salary = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const employeeId = localStorage.getItem("employee_id");

  useEffect(() => {
    const fetchSalarySlips = async () => {
      try {
        if (!employeeId) {
          throw new Error("No employee ID found in local storage");
        }

        const { data } = await api.get(
          `/api/method/fbts.api.flamingoApi.get_employee_salary_slips`,
          {
            params: { employee: employeeId },
          }
        );

        if (data?.message && Array.isArray(data.message)) {
          setSalarySlips(data.message);
        } else {
          throw new Error("Invalid data structure received from server");
        }
      } catch (err) {
        console.error("Error fetching salary slips:", {
          error: err,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError(err.response?.data?.message || err.message || "Failed to fetch salary data");
      } finally {
        setLoading(false);
      }
    };

    fetchSalarySlips();
  }, [employeeId]);

  const downloadSalarySlip = async (name) => {
    try {
      const response = await axios.post(
        "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.download_salary_slip",
        { name },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading slip:", err);
      alert("Download failed.");
    }
  };

  if (loading) return <div className="p-8 text-xl">Loading salary data...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-0">
      <Header/>
      <div className="p-6" > 
      <h1 className="text-2xl font-bold mb-6 color-pink-400">Salary Slips</h1>
        
      {salarySlips.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {/* <th className="py-3 px-4 text-left">Salary Slip ID</th> */}
                <th className="py-3 px-4 text-left">Period</th>
                <th className="py-3 px-4 text-right">Gross Pay</th>
                <th className="py-3 px-4 text-right">Deductions</th>
                <th className="py-3 px-4 text-right">Net Pay</th>
                <th className="py-3 px-4 text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {salarySlips.map((slip) => (
                <tr key={slip.name} className="border-b border-gray-200 hover:bg-gray-50">
                  {/* <td className="py-3 px-4 font-mono text-sm">{slip.name}</td> */}
                  <td className="py-3 px-4">{slip.period}</td>
                  <td className="py-3 px-4 text-right">₹{slip.gross.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">₹{slip.deductions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium">₹{slip.net.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => downloadSalarySlip(slip.name)}
                      className="text-indigo-600 hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500">No salary slips found for employee {employeeId}</p>
        )
      )}
      </div>
    </div>
  );
};

export default Salary;
