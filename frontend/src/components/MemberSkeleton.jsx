function MemberSkeleton() {
  return (
    <>
      <div className="hidden animate-pulse divide-y divide-neutral-100 md:block">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="grid grid-cols-7 gap-4 px-6 py-4" key={index}>
            {Array.from({ length: 7 }).map((__, cellIndex) => (
              <div
                className="h-4 rounded bg-neutral-200"
                key={`${index}-${cellIndex}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="grid animate-pulse gap-3 p-4 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="rounded-lg border border-neutral-200 bg-white p-4" key={index}>
            <div className="mb-4 h-5 w-2/3 rounded bg-neutral-200" />
            <div className="space-y-3">
              <div className="h-4 rounded bg-neutral-200" />
              <div className="h-4 w-4/5 rounded bg-neutral-200" />
              <div className="h-4 w-1/2 rounded bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MemberSkeleton;
