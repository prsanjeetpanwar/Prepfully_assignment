import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import LoadingIndicator from './progressbass';


describe('LoadingIndicator', () => {
  it('renders without errors', () => {
    render(<LoadingIndicator />);
    const linkElement = screen.getByText(/0%/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('starts loading when the "Start" button is clicked', () => {
    render(<LoadingIndicator />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(100); 
    });
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
  });

  it('pauses loading when the "Pause" button is clicked', () => {
    render(<LoadingIndicator />);
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(startButton);
    fireEvent.click(pauseButton);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText(/25%/i)).toBeInTheDocument(); 
  });

  it('resumes loading when the "Resume" button is clicked', () => {
    render(<LoadingIndicator />);
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    const resumeButton = screen.getByText('Resume');
    fireEvent.click(startButton);
    fireEvent.click(pauseButton);
    fireEvent.click(resumeButton);
    act(() => {
      jest.advanceTimersByTime(100); 
    });
    expect(screen.getByText(/75%/i)).toBeInTheDocument(); 
  });

  it('stops loading when the "Stop" button is clicked', () => {
    render(<LoadingIndicator />);
    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');
    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    act(() => {
      jest.advanceTimersByTime(100); 
    });
    expect(screen.queryByText(/50%/i)).not.toBeInTheDocument(); 
  });
});
