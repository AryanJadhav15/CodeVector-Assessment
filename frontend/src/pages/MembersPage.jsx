import { useEffect, useState } from "react";
import { getMembers } from "../api/members.js";
import MemberSkeleton from "../components/MemberSkeleton.jsx";
import MembersTable from "../components/MembersTable.jsx";
import Pagination from "../components/Pagination.jsx";

const PAGE_SIZE = 20;
const CATEGORIES = ["Basic", "Premium", "Elite"];

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMembers = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getMembers({ page, limit: PAGE_SIZE, category });

        if (!isMounted) {
          return;
        }

        if (!data?.success) {
          throw new Error(data?.message || "Unable to load members.");
        }

        setMembers(Array.isArray(data.members) ? data.members : []);
        setTotalPages(data.totalPages || 1);
        setTotalMembers(data.totalMembers || 0);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setMembers([]);
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Something went wrong while loading members.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, [page, category]);

  const hasMembers = members.length > 0;
  const goToPage = (event) => {
    event.preventDefault();

    const requestedPage = Number(pageInput);

    if (!Number.isInteger(requestedPage)) {
      setPageInput(String(page));
      return;
    }

    const boundedPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
    setPageInput(String(boundedPage));
    setPage(boundedPage);
  };

  const changePage = (nextPage) => {
    setPageInput(String(nextPage));
    setPage(nextPage);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setPageInput("1");
    setPage(1);
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-neutral-500">Gym Members</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-neutral-950">
            Members Management
          </h1>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Total Members
          </p>
          <p className="mt-1 text-2xl font-semibold text-neutral-950">
            {totalMembers.toLocaleString()}
          </p>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-subtle">
        <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-neutral-950">Member Directory</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Showing {PAGE_SIZE} members per page from the backend API.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-neutral-600" htmlFor="category-filter">
              Category
            </label>
            <select
              className="h-10 min-w-36 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              id="category-filter"
              onChange={changeCategory}
              value={category}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <MemberSkeleton />
        ) : error ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-base font-semibold text-neutral-950">Could not load members</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">{error}</p>
          </div>
        ) : !hasMembers ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-base font-semibold text-neutral-950">No members found</h3>
            <p className="mt-2 text-sm text-neutral-500">
              The backend returned an empty member list for this page.
            </p>
          </div>
        ) : (
          <MembersTable members={members} />
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          isLoading={isLoading}
          pageInput={pageInput}
          onPageInputChange={setPageInput}
          onPageSubmit={goToPage}
          onPrevious={() => changePage(Math.max(page - 1, 1))}
          onNext={() => changePage(Math.min(page + 1, totalPages))}
        />
      </div>
    </section>
  );
}

export default MembersPage;
