import React from 'react';
import { GoPerson } from '@react-icons/all-files/go/GoPerson';

interface FloatButtonProps {
	onClick: () => void;
}

const AidButton: React.FC<FloatButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={() => {
				onClick();
			}}
			className='fixed top-8 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
		>
			<GoPerson size={24} />
		</button>
	);
};

export default AidButton;
