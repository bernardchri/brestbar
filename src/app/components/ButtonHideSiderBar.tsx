export function ButtonHideSiderBar({ showPanel, handleClick }: any) {
  return (
    <button
      type="button"
      aria-label={showPanel}
      onClick={handleClick}
      className="bg-bg p-2 rounded-lg"
    >
      <div className={`h-6 w-6 ${showPanel ? " " : "rotate-180"}`}>
        <svg width="100%" height="100%" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
          ></path>
        </svg>
      </div>
    </button>
  );
}
