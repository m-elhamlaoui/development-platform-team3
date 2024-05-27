import React, { useEffect, useRef, useState } from 'react';

import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const Progress = ({ token }) => {
  const [progress, setProgress] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('http://localhost:8081/fitness/progress', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(response.data);
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Failed to fetch progress', detail: error.message });
      }
    };

    fetchProgress();
  }, [token]);

  return (
    <div className="p-d-flex p-jc-center p-flex-column p-align-items-center">
      <Toast ref={toast} />
      <Card title="Progress" className="p-shadow-3 table-container">
        <DataTable value={progress}>
          <Column field="workoutId" header="Workout ID" />
          <Column field="setsCompleted" header="Sets Completed" />
          <Column field="repsCompleted" header="Reps Completed" />
          <Column field="weightUsed" header="Weight Used (kg)" />
        </DataTable>
      </Card>
    </div>
  );
};

export default Progress;
