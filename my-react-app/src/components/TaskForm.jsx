
import { useState, useRef } from "react";
// import "./TaskForm.css";

const initialForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium"
};

export default function TaskForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState("");

  const titleRef = useRef(null);
  const dateRef = useRef(null);

  // Update controlled inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear the corresponding error
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));

    setFeedback("");
  }

  // Validate required fields
  function validateForm() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Task title is required.";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    return newErrors;
  }

  // Submit form
  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFeedback("");

      if (validationErrors.title) {
        titleRef.current?.focus();
      } else {
        dateRef.current?.focus();
      }

      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      priority: form.priority
    };

    // Add without mutating state
    setTasks(prev => [...prev, newTask]);

    setFeedback("Task added successfully!");

    // Reset input values
    setForm({ ...initialForm });
    setErrors({});
  }

  return (
    <section className="task-section">
      <h1>Create Task</h1>

      <form
        className="task-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Task title */}
        <div className="task-field">
          <label htmlFor="task-title">
            Task Title <span>*</span>
          </label>

          <input
            ref={titleRef}
            id="task-title"
            name="title"
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title ? "title-error" : undefined
            }
            required
          />

          {errors.title && (
            <p
              id="title-error"
              className="field-error"
              role="alert"
            >
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="task-field">
          <label htmlFor="task-description">
            Description (optional)
          </label>

          <textarea
            id="task-description"
            name="description"
            placeholder="Describe your task..."
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Due date */}
        <div className="task-field">
          <label htmlFor="task-date">
            Due Date <span>*</span>
          </label>

          <input
            ref={dateRef}
            id="task-date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={
              errors.dueDate ? "date-error" : undefined
            }
            required
          />

          {errors.dueDate && (
            <p
              id="date-error"
              className="field-error"
              role="alert"
            >
              {errors.dueDate}
            </p>
          )}
        </div>

        {/* Priority */}
        <div className="task-field">
          <label htmlFor="task-priority">
            Priority
          </label>

          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button className="task-submit" type="submit">
          + Add Task
        </button>

        {feedback && (
          <p className="task-success" role="status">
            {feedback}
          </p>
        )}
      </form>

      {/* Submitted tasks */}
      <div className="task-list">
        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="task-empty">
            No tasks added yet.
          </p>
        ) : (
          tasks.map(task => (
            <article className="task-item" key={task.id}>
              <div className="task-item-heading">
                <h3>{task.title}</h3>
                <span className="task-priority">
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p>{task.description}</p>
              )}

              <small>Due: {task.dueDate}</small>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
