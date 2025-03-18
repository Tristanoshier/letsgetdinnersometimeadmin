import { DataGrid } from "@mui/x-data-grid";
import { jobColumns } from "../../../../data/datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllJobs = async () => {
      let jobList = [];
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
          jobList.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobList);
      } catch (err) {}
    };
    getAllJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/jobs/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Current Jobs
        <Link to="/jobs/add" className="link">
          Add Job
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={jobs}
        columns={jobColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};
