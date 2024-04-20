import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValuesType } from './App';
import { useRef } from 'react';
type TodoListPropsTyde = {
	title: string;
	tasks: TaskType[];
	addTask: (title: string) => void;
	removeTask: (taskId: string) => void;
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
	addTask,
	removeTask,
	changeTodoListFilter,
}: TodoListPropsTyde) => {
	const taskTitleInput = useRef<HTMLInputElement>(null);

	let tasksList;
	if (tasks.length === 0) {
		tasksList = <span>Spisok pust</span>;
	} else {
		tasksList = (
			<ul>
				{tasks.map((task: TaskType) => {
					return (
						<li key={task.id}>
							<input type='checkbox' checked={task.isDone} />
							<span>{task.title}</span>
							<Button title='x' onClickHandler={() => removeTask(task.id)}/>
						</li>
					);
				})}
			</ul>
		);
	}

	const addNewTask = () => {
		if (taskTitleInput.current) {
			addTask(taskTitleInput.current.value);
			taskTitleInput.current.value = '';
		}
	};

	return (
		<div className='todolist'>
			<TodoListHeader title={title} />
			<div>
				<input ref={taskTitleInput} />
				<Button title='+' onClickHandler={addNewTask} />
			</div>
			{tasksList}
			<div>
				<Button
					title='All'
					onClickHandler={() => changeTodoListFilter('all')}
				/>
				<Button
					title='Active'
					onClickHandler={() => changeTodoListFilter('active')}
				/>
				<Button
					title='Completed'
					onClickHandler={() => changeTodoListFilter('completed')}
				/>
			</div>
		</div>
	);
};
