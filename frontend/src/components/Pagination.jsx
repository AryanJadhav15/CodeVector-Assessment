function Pagination({
  currentPage,
  totalPages,
  isLoading,
  pageInput,
  onPageInputChange,
  onPageSubmit,
  onPrevious,
  onNext,
}) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex flex-col gap-4 border-t border-neutral-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between sm:px-6">
      <p className="text-sm text-neutral-600">
        Page <span className="font-medium text-neutral-950">{currentPage}</span> of{" "}
        <span className="font-medium text-neutral-950">{totalPages || 1}</span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form className="flex items-center gap-2" onSubmit={onPageSubmit}>
          <label className="text-sm font-medium text-neutral-600" htmlFor="page-number">
            Go to
          </label>
          <input
            className="h-10 w-24 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            id="page-number"
            inputMode="numeric"
            max={totalPages || 1}
            min="1"
            onChange={(event) => onPageInputChange(event.target.value)}
            placeholder="Page"
            type="number"
            value={pageInput}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Go
          </button>
        </form>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirstPage || isLoading}
            className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isLastPage || isLoading}
            className="rounded-md border border-neutral-900 bg-neutral-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
