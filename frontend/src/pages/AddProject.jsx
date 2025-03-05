import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedLeader, setSelectedLeader] = useState("");
  const [file, setFile] = useState(null); 
  const [success, setSuccess] = useState(false);

  const { leaders, createProject, loadingLeaders } = useProject(); // loading update
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !selectedLeader || !deadline) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", projectName);
    formData.append("description", description || "");
    formData.append("projectLeader", selectedLeader);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file); // ✅ Attach file if selected

    const success = await createProject(formData);
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/projects");
      }, 1000);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      {success && <p className="text-green-500 mb-4">Project added successfully!</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700">Project Name</label>
          <input type="text" className="w-full p-2 border rounded" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Assign to Project Leader</label>
          {/* <select className="w-full p-2 border rounded" value={selectedLeader} onChange={(e) => setSelectedLeader(e.target.value)} required>
            <option value="">Select Leader</option>
            {leaders.map((leader) => (
              <option key={leader._id} value={leader._id}>{leader.name}</option>
            ))}
          </select> */}
          {loadingLeaders ? ( // loding update
            <p>Loading leaders...</p>
          ) : (
            <select className="w-full p-2 border rounded" value={selectedLeader} onChange={(e) => setSelectedLeader(e.target.value)} required>
              <option value="">Select Leader</option>
              {leaders.map((leader) => (
                <option key={leader._id} value={leader._id}>{leader.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload File</label>
          <input type="file" className="w-full p-2 border rounded" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Deadline</label>
          <input type="date" className="w-full p-2 border rounded" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
