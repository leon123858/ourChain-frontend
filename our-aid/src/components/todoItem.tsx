export default function TodoItem({
  id,
  title,
  isComplete,
  clickCallback,
  deleteCallback,
}: {
  id: string;
  title: string;
  isComplete: boolean;
  clickCallback: () => void;
  deleteCallback: () => void;
}) {
  return (
    <li className="py-4">
      <div className="flex items-center">
        <input
          id={id}
          name={`${id}-name`}
          type="checkbox"
          checked={isComplete}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          onClick={() => {
            clickCallback();
          }}
        />
        <label htmlFor={id} className="ml-3 block text-gray-900">
          <span className="text-lg font-medium">{title}</span>
        </label>
        <button
          onClick={() => {
            deleteCallback();
          }}
          className="ml-auto px-2 text-red-500 border-red-500 border-2 bg-transparent hover:bg-red-500 hover:text-white"
        >
          delete
        </button>
      </div>
    </li>
  );
}
