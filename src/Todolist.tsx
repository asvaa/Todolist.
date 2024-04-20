import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValuesType } from './App';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type TodoListPropsTyde = {
	title: string;
	tasks: TaskType[];
	filter: FilterValuesType;
	addTask: (title: string) => void;
	removeTask: (taskId: string) => void;
	changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
	changeTodoListFilter: (filter: FilterValuesType) => void;
};

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export const Todolist = ({
	title,
	tasks,
	filter,
	addTask,
	removeTask,
	changeTaskStatus,
	changeTodoListFilter,
}: TodoListPropsTyde) => {
	const [taskTitle, setTaskTitle] = useState('');
	const [inputError, setInputError] = useState<boolean>(false);

	let tasksList;
	if (tasks.length === 0) {
		tasksList = <span>Spisok pust</span>;
	} else {
		tasksList = (
			<ul>
				{tasks.map((task: TaskType) => {
					const removeTaskHandler = () => removeTask(task.id);
					const chengeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
						changeTaskStatus(task.id, e.currentTarget.checked);
					return (
						<li key={task.id}>
							<input
								type='checkbox'
								checked={task.isDone} //true || false
								onChange={chengeStatusHandler}
							/>
							<span className={task.isDone ? 'task-done' : 'task'}>
								{task.title}
							</span>
							<Button title='x' onClickHandler={removeTaskHandler} />
						</li>
					);
				})}
			</ul>
		);
	}

	const addNewTaskHandler = () => {
		const trimmedTaskTitle = taskTitle.trim();
		if (trimmedTaskTitle) {
			addTask(trimmedTaskTitle);
		} else {
			setInputError(true);
		}
		setTaskTitle('');
	};

	const onKeyTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && e.ctrlKey && isAddTaskPossible) {
			addNewTaskHandler();
		}
	};

	const setTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
		inputError && setInputError(false);
		setTaskTitle(e.currentTarget.value);
	};

	const changeHandlerCreater = (filter: FilterValuesType) => {
		return () => changeTodoListFilter(filter);
	};

	const maxTitleLength = 15;
	const isAddTaskPossible =
		taskTitle.length && taskTitle.length <= maxTitleLength;

	return (
		<div className='todolist'>
			<TodoListHeader title={title} />
			<div>
				<input
					className={inputError ? 'input-error' : ''}
					value={taskTitle}
					onKeyDown={onKeyTaskHandler}
					onChange={setTaskHandler}
				/>
				<Button
					title='+'
					onClickHandler={addNewTaskHandler}
					isDisabled={!isAddTaskPossible}
				/>
				{!taskTitle.length && (
					<div style={{ color: inputError ? 'red' : 'black' }}>
						Please, enter title
					</div>
				)}
				{taskTitle.length > 15 && <div>Task title is too long</div>}
			</div>
			{tasksList}
			<div>
				<Button
					classes={filter === 'all' ? 'btn-active' : ''}
					title='All'
					onClickHandler={changeHandlerCreater('all')}
				/>

				<Button
					classes={filter === 'active' ? 'btn-active' : ''}
					title='Active'
					onClickHandler={changeHandlerCreater('active')}
				/>
				<Button
					classes={filter === 'completed' ? 'btn-active' : ''}
					title='Completed'
					onClickHandler={changeHandlerCreater('completed')}
				/>
			</div>
		</div>
	);
};
