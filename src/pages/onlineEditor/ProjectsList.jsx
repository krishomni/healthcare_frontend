import React from 'react';

const ProjectsList = ({ 
  projects, 
  loading, 
  onCreateProject, 
  onOpenProject, 
  onDeleteProject, 
  onNavigateToDashboard 
}) => {
  return (
    <div className="editor-home">
      <div className="editor-header">
        <h2>Projects</h2>
        <div>
          <button onClick={onNavigateToDashboard}>← Dashboard</button>
          <button onClick={onCreateProject}>New Project</button>
        </div>
      </div>
      {loading ? (
        <div>Loading…</div>
      ) : projects.length === 0 ? (
        <div>No projects yet. Click "New Project".</div>
      ) : (
        <table className="editor-projects-table" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Project ID</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.projectId}>
                <td>{p.name}</td>
                <td>{p.projectId}</td>
                <td>{new Date(p.updatedAt).toLocaleString?.() || ""}</td>
                <td>
                  <button onClick={() => onOpenProject(p.projectId)}>Open</button>{" "}
                  <button onClick={() => onDeleteProject(p.projectId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectsList;
