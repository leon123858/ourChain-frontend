'use client';

import { useState } from 'react';
import FloatButton from './floatButton';
import Modal from './modal';
import AidButton from './aidButton';

export default function FloatButtonSet() {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isAidModalOpen, setIsAidModalOpen] = useState(false);

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<AidButton
				onClick={() => {
					setIsAidModalOpen(true);
				}}
			/>
			<div className='flex flex-col space-y-5 fixed bottom-4 right-4'>
				<FloatButton
					value='登入'
					onClick={() => {
						setIsLoginModalOpen(true);
					}}
				/>
				<FloatButton
					value='註冊'
					onClick={() => {
						setIsRegisterModalOpen(true);
					}}
				/>
			</div>
			<Modal
				id='aid'
				isOpen={isAidModalOpen}
				onClose={() => {
					setIsAidModalOpen(false);
				}}
			>
				<div className='w-full max-w-sm bg-white rounded-lg shadow'>
					<br />
					<div className='flex flex-col items-center pb-10'>
						<h5 className='mb-1 text-xl font-medium text-gray-900'>
							Bonnie Green
						</h5>
						<span className='text-sm text-gray-500'>Visual Designer</span>
						<div className='flex mt-4 space-x-3 md:mt-6'>
							<a
								href='#'
								className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Add friend
							</a>
							<a
								href='#'
								className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
							>
								Message
							</a>
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				id='login'
				isOpen={isLoginModalOpen}
				onClose={() => {
					setIsLoginModalOpen(false);
				}}
			>
				<div className='p-4'>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='username'
						>
							帳號
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type='text'
							placeholder='請輸入帳號'
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='password'
						>
							密碼
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type='password'
							placeholder='請輸入密碼'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className='flex items-center justify-center'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
							onClick={() => {
								// write aid into local storage
								localStorage.setItem('aid', userName);
								window.location.reload();
							}}
						>
							登入
						</button>
					</div>
				</div>
			</Modal>
			<Modal
				id='login'
				isOpen={isRegisterModalOpen}
				onClose={() => {
					setIsRegisterModalOpen(false);
				}}
			>
				<div className='p-4'>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='username'
						>
							帳號
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							type='text'
							placeholder='請輸入帳號'
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='password'
						>
							密碼
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							placeholder='請輸入密碼'
						/>
					</div>
					<div className='flex items-center justify-center'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							註冊
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}
