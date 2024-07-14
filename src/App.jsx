import React, { useState } from 'react';
import './App.css';
import WorkoutChart from './components/WorkoutChart';

const TextField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const WorkoutApp = () => {
  const [status, setStatus] = useState('Idle');
  const [workoutTime, setWorkoutTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutList, setWorkoutList] = useState([]);

  const handleStart = () => {
    if (status === 'Idle' || status === 'Stopped') {
      setStatus('Running');
      setTimer(setInterval(() => {
        setWorkoutTime(prevTime => prevTime + 1);
      }, 1000));
    }
  };

  const handleStop = () => {
    if (status === 'Running') {
      setStatus('Stopped');
      clearInterval(timer);
    }
  };

  const handleReset = () => {
    if (workoutName.trim() !== '') {
      setWorkoutList([...workoutList, { name: workoutName, time: workoutTime }]);
      setWorkoutName('');
    }
    setStatus('Idle');
    setWorkoutTime(0);
    clearInterval(timer);
  };

  const handleInputChange = (e) => {
    const sanitizedInput = e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''); // Sanitize input
    setWorkoutName(sanitizedInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workoutName.trim() !== '') {
      setWorkoutList([...workoutList, { name: workoutName, time: workoutTime }]);
      setWorkoutName('');
      setWorkoutTime(0);
      setStatus('Idle');
      clearInterval(timer);
    }
  };

  return (
    <div className="App">
      <h1>Workout Recording App</h1>
      <form onSubmit={handleSubmit}>
        <TextField 
          value={workoutName} 
          onChange={handleInputChange} 
          placeholder="Enter workout name"
        />
        <button type="submit">Add Workout</button>
      </form>
      <ul>
        {workoutList.map((workout, index) => (
          <li key={index}>{workout.name} - {workout.time} seconds</li>
        ))}
      </ul>
      <WorkoutChart data={workoutList} />
      <p>Status: {status}</p>
      <p>Workout Time: {workoutTime} seconds</p>
      <button onClick={handleStart}>Start Workout</button>
      <button onClick={handleStop}>Stop Workout</button>
      <button onClick={handleReset}>Reset Workout</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <WorkoutApp />
    </div>
  );
}

export default App;
