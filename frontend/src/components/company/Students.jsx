import React, { useEffect, useState } from "react";
import { FileDown, Eye, X } from "lucide-react";
import { fetchStudentsApi } from "../../api/comapnyApi";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const result = await fetchStudentsApi();
      if (result.success) {
        setStudents(result.students);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col h-full p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Students</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{student.fullName}</h2>
                <p className="text-gray-600">Email: {student.email}</p>
                <p className="text-gray-600">Phone: {student.phone || "N/A"}</p>
                <p className="text-gray-600">
                  Course: {student.education?.[0]?.fieldOfStudy || "Not provided"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  <Eye size={16} /> View
                </button>
                {student.resume ? (
                  <a
                    href={student.resume}
                    download
                    className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-900 transition"
                  >
                    <FileDown size={16} /> Download
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-md cursor-not-allowed opacity-50"
                    disabled
                  >
                    <FileDown size={16} /> No Resume
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No students found.</p>
        )}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">{selectedStudent.fullName}</h2>
              <button onClick={() => setSelectedStudent(null)}>
                <X size={20} className="text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-600">{selectedStudent.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-gray-600">{selectedStudent.phone || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Institution:</p>
                <p className="text-gray-600">
                  {selectedStudent.education?.[0]?.institution || "Not provided"}
                </p>
              </div>
              <div>
                <p className="font-medium">Degree:</p>
                <p className="text-gray-600">
                  {selectedStudent.education?.[0]?.degree || "N/A"} in{" "}
                  {selectedStudent.education?.[0]?.fieldOfStudy || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-medium">Skills:</p>
                <p className="text-gray-600">
                  {selectedStudent.skills?.join(", ") || "No skills listed"}
                </p>
              </div>
              {selectedStudent.resume && (
                <div>
                  <p className="font-medium">Resume:</p>
                  <a
                    href={selectedStudent.resume}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
