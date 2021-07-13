function CancelButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer border-2 active:bg-gray-900 rounded-xl p-2 px-4"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
