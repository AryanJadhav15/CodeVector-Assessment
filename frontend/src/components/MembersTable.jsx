import StatusBadge from "./StatusBadge.jsx";
import { formatDate, getMemberEndDate, getMemberStatus } from "../utils/memberDates.js";

function MembersTable({ members }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-100/80">
            <tr>
              {["Name", "Email", "Category", "Duration", "Start Date", "End Date", "Status"].map(
                (heading) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 bg-white">
            {members.map((member) => {
              const endDate = getMemberEndDate(member.joinDate, member.duration);
              const status = getMemberStatus(endDate);

              return (
                <tr className="transition hover:bg-neutral-50" key={member._id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-950">
                    {member.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                    {member.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-700">
                    {member.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-700">
                    {member.duration} {member.duration === 1 ? "month" : "months"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-700">
                    {formatDate(member.joinDate)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-700">
                    {formatDate(endDate)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusBadge status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {members.map((member) => {
          const endDate = getMemberEndDate(member.joinDate, member.duration);
          const status = getMemberStatus(endDate);

          return (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
              key={member._id}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-neutral-950">
                    {member.name}
                  </h2>
                  <p className="mt-1 break-all text-sm text-neutral-500">{member.email}</p>
                </div>
                <StatusBadge status={status} />
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-neutral-900">{member.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Duration
                  </dt>
                  <dd className="mt-1 text-neutral-900">
                    {member.duration} {member.duration === 1 ? "month" : "months"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Start
                  </dt>
                  <dd className="mt-1 text-neutral-900">{formatDate(member.joinDate)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    End
                  </dt>
                  <dd className="mt-1 text-neutral-900">{formatDate(endDate)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default MembersTable;
