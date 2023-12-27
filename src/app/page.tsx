'use client';

import React, { FormEvent, useMemo, useState } from 'react';

type TasksType = {
	name: string;
	done: boolean;
	show: boolean;
};

export default function Home() {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState<TasksType[]>([]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (inputValue === '') {
			return;
		}

		const newTask = {
			done: false,
			show: true,
			name: inputValue,
		};

		setTasks(state => [...state, newTask].sort());
		setInputValue('');
	}

	function handleDone(task: TasksType) {
		const newTask = tasks.map(t => {
			if (t === task) {
				return { ...t, done: true };
			}
			return t;
		});

		setTasks(newTask);
	}

	const tasksOrdered = useMemo(
		() =>
			tasks.slice().sort((a, b) => {
				if (!a.done && b.done) {
					return -1;
				}
				if (a.done && !b.done) {
					return 1;
				}
				return a.name.localeCompare(b.name);
			}),
		[tasks],
	);

	return (
		<div className="container w-6/12 mx-auto">
			<header className="w-full flex justify-center">
				<h1 className="uppercase font-bold">Lista de Tarefas</h1>
			</header>
			<main className="flex justify-center flex-col">
				<div className="mx-auto">
					<div className="flex">
						<div className="box-border h-32 p-4 min-w-8">
							<span className="block text-gray-500">Total de Tarefas</span>
							<strong className="text-3xl">{tasks.length}</strong>
						</div>
						<div className="box-border h-32 p-4 min-w-8">
							<span className="block text-gray-500">Concluídas</span>
							<strong className="text-3xl text-green-500">50%</strong>
						</div>
						<div className="box-border h-32 p-4 min-w-8">
							<span className="block text-gray-500">Total de Tarefas</span>
							<strong className="text-3xl text-red-500">50%</strong>
						</div>
					</div>
					<form
						className="flex gap-4 justify-between w-full"
						onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Escreva uma nova tarefa"
							className="p-2 border rounded-md flex-1 text-sm"
							onChange={e => setInputValue(e.target.value)}
							value={inputValue}
						/>
						<button
							className="uppercase text-white bg-blue-600 rounded-md p-2 w-40 text-sm"
							type="submit">
							Adicionar
						</button>
					</form>
					<div>
						{tasksOrdered.map((task, index) => (
							<>
								{!task.done && (
									<div
										className="flex justify-between items-center border rounded-md py-2 px-4 mt-8"
										key={index}>
										<span>{task.name}</span>
										<button
											className="bg-green-500 uppercase text-white py-2 px-4 rounded-md text-sm"
											onClick={() => handleDone(task)}>
											Completar
										</button>
									</div>
								)}
								{task.done && (
									<div
										className="flex justify-between items-center border rounded-md py-2 px-4 mt-8 border-gray-100"
										key={index}>
										<span>{task.name}</span>
									</div>
								)}
							</>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
