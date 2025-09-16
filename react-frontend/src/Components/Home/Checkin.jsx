import api from "../../api"; // axios instance with baseURL already set

const Checkin = ({ employeeId }) => {
  const handleCheckin = async () => {
    try {
      const response = await api.post("/api/method/fbts.api.flamingoApi.create_checkin", {
        employee: employeeId,
        latitude: 22.5738752,
        longitude: 88.3785728
      });

      const result = response.data;

      if (result.message) {
        alert(`✅ ${result.message.log_type} check-in successful! Ref: ${result.message.name}`);
      } else {
        alert("❌ Check-in failed.");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      alert("🚨 Error during check-in.");
    }
  };

  return (
    <button
      onClick={handleCheckin}
    >
      Check In
    </button>
  );
};

export default Checkin;
