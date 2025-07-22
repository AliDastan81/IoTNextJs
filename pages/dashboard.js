import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const { data, error } = await supabase.from("devices").select("*").order("id", { ascending: true });

    if (error) {
      console.error("خطا در دریافت اطلاعات:", error);
    } else {
      setDevices(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800"> IoT داشبورد دستگاه‌های </h1>

      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div
              key={device.id}
              dir="rtl"
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{device.name}</h2>
              
              <p className="mb-1 text-gray-800">
                وضعیت:{" "}
                <span
                  className={`font-medium ${
                    device.status === "online" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {device.status === "online" ? "روشن" : "خاموش"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                آخرین آپدیت: {new Date(device.last_update).toLocaleString("fa-IR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
