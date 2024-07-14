import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutApp from '../App';

test('renders Workout Recording App', () => {
  render(<WorkoutApp />);
  const linkElement = screen.getByText(/Workout Recording App/i);
  expect(linkElement).toBeInTheDocument();
});

test('can start, stop, and reset workout', () => {
  jest.useFakeTimers();

  render(<WorkoutApp />);

  const startButton = screen.getByText(/Start Workout/i);
  const stopButton = screen.getByText(/Stop Workout/i);
  const resetButton = screen.getByText(/Reset Workout/i);

  // Start workout
  fireEvent.click(startButton);
  jest.advanceTimersByTime(3000); // advance timer by 3 seconds
  expect(screen.getByText(/Workout Time: 3 seconds/i)).toBeInTheDocument();

  // Stop workout
  fireEvent.click(stopButton);
  jest.advanceTimersByTime(2000); // advance timer by 2 seconds
  expect(screen.getByText(/Workout Time: 3 seconds/i)).toBeInTheDocument();

  // Reset workout
  fireEvent.click(resetButton);
  expect(screen.getByText(/Workout Time: 0 seconds/i)).toBeInTheDocument();
});

test('can add workout name and display it with time', () => {
  render(<WorkoutApp />);

  const input = screen.getByPlaceholderText(/Enter workout name/i);
  const addButton = screen.getByText(/Add Workout/i);

  // Add workout
  fireEvent.change(input, { target: { value: 'Morning Run' } });
  fireEvent.click(addButton);

  expect(screen.getByText(/Morning Run - 0 seconds/i)).toBeInTheDocument();
});

test('sanitizes input correctly', () => {
  render(<WorkoutApp />);

  const input = screen.getByPlaceholderText(/Enter workout name/i);
  const addButton = screen.getByText(/Add Workout/i);

  // Add workout with special characters
  fireEvent.change(input, { target: { value: 'Morning Run!@#' } });
  fireEvent.click(addButton);

  // Check if sanitized input is displayed
  expect(screen.getByText(/Morning Run/i)).toBeInTheDocument();
});
