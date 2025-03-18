import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, doc, getDoc, updateDoc } from "../../../../firebaseConfig"; // import necessary firestore utilities

export const EditJob = () => {
  const [client, setClient] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const jobData = docSnap.data();
          setClient(jobData.client);
          setName(jobData.name);
          setBudget(jobData.budget);
          setLocation(jobData.location);
          setDate(jobData.date || "");
          setStartDate(jobData.startDate || "");
          setEndDate(jobData.endDate || "");
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error getting document:", err);
        setError("Failed to fetch job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !budget || !location || (!date && (!startDate || !endDate))) {
      setError("All fields are required, including date or date range.");
      return;
    }
    try {
      // Update the job document in Firestore
      const docRef = doc(db, "jobs", jobId); // Reference to the job document
      await updateDoc(docRef, {
        client: client,
        name: name,
        budget: budget,
        location: location,
        date: date,
        startDate: startDate,
        endDate: endDate,
      });
      navigate(-1);
    } catch (err) {
      setError("Error updating job: " + err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="client">Client:</label>
          <input
            type="text"
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Budget:</label>
          <input
            type="text"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Single Date Picker */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Date Range Picker */}
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};
