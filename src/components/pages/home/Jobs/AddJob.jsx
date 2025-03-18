import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db, collection, addDoc } from "../../../../firebaseConfig";

export const AddJob = () => {
  const [client, setClient] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [dateRange, setDateRange] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDateRange = () => {
    setDateRange(!dateRange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "jobs"), {
        budget: budget,
        client: client,
        createdById: currentUser.email,
        createdDate: new Date(),
        date: date,
        startDate: startDate,
        endDate: endDate,
        isActive: true,
        isPaid: false,
        location: location,
        name: name,
        notes: notes,
        status: 1,
      });
      navigate(-1);
    } catch (err) {
      setError("Error creating job: " + err.message);
    }
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Client:</label>
          <input
            type="text"
            id="clients"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
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
        <div>
          <label htmlFor="name">Job Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <input
            type="text"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button onClick={toggleDateRange}>Job is multiple days</button>

        {dateRange ? (
          <div>
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
          </div>
        ) : (
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};
