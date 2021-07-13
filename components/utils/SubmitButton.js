function SubmitButton({ label }) {
  return (
    <button
      className="cursor-pointer mx-4 bg-purple-700 hover:bg-purple-800 active:bg-purple-900 p-2 px-4 rounded-xl font-bold"
      type="submit"
    >
      {label ? label : <>Submit</>}
    </button>
  );
}

export default SubmitButton;
