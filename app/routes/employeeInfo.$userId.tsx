import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import { requireAuthedUser } from '~/.server/auth';
import { mgmtClient } from '~/.server/auth0';
import { prisma } from '~/.server/db';
import EmployeeInfoData from '~/components/EmployeeInfo';

interface User {
  id: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phoneNumber: string;
}

interface AvailabilityRange {
  start: Date;
  end: Date;
}

interface Shift {
  start: Date;
  end: Date;
}

interface LoaderData {
  user: User;
  availability: AvailabilityRange[];
  shifts: Shift[];
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAuthedUser(request);

  const userId = params.userId;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      availability: true,
      assignedShifts: {
        include: {
          shift: true,
        },
      },
    },
  });

  const response = await mgmtClient.users.get({ id: userId! });
  const authUsers = response.data;

  const currentUser: User = {
    id: authUsers.user_id,
    email: authUsers.email,
    role: dbUser?.role ?? 'N/A',
    first_name: authUsers.given_name,
    last_name: authUsers.family_name,
    phoneNumber: dbUser?.phoneNumber ?? 'Unknown',
  };

  const availability = dbUser?.availability.map(({ start, end }) => ({
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  }));

  const shifts = dbUser?.assignedShifts.map(({ shift }) => ({
    start: shift.start.toISOString().split('T')[0],
    end: shift.end.toISOString().split('T')[0],
  }));

  return json({ user: currentUser, availability, shifts });
}

export default function EmployeeInfoRoute() {
  const { user, availability, shifts } = useLoaderData<LoaderData>();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center">
        <EmployeeInfoData
          user={user}
          availability={availability}
          shifts={shifts}
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <NavLink
          to="/employee-list"
          className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Back
        </NavLink>
      </div>
    </div>
  );
}
