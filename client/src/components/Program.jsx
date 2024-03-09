import React from 'react';
import { Link } from 'react-router-dom';

export default function Program  ({program, deleteProgram}) {

    return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {program.program_name}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {program.begin.slice(0, 10)}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {program.end.slice(0, 10)}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/programs/${program._id}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={() => {
              deleteProgram(program._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
 );}