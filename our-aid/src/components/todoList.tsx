'use client';

import { useEffect, useState } from 'react';
import TodoItem from './todoItem';

const HOST = 'http://localhost:8080';

type TodoItemType = {
	aid: string;
	completed: boolean;
	title: string;
	_id: string;
};

export default function TodoList({
	defaultData = [],
}: {
	defaultData?: TodoItemType[];
}) {
	const [aid, setAid] = useState('');
	const [input, setInput] = useState('');
	const [data, setData] = useState<TodoItemType[]>(
		JSON.parse(JSON.stringify(defaultData))
	);

	useEffect(() => {
		setAid(localStorage.getItem('aid') || '');
	}, []);
	useEffect(() => {
		if (!aid) {
			return;
		}
		!(async () => {
			const res = await fetch(`${HOST}/get/todo?aid=${aid}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const json = await res.json();
			console.log(json);
			if (res.status === 200 && json.data) {
				setData([...json.data]);
			}
		})();
	}, [aid]);

	return (
		<div className='max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16'>
			<div className='px-4 py-2'>
				<h1 className='text-gray-800 font-bold text-2xl uppercase'>
					To-Do List
				</h1>
			</div>
			<form className='w-full max-w-sm mx-auto px-4 py-2'>
				<div className='flex items-center border-b-2 border-teal-500 py-2'>
					<input
						className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
						type='text'
						placeholder='Add a task'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
						type='button'
						onClick={async () => {
							if (input === '') {
								alert('Please enter a task');
								return;
							}
							if (!aid) {
								alert('Please login first');
								return;
							}
							const res = await fetch(`${HOST}/create/todo`, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									aid,
									title: input,
									completed: false,
								}),
							});
							const json = await res.json();
							if (res.status === 200 && json.data) {
								setData([
									...data,
									{
										_id: json.data,
										aid: aid,
										title: input,
										completed: false,
									},
								]);
								setInput('');
							}
						}}
					>
						Add
					</button>
				</div>
			</form>
			<ul className='divide-y divide-gray-200 px-4'>
				{data.map((item, i) => {
					return (
						<TodoItem
							key={`todo-key-${i}`}
							id={`todo-${i}`}
							title={item.title}
							isComplete={item.completed}
							clickCallback={async () => {
								// request to update
								const res = await fetch(`${HOST}/update/todo`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										_id: item._id,
										completed: !item.completed,
									}),
								});
								const json = await res.json();
								if (res.status === 200 && json.result == 'success') {
									const newData = [...data];
									newData[i].completed = !newData[i].completed;
									setData(newData);
								}
							}}
							deleteCallback={async () => {
								// request to delete
								const res = await fetch(`${HOST}/delete/todo`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										_id: item._id,
									}),
								});
								const json = await res.json();
								if (res.status === 200 && json.result == 'success') {
									const newData = [...data];
									newData.splice(i, 1);
									setData(newData);
								}
							}}
						></TodoItem>
					);
				})}
			</ul>
		</div>
	);
}
