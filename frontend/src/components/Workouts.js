import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const Workouts = ({ token }) => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const toast = useRef(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FITNESS_API}/fitness/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(response.data);
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Failed to fetch workouts', detail: error.message });
      }
    };
    fetchWorkouts();
  }, [token]);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    const workout = { name, type, sets, reps, duration, weight };
    try {
      const response = await axios.post(`${process.env.REACT_APP_FITNESS_API}/fitness/workouts`, workout, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts([...workouts, response.data]);
      toast.current.show({ severity: 'success', summary: 'Workout created successfully!' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Failed to create workout', detail: error.message });
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-flex-column p-align-items-center">
      <Toast ref={toast} />
      <Card title="Create Workout" className="p-shadow-3 form-container">
        <form onSubmit={handleCreateWorkout}>
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="type">Type</label>
            <InputText id="type" value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="sets">Sets</label>
            <InputNumber id="sets" value={sets} onChange={(e) => setSets(e.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="reps">Reps</label>
            <InputNumber id="reps" value={reps} onChange={(e) => setReps(e.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="duration">Duration (minutes)</label>
            <InputNumber id="duration" value={duration} onChange={(e) => setDuration(e.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="weight">Weight (kg)</label>
            <InputNumber id="weight" value={weight} onChange={(e) => setWeight(e.value)} required />
          </div>
          <Button type="submit" label="Create Workout" className="p-mt-2" />
        </form>
      </Card>
      <Card title="Workouts" className="p-shadow-3 table-container">
        <DataTable value={workouts}>
          <Column field="name" header="Name" />
          <Column field="type" header="Type" />
          <Column field="sets" header="Sets" />
          <Column field="reps" header="Reps" />
          <Column field="duration" header="Duration (minutes)" />
          <Column field="weight" header="Weight (kg)" />
        </DataTable>
      </Card>
    </div>
  );
};

export default Workouts;
